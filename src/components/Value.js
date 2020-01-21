import React from 'react'
import ContentEditable from 'react-contenteditable'

const Value = props => {
	return (
		<div>
			<ContentEditable
				className="value"
				html={props.value === 0 ? "" : String(props.value)}
				onChange={e => props.onChange(e, props.type, props.player)}
			/>
		</div>
	)
}

export default Value