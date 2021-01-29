
/**
* CREATES AN OBJECT THAT RETURNS FUNCTIONS WITH FORMAT FEATURES.
* CRIA UM OBJETO QUE DEVOLVE FUNCOES COM FUNCIONALIDADES DE FORMATACAO.
* @autor Davi Rocha (info.rocha2@gmail.com)
* @version 1.0
* @return Object
*/
const format_helper = (_ => {
	const vm = {}

	/**
	* [en] formats a number to Brazilian currency value.
	* [pt-BR] formata um numero para valor moeda brasileiro.
	* @param float value
	* @return String
	* @example 
	* 	console.log(format_helper.currencyPT_BR()) // R$ NaN
	* 	console.log(format_helper.currencyPT_BR('')) // R$ 0,00
	* 	console.log(format_helper.currencyPT_BR(0)) // R$ 0,00
	* 	console.log(format_helper.currencyPT_BR('0')) // R$ 0,00
	* 	console.log(format_helper.currencyPT_BR(126215.26)) // R$ 126.215,26
	* 	console.log(format_helper.currencyPT_BR('126215.26')) // R$ 126.215,26
	*	OBS: NAO USE VIRGULA
	* 	console.log(format_helper.currencyPT_BR('ABC')) // R$ NaN
	* 	console.log(format_helper.currencyPT_BR('126215,26')) // R$ NaN
	* 	console.log(format_helper.currencyPT_BR(126215,26)) // R$ 126.215,00
	*/
	vm.currencyPT_BR = value => {
		return Intl.NumberFormat("pt-br", {currency: "BRL", style: "currency"}).format(value)
	}

	return vm
})();