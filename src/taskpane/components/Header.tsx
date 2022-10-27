// ---------------------- Dev Settings ----------------------
const isLogging = true
const moduleName = 'Header.tsx'

// ---------------------- Import ----------------------
import * as React from 'react'
import { IIconProps, initializeIcons } from '@fluentui/react';
import { TooltipHost, ITooltipHostStyles } from '@fluentui/react/lib/Tooltip';
import { IconButton } from '@fluentui/react/lib/Button';
import { useId } from '@fluentui/react-hooks';

export interface Props {
	openPanel
}

initializeIcons()

const emojiIcon: IIconProps = { iconName: 'Settings' }

const calloutProps = { gapSpace: 0 }
const hostStyles: Partial<ITooltipHostStyles> = { root: { display: 'inline-block' } }

export const Header = (props: Props) => {
	isLogging && console.log(`[Addins] [${moduleName}] レンダリング`)
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