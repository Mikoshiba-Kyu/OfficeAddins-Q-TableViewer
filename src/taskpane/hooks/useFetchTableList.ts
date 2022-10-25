// ---------------------- Dev Settings ----------------------
const isLogging = true
const moduleName = 'useFetchTableList.ts'

// ---------------------- Import ----------------------
import { useState } from "react"
import { IDropdownOption } from "@fluentui/react/lib/Dropdown"

// ---------------------- Logic ----------------------
export const useFetchTableList = () => {
  const [tableList, setTableList] = useState([])

  const reloadTableList = (): void => {
    let result: IDropdownOption<any>[] = []

    Excel.run(async (context) => {
        const tables = context.workbook.tables
        tables.load()
        await context.sync()

        result = tables.items.map((value, index) => {
            return {key: index + 1, text: value.name}
        })
        result.unshift({key: 0, text: '--------------------------------'})
        
        setTableList(result)
        isLogging && console.log(`[Addins] [${moduleName}] ステート更新 : tableList to ${result}`)
        
    })
  }

  return {tableList, setTableList, reloadTableList}
}