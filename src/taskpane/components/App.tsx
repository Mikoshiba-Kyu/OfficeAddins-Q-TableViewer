// ---------------------- Dev Settings ----------------------
const isLogging = true
const moduleName = 'App.tsx'

// ---------------------- Import ----------------------
// React
import * as React from 'react'
import { useState }  from 'react'

// FluentUI
import { ThemeProvider, PartialTheme } from '@fluentui/react'

// Components
import { TableViewer } from './TableViewer'

// ---------------------- Theme ----------------------
const lightTheme: PartialTheme = {
  semanticColors: {
    bodyBackground: '#FAFAFA',
    bodyText: '#111111',
  },
}

const darkTheme: PartialTheme = {
  semanticColors: {
    bodyBackground: '#111111',
    bodyText: '#FAFAFA',
  },
}


// ---------------------- Contents ----------------------
const App = () => {
  isLogging && console.log(`[Addins] [${moduleName}] レンダリング`)

  // useState
  const [theme, setTheme] = useState<string>('light')

  return (
    <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
      <TableViewer />
    </ThemeProvider>
  )
}
export default App
