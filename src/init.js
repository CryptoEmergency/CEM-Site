import {getVariable,setVariable,setValue,setAction,initStorage,addListen,parsingUrl} from '@betarost/cemjs'
import "@src/css/index.js"
import "@src/js/index.js"
import {default as languages} from '@src/language/index.js'
import {init as startMake} from '@src/router/index.js'

const ID = "App";

const clickHide = function(e,target){
    setValue("mainHeader","langListShow",false)
}

const befor = function(){
    if(!getVariable("languages")){
        setVariable({languages:languages});
    }
    initStorage();
    addListen()
}

const start = function(){   
    startMake()
}

const after = function(){}

setVariable({clickHide: clickHide})

setAction(ID,"befor",befor)
setAction(ID,"start",start)
setAction(ID,"after",after)

const init = function(){    
    befor()
    start()
    after()
}

export {init}