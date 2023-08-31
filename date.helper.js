/**
 * CREATES AN OBJECT THAT RETURNS FUNCTIONS WITH DATE FEATURES.
 * CRIA UM OBJETO QUE DEVOLVE FUNCOES COM FUNCIONALIDADES SOBRE DATAS.
 * @autor Davi Rocha (info.rocha2@gmail.com)
 * @version 2.1
 * @return Object
 */
const date_helper = (_ => {
	const vm = {}
	const IMMUTABLE_VALUES = {
		MILLISECONDS_OF_ONE_DAY: 86400000, // (24*60*60*1000)
		MILLISECONDS_OF_ONE_HOUR: 3600000, // (60*60*1000)
		MILLISECONDS_OF_ONE_MINUTES: 60000, // (60*1000)
		MILLISECONDS_OF_ONE_SECONDS: 1000, // 1000
	}

	/**
	 * [en] Checks if the year is a leap year.
	 * [pt-BR] verifica se o ano eh bissexto.
	 * @param Date dateObject - object Date
	 * @return Boolean
	 * @example 
	 * 	console.log(date_helper.isLeapYear(new Date("1982-11-25"))) // false
	 * 	console.log(date_helper.isLeapYear(new Date("2008-11-25"))) // true
	 */
	vm.isLeapYear = dateObject => {
		const year = dateObject.getFullYear()
		return (year%4==0 && year%100!=0) || year%400==0
	}

	/**
	 * [en] Checks if the day is a weekend day (Sat or Sun).
	 * [pt-BR] verifica se o dia esta no fim de semana (sabado ou domingo).
	 * @param Date dateObject - object Date
	 * @return Boolean
	 * @example 
	 * 	console.log(date_helper.isWeekend(new Date("2020-11-07"))) // true
	 * 	console.log(date_helper.isWeekend(new Date("2020-11-01"))) // true
	 * 	console.log(date_helper.isWeekend(new Date("2020-11-02"))) // false
	 */
	vm.isWeekend = dateObject => {
		const day = dateObject.getDay()
		return day == 0 || day == 6
	}

	/**
	 * [en] Check if the day is a day of the week (Mon-Fri).
	 * [pt-BR] verifica se o dia esta na semana (ssegunda a sexta).
	 * @param Date dateObject - object Date
	 * @return Boolean
	 * @example 
	 * 	console.log(date_helper.isWeekDay(new Date("2020-11-07"))) // false
	 * 	console.log(date_helper.isWeekDay(new Date("2020-11-01"))) // false
	 * 	console.log(date_helper.isWeekDay(new Date("2020-11-02"))) // true
	 */
	vm.isWeekDay = dateObject => {
		return !vm.isWeekend(dateObject)
	}

	/**
	 * [en] Gets the number of days in the month.
	 * [pt-BR] retorna a quantidade de dias do mes.
	 * @param Date dateObject - object Date
	 * @return Boolean
	 * @example 
	 * 	console.log(date_helper.getDaysInMonth(new Date("2008-02-01"))) // false
	 * 	console.log(date_helper.getDaysInMonth(new Date("2020-02-01"))) // false
	 * 	console.log(date_helper.getDaysInMonth(new Date("2020-01-01"))) // true
	 */
	vm.getDaysInMonth = dateObject => {
		const month = dateObject.getMonth()
		const quantityDays = [31,(vm.isLeapYear(dateObject) ? 29:28),31,30,31,30,31,31,30,31,30,31]

		return quantityDays[month]
	}

	/*
	 * [en] Add a number of years to the date object
	 * [pt-BR] Adiciona um numero de anos em um objeto de data
	 * @param Date date - object Date
	 * @param int years 
	 * @return Date
	 * @example console.log(date_helper.addYears(new Date(), 5)) // current date added 5 years
	 */
	vm.addYears = (date, years) => {
		date.setFullYear(date.getFullYear() + years)
		return date
	}

	/*
	 * [en] Add a number of months to the date object
	 * [pt-BR] Adiciona um numero de meses em um objeto de data
	 * @param Date date - object Date
	 * @param int months 
	 * @return Date
	 * @example console.log(date_helper.addMonths(new Date(), 5)) // current date added 5 months
	 */
	vm.addMonths = (date, months) => {
		const temp = date.getDate();
		
		date.setMonth(date.getMonth() + months);
		
		if (temp > date.getDate())
			date.addDays(-date.getDate());
		
		return date;
	}

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
	 * [en] Add a number of hours to the date object
	 * [pt-BR] Adiciona um numero de horas em um objeto de data
	 * @param Date date - object Date
	 * @param int hours 
	 * @return Date
	 * @example console.log(date_helper.addHours(new Date(), 5)) // current date added 5 hours
	 */
	vm.addHours = (date, hours) => {
		date.setHours(date.getHours() + hours)
		return date
	}

	/**
	 * [en] Transforms a date string in the format YYYY-mm-dd to dd/mm/YYYY
	 * [pt-BR] Transforma uma string de data no formato YYYY-mm-dd para dd/mm/YYYY
	 * @param String dateString
	 * @return string
	 * @example console.log(date_helper.turnsDateBRIntoEn('1982-11-25')) // 25/11/1982 
	 * @example console.log(date_helper.turnsDateBRIntoEn('1982-11-25 12:20:56')) // 25/11/1982 12:20:56 
	 */
	vm.turnsDateEnIntoBr = (dateString, only_date = false) => {
		let parts = dateString.split(' ')
		let dt = parts[0].split('-').reverse().join('/')
		let hours = '' 
		if(!only_date) hours = parts[1] || '' 
		return `${dt} ${hours}`.trim()
	}

	/**
	 * [en] Checks whether a date is valid
	 * [pt-BR] Verifica se uma data eh valida
	 * @param object
	 *	keys:
	 *		required Date object dateObject
	 *		String inputFormat - valid formats: 'YYYY-mm-dd' [default], 'dd/mm/YYYY', 'dd/mm/YYYY HH:ii:ss', 'YYYY-mm-dd HH:ii:ss'
	 * date_helper.isValidDateString({dateString: '25/11/198', inputFormat: 'dd/mm/YYYY'}) // false
	 * date_helper.isValidDateString({dateString: '', inputFormat: 'dd/mm/YYYY'}) // false
	 * date_helper.isValidDateString({dateString: '25/11/1982', inputFormat: 'dd/mm/YYYY'}) // true
	 * date_helper.isValidDateString({dateString: '1982-11-25', inputFormat: 'YYYY-mm-dd'}) // true
	 * date_helper.isValidDateString({dateString: '1982-11-25 12:00:00', inputFormat: 'YYYY-mm-dd HH:ii:ss'}) // true
	 */
	vm.isValidDateString = data => {
		let dt = ''
		const dateString = data.dateString
		const inputFormat = data.inputFormat
		switch(inputFormat) {
			case 'YYYY-mm-dd HH:ii:ss':
				const temp = dateString.split(' ')
				dt = temp[0]
				break
			case 'YYYY-mm-dd':
				dt = dateString
				break
			case 'dd/mm/YYYY':
				dt = vm.turnsDateBRIntoEn(dateString)
				break
		}
		if(dt.length != 10) return false

		const date_object = vm.turnsStringIntoDataObject({dateString: dt})

		return vm.isValidDateObject(date_object)
	}

	vm.isValidDateObject = date_object => {
		return (date_object != 'Invalid Date')
		//return date_object instanceof Date && !isNaN(date_object)
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
	 *		String inputFormat - valid formats: 'YYYY-mm-dd' [default], 'dd/mm/YYYY', 'dd/mm/YYYY HH:ii:ss', 'YYYY-mm-dd HH:ii:ss'
	 * @return String
	 * @example
	 *	date_helper.turnsDataObjectIntoString({dateObject: new Date(), outputFormat: 'dd/mm/YYYY HH:ii:ss'})
	 *	date_helper.turnsDataObjectIntoString({dateObject: new Date(), outputFormat: 'dd/mm/YYYY'})
	 *	date_helper.turnsDataObjectIntoString({dateObject: new Date()})
	 */
	vm.turnsDataObjectIntoString = data => {
		let outputFormat = data && data.outputFormat ? data.outputFormat : 'YYYY-mm-dd' 
		let date = data.dateObject
		let day  = date.getDate().toString()
		let month = (date.getMonth()+1).toString() //+1 in getMonth init zero.
		let year = date.getFullYear()
		let hours = date.getHours()
		let minutes = date.getMinutes()
		let seconds = date.getSeconds()

		// adjust
		day = (day.length == 1) ? `0${day}` : day
		month = (month.length == 1) ? `0${month}` : month
		hours = (hours.length == 1) ? `0${hours}` : hours
		minutes = (minutes.length == 1) ? `0${minutes}` : minutes
		seconds = (seconds.length == 1) ? `0${seconds}` : seconds

		if(outputFormat == 'YYYY-mm-dd') return `${year}-${month}-${day}`;
		if(outputFormat == 'YYYY-mm-dd HH:ii:ss') return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
		if(outputFormat == 'dd/mm/YYYY') return `${day}/${month}/${year}`;
		if(outputFormat == 'dd/mm/YYYY HH:ii:ss') return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;

		throw "[date_helper] turnsDataObjectIntoString - unknown format"
	}

	/**
	 * [en] Turns String into Data object
	 * [pt-BR] Transforma uma string em um objeto Data
	 * @param object
	 *	keys:
	 *		required String dateString
	 *		String inputFormat - valid formats: 'YYYY-mm-dd' [default], 'dd/mm/YYYY'
	 * @return Date
	 * @example
	 *	date_helper.turnsStringIntoDataObject({dateString: '25/11/1982', inputFormat: 'dd/mm/YYYY'})
	 *	date_helper.turnsStringIntoDataObject({dateString: '1982-25-11 00:00:00', inputFormat: 'YYYY-mm-dd HH:ii:ss'})
	 *	date_helper.turnsStringIntoDataObject({dateString: '1982-25-11'})
	 */
	vm.turnsStringIntoDataObject = data => {
		if(!data || (data && !data.dateString)) throw '[date_helper] turnsStringIntoDataObject - date is required' 
		let dateString = data.dateString
		let inputFormat = data && data.inputFormat ? data.inputFormat : 'YYYY-mm-dd' 
		let dt
		switch(inputFormat) {
			case 'YYYY-mm-dd HH:ii:ss':
				const temp = dateString.split(' ')
				dt = temp[0]
				break
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

	/**
	 * [en] compares two dates. DO NOT USE WITH DATE/TIME.
	 * [pt-BR] compara duas datas. NÃO USAR COM DATA/HORA.
	 * @param Date date1
	 * @param Date date2
	 * @return integer - IN MILLISECONDS
	 * @example
	 * 	const a = new Date('2020-11-01')
	 * 	const b = new Date('2020-11-01')
	 * 	const c = new Date('2020-11-02')
	 * 	date_helper.compareDates(a,b) // 0 ZERO
	 * 	date_helper.compareDates(a,c) // -86400000
	 * 	date_helper.compareDates(b,c) // -86400000
	 * 	date_helper.compareDates(c,b) // 86400000
	 * 	date_helper.compareDates(c,a) // 86400000
	 */
	vm.compareDates = (date1, date2) => {
		if (date1 == 'Invalid Date') throw '[date_helper] compareDates - Invalid Date date1'
		if (date2 == 'Invalid Date') throw '[date_helper] compareDates - Invalid Date date2'
		return new Date(date1.toDateString()) - new Date(date2.toDateString())
	}

	/**
	 * [en] Returns today's date string in the desired format
	 * [pt-BR] Retorna a string da data de hoje no formato desejado
	 * @param object
	 * 	keys:
	 * 		outputFormat - 'YYYY-mm-dd' [default], 'dd/mm/YYYY'
	 * @return string
	 *
	 * @example
	 * 	date_helper.today({outputFormat:'dd/mm/YYYY'}) // 25/11/1982
	 * 	date_helper.today({outputFormat:'YYYY-mm-dd'}) // 1982-11-25
	 * 	date_helper.today() // 1982-11-25
	 */
	vm.today = data => {
		let outputFormat = data && data.outputFormat ? data.outputFormat : 'YYYY-mm-dd' 

		try {
			return vm.turnsDataObjectIntoString({dateObject: new Date(), outputFormat: outputFormat})
		} catch(err) {
			throw "[date_helper] today - unknown format"
		}
	}

	/**
	 * [en] Calculates how many days are equivalent to milliseconds.
	 * [pt-BR] Calcula quantos dias sao equivalentes aos milesegundos.
	 *
	 * @example console.log(date_helper.millisecondsAsDays(86400000)) // 1 dia 
	 *
	 * @return int
	 */
	vm.millisecondsAsDays = milliseconds => Math.floor(milliseconds / IMMUTABLE_VALUES.MILLISECONDS_OF_ONE_DAY)  //(24*60*60*1000)

	/**
	 * [en] Calculates how many hours are equivalent to milliseconds.
	 * [pt-BR] Calcula quantas horas sao equivalentes aos milesegundos.
	 *
	 * @example console.log(date_helper.millisecondsAsHours(86400000)) // 24 hours [1 day]
	 *
	 * @return int
	 */
	vm.millisecondsAsHours = milliseconds => Math.floor(milliseconds / IMMUTABLE_VALUES.MILLISECONDS_OF_ONE_HOUR ) // (60*60*1000)

	/**
	 * [en] Calculates how many minutes are equivalent to milliseconds.
	 * [pt-BR] Calcula quantos minutos sao equivalentes aos milesegundos.
	 *
	 * @example console.log(date_helper.millisecondsAsMinutes(86400000)) // 1440 minutes [1 day]
	 * @example console.log(date_helper.millisecondsAsMinutes(360000)) // 60 minutes [1 hour]
	 * @example console.log(date_helper.millisecondsAsMinutes(60000)) // 1 minutes
	 * 
	 * @return int
	 */
	vm.millisecondsAsMinutes = milliseconds => Math.floor(milliseconds / IMMUTABLE_VALUES.MILLISECONDS_OF_ONE_MINUTES ) //(60*1000)

	/**
	 * [en] Calculates how many seconds are equivalent to milliseconds.
	 * [pt-BR] Calcula quantos segundos sao equivalentes aos milesegundos.
	 *
	 * @example console.log(date_helper.millisecondsAsSeconds(86400000)) // 86400 seconds [1 day]
	 * @example console.log(date_helper.millisecondsAsSeconds(1000)) // 1 second
	 *
	 * @return int
	 */
	vm.millisecondsAsSeconds = milliseconds => Math.floor(milliseconds / IMMUTABLE_VALUES.MILLISECONDS_OF_ONE_SECONDS) //1000

	/**
	 * [en] Calculates the difference between 2 dates in a human format.
	 * [pt-BR] Calcula a diferença entre 2 datas em um formato humano.
	 *
	 * @example
	 *		const dth1 = new Date('1982-11-25 12:00:15')
	 *		const dth2 = new Date('1982-11-27 13:30:16')
	 *		const ms = date_helper.compareDates(dth1,dth2)
	 *		const result = date_helper.millisecondsAsHumanReadDate(ms)
	 *		console.log(result) // Object { days: 2, hours: 0, minutes: 0, seconds: 0, text: "2 dias, 0h, 0m, 0s" }
	 *
	 * @return object
	 */
	vm.millisecondsAsHumanReadDate = milliseconds => {
		const days = vm.millisecondsAsDays(milliseconds)
		const daysMsDiff = milliseconds % IMMUTABLE_VALUES.MILLISECONDS_OF_ONE_DAY //(24*60*60*1000) // 86400000
		const hours = vm.millisecondsAsHours(daysMsDiff)
		const hoursMsDiff = milliseconds % IMMUTABLE_VALUES.MILLISECONDS_OF_ONE_HOUR //(60*60*1000) // 3600000
		const minutes = vm.millisecondsAsMinutes(hoursMsDiff)
		const minutesMsDiff = milliseconds % IMMUTABLE_VALUES.MILLISECONDS_OF_ONE_MINUTES //(60*1000) // 60000
		const seconds = vm.millisecondsAsSeconds(minutesMsDiff)
		// console.log('daysMsDiff',daysMsDiff)
		// console.log('hours',hours)
		// console.log('hoursMsDiff',hoursMsDiff)
		// console.log('minutes',minutes)
		// console.log('minutesMsDiff',minutesMsDiff)
		// console.log('seconds',seconds)

		return {
			days,
			hours,
			minutes,
			seconds,
			text: `${days} dias, ${hours}h, ${minutes}m, ${seconds}s`

		} 
	}

	/**
	 * [en] Takes 2 dates and returns an array with all the dates between them including themselves.
	 * [pt-BR] Pega 2 datas e retorna um array com todas as datas entre elas incluindo elas mesmas.
	 *
	 * @example
	 *		const dt1_en_obj = new Date('1982-11-25')
	 *		const dt2_en_obj = new Date('1982-11-27')
	 *		const array_obj = date_helper.getDatesBetween(dt1_en_obj,dt2_en_obj)
	 *		const array_ptbr_str = array_obj.map(d => date_helper.turnsDataObjectIntoString({dateObject: d, outputFormat: 'dd/mm/YYYY'}))
	 *		const array_en_str = array_obj.map(d => date_helper.turnsDataObjectIntoString({dateObject: d}))
	 *		console.log(array_ptbr_str) // ['25/11/1982', '26/11/1982','27/11/1982']
	 *		console.log(array_en_str) // ['1982-11-25', '1982-11-26','1982-11-27']
	 *
	 * @return array
	 */
	vm.getDatesBetween = (startDate, endDate) => {
		const dates = [];
		let currentDate = startDate;

		while (currentDate <= endDate) {
			dates.push(currentDate);
			currentDate = vm.addDays(currentDate, 1)
		}

		return dates;
	}

	return vm
})();
