const image_helper = (_=>{
    const vm = {}

    /**
     * [en] Read a file from an input to file type.
     * [pt-BR] Le um arquivo de um input to tipo file.
     *
     * @exemple
     *      const INPUT_TYPE_FILE = document.getElementById('input-file-id')
     *  		const input_file = INPUT_TYPE_FILE.files[0];
     *      const base64_doc = await image_helper.gera_base_64(input_file).then(data => data);
     *
     * @return promise
     */
    vm.gera_base_64 = async file => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = error => reject(error);
        });
    }

    return vm
})();
