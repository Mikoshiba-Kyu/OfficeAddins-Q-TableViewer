// ---------------------- Dev Settings ----------------------
const isLogging = true
const moduleName = 'Footer.tsx'

// ---------------------- Import ----------------------
import * as React from "react"
import { DefaultPalette, Stack, IStackStyles, IStackItemStyles } from '@fluentui/react'

import { IIconProps, initializeIcons } from '@fluentui/react';
import { TooltipHost, ITooltipHostStyles } from '@fluentui/react/lib/Tooltip';
import { BaseButton, IconButton } from '@fluentui/react/lib/Button';
import { useId } from '@fluentui/react-hooks';

// ---------------------- Props ----------------------
export interface Props {
	openPanel: React.MouseEventHandler<HTMLAnchorElement | HTMLButtonElement | HTMLDivElement | HTMLSpanElement | BaseButton>
}

const emojiIcon: IIconProps = { iconName: 'Settings' }
const calloutProps = { gapSpace: 0 }
const hostStyles: Partial<ITooltipHostStyles> = { root: { display: 'inline-block' } }

// ---------------------- Contents ----------------------
const Footer = (props: Props) => {
	isLogging && console.log(`[Addins] [${moduleName}] Rendering.`)

	// Styles definition
	const stackStyles: IStackStyles = {
		root: {
			background: DefaultPalette.blueDark,
		}
	}

	const stackItemStyles: IStackItemStyles = {
		root: {
			alignItems: 'left',
			background: DefaultPalette.blueDark,
			color: DefaultPalette.white,
			height: '2rem',
			display: 'flex',
			justifyContent: 'left',
			fontSize: '8px'
		}
	}

	initializeIcons()
	const tooltipId = useId('tooltip')
	return (
		<Stack horizontal horizontalAlign="start" styles={stackStyles}>
			<Stack.Item styles={stackItemStyles}>
			<TooltipHost
				content="Settings"
				id={tooltipId}
				calloutProps={calloutProps}
				styles={hostStyles}
				setAriaDescribedBy={false}
			>
				<IconButton iconProps={emojiIcon} aria-label="Emoji" onClick={props.openPanel} />
			</TooltipHost>
			</Stack.Item>
		</Stack>
	)
}

export default Footer