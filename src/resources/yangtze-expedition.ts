export type ExpeditionStop = {
  id: string;
  name: string;
  english: string;
  focus: string;
};

export type ExpeditionRegion = {
  id: string;
  name: string;
  chinese: string;
  coordinates: [number, number];
  theme: string;
  description: string;
  stops: ExpeditionStop[];
};

// Stops and order supplied by Aiden. Coordinates represent regions, not sampling GPS.
// Investigation themes come from his pre-trip plan; they are questions, not findings.
// The plan clarifies the preliminary label “虎跳雪山” as Tiger Leaping Gorge (虎跳峡).
export const expeditionRegions: ExpeditionRegion[] = [
  {
    id: "yunnan",
    name: "Yunnan",
    chinese: "云南",
    coordinates: [100.18, 27.18],
    theme: "Mountain water",
    description: "From the snow of Yulong Mountain to the Jinsha River’s steep gorge.",
    stops: [
      {
        id: "yulong",
        name: "玉龙雪山",
        english: "Yulong Snow Mountain",
        focus: "Glacier meltwater and the beginning of a river journey.",
      },
      {
        id: "tiger-leaping-gorge",
        name: "虎跳峡",
        english: "Tiger Leaping Gorge",
        focus: "How steep terrain shapes the movement of water.",
      },
      {
        id: "jinsha",
        name: "金沙江",
        english: "Jinsha River",
        focus: "Following the upper river toward its confluences.",
      },
    ],
  },
  {
    id: "yibin",
    name: "Yibin",
    chinese: "宜宾",
    coordinates: [104.62, 28.77],
    theme: "Rivers meeting",
    description:
      "The Jinsha and Min rivers meet at Sanjiangkou, where the river takes the name Yangtze.",
    stops: [
      {
        id: "yibin-jinsha",
        name: "宜宾 · 金沙江",
        english: "Jinsha River",
        focus: "One of the two rivers entering the Yibin confluence.",
      },
      {
        id: "sanjiangkou",
        name: "宜宾 · 三江口",
        english: "Sanjiangkou confluence",
        focus: "The meeting of the Jinsha and Min rivers.",
      },
      {
        id: "min-river",
        name: "宜宾 · 岷江",
        english: "Min River",
        focus: "The other side of the confluence: a tributary entering the main river.",
      },
      {
        id: "yibin-yangtze",
        name: "宜宾 · 长江",
        english: "Yangtze River",
        focus: "The main river below the meeting of the Jinsha and Min.",
      },
    ],
  },
  {
    id: "luzhou",
    name: "Luzhou",
    chinese: "泸州",
    coordinates: [105.445, 28.884],
    theme: "Another tributary",
    description: "A second confluence, where the Tuo River joins the Yangtze.",
    stops: [
      {
        id: "tuo-river",
        name: "泸州 · 沱江",
        english: "Tuo River",
        focus: "A new tributary joining water already mixed farther upstream.",
      },
      {
        id: "luzhou-upstream",
        name: "泸州 · 长江上游",
        english: "Yangtze, upstream",
        focus: "The Yangtze before the Tuo River confluence.",
      },
      {
        id: "luzhou-downstream",
        name: "泸州 · 长江下游",
        english: "Yangtze, downstream",
        focus: "The main river after the tributary joins.",
      },
    ],
  },
  {
    id: "three-gorges",
    name: "Three Gorges",
    chinese: "三峡",
    coordinates: [109.3, 31.02],
    theme: "River and reservoir",
    description:
      "Through Wanzhou, Qutang Gorge, and Wushan: a river shaped by terrain and a reservoir.",
    stops: [
      {
        id: "wanzhou",
        name: "重庆 · 万州",
        english: "Wanzhou, Chongqing",
        focus: "The Yangtze within the Three Gorges Reservoir region.",
      },
      {
        id: "qutang-gorge",
        name: "瞿塘峡",
        english: "Qutang Gorge",
        focus: "The narrow passage through the first of the Three Gorges.",
      },
      {
        id: "wushan",
        name: "巫山",
        english: "Wushan",
        focus: "The river landscape around Wushan and the gorges.",
      },
    ],
  },
  {
    id: "yichang",
    name: "Yichang",
    chinese: "宜昌",
    coordinates: [111.03, 30.83],
    theme: "Across the dam",
    description:
      "Upstream and downstream locations around Yichang connect the reservoir to the river beyond.",
    stops: [
      {
        id: "yichang-upstream",
        name: "宜昌 · 上游",
        english: "Yichang, upstream",
        focus: "The upstream side of the Yichang portion of the journey.",
      },
      {
        id: "yichang-downstream",
        name: "宜昌 · 下游",
        english: "Yichang, downstream",
        focus: "The downstream side, toward the middle Yangtze.",
      },
    ],
  },
  {
    id: "wuhan",
    name: "Wuhan",
    chinese: "武汉",
    coordinates: [114.3, 30.58],
    theme: "The urban river",
    description: "The broad middle Yangtze meets a city whose history is closely tied to water.",
    stops: [
      {
        id: "wuhan",
        name: "武汉",
        english: "Wuhan",
        focus: "Water, flood memory, and city life along the middle Yangtze.",
      },
    ],
  },
];

export const expeditionStops = expeditionRegions.flatMap((region) =>
  region.stops.map((stop) => ({ ...stop, regionId: region.id })),
);
