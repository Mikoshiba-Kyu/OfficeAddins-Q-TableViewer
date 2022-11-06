// ---------------------- Dev Settings ----------------------
const isLogging = true
const moduleName = 'TableData.tsx'

// ---------------------- Import ----------------------
import * as React from 'react'
import { DetailsList, DetailsListLayoutMode, SelectionMode, IColumn } from '@fluentui/react/lib/DetailsList'

// ---------------------- Props ----------------------
export interface Props {
	tableItems
	tableColumns
    isCompact: boolean
}

const TableData = (props: Props) => {
    isLogging && console.log(`[Addins] [${moduleName}] Rendering.`)

    return (
        <>
            <div style={{overflow: "scroll", height: 'calc(100vh - 6rem )'}}>
                <DetailsList
                    items={props.tableItems}
                    columns={props.tableColumns}
                    compact={props.isCompact}
                    selectionMode={SelectionMode.none}
                    layoutMode={DetailsListLayoutMode.justified}
                />
            </div>
        </>
    )
}
export default TableData