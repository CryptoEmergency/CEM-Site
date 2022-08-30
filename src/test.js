import { getStorage, timersStart } from '@betarost/cemjs'



const test = function () {
    const myInfo = getStorage("myInfo")
    if(myInfo.nickname){
        console.log("myInfo have",myInfo.nickname);
    }else{
        console.log("myInfo not have");
    }

    

}

export { test }