const obj_help = (_ => {
	let vm = {}

	vm.isObjectEmpty = obj => {
		for (var x in obj) { return false; }
		return true;
	}
	return vm
)();
