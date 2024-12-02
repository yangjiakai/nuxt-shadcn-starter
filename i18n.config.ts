export default defineI18nConfig(() => ({
  legacy: false,
  locale: 'en',
  messages: {
    en: {
      layout: {
        language: 'Language',
        components: 'Components',
        logo: 'Shadcn Vue Demo',
        theme: 'Theme Color'
      },
      pages: {
        home: {
          title: 'Welcome to Shadcn Vue Demo',
          description: 'This is a demo of Shadcn Vue components. Click on the sidebar links to explore different components.'
        },
        buttons: {
          title: 'Buttons',
          description: 'Various button styles and variants'
        },
        select: {
          title: 'Select',
          description: 'Dropdown select components with various features'
        },
        index: {
          title: 'Home',
        },
        button: {
          title: 'Button',
          variants: 'Button Variants',
          sizes: 'Button Sizes',
          icons: 'Button with Icons',
          loading: 'Loading Button',
        },
        carousel: {
          title: 'Carousel',
          basic: 'Basic Carousel',
          thumbnails: 'Carousel with Thumbnails',
          api: 'Carousel with API Control',
        },
      }
    },
    zh: {
      layout: {
        language: '语言',
        components: '组件',
        logo: 'Shadcn Vue 演示',
        theme: '主题颜色'
      },
      pages: {
        home: {
          title: '欢迎使用 Shadcn Vue 演示',
          description: '这是 Shadcn Vue 组件的演示。点击侧边栏链接探索不同的组件。'
        },
        buttons: {
          title: '按钮',
          description: '各种按钮样式和变体'
        },
        select: {
          title: '选择器',
          description: '具有各种功能的下拉选择组件'
        },
        index: {
          title: '首页',
        },
        button: {
          title: '按钮',
          variants: '按钮变体',
          sizes: '按钮大小',
          icons: '带图标的按钮',
          loading: '加载按钮',
        },
        carousel: {
          title: '轮播',
          basic: '基本轮播',
          thumbnails: '带缩略图的轮播',
          api: '带 API 控制的轮播',
        },
      }
    },
    ja: {
      layout: {
        language: '言語',
        components: 'コンポーネント',
        logo: 'Shadcn Vue デモ',
        theme: 'テーマカラー'
      },
      pages: {
        home: {
          title: 'Shadcn Vue デモへようこそ',
          description: 'これは Shadcn Vue コンポーネントのデモです。サイドバーのリンクをクリックして、さまざまなコンポーネントを探索してください。'
        },
        buttons: {
          title: 'ボタン',
          description: 'さまざまなボタンのスタイルとバリエーション'
        },
        select: {
          title: 'セレクト',
          description: 'さまざまな機能を持つドロップダウンセレクトコンポーネント'
        },
        index: {
          title: 'ホーム',
        },
        button: {
          title: 'ボタン',
          variants: 'ボタンのバリエーション',
          sizes: 'ボタンのサイズ',
          icons: 'アイコン付きボタン',
          loading: 'ローディングボタン',
        },
        carousel: {
          title: 'カーセル',
          basic: '基本的なカーセル',
          thumbnails: 'サムネイル付きカーセル',
          api: 'API制御のカーセル',
        },
      }
    }
  }
}))
