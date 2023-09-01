import {Html5Qrcode} from "html5-qrcode";

const QrCodes = (()=>{

    //CONFIGURACIÓN DEL LIBRERÍA
    const QrCodesConfig = ()=>{
        const html5QrCode = new Html5Qrcode("reader");
        const getBtnStopScanner = document.querySelector('#scanner-btn-stop');

        const qrCodeSuccessCallback = (decodedText, decodedResult) => {
            /* handle success */
            console.log(`Scan result: ${decodedText}`);
            //PARAMOS SCANNER
            html5QrCode.stop();
        }

        const config = { fps: 10, qrbox: 220 };
        // SELECCIONAMOS LA CAMARA FRONTAL
        Html5Qrcode.getCameras().then(devices => {
            html5QrCode.start({ facingMode: { exact: "user"} }, config, qrCodeSuccessCallback)
            .then(res=>{
                getBtnStopScanner.classList.add('active');
            }).catch((err)=>{
                alert('acepte los permisos por favor');
            });
        }).catch((err)=>{
            alert('acepte los permisos por favor');
        });

        //EVENTO CLICK PARA PARAR SCANNER
        getBtnStopScanner.addEventListener('click', ()=>{ 
            html5QrCode.stop();  
            getBtnStopScanner.classList.remove('active');
        });
    }

    //SE PIDEN PERMISOS PARA ACTIVAR EL LECTOR QR
    const QrCodesActive = ()=>{
        const getBtnActiveQr = document.querySelector('#scanner-btn');
        getBtnActiveQr.addEventListener('click', ()=>{
            QrCodesConfig();
        });
    }

    return {
        childsQrCodes : function(){
            try { QrCodesActive(); } catch (error) {  }
        }
    }


})();

const getChildsQrCodes = ()=>{
    QrCodes.childsQrCodes();
}


export { getChildsQrCodes }
