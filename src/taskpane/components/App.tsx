// ---------------------- Dev Settings ----------------------
const isLogging = true
const moduleName = 'App.tsx'

// ---------------------- Import ----------------------
// React
import * as React from 'react'
import { useState }  from 'react'

// FluentUI
import { ThemeProvider, PartialTheme, IColumn } from '@fluentui/react'

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


  const [tableHeadder, setTableHeadder] = useState<IColumn[]>([
    { key: 'column1', name: 'Name', fieldName: 'name', minWidth: 100, maxWidth: 200, isResizable: true },
    { key: 'column2', name: 'Value', fieldName: 'value', minWidth: 100, maxWidth: 200, isResizable: true },
  ])

  const [tableBody, setTableBody] = useState<any[]>([
    { key: 1, name: 'item1', value: 'aaa' },
    { key: 2, name: 'item2', value: 'bbb' },
    { key: 3, name: 'item3', value: 'ccc' },
    { key: 4, name: 'item4', value: 'ddd' },
    { key: 5, name: 'item5', value: 'eee' }
  ])

  return (
    <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
      <TableViewer columns={tableHeadder} items={tableBody} setTableHeadder={setTableHeadder} setTableBody={setTableBody}/>
    </ThemeProvider>
  )
}
export default App
