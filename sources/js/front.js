//COMPONENTS
import { getChildsQrCodes } from "./modules/qr-codes";
import "../sass/main.scss";

window.addEventListener('load', ()=>{
    getChildsQrCodes();
});