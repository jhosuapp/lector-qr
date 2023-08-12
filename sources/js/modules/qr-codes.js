import {Html5QrcodeScanner, Html5Qrcode} from "html5-qrcode";

const QrCodes = (()=>{

    const QrCodesConfig = ()=>{
        const html5QrCode = new Html5Qrcode("reader");
        const qrCodeSuccessCallback = (decodedText, decodedResult) => {
            /* handle success */
            console.log(`Scan result: ${decodedText}`, decodedResult);
            document.getElementById('kode').value=decodedText;
            // ...
            Html5QrcodeScanner.clear();
        }
        const config = { fps: 10, qrbox: 250 };
        // Select front camera or fail with `OverconstrainedError`.
        html5QrCode.start({ facingMode: { exact: "environment"} }, config, qrCodeSuccessCallback);
    }

    return {
        childsQrCodes : function(){
            try { QrCodesConfig(); } catch (error) {  }
        }
    }


})();

const getChildsQrCodes = ()=>{
    QrCodes.childsQrCodes();
}


export { getChildsQrCodes }
