import { getStorage, timersStart,sendApi } from '@betarost/cemjs'
import { timerCourse, checkAnswerApi } from '@src/functions.js'


const test = async function () {
    const myInfo = getStorage("myInfo")
    if(myInfo.nickname){
       // console.log("myInfo have",myInfo.nickname);
    }else{
     //   console.log("myInfo not have");
    }

    //const course = await sendApi.getCourse()

    const course = await sendApi.getCourse()

    //const data = await sendApi.create("supportMessage",{value:{email:"test@test2.ru",name:"Igor",text:"test one"}});

   // console.log(checkAnswerApi(course));

}

export { test }