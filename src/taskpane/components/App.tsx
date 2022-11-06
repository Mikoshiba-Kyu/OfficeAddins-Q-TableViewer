// ---------------------- Dev Settings ----------------------
const isLogging = true
const moduleName = 'App.tsx'

// ---------------------- Import ----------------------
import * as React from 'react'

import { ThemeProvider } from '@fluentui/react'
import { useBoolean } from '@fluentui/react-hooks'

import Header from './Header'
import TableData from './TableData'
import Footer from './Footer'
import SidePanel from './SidePanel'

import { useTheme } from '../hooks/useTheme'
import { useFetchTableData } from '../hooks/useFetchTableData'
import { useCompactMode } from '../hooks/useCompactMode'

// ---------------------- Contents ----------------------
const App = () => {
  isLogging && console.log(`[Addins] [${moduleName}] Rendering.`)

  const [ isOpen, { setTrue: openPanel, setFalse: dismissPanel }] = useBoolean(false)

  const { theme, setTheme, lightTheme, darkTheme } = useTheme()
  const { tableColumns, tableItems, reloadTableData } = useFetchTableData()
  const { isCompact, setIsCompact } = useCompactMode()

  return (
    <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
      <Header reloadTableData={reloadTableData}></Header>
      <TableData tableColumns={tableColumns} tableItems={tableItems} isCompact={isCompact}/>
      <Footer openPanel={openPanel}></Footer>
      <SidePanel isOpen={isOpen} dismissPanel={dismissPanel} isCompact={isCompact} setIsCompact={setIsCompact}/>
    </ThemeProvider>
  )
}
export default App
