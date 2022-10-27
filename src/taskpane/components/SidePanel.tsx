import * as React from 'react'
import { Panel } from '@fluentui/react/lib/Panel'
import { Spacer } from './Spacer'
import { BaseButton, Button, DefaultButton } from '@fluentui/react/lib/Button'

export interface Props {
	isOpen: boolean
	dismissPanel: { (event: React.MouseEvent<HTMLDivElement | HTMLAnchorElement | HTMLButtonElement | HTMLSpanElement | BaseButton | Button, MouseEvent>): void; (ev?: React.SyntheticEvent<HTMLElement, Event> | KeyboardEvent): void }
}


const SidePanel = (props: Props) => {

	const onRenderFooterContent = React.useCallback(
		() => (
		<div>
			<DefaultButton onClick={props.dismissPanel}>Close</DefaultButton>
		</div>
		),
		[props.dismissPanel],
	)

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
			<div>test</div>
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