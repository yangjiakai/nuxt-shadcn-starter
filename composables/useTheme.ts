import { themes } from '~/utils/themes'

export const useTheme = () => {
  const currentTheme = useState('theme', () => 'zinc')

  const setTheme = (theme: string) => {
    if (process.client) {
      const html = document.querySelector('html')
      const oldTheme = currentTheme.value
      if (html && oldTheme) {
        html.classList.remove(`theme-${oldTheme}`)
      }
      html?.classList.add(`theme-${theme}`)
      currentTheme.value = theme
    }
  }

  // Initialize theme
  onMounted(() => {
    const savedTheme = localStorage.getItem('theme') || 'zinc'
    setTheme(savedTheme)
  })

  // Watch for theme changes
  watch(currentTheme, (newTheme) => {
    if (process.client) {
      localStorage.setItem('theme', newTheme)
    }
  })

  return {
    currentTheme,
    setTheme,
    themes
  }
}
