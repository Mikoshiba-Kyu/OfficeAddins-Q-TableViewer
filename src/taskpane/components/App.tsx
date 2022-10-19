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
  const [selectSheet, setSelectSheet] = useState<string | undefined>(undefined)
  const [selectRange, setSelectRange] = useState<string | undefined>(undefined)
  const [tableList, setTableList] = useState<IDropdownOption<any>[]>([{key: '1', text: 'apple'}, {key: '2', text: 'orange'}, {key: '3', text: 'banana'}])

  // ---------------------- Excel API ----------------------

  /**
   * ワークシートコレクションに選択範囲変更イベントを定義する
   */
  const registerSelectionChangeHandler = async () => {
    await Excel.run(async (context) => {
        const sheets = context.workbook.worksheets
        sheets.onSelectionChanged.add(onWorksheetCollectionSelectionChange)
        await context.sync()
        isLogging && console.log("A handler has been registered for the OnAdded event.")
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

        setSelectSheet(sheet.name)
        setSelectRange(args.address)
        const result = `シート名 : ${sheet.name} 範囲 : ${args.address}`
        isLogging && console.log(`[選択範囲の変更] ${result}`)
    })
  }

  //ToDo ここでテーブルネームの取得を実験している
  const testCall = async () => {
    const newTableList:IDropdownOption<any>[] = await getTableNameList()
    const key = newTableList.length + 1
    newTableList.push({key: key.toString(), text: 'melon'})
    setTableList(newTableList)
  }



  return (
    <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
      <Message selectSheet={selectSheet} selectRange={selectRange}></Message>
      <PrimaryButton onClick={testCall}>aaa</PrimaryButton>
      <TableSelecter tableList={tableList}></TableSelecter>
    </ThemeProvider>
  )
}
export default App


