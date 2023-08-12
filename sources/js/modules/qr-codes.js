import {Html5QrcodeScanner, Html5Qrcode} from "html5-qrcode";

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

        const QrcodeErrorCallback = ()=>{
            console.log('error');
        }
        const config = { fps: 10, qrbox: 250 };
        // SELECCIONAMOS LA CAMARA FRONTAL
        html5QrCode.start({ facingMode: { exact: "user"} }, config, qrCodeSuccessCallback);
        //EVENTO CLICK PARA PARAR SCANNER
        getBtnStopScanner.addEventListener('click', ()=>{ html5QrCode.stop(); });
    }

    //SE PIDEN PERMISOS PARA ACTIVAR EL LECTOR QR
    const QrCodesActive = ()=>{
        const getBtnActiveQr = document.querySelector('#scanner-btn');
        const getBtnStopScanner = document.querySelector('#scanner-btn-stop');

        getBtnActiveQr.addEventListener('click', ()=>{
            try{
                QrCodesConfig();
                console.log('entra aqui')
            }catch(err){
                console.log('catch')
            }
            console.log(getBtnStopScanner);
            getBtnStopScanner.classList.add('active');
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
