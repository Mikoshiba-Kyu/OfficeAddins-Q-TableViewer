import * as React from 'react'
import { Toggle } from '@fluentui/react'

// ---------------------- Dev Settings ----------------------
const isLogging = true
const moduleName = 'CompactModeChange.tsx'

export interface Props {
	isCompact: boolean
	setIsCompact: Function
}

export const CompactModeChange = (props: Props) => {
	isLogging && console.log(`[Addins] [${moduleName}] レンダリング`)

	const _onChange = (_event: React.MouseEvent<HTMLElement>, checked?: boolean) => {
		checked ? props.setIsCompact(true) : props.setIsCompact(false)
		isLogging && console.log(`[Addins] [${moduleName}] state更新  : isCompact を ${checked} に更新`)
	}

	return (
        <Toggle label="コンパクトモード" defaultChecked={props.isCompact} onText="On" offText="Off" onChange={_onChange} />
	)
}

export default CompactModeChange