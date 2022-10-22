import { IDropdownOption } from "@fluentui/react"

// ---------------------- Dev Settings ----------------------
const isLogging = true

/**
 * ワークブック上の全テーブルの名前をDropdown用の配列で返す。
 */
export const getTableNameList = async (): Promise<IDropdownOption<any>[]>=> {
    let result: IDropdownOption<any>[] =[]

    await Excel.run(async (context) => {
        const tables = context.workbook.tables
        tables.load()
        await context.sync()

        result = tables.items.map((value, index) => {
            return {key: index + 1, text: value.name}
        })
        result.unshift({key: 0, text: '--------------------------------'})
        isLogging && console.log(`[Addins] Created NewList is ${JSON.stringify(result)}`)
        
    })

    return result
}
