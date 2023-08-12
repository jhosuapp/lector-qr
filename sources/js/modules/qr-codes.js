import {Html5QrcodeScanner} from "html5-qrcode";

const QrCodes = (()=>{


    //VARIABLES GENERALES
    const QrCodesGeneralVar = ()=>{
        const getCtnQrRender = document.querySelector('#qr-reader');
        const getQrBg = document.querySelector('#qr-bg');

        return { 
            getCtnQrRender,
            getQrBg
        }
    }

    //SETEAMOS VALORES DEL CODIGO QR A LOS INPUTS
    const QrCodesSetValues = (url)=>{
        let codeUrl = url.split('/')
        let codeQR = codeUrl[codeUrl.length - 1].split('');
        const arrBlock = document.querySelectorAll('#form-validate-codes input');
        codeQR.map( (e, index) => {
            arrBlock[index].value = e.toUpperCase(); 
        })
    }

    //CREAMOS EL SCANNER, CON TAMAÑOS
    const QrCodesConfig = ()=>{
        const scanner = new Html5QrcodeScanner('reader', {
            qrbox: {
                width: 250,
                height: 250,
            },
            fps: 20,
            facingMode: { exact: "environment"},
        });

        function success(result) {
            const { getCtnQrRender, getQrBg } = QrCodesGeneralVar();
            //REMOVEMOS CLASES Y QUITAMOS SCANNER
            getQrBg.classList.remove('active');
            getCtnQrRender.classList.remove('active');

            QrCodesSetValues(result);

            scanner.clear();
                document.getElementById('reader').remove();
        }
        function error(err) {
            // console.log(err)
        }
        scanner.render(success, error);

    }

    //RENDER DEL SCANNER CUANDO SE DA CLICK A UN BOTÓN
    const QrCodesRender = ()=>{
        const getBtnRenderQr = document.querySelector('#activeQRCode');
        const getMsgError = document.querySelector('#qr-error');

        getBtnRenderQr && getBtnRenderQr.addEventListener('click', async()=>{
            console.log('entra');
            const { getCtnQrRender, getQrBg }  = QrCodesGeneralVar();
            try {
                //SOLICITAMOS PERMISOS DE ACCESO A LA CAMARA
                await navigator.mediaDevices.getUserMedia({ video: true });
                //RENDERIZAMOS QR
                QrCodesConfig();
                //SIMULAMOS CLICK PARA RENDERIZAR EL QR EN CASO DE QUE SE ACEPTEN PERMISOS
                const getBtnSimulateClick = document.querySelector('#html5-qrcode-button-camera-permission');
                const getBtnSimulateClickStart = document.querySelector('#html5-qrcode-button-camera-start');
                getBtnSimulateClick && getBtnSimulateClick.click();
                getBtnSimulateClickStart && getBtnSimulateClickStart.click();
                //AÑADIMOS CLASES PARA MOSTRAR LA CAMARA
                getCtnQrRender && getCtnQrRender.classList.add('active');
                getQrBg && getQrBg.classList.add('active');
                
            } catch (error) {
                //CAPTURAMOS EL ERROR Y LO MOSTRAMOS
                console.log(error);
                getMsgError && getMsgError.classList.add('active');
            }
        });
    }

    //DETENER EL SCANNER
    const QrCodesRemove = ()=>{
        const getBtnRemoveScanner = document.querySelector('.qr-bg__close');
        getBtnRemoveScanner.addEventListener('click', ()=>{
            const getBtnSimulateClickStopScanner = document.querySelector('#html5-qrcode-button-camera-stop');
            getBtnSimulateClickStopScanner && getBtnSimulateClickStopScanner.click();
            const { getCtnQrRender, getQrBg }  = QrCodesGeneralVar();
            //REMOVEMOS CLASES PARA OCULTAR SCANNER
            getQrBg.classList.remove('active');
            getCtnQrRender.classList.remove('active');
        });
    }

    const QrCodesValidateFormExists = ()=>{
        const getForm = document.querySelector('#form-validate-codes');
        const getQrRemove = document.querySelectorAll('.removeQr');
        if(!getForm){
            getQrRemove.length > 0 && getQrRemove.forEach((data)=>{
                data.remove();
            });
        }
    }
      

    return {
        childsQrCodes : function(){
            try { QrCodesRender(); } catch (error) {  }
            try { QrCodesRemove(); } catch (error) {  }
            try { QrCodesValidateFormExists(); } catch (error) {  }
        }
    }


})();

const getChildsQrCodes = ()=>{
    QrCodes.childsQrCodes();
}


export { getChildsQrCodes }
