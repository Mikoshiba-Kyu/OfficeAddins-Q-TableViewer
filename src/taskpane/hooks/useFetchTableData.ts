// ---------------------- Dev Settings ----------------------
const isLogging = true
const moduleName = 'useFetchTableData.ts'

// ---------------------- Import ----------------------
import { useState } from "react"
import { IColumn } from "@fluentui/react/lib/DetailsList"

// ---------------------- Logic ----------------------
export const useFetchTableData = () => {
  const [tableColumns, setTableColumns] = useState<IColumn[]>([
    { key: 'column1', name: 'Name', fieldName: 'name', minWidth: 100, maxWidth: 200, isResizable: true },
    { key: 'column2', name: 'Value', fieldName: 'value', minWidth: 100, maxWidth: 200, isResizable: true },
  ])

  const [tableItems, setTableItems] = useState<any[]>([
    { key: 1, name: 'item1', value: 'aaa' },
    { key: 2, name: 'item2', value: 'bbb' },
    { key: 3, name: 'item3', value: 'ccc' },
    { key: 4, name: 'item4', value: 'ddd' },
    { key: 5, name: 'item5', value: 'eee' }
  ])

  const reloadTableData = (tableName: string): void => {

    Excel.run(async (context) => {
      const table = context.workbook.tables.getItem(tableName)
      const header = table.getHeaderRowRange().load('values')
      const body = table.getDataBodyRange().load('values')
      await context.sync()
      
      let columnsResult: any[]
      let columnsNameList: string[] = new Array()
      columnsResult = header.values[0].map((value, index) => {
        columnsNameList.push(value)
        return { key: index, name: value, fieldName: value, minWidth: 100, maxWidth: 200, isResizable: true }
      })
      setTableColumns(columnsResult)
      isLogging && console.log(`[Addins] [${moduleName}] state更新 : tableColumns to ${JSON.stringify(columnsResult)}`)

      let rowsResult: any[]
      rowsResult = body.values.map((rows, index) => {

        console.log(`[Addins] [${moduleName}] index : ${index} rows : ${rows}`)

        const row = {}
        row['key'] = index

        const tmp = rows.map((cell, index) => {
          row[columnsNameList[index]] = cell
        })
        return row
      })      

      setTableItems(rowsResult)
      isLogging && console.log(`[Addins] [${moduleName}] state更新 : tableItems to ${JSON.stringify(rowsResult)}`)
    })
  }

  return {tableColumns, tableItems, reloadTableData}
}