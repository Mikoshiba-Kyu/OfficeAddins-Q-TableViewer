// ---------------------- Dev Settings ----------------------
const isLogging = true
const moduleName = 'SidePanel.tsx'

// ---------------------- Import ----------------------
import * as React from 'react'
import { Panel } from '@fluentui/react/lib/Panel'
import { BaseButton, DefaultButton } from '@fluentui/react/lib/Button'
import { Toggle } from '@fluentui/react'

import Spacer from './Spacer'

// ---------------------- Props ----------------------
export interface Props {
	isOpen: boolean
	dismissPanel: { (event: React.MouseEvent<HTMLDivElement | HTMLAnchorElement | HTMLButtonElement | HTMLSpanElement | BaseButton, MouseEvent>): void; (ev?: React.SyntheticEvent<HTMLElement, Event> | KeyboardEvent): void }
	isCompact: boolean
	setIsCompact: Function
}

// ---------------------- Contents ----------------------
const SidePanel = (props: Props) => {
	isLogging && console.log(`[Addins] [${moduleName}] Rendering.`)

	const onRenderFooterContent = React.useCallback(
		() => (
		<div>
			<DefaultButton onClick={props.dismissPanel}>Close</DefaultButton>
		</div>
		),
		[props.dismissPanel],
	)

	// テーマ


	// コンパクトモード
	const compactOnChange = (_event: React.MouseEvent<HTMLElement>, checked?: boolean) => {
		checked ? props.setIsCompact(true) : props.setIsCompact(false)
		isLogging && console.log(`[Addins] [${moduleName}] [compactOnChange] Update state : isCompact be ${checked}.`)
	}

	return (
		<Panel
			isOpen={props.isOpen}
			onDismiss={props.dismissPanel}
			headerText="設定"
			closeButtonAriaLabel="Close"
			onRenderFooterContent={onRenderFooterContent}
			isFooterAtBottom={true}
		>
			<Spacer size='2rem'></Spacer>
			<div>test</div>
			<Spacer size='2rem'></Spacer>
			<Toggle label="コンパクトモード" defaultChecked={props.isCompact} onText="On" offText="Off" onChange={compactOnChange} />
			<Spacer size='2rem'></Spacer>
			<div>test</div>
			<Spacer size='2rem'></Spacer>
			<div>test</div>
			<Spacer size='2rem'></Spacer>
			<div>test</div>
		</Panel>
	)
}

export default SidePanel