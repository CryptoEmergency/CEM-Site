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
// import HeaderEmpty from './HeaderEmpty.js'
// import HeaderNotAuth from './HeaderNotAuth.js'
// import HeaderAuth from './HeaderAuth.js'

const ID = "modals";

const start = function(){
    const showAuth = getValue("modals", "authModalShow")
    const languages = getVariable("languages");
    const lang = languages[getStorage("lang")]

    console.log("showAuth",showAuth);

    return (
        <div>
        {showAuth ?
           <ModalAuth 
           lang={lang}
           /> :
           <></>
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