const date_helper = require('./date_helper.testable.js')

describe("date_helper", () => {
	it('isDateBeforeToday deve retornar TRUE se a data eh menor que o dia atual', () => {
		const date = new Date('1982-11-25')
		expect(date_helper.isDateBeforeToday(date)).toBeTruthy()
	})

	it('isDateBeforeToday deve retornar FALSE se a data eh maior que o dia atual', () => {
		const date = new Date('3982-11-25')
		expect(date_helper.isDateBeforeToday(date)).toBeFalsy()
	})

	it('isDateBeforeToday deve retornar FALSE se a data eh igual ao dia atual', () => {
		const date = new Date()
		expect(date_helper.isDateBeforeToday(date)).toBeFalsy()
	})

	it('turnsDateBRIntoEn deve retornar a data 25/11/1982 no formato 1982-11-25', () => {
		expect(date_helper.turnsDateBRIntoEn('25/11/1982')).toBe('1982-11-25')
	})

	it('turnsDateEnIntoBr deve retornar a data 1982-11-25 no formato 25/11/1982', () => {
		expect(date_helper.turnsDateEnIntoBr('1982-11-25')).toBe('25/11/1982')
	})

	// it('turnsDataObjectIntoString deve retornar um objeto Date como string no formato YYYY-mm-dd', () => {
	// 	const date = new Date('1982-11-25')
	// 	const dateExpected = date_helper.turnsDataObjectIntoString({dateObject: date})
	// 	expect(dateExpected).toEqual('1982-11-25')
	// })
	// it('turnsDataObjectIntoString deve retornar um objeto Date como string no formato dd-mm-YYYY', () => {
	// 	const date = new Date('2020-03-25')
	// 	const dateExpected = date_helper.turnsDataObjectIntoString({dateObject: date, outputFormat: 'dd/mm/YYYY'})
	// 	expect(dateExpected).toEqual('25-03-2020')
	// })


	// it('turnsStringIntoDataObject deve retornar a data 1982-11-25 como um objeto Date sem informar inputFormat', () => {
	// 	const date = new Date('1982-11-25').toDateString()
	// 	const dateExpected = date_helper.turnsStringIntoDataObject({dateString: '1982-11-25'}).toDateString()
	// 	expect(dateExpected).toEqual(date)
	// })
	// it('turnsStringIntoDataObject deve retornar a data 1982-11-25 como um objeto Date informando inputFormat YYYY-mm-dd', () => {
	// 	const date = new Date('1982-11-25').toDateString()
	// 	const dateExpected = date_helper.turnsStringIntoDataObject({dateString: '1982-11-25', inputFormat: 'YYYY-mm-dd'}).toDateString()
	// 	expect(dateExpected).toEqual(date)
	// })
	// it('turnsStringIntoDataObject deve retornar a data 25/11/1982 como um objeto Date informando inputFormat dd/mm/YYYY', () => {
	// 	const date = new Date('1982-11-25')
	// 	expect(date_helper.turnsStringIntoDataObject({dateString: '25/11/1982', inputFormat: 'dd/mm/YYYY'})).toEqual(date)
	// })
})