/**
* CREATE AN OBJECT THAT RETURNS FUNCTIONS WITH URL INFORMATION AND FUNCTIONS TO USE THE WINDOWS OBJECT.
* CRIA UM OBJETO QUE DEVOLVE FUNCOES COM INFORMACOES SOBRE A URL E FUNCOES PARA UTILIZAR O OBJETO WINDOWS.
* @autor Davi Rocha (info.rocha2@gmail.com)
* @return Object
*/
let url_helper = (_ => {
	const vm = {}
	let getUrl = window.location;

	// ex: 'https://domain.com/'
	vm.baseurl = _ => getUrl.protocol + "//" + getUrl.host + "/"
	// ex: 'subdomain'
	vm.subdomain = _ => getUrl.pathname.split('/')[1]
	// ex: 'https://domain.com/subdomain/'
	vm.baseurlWithSubdomain = _ => vm.baseurl()+vm.subdomain()+"/"

	return vm
})();
/*
console.log('url_helper.baseurl()', url_helper.baseurl())
console.log('url_helper.subdomain()', url_helper.subdomain())
console.log('url_helper.baseurlWithSubdomain()', url_helper.baseurlWithSubdomain())
*/
