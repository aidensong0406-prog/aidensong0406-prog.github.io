"""Render the portfolio cover from the paper's existing Bebinca prediction array.

Uses model index 0 and forecast hour 157, as in the middle prediction panel of
make_full_domain_truth_prediction_2x3.py. Changes the display extent and palette;
no prediction values or source artifacts are modified.
"""
from pathlib import Path
import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
import matplotlib.tri as mtri
from matplotlib.colors import LinearSegmentedColormap, TwoSlopeNorm
from matplotlib.collections import LineCollection
import numpy as np

SITE = Path(__file__).resolve().parents[1]
DATA = SITE.parent / '风暴潮预测/visualizations/bebinca_observational_comparison_20260817/data_tail_slope/bebinca_loss_models_compact.npz'
OUT = SITE / 'public/images/projects/storm-surge/bebinca-coastal-preview.png'

with np.load(DATA, allow_pickle=True) as data:
    lon, lat = data['lon'], data['lat']
    triangles = data['triangles'].astype(np.int64)
    valid = data['full_valid'][156].astype(bool)
    prediction = data['full_predictions'][0, 156]

# Cool / neutral / warm remains a diverging scale centred on zero.
cmap = LinearSegmentedColormap.from_list('surge', [
    (0.0, '#246fa3'), (0.25, '#398dba'), (0.5, '#c2d8dc'),
    (0.7, '#f0b080'), (0.86, '#e56849'), (1.0, '#a52f3a'),
])
norm = TwoSlopeNorm(vmin=-2.5, vcenter=0, vmax=3.7)
background = '#0e1c28'
plt.rcParams.update({'font.family':'Arial','font.size':17,'text.color':'#eef4f7'})
fig = plt.figure(figsize=(8, 5.4), dpi=160, facecolor=background)
ax = fig.add_axes([0, .20, 1, .80], facecolor=background)
tri = mtri.Triangulation(lon, lat, triangles, mask=~valid[triangles].all(axis=1))
field = ax.tripcolor(tri, prediction, shading='gouraud', cmap=cmap, norm=norm, rasterized=True)

# Draw only the existing mesh boundary; there is no invented coastline geometry.
t = tri.get_masked_triangles()
edges = np.sort(np.concatenate([t[:,[0,1]],t[:,[1,2]],t[:,[2,0]]]),axis=1)
unique, counts = np.unique(edges,axis=0,return_counts=True)
boundary = unique[counts == 1]
points = np.column_stack([lon,lat])
ax.add_collection(LineCollection(points[boundary],colors='#c0d6dc',linewidths=.35,alpha=.7))
ax.set_xlim(117.25, 126.5)
ax.set_ylim(28.05, 34.0)
ax.set_aspect(1 / np.cos(np.deg2rad(31.0)))
ax.axis('off')

legend = fig.add_axes([.12,.115,.76,.018])
bar = fig.colorbar(field,cax=legend,orientation='horizontal',ticks=[-2.5,0,3.7])
bar.outline.set_visible(False)
bar.ax.set_xticklabels(['−2.5','0','+3.7'])
bar.ax.tick_params(labelsize=21,colors='#eef4f7',length=0,pad=7)
fig.text(.12,.167,'Predicted water level (m)',fontsize=20,ha='left',va='center')
fig.savefig(OUT,facecolor=background,dpi=160)
plt.close(fig)
print(OUT)
