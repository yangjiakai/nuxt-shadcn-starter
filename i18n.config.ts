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
        }
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
        }
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
        }
      }
    }
  }
}))
