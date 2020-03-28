 let create_excel_helper = (_ => {
    'use strict';
    vm = {}

    /**
    * @param Object data - mandatory key: elementFromPrint: element that should be printed
    */
    vm.generate = data => {
      let timestamp = Date.now()
      let filename = `xls_${timestamp}.xls`;
      let dataType = 'application/vnd.ms-excel'
      let dataPrintFormated =  escape(data.elementFromPrint.outerHTML).replace(/ /g, '%20');

      if(navigator.msSaveOrOpenBlob){
        let blob = new Blob(['\ufeff', dataPrintFormated], { type: dataType });
        navigator.msSaveOrOpenBlob( blob, filename);
      }else{
        let downloadLink = document.createElement("a");
        document.body.appendChild(downloadLink);
        downloadLink.href = 'data:' + dataType + ', ' + dataPrintFormated;
        downloadLink.download = filename;
        downloadLink.click()
        downloadLink.remove()
      }
    }
    
    return vm
})();

/*
create_excel_helper.generate({elementFromPrint: document.getElementsByClassName('your_table_id')})
*/
