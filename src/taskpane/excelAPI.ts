// ---------------------- Dev Settings ----------------------
const isLogging = true



/**
 * 対象テーブルのカラムセットをオブジェクトの配列で返す
 */
export const getTableColumns = async (tableName: string) => {
    let result
    await Excel.run(async (context) => {
        const table = context.workbook.tables.getItem(tableName)
        const header = table.getHeaderRowRange().load('values')
        await context.sync()

        result = header.values[0].map((value, index) =>{
            return { key: index, name: value, fieldName: value, minWidth: 100, maxWidth: 200, isResizable: true }
        })
        isLogging && console.log(`[Addins] Created Columns is ${JSON.stringify(result)}`)
    })

    return result
}