// ---------------------- Imports ----------------------

// React
import * as React from 'react'
import { useEffect, useState }  from 'react'

// FluentUI
import { ThemeProvider, PartialTheme, IDropdownOption } from '@fluentui/react'

// Components
import { getTableNameList } from '../excelAPI'
import { TableViewer } from './TableViewer'

// ---------------------- Dev Settings ----------------------
const isLogging = true

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

  // useEffect
  useEffect(() => {
    registerSelectionChangeHandler()
  }) 

  // useState
  const [theme, setTheme] = useState<string>('light')
  const [tableList, setTableList] = useState<IDropdownOption<any>[]>([{key: '0', text: '--------------------------------'}])

  // ---------------------- Excel API ----------------------

  /**
   * テーブルコレクションに各種イベントを定義する
   */
  const registerSelectionChangeHandler = async () => {
    await Excel.run(async (context) => {
      const tables = context.workbook.tables
      tables.onAdded.add(updateTableList);
      tables.onDeleted.add(updateTableList);

      await context.sync()
      isLogging && console.log("[Addins] テーブルコレクション変更イベントを有効化")
    })
  }

  /**
  * テーブルリストの更新処理
  */
  const updateTableList = async () => {
      const newList = await getTableNameList()
      setTableList(newList)
  }



  // test
  const columns = [
    // { key: 'column1', name: 'Name', fieldName: 'name', minWidth: 100, maxWidth: 200, isResizable: true },
    // { key: 'column2', name: 'Value', fieldName: 'value', minWidth: 100, maxWidth: 200, isResizable: true },
  ]

  const items = [
    // { key: 1, name: 'item1', value: 'aaa' },
    // { key: 2, name: 'item2', value: 'bbb' },
    // { key: 3, name: 'item3', value: 'ccc' },
    // { key: 4, name: 'item4', value: 'ddd' },
    // { key: 5, name: 'item5', value: 'eee' }
  ]

  return (
    <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
      <TableViewer columns={columns} items={items} tableList={tableList}/>
    </ThemeProvider>
  )
}
export default App
