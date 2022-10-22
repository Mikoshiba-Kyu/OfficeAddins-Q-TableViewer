import * as React from 'react'
import { DetailsList, DetailsListLayoutMode, SelectionMode, IColumn } from '@fluentui/react/lib/DetailsList'
import { IDropdownOption, IStackItemStyles, IStackTokens, Stack } from '@fluentui/react'
import { useState } from 'react'
import TableSelecter from './TableSelecter'
import CompactModeChange from './CompactModeChange'

export interface Props {
    columns: IColumn[]
    items: any[]
    tableList: IDropdownOption<any>[]
    setTableHeadder: Function
    setTableBody: Function
}

export const TableViewer = (props: Props) => {

    const [isCompact, setIsCompact] = useState(false)

    const stackItemStyles: IStackItemStyles = {
        root: {
            alignItems: 'left',
            display: 'flex',
            height: 70,
            justifyContent: 'left',
        }
    }
    
    const stackTokens: IStackTokens = {
        childrenGap: 0,
        padding: 0,
    }
    
    return (
        <>
            <Stack horizontal horizontalAlign="start" tokens={stackTokens}>
                <Stack.Item grow={2} styles={stackItemStyles}>
                    <TableSelecter tableList={props.tableList} />
                </Stack.Item>
                <Stack.Item grow={1} styles={stackItemStyles}>
                    <CompactModeChange isCompact={isCompact} setIsCompact={setIsCompact}></CompactModeChange>
                </Stack.Item>
            </Stack>
            <DetailsList
                items={props.items}
                columns={props.columns}
                compact={isCompact}
                selectionMode={SelectionMode.none}
                layoutMode={DetailsListLayoutMode.justified}
            />
        </>
    )
}
