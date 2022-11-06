// ---------------------- Dev Settings ----------------------
const isLogging = true
const moduleName = 'App.tsx'

// ---------------------- Import ----------------------
import * as React from 'react'

import { ThemeProvider } from '@fluentui/react'
import { useBoolean } from '@fluentui/react-hooks'

import Header from './Header'
import TableViewer from './TableViewer'
import SidePanel from './SidePanel'

import { useTheme } from '../hooks/useTheme'

// ---------------------- Contents ----------------------
const App = () => {
  isLogging && console.log(`[Addins] [${moduleName}] レンダリング`)

  const { theme, setTheme, lightTheme, darkTheme } = useTheme()
	const [ isOpen, { setTrue: openPanel, setFalse: dismissPanel }] = useBoolean(false)

  return (
    <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
      <Header openPanel={openPanel} />
      <TableViewer />
      <SidePanel isOpen={isOpen} dismissPanel={dismissPanel} />
    </ThemeProvider>
  )
}
export default App
