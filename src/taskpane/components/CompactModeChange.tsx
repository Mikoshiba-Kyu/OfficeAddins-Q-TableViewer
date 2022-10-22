import * as React from 'react'
import { Toggle } from '@fluentui/react'

export interface Props {
	isCompact: boolean
	setIsCompact: Function
}

export const CompactModeChange = (props: Props) => {

	const _onChange = (_event: React.MouseEvent<HTMLElement>, checked?: boolean) => {
		checked ? props.setIsCompact(true) : props.setIsCompact(false)
	}

	return (
        <Toggle label="コンパクトモード" defaultChecked={props.isCompact} onText="On" offText="Off" onChange={_onChange} />
	)
}

export default CompactModeChange