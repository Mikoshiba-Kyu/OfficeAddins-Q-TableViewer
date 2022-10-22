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
import TableSelecter from './TableSelecter'
import { getTableNameList } from '../excelAPI'
import { DetailsListBasicExample } from './TableData'

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

  //TODO ここでテーブルネームの取得を実験している
  const testCall = async () => {
    const newTableList:IDropdownOption<any>[] = await getTableNameList()
    setTableList(newTableList)
  }



  return (
    <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
      <Message selectRange={selectRange}></Message>
      <PrimaryButton onClick={testCall}>aaa</PrimaryButton>
      <TableSelecter tableList={tableList}></TableSelecter>
      <DetailsListBasicExample></DetailsListBasicExample>
    </ThemeProvider>
  )
}
export default App


