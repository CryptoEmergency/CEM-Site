import { getStorage, timersStart, sendApi } from '@betarost/cemjs'
import { timerCourse, checkAnswerApi } from '@src/functions.js'


const test = async function () {
   // const myInfo = getStorage("myInfo")
   // if (myInfo.nickname) {
   // console.log("myInfo have",myInfo.nickname);
   // } else {
   // console.log("myInfo not have");
   // }

   //Получение категорий новостей
   const cat = checkAnswerApi(await sendApi.create("getCategories", {
      "filter": {
         "type": "news",
         "count.ru": {
            "$gt": 0
         }
      }
   }))
   console.log("News category = ", cat);



}

export { test }

