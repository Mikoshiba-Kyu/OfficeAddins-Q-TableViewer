// ---------------------- Dev Settings ----------------------
const isLogging = true
const moduleName = 'TableSelecter.tsx'

// ---------------------- Import ----------------------
import * as React from 'react'
import { Dropdown, IDropdownOption, IDropdownStyles } from '@fluentui/react/lib/Dropdown'
import { useEffect, useState } from 'react'
import { useFetchTableList } from '../hooks/useFetchTableList'

export interface Props {
	reloadTableData: Function
}

const listStyle: Partial<IDropdownStyles> = {
	dropdown: {
		fontSize: 16,
		width: 300
	}
}

export const TableSelecter = (props: Props) => {
	isLogging && console.log(`[Addins] [${moduleName}] レンダリング`)

	// useFetchTableList
	const { tableList, reloadTableList } = useFetchTableList()

	// useEffect
	useEffect(() => {
		registerSelectionChangeHandler()
		reloadTableList()
		isLogging && console.log(`[Addins] [${moduleName}] useEffect実行 : TableSelectorコンポーネント`)
	}, [])

	// useState
	const [selectedTable, setSelectedTable] = useState<IDropdownOption>()

	// Selecterの値変更時の動作
	const onSelectChange = (_event: React.FormEvent<HTMLDivElement>, item: IDropdownOption): void => {
		props.reloadTableData(item.text)
		setSelectedTable(item)
		isLogging && console.log(`[Addins] [${moduleName}] state更新 : selectedTable`)
	}


	// ---------------------- Excel API ----------------------

	/**
	 * テーブルコレクションに各種イベントを定義する
	 */
	const registerSelectionChangeHandler = async () => {
		await Excel.run(async (context) => {
		const tables = context.workbook.tables
		tables.onAdded.add(async () => reloadTableList())
		tables.onDeleted.add(async () => reloadTableList())

		await context.sync()
		isLogging && console.log(`[Addins] [${moduleName}] テーブルコレクション変更イベントを有効化`)
		})
	}

	return (
        <Dropdown
			selectedKey={selectedTable ? selectedTable.key : undefined}
			label="テーブル選択"
			options={tableList}
			defaultSelectedKey={'0'}
			styles={listStyle}
			onChange={onSelectChange}
		/>
	)
}

export default TableSelecter