import {jsx, jsxFrag, setVariable, getVariable, setAction, makeDOM, getStorage} from '@betarost/cemjs'
import {init as mainHeader} from '@navigation/header/index.js';
import contacts_vector from '@assets/image/background/contacts_vector.svg'

const ID = "mainBlock"
setVariable({header:true});
setVariable({footer:true});


const make = function(){
    const lang = getVariable("languages")[getStorage("lang")];
    
    return (
        <div class="contacts_container">
            <img class="background_vector" src={contacts_vector}/>
            <div class="contacts_content">
                <div class="contacts_form_block">
                    <div class="contacts_form">
                        <h4>{lang.h.contact}</h4>
                        <p>{lang.p.writeUs}</p>
                    </div>

                </div>
            </div>




    </div>


        
    )
}

const befor = function(dataUrl){
    mainHeader(dataUrl);
}

const start = function(dataUrl){
    console.log("start contact");
    makeDOM(make(),ID)
}

const after = function(dataUrl){}

setAction(ID,"befor",befor)
setAction(ID,"start",start)
setAction(ID,"after",after)

const init = function(dataUrl){
    befor(dataUrl)
    start(dataUrl)
    after(dataUrl)
}

export default init;