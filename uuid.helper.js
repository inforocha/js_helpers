const uuid_helper = (_ => {
	const vm = {}

	/**
	* A cada vez que eh impresso gera um codigo diferente
	*
	* Um UUID versão 4 é gerado aleatoriamente. 
	* Nesta versao, colisões podem ocorrer mesmo sem problemas de implementação, embora com uma probabilidade tão pequena que normalmente pode ser ignorada.
	* console.log(uuid_helper.v4());
	*/
	vm.v4 = _ => 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'
		.replace(/[xy]/g, function(c) {
			const r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
			return v.toString(16);
		});

	return vm
})();