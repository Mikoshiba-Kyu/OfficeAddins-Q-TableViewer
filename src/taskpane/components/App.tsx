// ---------------------- Imports ----------------------

// React
import * as React from 'react'
import { useEffect, useState }  from 'react'

// FluentUI
import { ThemeProvider, PartialTheme, IDropdownOption } from '@fluentui/react'

// FluentUIComponents
import { PrimaryButton } from '@fluentui/react/lib/Button'

// Components
import { Message } from './Message'
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
  type SelectedRange = {
    sheetName: string,
    range: string
  }
  const [theme, setTheme] = useState<string>('light')
  const [selectRange, setSelectRange] = useState<SelectedRange | undefined>(undefined)
  const [tableList, setTableList] = useState<IDropdownOption<any>[]>([{key: '0', text: ''}])

  // ---------------------- Excel API ----------------------

  /**
   * ワークシートコレクションに選択範囲変更イベントを定義する
   */
  const registerSelectionChangeHandler = async () => {
    await Excel.run(async (context) => {
        const sheets = context.workbook.worksheets
        sheets.onSelectionChanged.add(onWorksheetCollectionSelectionChange)
        await context.sync()
        isLogging && console.log("[Addins] 選択範囲変更イベントを有効化")
    })
  }

  /**
  * ワークシートコレクションの選択範囲変更時に行われる処理
  */
  const onWorksheetCollectionSelectionChange = async (args: Excel.WorksheetSelectionChangedEventArgs) => {
    await Excel.run(async (context) => {
        const sheet = context.workbook.worksheets.getItem(args.worksheetId)
        sheet.load(["name"])
        await context.sync()

        const selection: SelectedRange = {sheetName: sheet.name, range: args.address}
        setSelectRange(selection)
        isLogging && console.log(`[Addins] 選択範囲の変更: シート名 : ${selection.sheetName} 範囲 : ${selection.range}`)
    })
  }

  // test
  const columns = [
    { key: 'column1', name: 'Name', fieldName: 'name', minWidth: 100, maxWidth: 200, isResizable: true },
    { key: 'column2', name: 'Value', fieldName: 'value', minWidth: 100, maxWidth: 200, isResizable: true },
  ]

  const items = [
    { key: 1, name: 'item1', value: 'aaa' },
    { key: 2, name: 'item2', value: 'bbb' },
    { key: 3, name: 'item3', value: 'ccc' },
    { key: 4, name: 'item4', value: 'ddd' },
    { key: 5, name: 'item5', value: 'eee' }
  ]

  return (
    <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
      <TableViewer columns={columns} items={items} tableList={tableList}/>
    </ThemeProvider>
  )
}
export default App


