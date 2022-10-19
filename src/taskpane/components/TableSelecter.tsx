import * as React from 'react'
import { Dropdown, IDropdownOption, IDropdownStyles } from '@fluentui/react/lib/Dropdown'

export interface Props {
	tableList: IDropdownOption<any>[]
}

const listStyle: Partial<IDropdownStyles> = {
	dropdown: {
		fontSize: 16
	}
}

export const TableSelecter = (props: Props) => {

	const [selectedTable, setSelectedTable] = React.useState<IDropdownOption>()
	const onSelectChange = (_event: React.FormEvent<HTMLDivElement>, item: IDropdownOption): void => {
		setSelectedTable(item)
	}

	return (
        <Dropdown
			selectedKey={selectedTable ? selectedTable.key : undefined}
			label="テーブル"
			options={props.tableList}
			defaultSelectedKey={'1'}
			styles={listStyle}
			onChange={onSelectChange}
		/>
	)
}

export default TableSelecter