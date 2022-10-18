import * as React from 'react'

export interface Props {
	selectSheet: string
    selectRange: string
}

export const Message = (props: Props) => {
	return (
        <>
    		<h1>{`シート名 : ${props.selectSheet}　範囲 : ${props.selectRange}  `}</h1>
		</>
	)
}

export default Message