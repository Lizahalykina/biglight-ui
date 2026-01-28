import { render } from 'preact'
import './index.css'
import { App } from './app.tsx'
import { ThemeProvider } from './theme/ThemeProvider.tsx'

render(
  <ThemeProvider initialTheme="brandA">
    <App />
  </ThemeProvider>,
  document.getElementById('app')!
)
