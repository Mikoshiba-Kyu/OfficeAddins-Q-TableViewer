import * as React from 'react'
import { DetailsList, DetailsListLayoutMode, SelectionMode, IColumn } from '@fluentui/react/lib/DetailsList'
import { DefaultPalette, IDropdownOption, IStackItemStyles, IStackStyles, IStackTokens, Stack } from '@fluentui/react'
import { useState } from 'react'
import TableSelecter from './TableSelecter'

export interface Props {
    columns: IColumn[]
    items: any[]
    tableList: IDropdownOption<any>[]
}

export const TableViewer = (props: Props) => {

    const [isCompact, setIsCompact] = useState(false)

    const toggleCompactMode = () => {
        setIsCompact(!isCompact) 
    }

    const stackStyles: IStackStyles = {
        root: {
            background: DefaultPalette.themeTertiary,
        }
    }

    const stackItemStyles: IStackItemStyles = {
        root: {
            alignItems: 'left',
            background: DefaultPalette.themePrimary,
            color: DefaultPalette.white,
            display: 'flex',
            height: 80,
            justifyContent: 'left',
        }
    }
    
    const stackTokens: IStackTokens = {
        childrenGap: 0,
        padding: 0,
    }
    
    return (
        <>
            <Stack horizontal styles={stackStyles} tokens={stackTokens}>
                <Stack.Item grow={3} styles={stackItemStyles}>
                    <TableSelecter tableList={props.tableList}/>
                </Stack.Item>
                <Stack.Item grow={2} styles={stackItemStyles}>
                    Grow is 2
                </Stack.Item>
                <Stack.Item grow styles={stackItemStyles}>
                    Grow is 1
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
