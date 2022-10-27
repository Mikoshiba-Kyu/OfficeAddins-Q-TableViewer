// ---------------------- Dev Settings ----------------------
const isLogging = true
const moduleName = 'App.tsx'

// ---------------------- Import ----------------------
// React
import * as React from 'react'
import { useState }  from 'react'

// FluentUI
import { ThemeProvider } from '@fluentui/react'

// Components
import { Header } from './Header'
import { TableViewer } from './TableViewer'
import SidePanel from './SidePanel'

import { useBoolean } from '@fluentui/react-hooks'

// Theme
import { lightTheme, darkTheme } from '../theme'

// ---------------------- Contents ----------------------
const App = () => {
  isLogging && console.log(`[Addins] [${moduleName}] レンダリング`)

  // useState
  const [theme, setTheme] = useState<string>('light')

  // SidePane
	const [isOpen, { setTrue: openPanel, setFalse: dismissPanel }] = useBoolean(false)


  return (
    <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
      <Header openPanel={openPanel} />
      <TableViewer />
      <SidePanel isOpen={isOpen} dismissPanel={dismissPanel} />
    </ThemeProvider>
  )
}
export default App
