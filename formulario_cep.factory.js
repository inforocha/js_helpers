/**
* Essa factoy utiliza o webservice da viacep(https://viacep.com.br)
*
* @example
* 	// importe o javascript fomulario_cep.factory.js
*	// carregando a fabrica e passando os inputs para ela. Isso pode ser feito para vários conjuntos de inputs, ou seja, podem ter varios formularios diferentes com seus proprios ceps e inputs.
* 	const formulario_cep = form_cep_fct.factory({
*		input_cep: document.getElementById('input_cep'),
*		input_logradouro: document.getElementById('input_logradouro'),
*		input_complemento: document.getElementById('input_complemento'),
*		input_bairro: document.getElementById('input_bairro'),
*		input_numero: document.getElementById('input_numero'),
*		input_cidade: document.getElementById('input_cidade'),
*		input_uf: document.getElementById('input_uf'),
*	})
*	formulario_cep.init() // aqui seta o evento e guarda os inputs
*/
const form_cep_fct = (_ => {
	const vm = {}

	vm.factory = config => {
		const obj = new GenerateFormularioCep(config)
		return obj
	}

	/**
	* gera um objeto com os seguintes metodos publicos: init
	*/
	function GenerateFormularioCep(config) {
		const vm_el = {}
		const _CONFIG = {
		}

		// inicializa a fabrica
		vm_el.init = _ => {
			_CONFIG.input_endereco_logradouro = config.input_logradouro || {value: ''} // o objeto eh para casos de erro na passagem de parametros
			_CONFIG.input_endereco_complemento = config.input_complemento || {value: ''} // o objeto eh para casos de erro na passagem de parametros
			_CONFIG.input_endereco_bairro = config.input_bairro || {value: ''} // o objeto eh para casos de erro na passagem de parametros
			_CONFIG.input_endereco_numero = config.input_numero || {value: ''} // o objeto eh para casos de erro na passagem de parametros
			_CONFIG.input_endereco_cidade = config.input_cidade || {value: ''} // o objeto eh para casos de erro na passagem de parametros
			_CONFIG.input_endereco_uf_id = config.input_uf || {options: [], selectedIndex: 0} // o objeto eh para casos de erro na passagem de parametros

			// adicionando um evento para ouvir quando o usuario retirar o cursor do input de cep
			if(config.input_cep) {
				config.input_cep.addEventListener('blur', _pesquisar_cep)
				_CONFIG.input_cep = config.input_cep
			} else {
				_CONFIG.input_cep = {value: ''} // o objeto eh para casos de erro na passagem de parametros
			}
		}

		/**
		* Limpa valores do formulario de cep.
		*/
		function _limpa_formulário_cep() {
			_CONFIG.input_endereco_logradouro.value = ''
			_CONFIG.input_endereco_complemento.value = ''
			_CONFIG.input_endereco_bairro.value = ''
			_CONFIG.input_endereco_numero.value = ''
			_CONFIG.input_endereco_cidade.value = ''
			_CONFIG.input_endereco_uf_id.selectedIndex = 0
		}

		/**
		* Atualiza os campos com os valores.
		*/
		function _popular_formulario_cep(conteudo) {
			const options = [..._CONFIG.input_endereco_uf_id.options]

			_CONFIG.input_endereco_logradouro.value = conteudo.logradouro
			_CONFIG.input_endereco_bairro.value = conteudo.bairro
			_CONFIG.input_endereco_complemento.value = conteudo.complemento
			_CONFIG.input_endereco_cidade.value = conteudo.localidade

			_CONFIG.input_endereco_uf_id.selectedIndex = 0
			options.forEach((opt, index) => {
				if(opt.text == conteudo.uf) {
					_CONFIG.input_endereco_uf_id.selectedIndex = index
				}
			})
		}

		async function _pesquisar_cep(e) {
			const el = e.target
			const valor = el.value
			const cep = `${valor}`.replace(/\D/g, '') // deixando somente digitos.
			const validacep = /^[0-9]{8}$/ // Expressao regular para validar o CEP.

			if (cep == "") {
				// campo cep sem valor informado.
				_limpa_formulário_cep();
				return
			}

			if(!validacep.test(cep)) {
				// formato do CEP invalido.
				_limpa_formulário_cep();
				alert("Formato de CEP inválido.");
				return
			}

			const dados = await fetch(`https://viacep.com.br/ws/${cep}/json/`)
				.then(response => response.json())

			if ("erro" in dados) {
				//CEP nao Encontrado.
				_limpa_formulário_cep();
				alert("CEP não encontrado.");
				return
			}

			_popular_formulario_cep(dados)
		}

		return vm_el
	}

    return vm
})();