import { CEM } from "@betarost/cemserver/cem.js";


// import { web3CEM, web3Action } from "./web3.js"


// import { idb } from "@src/modules/load/initInexedDB.js";
// console.log('=d57934=', CEM.fn)
const fn = CEM.fn
// fn.Static = {}
// fn.initData = initData


// Object.assign(fn, functionsMain())

// // 2023 ================
// fn.idb = {}

// fn.idb.get = async function (table, key) {
//   let record = await (await idb).get(table, key)
//   if (!record) {
//     return []
//   }
//   return record
// }

// fn.idb.set = async function (table, key, value) {
//   (await idb).put("CachePage", { test: "dfh", name: "dfhdhf" })
//   return
//   return await (await idb).put(table, value, key)
// }

// //2022 =======================

// fn.modals = modals
// fn.socket = socket
// fn.restApi = restApi
// fn.itemsMenu = itemsMenu
// fn.web3CEM = web3CEM
// fn.web3Action = web3Action
// fn.validator = Helpers.validator
// fn.sanitizeHtml = Helpers.sanitizeHtml
// // fn.test = function () {
// //   //  console.log('=f83cf3 FN=', this)
// //   return true

// // }


// fn.clickHide = function (e) {
//   if (Variable.OutHideWindows.length != 0) {
//     Variable.OutHideWindows.map((item, index) => {
//       let first, second
//       if (typeof item[0] == "function") {
//         first = item[0]()
//       } else {
//         first = item[0]
//       }

//       if (typeof item[1] == "function") {
//         second = item[1]()
//       } else {
//         second = item[1]
//       }

//       if (!document.body.contains(first)) {
//         Variable.OutHideWindows.splice(index, 1);
//         return;
//       }
//       if (first === e.target || first.contains(e.target)) {
//       } else {
//         if (item[1] && typeof item[1] == "function") {
//           if (typeof item[1]() != "boolean") {
//             second.hidden = true;
//           }
//         } else if (typeof second == "string") {
//           Variable.DelModals(second);
//         }
//         Variable.OutHideWindows.splice(index, 1);
//       }
//     });
//   }
// };



// fn.timerTik = async function () {
//   // console.log("timerTik", "tt",Variable.dataUrl)

//   if (Variable.dataUrl.adress == "rooms") {
//     let [Static] = fn.GetParams({ ID: "mainBlock", actual: true })
//     //  console.log("timerTik", "tt",Static)
//     if (Static.Rooms._id) {

//       let _id = Static.Rooms._id

//       if (Static.Rooms.message[0]) {

//       }
//       let messageID = null
//       if (Static.Rooms.message[0]) {

//         messageID = Static.Rooms.message[0]._id

//       }


//       let response = await sendApi.create("tik", { rooms: { _id, messageID } })
//       if (response.result && response.result.list_records) {

//         Static.new = _id
//         // initReload()
//       }
//     }
//   } else {
//     // 
//     let response = await sendApi.create("tik", {})
//     if (response && response.info && response.info.myInfo && response.info.myInfo.chatMessage && response.info.myInfo.chatMessage.length > 0) {
//       let [Static] = fn.GetParams({ ID: "mainBlock", actual: true })
//       if (Variable.dataUrl.adress == "user" && Variable.dataUrl.category == "chats") {
//         if (Static.activeUser && Static.activeUser._id == response.info.myInfo.chatMessage[0].author) {
//           if (Static.messageList.list_records[0].message[0]._id != response.info.myInfo.chatMessage[0]._id) {
//             Static.messageList.list_records[0].message.unshift(response.info.myInfo.chatMessage[0])
//           }
//         }
//         Static.chatsList.list_records.forEach(async chat => {
//           if (chat.users[0]._id == response.info.myInfo.chatMessage[0].author || chat.users[1]._id == response.info.myInfo.chatMessage[0].author) {
//             if (chat.message[0]._id != response.info.myInfo.chatMessage[0]._id && ((!Static.activeUser) || !(Static.activeUser._id == response.info.myInfo.chatMessage[0].author))) {
//               console.log('INCREMENT')
//               if (typeof chat.unreadMessage == "undefined") {
//                 chat.unreadMessage = 1
//               } else {
//                 chat.unreadMessage++
//               }
//             } else if (Static.activeUser && Static.activeUser._id == response.info.myInfo.chatMessage[0].author) {
//               console.log("QUERY")
//               Static.messageList = await sendApi.send({
//                 action: "getUserChats", short: true,
//                 filter: {
//                   "$and": [
//                     {
//                       "users": chat.users[0]
//                     },
//                     {
//                       "users": chat.users[1]
//                     }
//                   ]
//                 },
//                 select: {
//                   "message": {
//                     "$slice": [
//                       0,
//                       120
//                     ]
//                   },
//                   "users": 1
//                 }
//               });
//             }
//             chat.message[0] = response.info.myInfo.chatMessage[0]
//             Static.chatsList = await sendApi.send({
//               action: "getUserChats", short: true,
//               select: {
//                 "message": {
//                   "$slice": [
//                     0,
//                     1
//                   ]
//                 },
//                 "users": 1
//               },
//               sort: {
//                 'message.showDate': -1
//               }
//             });
//             setTimeout(() => {
//               initReload()
//             }, 100);
//             // initReload()
//           }
//         })
//       }
//     }
//     if (response && response.result && Object.keys(response.result).length) {
//       //console.log('=df2a55=', response)
//     }
//   }

// };



// fn.CreateMenuItems = function (data) {

//   let menues = []
//   let text = "";
//   let type = "";
//   let color = "";
//   let onlyAuth = "";
//   let onclick = "";

//   if (data && typeof data !== undefined) {
//     let Checklength = []
//     for (let a in data) {
//       Checklength.push(data[a].length)
//     }

//     let CheckSumm = Checklength.filter((item, index) => {
//       return Checklength.indexOf(item) === index
//     });

//     if (CheckSumm.length <= 1) {
//       for (let i = 0; i < CheckSumm[0]; i++) {
//         if (data.text[i]) {
//           text = data.text[i]
//         }
//         if (data.type[i]) {
//           type = data.type[i]
//         }
//         if (data.color[i]) {
//           color = data.color[i]
//         }
//         if (data.auth[i]) {
//           onlyAuth = data.auth[i]
//         }
//         if (data.onclick[i]) {
//           onclick = data.onclick[i]
//         }
//         menues.push({ text, type, onlyAuth, color, onclick })
//         text = ""
//         type = ""
//         color = ""
//         onlyAuth = ""
//         onclick = ""
//       }
//       return menues
//     }
//     else {
//       console.log("Ошибка в количестве элементов " + Checklength)
//     }
//   }
// }




export { fn }