const isLogging = true

/**
 * ワークシートコレクションに選択範囲変更イベントを定義する
 */
export const registerSelectionChangeHandler = async () => {
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

        const result = `シート名 : ${sheet.name} 範囲 : ${args.address}`
        isLogging && console.log(`[選択範囲の変更] ${result}`)
    })
}