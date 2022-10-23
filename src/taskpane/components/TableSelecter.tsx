import * as React from 'react'
import { Dropdown, IDropdownOption, IDropdownStyles } from '@fluentui/react/lib/Dropdown'
import { useEffect, useState } from 'react'
import { getTableNameList } from '../excelAPI'

// ---------------------- Dev Settings ----------------------
const isLogging = true
const moduleName = 'TableSelecter.tsx'

const listStyle: Partial<IDropdownStyles> = {
	dropdown: {
		fontSize: 16,
		width: 300
	}
}

export const TableSelecter = () => {
	isLogging && console.log(`[Addins] [${moduleName}] レンダリング`)

	// useEffect
	useEffect(() => {
		registerSelectionChangeHandler()
		isLogging && console.log(`[Addins] [${moduleName}] useEffect実行 : TableSelectorコンポーネント`)
	}, [])

	// useState
	const [tableList, setTableList] = useState<IDropdownOption<any>[]>([])
	const [selectedTable, setSelectedTable] = useState<IDropdownOption>()

	// Selecterの値変更時の動作
	const onSelectChange = (_event: React.FormEvent<HTMLDivElement>, item: IDropdownOption): void => {
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
		tables.onAdded.add(updateTableList);
		tables.onDeleted.add(updateTableList);

		await context.sync()
		isLogging && console.log(`[Addins] [${moduleName}] テーブルコレクション変更イベントを有効化`)
		})
	}

	/**
	 * テーブルリストの更新処理
	 */
	const updateTableList = async () => {
		const newList = await getTableNameList()
		setTableList(newList)
		isLogging && console.log(`[Addins] [${moduleName}] ステート更新 : setTableList to ${newList}`)
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