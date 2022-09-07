import {
    jsx,
    jsxFrag,
    getValue,
    setValue,
    makeDOM,
    getVariable,
    getStorage,
} from '@betarost/cemjs'
import { ModalAuth } from '@component/modals/ModalAuth.js';
import { ModalComingSoon } from '@component/modals/ModalComingSoon.js';


const ID = "modals";

const start = function(){
    const showAuth = getValue("modals", "authModalShow")
    const commingSoonModalShow = getValue("modals", "commingSoonModalShow")
    const languages = getVariable("languages");
    const lang = languages[getStorage("lang")]

    console.log("showAuth",showAuth);

    return (
        <div>
        {showAuth &&
           <ModalAuth 
           lang={lang}
           />
        }
        {commingSoonModalShow &&
           <ModalComingSoon 
           lang={lang}
           />
        }
        </div>
    )


}

const init = function (reload) {
    console.log("modals init",reload);
    // if (!reload) {
        
    // }

    makeDOM(start(), ID)
    return;
}
export { init }