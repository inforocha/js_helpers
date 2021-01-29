/**
* CREATE AN OBJECT THAT RETURNS FUNCTIONS WITH URL INFORMATION AND FUNCTIONS TO USE THE WINDOWS OBJECT.
* CRIA UM OBJETO QUE DEVOLVE FUNCOES COM INFORMACOES SOBRE A URL E FUNCOES PARA UTILIZAR O OBJETO WINDOWS.
* @autor Davi Rocha (info.rocha2@gmail.com)
* @return Object
*/
let url_helper = (_ => {
	const vm = {}
	let getUrl = window.location;

	/**
	* retorna a url o dominio.
	* @example
	* console.log(url_helper.baseurl()) // 'https://domain.com/' 
	*/
	vm.baseurl = _ => getUrl.protocol + "//" + getUrl.host + "/"

	/**
	* retorna o subdominio da url.
	* @example // 'https://domain.com/subdomain/' 
	* console.log(url_helper.subdomain()) // 'subdomain'
	*/
	vm.subdomain = _ => getUrl.pathname.split('/')[1]

	/**
	* retorna a url com o subdominio.
	* @example
	* console.log(url_helper.baseurlWithSubdomain()) // 'https://domain.com/subdomain/'
	*/
	vm.baseurlWithSubdomain = _ => vm.baseurl()+vm.subdomain()+"/"

	/**
	* retira da url o dominio e separa o restante das / em um array para poder retonar uma posicao especifica.
	* @example
	* // 'https://domain.com/teste/a/2'
	* console.log(url_helper.segment(0)) // teste 
	* console.log(url_helper.segment(1)) // a
	* console.log(url_helper.segment(2)) // 2
	*/
	vm.segment = position => {
		const base = vm.baseurl()
		const segments = getUrl.href.replace(base,'').split('/')
		return segments[position] || ''
	}

	return vm
})();