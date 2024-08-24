/**
 * @autor Davi Rocha (info.rocha2@gmail.com)
 * versao: 2.2
 */
const dom_helper = (_ => {
	const vm = {}

	/**
	 * Como o atributo readonly nao fucniona para selects este metodo 
	 * altera o select de uma forma a simular este estado.
	 * Torna-se util quando deseja um selec desabilitado que ainda precisa 
	 * ter seus dados enviados em um formulario, ja que o atributo disabled
	 * impede isso.
	 */
	vm.readonly = el => {
		el.style.background = '#eee' // Simular campo inativo com a cor cinza
		el.style.pointerEvents = 'none' // Desabilita os eventos APENAS do mouse no elemento, qualquer acao tomada com o mouse sobre o elemento nao tera qualquer efeito.
		el.style.touchAction = 'none' // Desabilita as acoes do touch em aparelhos mobile, em 2021 essa eh uma tecnologia experimental e com pouca compatibilidade ainda
		el.tabIndex = -1 // o valor do input ainda pode ser alterado com o teclado. Usando o o tabindex negativo, o campo nao estara acessível pelo tab
		el.setAttribute('aria-disabled', 'true') // Por questoes de acessibilidade, informe para leitores de tela que seu campo esta desabilidado.
	}

	/**
	 * Limpa formatacao do metodo vm.readonly
	 */
	vm.clearReadonly = el => {
		el.style.background = '#fff' // voltando pra branco
		el.style.pointerEvents = '' // Desabilita os eventos APENAS do mouse no elemento, qualquer acao tomada com o mouse sobre o elemento nao tera qualquer efeito.
		el.style.touchAction = '' // Desabilita as acoes do touch em aparelhos mobile, em 2021 essa eh uma tecnologia experimental e com pouca compatibilidade ainda
		el.tabIndex = 1 // o valor do input ainda pode ser alterado com o teclado. Usando o o tabindex negativo, o campo nao estara acessível pelo tab
		el.setAttribute('aria-disabled', 'false') // Por questoes de acessibilidade, informe para leitores de tela que seu campo esta desabilidado.
	}

	/**
	 * Retorna o indice do valor passado por parametro
	 * @param el - select
	 * @param value - valor que deseja saber o indice
	 * @return int (-1 caso nao exista ou o valor numeroco do indice)
	 * @example
	 * 	<select id="select_idperiodo" class="form-control">
	 * 		<option value="1" selected>val1</option>
	 * 		<option value="2">val2</option>
	 * 	</select>
	 * const el = document.getElementById('elementId')
	 * console.log(dom_helper.indice_by_value(el,1)) // 0 
	 * console.log(dom_helper.indice_by_value(el,2)) // 1 
	 */
	vm.indice_by_value = (el, value) => [...el.options].map(obj => obj.value).indexOf(value)

	/**
	 * retorna o objeto dataset do option selected do objeto informado
	 * @example
	 * 	<select id="select_idperiodo" class="form-control">
	 * 		<option value="1" data-ex="a" selected>val1</option>
	 * 		<option value="2" data-ex="b">val2</option>
	 * 	</select>
	 * const el = document.getElementById('elementId')
	 * console.log(dom_helper.selected_data(el)) // {ex: "a"} 
	 */
	vm.selected_data = el => ({...el.options[el.selectedIndex].dataset})

	/**
	 * retorna o value do option selected do objeto informado
	 * @example
	 * 	<select id="select_idperiodo" class="form-control">
	 * 		<option value="1" selected>val1</option>
	 * 		<option value="2">val2</option>
	 * 	</select>
	 * const el = document.getElementById('elementId')
	 * console.log(dom_helper.selected_value(el)) // 1 
	 */
	vm.selected_value = el => el.options[el.selectedIndex].value

	/**
	 * retorna o value do option selected do objeto informado
	 * @example
	 * 	<select id="select_idperiodo" class="form-control">
	 * 		<option value="1" selected>val1</option>
	 * 		<option value="2">val2</option>
	 * 	</select>
	 * const el = document.getElementById('elementId')
	 * console.log(dom_helper.selected_text(el)) // val1 
	 */
	vm.selected_text = el => el.options[el.selectedIndex].text

	/**
	 * retorna o value do indice do option selected no objeto informado
	 * @example
	 * 	<select id="select_idperiodo" class="form-control">
	 * 		<option value="1" selected>val1</option>
	 * 		<option value="2">val2</option>
	 * 	</select>
	 * const el = document.getElementById('elementId')
	 * console.log(dom_helper.selected_index(el)) // 0 
	 */
	vm.selected_index = el => el.selectedIndex

	/**
	 * Altera o indice selecionado.
	 * @param el - select
	 * @param value - valor que deseja saber o indice
	 * @return undefined
	 * @example
	 * 	<select id="select_idperiodo" class="form-control">
	 * 		<option value="1" selected>val1</option>
	 * 		<option value="2">val2</option>
	 * 	</select>
	 * const el = document.getElementById('elementId') // indice selecionado eh zero
	 * dom_helper.set_selected_index(el,1) // novo indice selecionado serah 1
	 */
	vm.set_selected_index = (el, new_index) => el.selectedIndex = new_index

	/**
	 * Altera o indice selecionado para o mesmo indice do valor informado.
	 * @param el - select
	 * @param value - valor que deseja saber o indice
	 * @return undefined
	 * @example
	 * 	<select id="select_idperiodo" class="form-control">
	 * 		<option value="1" selected>val1</option>
	 * 		<option value="2">val2</option>
	 * 	</select>
	 * const el = document.getElementById('elementId') // indice selecionado eh zero
	 * dom_helper.set_selected_value(el,'2') // novo indice selecionado serah do texto 'val2'
	 */
	vm.set_selected_value = (el, value) => el.selectedIndex = vm.indice_by_value(el, value)
	
	/**
	 * Faz o download do arquivo indicado na url
	 * @example
	 * 	dom_helper.promptDownload('url_do_arquivo')
	 *
	 * @param {string} url url do arquivo que deve ser baixado.
	 */
	vm.promptDownload = url => {
		// cria um elemento link com a url informada e oculto do usuario.
		const elementDownload = document.createElement("a");
		elementDownload.setAttribute('href', url);
		elementDownload.style.display = 'none';
		// diciona o link na tela
		document.body.appendChild(elementDownload);
		// clica no link para realizar o download
		elementDownload.click();
		// remove o link da tela.
		document.body.removeChild(elementDownload);
	}

	return vm
})();
