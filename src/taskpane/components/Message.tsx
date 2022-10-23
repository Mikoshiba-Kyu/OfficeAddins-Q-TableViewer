import * as React from 'react'

// ---------------------- Dev Settings ----------------------
const isLogging = true

type SelectedRange = {
    sheetName: string,
    range: string
}

export interface Props {
    selectRange: SelectedRange | undefined
}

export const Message = (props: Props) => {
    isLogging && console.log("[Addins] レンダリング : Messageコンポーネント")

	return (
        <>
    		<h1>{`シート名 : ${props.selectRange ? props.selectRange.sheetName : '-' }　範囲 : ${props.selectRange ? props.selectRange.range : '-'}  `}</h1>
		</>
	)
}

export default Message