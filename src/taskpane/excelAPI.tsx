import { IDropdownOption } from "@fluentui/react"

/**
 * ワークブック上の全テーブルの名前をDropdown用の配列で返す。
 */
export const getTableNameList = async (): Promise<IDropdownOption<any>[]>=> {
    const result: IDropdownOption<any>[] =[]

    await Excel.run(async (context) => {
        const tables = context.workbook.tables
        tables.load()
        await context.sync()

        // ToDo テーブルが存在していたら動的に作る
        if (tables.count > 0) {

        }
    })

    return result
}
