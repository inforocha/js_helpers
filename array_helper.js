const array_helper = (_ => {
	const vm = {}

	/**
	* [en] Returns an array without duplicate values ​​from the original array..
	* [pt-BR] Retorna um array sem os valores duplicados do array original.
	* @param array arr
	* @return array
	* @example 
	* 	console.log(array_helper.array_unique([1,2,1,3,2]))) // [1,2,3,]
	* 	console.log(array_helper.array_unique(['a',1,'o','a',3]))) // ['a',1,'o',3]
	*/
	vm.array_unique = arr => arr.filter((elem, i, self) => self.indexOf(elem) === i)
})();