/**
* original: https://stackoverflow.com/questions/5529718/how-to-detect-internet-speed-in-javascript
* Example: netspeed_help.initiateSpeedDetection()
*/
let netspeed_help = (_ => {
    // @todo JUST AN EXAMPLE, PLEASE USE YOUR OWN PICTURE!
    const imageAddr = "http://www.kenrockwell.com/contax/images/g2/examples/31120037-5mb.jpg" + "?n=" + Math.random();
    const downloadSize = 4995374 //bytes
    let debugInConnsole = true
    let vm = {}

    vm.initiateSpeedDetection = _ => {
        vm.consoleLog("Loading the image, please wait...");
        window.setTimeout(vm.measureConnectionSpeed, 1);
    }

	// melhorar esta funcao
    vm.measureConnectionSpeed = _ => {
        var startTime, endTime;
        var download = new Image();
        download.onload = function () {
            endTime = (new Date()).getTime();
            showResults();
        }
        
        download.onerror = function (err, msg) {
            vm.consoleLog("Invalid image, or error downloading");
        }
        
        startTime = (new Date()).getTime();
        var cacheBuster = "?nnn=" + startTime;
        download.src = imageAddr + cacheBuster;
        
		// retirar esta funcao e criar uma que retorne somente um objeto com a duracao, bitloaded, speedbps, speedkbps, speedmbps
        function showResults() {
            var duration = (endTime - startTime) / 1000;
            var bitsLoaded = downloadSize * 8;
            var speedBps = (bitsLoaded / duration).toFixed(2);
            var speedKbps = (speedBps / 1024).toFixed(2);
            var speedMbps = (speedKbps / 1024).toFixed(2);
            vm.consoleLog([
                "Your connection speed is:", 
                speedBps + " bps", 
                speedKbps + " kbps", 
                speedMbps + " Mbps"
            ]);
        }
    }

    vm.consoleLog = msg => !debugInConnsole || console.log(msg)
    vm.setDebug = debug => debugInConnsole = debug

    return vm
})();
