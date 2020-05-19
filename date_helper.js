/**
* CREATES AN OBJECT THAT RETURNS FUNCTIONS WITH DATE FEATURES.
* CRIA UM OBJETO QUE DEVOLVE FUNCOES COM FUNCIONALIDADES SOBRE DATAS.
* @autor Davi Rocha (info.rocha2@gmail.com)
* @return Object
*/
var date_helper = (_ => {
	const vm = {}

	/*
	* [en] returns the date resulting from the sum of a number of days on a specified date
	* [pt-BR] retorna a data resultante da soma de uma quantidade de dias em uma data especificada
	* @param Date date - object Date
	* @param int days 
	* @return Date
	* @example console.log(date_helper.addDays(new Date(), 5)) // current date added 5 days
	*/
	vm.addDays = (date, days) => {
		const copy = new Date(Number(date))
		copy.setDate(date.getDate() + days)
		return copy
	}

	/*
	* [en] Transforms a date string in the format YYYY-mm-dd to dd/mm/YYYY
	* [pt-BR] Transforma uma string de data no formato YYYY-mm-dd para dd/mm/YYYY
	* @param String dateString
	* @return string
	* @example console.log(date_helper.turnsDateBRIntoEn('1982-11-25')) // 25/11/1982 
	* @example console.log(date_helper.turnsDateBRIntoEn('1982-11-25 12:20:56')) // 25/11/1982 12:20:56 
	*/
	vm.turnsDateEnIntoBr = dateString => {
		let parts = dateString.split(' ')
		let dt = parts[0].split('-').reverse().join('/')
		let hours = parts[1] || '' 
		return `${dt} ${hours}`
	}

	/*
	* [en] Transforms a date string in the format dd/mm/YYYY to YYYY-mm-dd
	* [pt-BR] Transforma uma string de data no formato dd/mm/YYYY para YYYY-mm-dd
	* @param String dateString
	* @return string
	* @example console.log(date_helper.turnsDateBRIntoEn('25/11/1982')) // 1982-11-25 
	*/
	vm.turnsDateBRIntoEn = dateString => dateString.split('/').reverse().join('-')

	/**
	* [en] Turns Date object into String
	* [pt-BR] Transforma um um objeto Data em uma string
	* @param object
	*	keys:
	*		required Date object dateObject
	*		String inputFormat - valid formats: 'YYYY-mm-dd' [default], 'dd/mm/YYYY'
	* @return String
	* @example
	*	date_helper.turnsDataObjectIntoString({dateObject: new Date(), outputFormat: 'dd/mm/YYYY'})
	*	date_helper.turnsDataObjectIntoString({dateObject: new Date()})
	*/
	vm.turnsDataObjectIntoString = data => {
		let outputFormat = data && data.outputFormat ? data.outputFormat : 'YYYY-mm-dd' 
		let date = data.dateObject
		let day  = date.getDate().toString()
		let month = (date.getMonth()+1).toString() //+1 in getMonth init zero.
		let year = date.getFullYear()

		// adjust
		day = (day.length == 1) ? `0${day}` : day
		month = (month.length == 1) ? `0${month}` : month

		if(outputFormat == 'YYYY-mm-dd') return `${year}-${month}-${day}`;
		if(outputFormat == 'dd/mm/YYYY') return `${day}/${month}/${year}`;

		throw "[date_helper] turnsDataObjectIntoString - unknown format"
	}

	/**
	* [en] Turns String into Date object
	* [pt-BR] Transforma uma string em um objeto Data
	* @param object
	*	keys:
	*		required String dateString
	*		String inputFormat - valid formats: 'YYYY-mm-dd' [default], 'dd/mm/YYYY'
	* @return Date
	* @example
	*	date_helper.turnsStringIntoDataObject({dateString: '25/11/1982', inputFormat: 'dd/mm/YYYY'})
	*	date_helper.turnsStringIntoDataObject({dateString: '1982-25-11'})
	*/
	vm.turnsStringIntoDataObject = data => {
		if(!data || (data && !data.dateString)) throw '[date_helper] turnsStringIntoDataObject - date is required' 
		let dateString = data.dateString
		let inputFormat = data && data.inputFormat ? data.inputFormat : 'YYYY-mm-dd' 
		let dt
		switch(inputFormat) {
			case 'YYYY-mm-dd':
				dt = dateString
				break
			case 'dd/mm/YYYY':
				dt = vm.turnsDateBRIntoEn(dateString)
				break
		}

		dt = dt.split('-')
		return new Date(dt[0], (dt[1]-1), dt[2]) // month init zero.
	}

	/**
	* [en] Is date before today
	* [pt-BR] A data é anterior a data de hoje 
	* @param Date date
	* @return boolean
	*/
	vm.isDateBeforeToday = date => {
		if (date == 'Invalid Date') throw '[date_helper] isDateBeforeToday - Invalid Date'
		return new Date(date.toDateString()) < new Date(new Date().toDateString())
	}

	/*
	* @todo usar a funcao turnsDataObjectIntoString no lugar do codigo similar nesta funcao
	*
	* [en] Returns today's date string in the desired format
	* [pt-BR] Retorna a string da data de hoje no formato desejado
	* @param object
	* 	keys:
	* 		outputFormat - 'YYYY-mm-dd' [default], 'dd/mm/YYYY'
	* @param String format
	*/
	vm.today = data => {
		let outputFormat = data && data.outputFormat ? data.outputFormat : 'YYYY-mm-dd' 
		// let date = new Date()
		// let day  = date.getDate().toString()
		// let month = (date.getMonth()+1).toString() //+1 in getMonth init zero.
		// let year = date.getFullYear()

		// // adjust
		// day = (day.length == 1) ? `0${day}` : day
		// month = (month.length == 1) ? `0${month}` : month

		// if(outputFormat == 'YYYY-mm-dd') return `${year}-${month}-${day}`;
		// if(outputFormat == 'dd/mm/YYYY') return `${day}/${month}/${year}`;
		try {
			return vm.turnsDataObjectIntoString({dateObject: new Date(), outputFormat: outputFormat})
		} catch(err) {
			throw "[date_helper] today - unknown format"
		}
	}

	return vm
})();
