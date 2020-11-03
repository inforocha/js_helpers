const mask_helper = (_ => {
	let vm = {}

	// 999.999.999-99
	vm.cpf = value => value
		.replace(/\D/g, '') // deixando somente numeros
		.replace(/(\d{3})(\d)/, '$1.$2') // quando existirem 3 numeros e surgir um quarto numero
		.replace(/(\d{3})(\d)/, '$1.$2') 
		.replace(/(\d{3})(\d{1,2})/, '$1-$2') // quando existirem 3 numeros e surgir um quarto ou quinto numero 
		.replace(/(-\d{2})\d+?$/, '$1') // quando existir um - seguido de 2 numeros 

	//99.999.999/9999-99
	vm.cnpj = value => value
		.replace(/\D/g, '') // deixando somente numeros
		.replace(/(\d{2})(\d)/, '$1.$2')
		.replace(/(\d{3})(\d)/, '$1.$2')
		.replace(/(\d{3})(\d)/, '$1/$2')
		.replace(/(\d{4})(\d)/, '$1-$2')
		.replace(/(-\d{2})\d+?$/, '$1')

	// (99) 9999-9999
	// (99) 99999-9999
	vm.phone = value => value
		.replace(/\D/g, '')
		.replace(/(\d{2})(\d)/, '($1) $2')
		.replace(/(\d{4})(\d)/, '$1-$2')
		.replace(/(\d{4})-(\d)(\d{4})/, '$1$2-$3') // tratando numeros com 4 digitos antes do -
		.replace(/(-\d{4})\d+?$/, '$1')

	// 99999-999
	vm.cep = value => value
		.replace(/\D/g, '')
		.replace(/(\d{5})(\d)/, '$1-$2')
		.replace(/(-\d{3})\d+?$/, '$1')

	// 01/01/1001
	vm.date_ddmmyyyy = value => value
		.replace(/\D/g, '')
		.replace(/(\d{2})(\d)/, '$1/$2')
		.replace(/(\d{2})(\d)/, '$1/$2')
		.replace(/(\/\d{4})\d+?$/, '$1')

	// 01/01/1001 12:15:00 todo fix me
	vm.date_ddmmyyyy_hhiiss = value => value
		.replace(/\D/g, '')
		.replace(/(\d{2})(\d)/, '$1/$2') // encontrar 3 numeros seguidos adiciona uma barra entre o segundo e o terceiro
		.replace(/(\d{2})(\d)/, '$1/$2') // repete o processo para a segunda parte da data
		.replace(/(\d{4})(\d)/, '$1 $2') // encontrar 5 numeros seguidos adiciona um espaco entre o quarto e o quinto
		.replace(/( \d{2})(\d)/, '$1:$2') // encontrar um espaco seguido de 3 numeros adiciona dois pontos entre o segundo e o terceiro
		.replace(/(\:\d{2})(\d)/, '$1:$2') // encontrar dois pontos seguidos de 3 numeros adiciona dois pontos entre o segundo e o terceiro
		.replace(/(\:\d{2}\:\d{2})\d+?$/, '$1')

	// 999.99999.99-9
	vm.pis = value => value
		.replace(/\D/g, '')
		.replace(/(\d{3})(\d)/, '$1.$2')
		.replace(/(\d{5})(\d)/, '$1.$2')
		.replace(/(\d{5}\.)(\d{2})(\d)/, '$1$2-$3')
		.replace(/(-\d)\d+?$/, '$1')

	return vm
})();
