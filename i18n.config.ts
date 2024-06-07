export default defineI18nConfig(() => ({
  legacy: false,
  fallbackLocale: "en",
  messages: {
    en: {
      pageTitle: "Population compositions of each prefecture",
      pageDescription:
        "Show the population composition of each prefecture in Japan.",
      reloadAction: "Reload",
      prefecturesHeader: "Prefectures",
      prefectureLoading: "Loading prefectures…",
      prefecturesLoadError: "Error when loading prefectures.",
      populationsLoading: "Loading populations…",
      populationsLoadError: "Error when loading populations.",
      populationsNeedPrefectures: "Select 1 to 11 prefectures.",
      populationsGraphAxisPopulations: "Populations",
      populationsGraphAxisYears: "Years",
    },
    ja: {
      pageTitle: "都道府県人口統計",
      pageDescription: "都道府県別の人口統計を表示します",
      reloadAction: "再取得",
      prefecturesHeader: "都道府県",
      prefectureLoading: "県一覧を取得中…",
      prefecturesLoadError: "県一覧の取得に失敗しました",
      populationsLoading: "人口グラフを取得中…",
      populationsLoadError: "人口グラフの取得に失敗しました",
      populationsNeedPrefectures: "1~11個の都道府県を選択してください",
      populationsGraphAxisPopulations: "人口数",
      populationsGraphAxisYears: "年度",
    },
  },
}));
