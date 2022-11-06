// ---------------------- Dev Settings ----------------------
const isLogging = true
const moduleName = 'Header.tsx'

// ---------------------- Import ----------------------
import * as React from 'react'
import { IIconProps, initializeIcons } from '@fluentui/react';
import { TooltipHost, ITooltipHostStyles } from '@fluentui/react/lib/Tooltip';
import { BaseButton, IconButton } from '@fluentui/react/lib/Button';
import { useId } from '@fluentui/react-hooks';

// ---------------------- Props ----------------------
export interface Props {
	openPanel: React.MouseEventHandler<HTMLDivElement | HTMLAnchorElement | HTMLButtonElement | HTMLSpanElement | BaseButton>
}

const emojiIcon: IIconProps = { iconName: 'Settings' }
const calloutProps = { gapSpace: 0 }
const hostStyles: Partial<ITooltipHostStyles> = { root: { display: 'inline-block' } }

initializeIcons()

// ---------------------- Contents ----------------------
const Header = (props: Props) => {
	isLogging && console.log(`[Addins] [${moduleName}] Rendering.`)
	const tooltipId = useId('tooltip');
	return (
        <TooltipHost
			content="Settings"
			id={tooltipId}
			calloutProps={calloutProps}
			styles={hostStyles}
			setAriaDescribedBy={false}
		>
			<IconButton iconProps={emojiIcon} aria-label="Emoji" onClick={props.openPanel} />
		</TooltipHost>
	)
}

export default Header