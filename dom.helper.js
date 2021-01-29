let dom_helper = (_ => {
	const vm = {}

	/**
	* retorna o value do option selected do objeto informado
	* @example
	* 	<select id="select_idperiodo" class="form-control">
	* 		<option value="1" selected>val1</option>
	* 		<option value="2">val2</option>
	* 	</select>
	* const el = document.getElementById('elementId')
	* console.log(url_helper.selected_value(el)) // 1 
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
	* console.log(url_helper.selected_text(el)) // val1 
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
	* console.log(url_helper.selected_index(el)) // 0 
	*/
	vm.selected_index = el => el.selectedIndex

	return vm
})();