import React, { useState } from 'react'
import Wrapper from './components/Wrapper'
import Screen from './components/Screen'
import ButtonBox from './components/ButtonBox'
import Button from './components/Button'
import ScreenCalculation from './components/ScreenCalculation'

const btnValues = [
	{ display: 'AC', id: 'clear' },
	{ display: 'C', id: 'delete' },
	{ display: '%', id: 'percent' },
	{ display: '÷', id: 'divide' },
	{ display: 7, id: 'seven' },
	{ display: 8, id: 'eight' },
	{ display: 9, id: 'nine' },
	{ display: '×', id: 'multiply' },
	{ display: 4, id: 'four' },
	{ display: 5, id: 'five' },
	{ display: 6, id: 'six' },
	{ display: '-', id: 'subtract' },
	{ display: 1, id: 'one' },
	{ display: 2, id: 'two' },
	{ display: 3, id: 'three' },
	{ display: '+', id: 'add' },
	{ display: '±', id: 'plus-minus' },
	{ display: 0, id: 'zero' },
	{ display: '.', id: 'decimal' },
	{ display: '=', id: 'equals' },
]

const toLocaleString = (num) =>
	String(num).replace(/(?<!\..*)(\d)(?=(?:\d{3})+(?:\.|$))/g, '$1 ')

const removeSpaces = (num) => num.toString().replace(/\s/g, '')

const math = (a, b, sign) =>
	sign === '+' ? a + b : sign === '-' ? a - b : sign === '×' ? a * b : a / b

const App = () => {
	let [calc, setCalc] = useState({
		calcString: '',
		sign: '',
		num: 0,
		res: 0,
	})

	const numClickHandler = (e) => {
		e.preventDefault()
		const value = e.target.innerHTML
		if (removeSpaces(calc.num).length < 10) {
			setCalc({
				...calc,
				calcString: calc.sign ? calc.calcString : '',
				num:
					removeSpaces(calc.num) % 1 === 0 && !calc.num.toString().includes('.')
						? toLocaleString(Number(removeSpaces(calc.num + value)))
						: toLocaleString(calc.num + value),
				res: !calc.sign ? 0 : calc.res,
			})
		}
	}

	const comaClickHandler = (e) => {
		e.preventDefault()
		const value = e.target.innerHTML

		setCalc({
			...calc,
			num: !calc.num.toString().includes('.') ? calc.num + value : calc.num,
		})
	}

	const signClickHandler = (e) => {
		if (e.target.innerHTML === '+' && calc.sign === '×' && calc.num === '-') {
			// case, when 2 operators typed in series
			setCalc({
				...calc,
				calcString: `${calc.res} ${e.target.innerHTML} `,
				sign: e.target.innerHTML,
				num: 0,
			})
			console.log(calc)
		} else if (e.target.innerHTML !== '-') {
			setCalc({
				...calc,
				calcString:
					calc.num && calc.res && calc.sign
						? `${calc.calcString} ${calc.num} ${e.target.innerHTML} `
						: calc.num === 0
						? `${calc.res} ${e.target.innerHTML} `
						: `${calc.num} ${e.target.innerHTML} `,
				sign: e.target.innerHTML,
				res: !calc.num
					? calc.res
					: !calc.res
					? calc.num
					: toLocaleString(
							math(
								Number(removeSpaces(calc.res)),
								Number(removeSpaces(calc.num)),
								calc.sign
							)
					  ),
				num: 0,
			})
		} else if (!calc.sign) {
			if (calc.num === 0) {
				// when you start input '-' in the begining

				setCalc({
					num: `-${calc.num}`,
					sign: e.target.innerHTML,
				})
			} else {
				setCalc({
					...calc,
					calcString:
						calc.num && calc.res && calc.sign
							? `${calc.calcString} ${calc.num} ${e.target.innerHTML} `
							: calc.num === 0
							? `${calc.res} ${e.target.innerHTML} `
							: `${calc.num} ${e.target.innerHTML} `,
					sign: e.target.innerHTML,
					res: !calc.num
						? calc.res
						: !calc.res
						? calc.num
						: toLocaleString(
								math(
									Number(removeSpaces(calc.res)),
									Number(removeSpaces(calc.num)),
									calc.sign
								)
						  ),
					num: 0,
				})
			}
		} else if (calc.sign === '×' || calc.sign === '÷') {
			if (calc.num) {
				setCalc({
					...calc,
					calcString:
						calc.num && calc.res && calc.sign
							? `${calc.calcString} ${calc.num} ${e.target.innerHTML} `
							: calc.num === 0
							? `${calc.res} ${e.target.innerHTML} `
							: `${calc.num} ${e.target.innerHTML} `,
					sign: e.target.innerHTML,
					res: !calc.num
						? calc.res
						: !calc.res
						? calc.num
						: toLocaleString(
								math(
									Number(removeSpaces(calc.res)),
									Number(removeSpaces(calc.num)),
									calc.sign
								)
						  ),
					num: 0,
				})
			} else {
				setCalc({
					...calc,

					num: '-',
				})
			}
		}
	}

	const equalsClickHandler = () => {
		if (calc.sign && calc.num) {
			setCalc({
				...calc,
				calcString: `${calc.calcString + calc.num} =`,
				res:
					calc.num === '0' && calc.sign === '÷'
						? 'Impossibru'
						: toLocaleString(
								math(
									Number(removeSpaces(calc.res)),
									Number(removeSpaces(calc.num)),
									calc.sign
								)
						  ),
				sign: '',
				num: 0,
			})
		}
	}

	const percentClickHandler = () => {
		let num = calc.num ? parseFloat(removeSpaces(calc.num)) : 0
		let res = calc.res ? parseFloat(removeSpaces(calc.res)) : 0
		setCalc({
			...calc,
			num: (num /= Math.pow(100, 1)),
			res: (res /= Math.pow(100, 1)),
			sign: '',
		})
	}

	const resetClickHandler = () => {
		setCalc({
			...calc,
			calcString: '',
			sign: '',
			num: 0,
			res: 0,
		})
	}

	const removeLastSymbol = () => {
		let deletedNum = toLocaleString(
			removeSpaces(calc.num).toString().slice(0, -1)
		)
		if (deletedNum.length > 0) {
			setCalc({
				...calc,
				num: deletedNum,
			})
		} else {
			setCalc({
				...calc,
				num: '0',
			})
		}
	}
	const invertClickHandler = () => {
		setCalc({
			...calc,
			num: calc.num ? toLocaleString(removeSpaces(calc.num) * -1) : 0,
			res: calc.res ? toLocaleString(removeSpaces(calc.res) * -1) : 0,
			sign: '',
		  });
	}

	return (
		<Wrapper>
			{/* <p style={{ position: 'fixed', top: '20px' }}>
				{' '}
				num: {calc.num} res: {calc.res} sign: {calc.sign}
			</p> */}
			<ScreenCalculation value={calc.calcString} />
			<Screen value={calc.num ? calc.num : calc.res} />

			<ButtonBox>
				{btnValues.map((btn, index) => {
					return (
						<Button
							key={btn.id}
							id={btn.id}
							className={
								btn.display === '='
									? 'equals'
									: typeof btn.display == 'number' || btn.display === '.'
									? ''
									: 'operations'
							}
							value={btn.display}
							onClick={
								btn.display === '±'
									? invertClickHandler
									: btn.display === 'AC'
									? resetClickHandler
									: btn.display === 'C'
									? removeLastSymbol
									: btn.display === '%'
									? percentClickHandler
									: btn.display === '='
									? equalsClickHandler
									: btn.display === '÷' ||
									  btn.display === '×' ||
									  btn.display === '-' ||
									  btn.display === '+'
									? signClickHandler
									: btn.display === '.'
									? comaClickHandler
									: numClickHandler
							}
						/>
					)
				})}
			</ButtonBox>
		</Wrapper>
	)
}

export default App
