import { getStorage, timersStart } from '@betarost/cemjs'
import { timerCourse, checkAnswerApi } from '@src/functions.js'


const test = async function () {
    const myInfo = getStorage("myInfo")
    if(myInfo.nickname){
        console.log("myInfo have",myInfo.nickname);
    }else{
        console.log("myInfo not have");
    }

    const course = await sendApi.getCourse()
    console.log(checkAnswerApi(course));

}

export { test }