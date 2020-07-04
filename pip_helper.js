/**
* [EN] 
* Available in Firefox version 71 for Windows and 72 for MacOS and Linux. 
* The Picture-in-Picture feature allows you to pop videos out of their webpage into a floating.
*
* [PT]
* Disponível no Firefox versão 71 para Windows e 72 para MacOS e Linux.
* O recurso Picture-in-Picture permite exibir vídeos da página da Web em uma janela flutuante
*/
let pip_helper = (_ => {
	let vm = {}

  // [EN] adds the event that hears the PIP window open
	// [PT] adiciona o evento que escuta a janela PIP ser aberta
	vm.addEventEnterPIP = (elementVideo, callback, dataCallback) => elementVideo.addEventListener('enterpictureinpicture', e => { callback(e, dataCallback) })

  // [EN] adds the event that hears the PIP window being closed
  // [PT] adiciona o evento que escuta a janela PIP ser fechada
	vm.addEventLeavePIP = (elementVideo, callback, dataCallback) => elementVideo.addEventListener('leavepictureinpicture', e => { callback(e, dataCallback) })

  // [EN] close the PIP window.
  // [PT] fecha a janela PIP. 
	vm.exitPIP = _ => {
		if(vm.existsPictureInPictureElement()) document.exitPictureInPicture() // caso deseje algo esse metodo retorna uma promisse
	}

  // [EN] check if the PIP window is open.
  // [PT] verifica se a janela PIP esta aberta.
	vm.existsPictureInPictureElement = _ => document.pictureInPictureElement != null

  // [EN] checks whether the browser supports the functionality.
  // [PT] verifica se o navegador suporta a funcionalidade.
	vm.suportPIPBrowser = _ => ("pictureInPictureEnabled" in document)

  // [EN] starts the PIP window.
  // [PT] inicia a janela PIP.
	vm.startPIP = async id => {
		const video = document.querySelector(`#${id}`);
		await video.requestPictureInPicture();
	}

	return vm
})();
