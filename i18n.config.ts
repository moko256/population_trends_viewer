export default defineI18nConfig(() => ({
  legacy: false,
  fallbackLocale: "en",
  messages: {
    en: {
      pageTitle: "Population compositions of each prefectures",
      reloadAction: "Reload",
      prefecturesHeader: "Prefectures",
      prefecturesLoadError: "Error when loading prefectures.",
      populationsLoadError: "Error when loading populations.",
      populationsNeedPrefectures: "Select 1 to 11 prefectures.",
      populationsGraphAxisPopulations: "Populations",
      populationsGraphAxisYears: "Years",
    },
    ja: {
      pageTitle: "都道府県人口統計",
      reloadAction: "再取得",
      prefecturesHeader: "都道府県",
      prefecturesLoadError: "県一覧の取得に失敗しました",
      populationsLoadError: "人口グラフの取得に失敗しました",
      populationsNeedPrefectures: "1~11個の都道府県を選択してください",
      populationsGraphAxisPopulations: "人口数",
      populationsGraphAxisYears: "年度",
    },
  },
}));
