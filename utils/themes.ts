export type Theme = {
  name: string
  label: {
    en: string
    zh: string
    ja: string
  }
  class: string
}

export const themes: Theme[] = [
  {
    name: 'zinc',
    label: {
      en: 'Zinc',
      zh: '锌灰',
      ja: 'ジンク'
    },
    class: 'theme-zinc'
  },
  {
    name: 'slate',
    label: {
      en: 'Slate',
      zh: '岩灰',
      ja: 'スレート'
    },
    class: 'theme-slate'
  },
  {
    name: 'stone',
    label: {
      en: 'Stone',
      zh: '石灰',
      ja: 'ストーン'
    },
    class: 'theme-stone'
  },
  {
    name: 'gray',
    label: {
      en: 'Gray',
      zh: '中灰',
      ja: 'グレー'
    },
    class: 'theme-gray'
  },
  {
    name: 'neutral',
    label: {
      en: 'Neutral',
      zh: '中性',
      ja: 'ニュートラル'
    },
    class: 'theme-neutral'
  },
  {
    name: 'red',
    label: {
      en: 'Red',
      zh: '红色',
      ja: 'レッド'
    },
    class: 'theme-red'
  },
  {
    name: 'rose',
    label: {
      en: 'Rose',
      zh: '玫瑰',
      ja: 'ローズ'
    },
    class: 'theme-rose'
  },
  {
    name: 'blue',
    label: {
      en: 'Blue',
      zh: '蓝色',
      ja: 'ブルー'
    },
    class: 'theme-blue'
  },
  {
    name: 'green',
    label: {
      en: 'Green',
      zh: '绿色',
      ja: 'グリーン'
    },
    class: 'theme-green'
  },
  {
    name: 'orange',
    label: {
      en: 'Orange',
      zh: '橙色',
      ja: 'オレンジ'
    },
    class: 'theme-orange'
  }
]
