import React from 'react'

const Button = ({ className, value, onClick, id }) => {
	return (
		<button className={className} onClick={onClick} id={id}>
			{value}
		</button>
	)
}

export default Button
