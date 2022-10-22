import * as React from 'react'
import { Dropdown, IDropdownOption, IDropdownStyles } from '@fluentui/react/lib/Dropdown'

export interface Props {
	tableList: IDropdownOption<any>[]
}

const listStyle: Partial<IDropdownStyles> = {
	dropdown: {
		fontSize: 16,
		width: 300
	}
}

export const TableSelecter = (props: Props) => {

	const [selectedTable, setSelectedTable] = React.useState<IDropdownOption>()

	// Selecterの値変更時の動作
	const onSelectChange = (_event: React.FormEvent<HTMLDivElement>, item: IDropdownOption): void => {
		setSelectedTable(item)
	}

	return (
        <Dropdown
			selectedKey={selectedTable ? selectedTable.key : undefined}
			label="テーブル選択"
			options={props.tableList}
			defaultSelectedKey={'0'}
			styles={listStyle}
			onChange={onSelectChange}
		/>
	)
}

export default TableSelecter