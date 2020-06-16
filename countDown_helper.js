/**
* [en] date-based countdown timer
* [pt] contador regressivo baseado em data
* autor: info.rocha2@gmail.com
*
* window.addEventListener('event_clock_test', function(e) {console.log(e)})
* window.addEventListener('event_five_minutes_test', function(e) {console.log(e)})
* window.addEventListener('event_finished_test', function(e) {console.log(e)})
* countDown_helper.init({
* 	dthMax: '2020-06-16 12:31:00',
*  	dthMin: '2020-06-16 12:25:00',
* 	sufixo: 'test',
* })
*/
let countDown_helper = (_ => {
	let vm = {}
	var dts = {dateHourMax: null, dateHourMin: null, dateHourVariable: null}
	let _SUFIXO = 'countDown_helper'
	vm.init = config => {
		_setDateHourMax(config.dthMax)
		_setDateHourMin(config.dthMin)
		_initinterval(dts)
		if (config.sufixo && typeof config.sufixo != 'undefined') {
			_SUFIXO = config.sufixo
		}
	}

	// [en] informs the date the accountant will start
	// [pt] informa a data que o contador ira iniciar
	function _setDateHourMax(dth) {
		dts.dateHourMax = new Date(dth)
		dts.dateHourVariable = new Date(dth).getTime()
	}

	// [en] informs the date that the accountant will finish
	// [pt] informa a data que o contador ira finalizar
	function _setDateHourMin(dth) {
		dts.dateHourMin = new Date(dth)
	}

	// [en] Update the count down every 1 second
	// [pt] atualiza o contador a cada 1 segundo
	function _initinterval(dts) {
		let x = setInterval(_ => {
			// Find the distance between now and the count down date
			var distance = dts.dateHourVariable - dts.dateHourMin.getTime()
			dts.dateHourVariable = dts.dateHourVariable-1000 // reduz 1 segundo do valor a cada loop 

			// Time calculations for days, hours, minutes and seconds
			// var days = Math.floor(distance / (1000 * 60 * 60 * 24)); // caso um dia queira adicionar dias
			let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
			if(hours<10) hours = `0${hours}`
			let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
			if(minutes<10) minutes = `0${minutes}`
			let seconds = Math.floor((distance % (1000 * 60)) / 1000);
			if(seconds<10) seconds = `0${seconds}`

			let detail = `${hours}:${minutes}:${seconds}`
			// criando evento com o relogio
			let event_clock = new CustomEvent(`event_clock_${_SUFIXO}`, {'detail': detail})
			// disparando o evento
			window.dispatchEvent(event_clock)

			if (hours == 0 && minutes <= 5 && seconds==0) {
				// criando evento informando o fim da contagem do relogio
				let event_five_minutes = new Event(`event_five_minutes_${_SUFIXO}`)
				// disparando o evento
				window.dispatchEvent(event_five_minutes)
			}
			// If the count down is finished, write some text
			if (distance < 0) {
				clearInterval(x);
				// criando evento informando o fim da contagem do relogio
				let event_finished = new Event(`event_finished_${_SUFIXO}`)
				// disparando o evento
				window.dispatchEvent(event_finished) 
			}
		}, 1000);
	}

	return vm
})();
