import { getStorage, timersStart, sendApi } from '@betarost/cemjs'
import { timerCourse, checkAnswerApi } from '@src/functions.js'
import validator from 'validator';

// const tmp = validator.isStrongPassword("7ы", {
//   minLength: 8, minLowercase: 1,
//   minUppercase: 1, minNumbers: 1, minSymbols: 1
// })



// console.log("isStrongPassword=", tmp);

const test = async function () {
  // const myInfo = getStorage("myInfo")
  // if (myInfo.nickname) {
  // console.log("myInfo have",myInfo.nickname);
  // } else {
  // console.log("myInfo not have");
  // }




  //Получение категорий новостей
  // const tpm = checkAnswerApi(await sendApi.create("getCategories", {
  //     "filter": {
  //         "type": "news",
  //         "count.ru": {
  //             "$gt": 0
  //         }
  //     }
  // }))
  // console.log("News category = ", tpm);

  //Получение новостей
  // const tpm2 = checkAnswerApi(await sendApi.create("getNews", {
  //     "filter": {
  //         "type": "news",
  //         "languages.code": "ru"
  //     },
  //     "select": {
  //         "title": 1,
  //         "preview": 1,
  //         "image": 1,
  //         "showDate": 1,
  //         "statistic.view": 1,
  //         "statistic.comments": 1
  //     },
  //     "sort": {
  //         "showDate": -1
  //     },
  //     "limit": 6
  // }))
  // console.log("News list = ", tpm2);

  //Получение Вопросов
  // const tpm3 = checkAnswerApi(await sendApi.create("getQuestions", {
  //     "filter": {
  //         "languages.code": "ru"
  //     },
  //     "select": {
  //         "title": 1,
  //         "showDate": 1,
  //         "statistic": 1,
  //         "languages": 1,
  //         "close": 1,
  //         "bestId": 1,
  //         "media": 1,
  //         "author": 1
  //     },
  //     "sort": {
  //         "showDate": -1
  //     },
  //     "limit": 6
  // }))
  // console.log("Questions list = ", tpm3);

  //Получение бирж
  // const tpm4 = checkAnswerApi(await sendApi.create("getTrade", {
  //     "sort": {
  //         "score": -1
  //     },
  //     "limit": 6
  // }))
  // console.log("Trade list = ", tpm4);

  //Получение Пользователей
  // const tpm5 = checkAnswerApi(await sendApi.create("getUsers", {
  //     "filter": {
  //         "confirm.registrasion": true
  //     },
  //     "select": {
  //         "rank": 1,
  //         "social": 1,
  //         "subscribe": 1,
  //         "nickname": 1,
  //         "fullname": 1,
  //         "information.speciality": 1,
  //         "avatar.name": 1,
  //         "frame.name": 1,
  //         "statistic": 1,
  //         "online": 1,
  //         "awards": 1,
  //         "status": 1
  //     },
  //     "limit": 6
  // }))
  // console.log("Users list = ", tpm5);


  //test
  // console.log("Hello World")

}

export { test }

