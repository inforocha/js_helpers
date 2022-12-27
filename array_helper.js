/**
 * @version 1.1
 */
const array_helper = (_ => {
	const vm = {}

	/**
	 * [en] Group multiple arrays by a key.
	 * [pt-BR] Agrupa varios arrays por uma chave.
	 * @param array arr
	 * @param string key
	 * @return array
	 *
	 * @example
	 *	console.log(array_helper.groupBy(['one', 'two', 'three'], 'length')); // {"3": ["one", "two"], "5": ["three"]
	 */
	vm.groupBy = (data, key) => data.reduce((rv, x) => {
		(rv[x[key]] = rv[x[key]] || []).push(x);
		return rv;
	}, {})

	/**
	* [en] Returns an array without duplicate values ​​from the original array.
	* [pt-BR] Retorna um array sem os valores duplicados do array original.
	* @param array arr
	* @return array
	* @example 
	* 	console.log(array_helper.arrayUnique([1,2,1,3,2]))) // [1,2,3,]
	* 	console.log(array_helper.arrayUnique(['a',1,'o','a',3]))) // ['a',1,'o',3]
	*/
	vm.arrayUnique = arr => arr.filter((elem, i, self) => self.indexOf(elem) === i)

	/**
	* [en] Checks whether two arrays have equal values.
	* [pt-BR] Verifica se dois arrays possuem valores iguais.
	* @param array a1
	* @param array a2
	* @return bollean
	* @example 
	* 	console.log(array_helper.arrayCompare([1,2,{a:1},2],[1,2,{a:1},2])) // true
	* 	console.log(array_helper.arrayCompare([1,2,{a:1}],[1,2,{a:1},2])) // false
	* 	console.log(array_helper.arrayCompare([1,2,1,3,2],[1,2,1,3,2])) // true
	* 	console.log(array_helper.arrayCompare([1,2,1,3,2],[1,'A',1,3,2])) // false
	*/
	vm.arrayCompare = (a1, a2) => JSON.stringify(a1) == JSON.stringify(a2)


	/**
	* @deprecated pode utilizar a funcao de array some similar ao primeiro exemplo.
	* [en] Checks whether an item exists in an array. Unlike includes, this function compares similarity of objects.
	* [pt-BR] Verifica se existe um item em um array. Diferente do includes, esta funcao compara similaridade de objetos.
	* @param mixed needle - o que deseja saber
	* @param array haystack - array a ser verificado
	* @return bollean
	* @example
	* 	array_helper.inArray({a:1},[{a:1}]) // true
	* 	[{a:1}].includes({a:1}) // false
	* 	[{a:1}].some(obj => { return JSON.stringify(obj) == JSON.stringify({a:1}) }) // true
	*
	*	array_helper.inArray('jane',['joe', 'jane', 'mary']) // true
	*	['joe', 'jane', 'mary'].includes('jane') // true
	* 	['joe', 'jane', 'mary'].some(obj => obj == 'jane') // true
	*
	*	array_helper.inArray(['jane'],['joe', 'jane', 'mary',['jane']])
	* 	['joe', 'jane', 'mary',['jane']].includes(['jane']) // false
	* 	['joe', 'jane', 'mary',['jane']].some(obj => obj == ['jane']) // true
	*/
	vm.inArray = (needle, haystack) => haystack.some(obj => vm.arrayCompare(obj,needle))

	return vm
})();
