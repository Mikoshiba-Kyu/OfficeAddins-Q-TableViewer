// ---------------------- Dev Settings ----------------------
const isLogging = true
const moduleName = 'Header.tsx'

// ---------------------- Import ----------------------
import * as React from 'react'
import TableSelecter from './TableSelecter'

// ---------------------- Props ----------------------
export interface Props {
	reloadTableData: Function
}

// ---------------------- Contents ----------------------
const Header = (props: Props) => {
	isLogging && console.log(`[Addins] [${moduleName}] Rendering.`)

	return (
		<div style={{ height: "4rem", paddingLeft: "1rem" }}>
			<TableSelecter reloadTableData={props.reloadTableData}/>
		</div>
	)
}

export default Header