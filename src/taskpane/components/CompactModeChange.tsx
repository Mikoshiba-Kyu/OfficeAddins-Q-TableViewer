import * as React from 'react'
import { Toggle } from '@fluentui/react'

// ---------------------- Dev Settings ----------------------
const isLogging = true

export interface Props {
	isCompact: boolean
	setIsCompact: Function
}

export const CompactModeChange = (props: Props) => {
	isLogging && console.log("[Addins] レンダリング : CompactModeChangeコンポーネント")

	const _onChange = (_event: React.MouseEvent<HTMLElement>, checked?: boolean) => {
		checked ? props.setIsCompact(true) : props.setIsCompact(false)
		checked ? isLogging && console.log('[Addins] ステート更新  : isCompact を true に更新') : isLogging && console.log('[Addins] ステート更新  : isCompact を false に更新')
	}

	return (
        <Toggle label="コンパクトモード" defaultChecked={props.isCompact} onText="On" offText="Off" onChange={_onChange} />
	)
}

export default CompactModeChange