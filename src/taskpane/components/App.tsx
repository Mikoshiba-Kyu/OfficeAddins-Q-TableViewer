// ---------------------- Imports ----------------------

// React
import * as React from 'react'
import { useEffect, useState }  from 'react'

// FluentUI
import { ThemeProvider, PartialTheme } from '@fluentui/react'
import { useBoolean } from '@fluentui/react-hooks'

// FluentUIComponents

// Components
import { Message } from './Message'

// ---------------------- Types ----------------------
type SelectionRange = {
  sheetName: string,
  range: string
}


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

  // Settings
  const [theme, setTheme] = useState<string>('light')
  const [selectSheet, setSelectSheet] = useState<string | undefined>(undefined)
  const [selectRange, setSelectRange] = useState<string | undefined>(undefined)

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

  return (
    <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
      <Message selectSheet={selectSheet} selectRange={selectRange}></Message>
    </ThemeProvider>
  )
}
export default App


