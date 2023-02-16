import { Variable, parsingUrl, initPage, Helpers, getStorage, setStorage, sendApi, initGo, initReload, Data } from "@betarost/cemserver/cem.js";
import { modals } from "./modals.js"
import { initData } from "./initData.js"
import { restApi } from "./restApi.js"
import { itemsMenu } from "./itemsMenu.js"
import { web3CEM, web3Action } from "./web3.js"

import { functionsMain } from "@src/lists/files/index.js"


const fn = {}
fn.Static = {}
fn.initData = initData


Object.assign(fn, functionsMain())

// 2023 ================


//2022 =======================

fn.modals = modals

fn.restApi = restApi
fn.itemsMenu = itemsMenu
fn.web3CEM = web3CEM
fn.web3Action = web3Action
fn.validator = Helpers.validator
fn.sanitizeHtml = Helpers.sanitizeHtml
// fn.test = function () {
//   //  console.log('=f83cf3 FN=', this)
//   return true

// }


fn.clickHide = function (e) {
  if (Variable.OutHideWindows.length != 0) {
    Variable.OutHideWindows.map((item, index) => {
      let first, second
      if (typeof item[0] == "function") {
        first = item[0]()
      } else {
        first = item[0]
      }

      if (typeof item[1] == "function") {
        second = item[1]()
      } else {
        second = item[1]
      }

      if (!document.body.contains(first)) {
        Variable.OutHideWindows.splice(index, 1);
        return;
      }
      if (first === e.target || first.contains(e.target)) {
      } else {
        if (item[1] && typeof item[1] == "function") {
          if (typeof item[1]() != "boolean") {
            second.hidden = true;
          }
        } else if (typeof second == "string") {
          Variable.DelModals(second);
        }
        Variable.OutHideWindows.splice(index, 1);
      }
    });
  }
};

fn.uploadMedia = function (file, type, onload, onprogress, xhr) {
  let nameFile = "file.png"
  if (file.name) {
    nameFile = file.name
  }
  const formData = new FormData()
  formData.append('media', file, nameFile);

  xhr = new XMLHttpRequest()
  xhr.open('POST', `/upload/${type}/`)
  xhr.onload = onload
  xhr.upload.onprogress = onprogress
  xhr.send(formData)
}

fn.timerTik = async function () {
  // console.log("timerTik", "tt",Variable.dataUrl)

  if (Variable.dataUrl.adress == "rooms") {
    let [Static] = fn.GetParams({ ID: "mainBlock", actual: true })
    //  console.log("timerTik", "tt",Static)
    if (Static.Rooms._id) {

      let _id = Static.Rooms._id

      if (Static.Rooms.message[0]) {

      }
      let messageID = null
      if (Static.Rooms.message[0]) {

        messageID = Static.Rooms.message[0]._id

      }


      let response = await sendApi.create("tik", { rooms: { _id, messageID } })
      if (response.result && response.result.list_records) {

        Static.new = _id
        // initReload()
      }
    }
  } else {
    // 
    let response = await sendApi.create("tik", {})
    if (response && response.info && response.info.myInfo && response.info.myInfo.chatMessage && response.info.myInfo.chatMessage.length > 0) {
      let [Static] = fn.GetParams({ ID: "mainBlock", actual: true })
      if (Variable.dataUrl.adress == "user" && Variable.dataUrl.category == "chats") {
        if (Static.activeUser && Static.activeUser._id == response.info.myInfo.chatMessage[0].author) {
          if (Static.messageList.list_records[0].message[0]._id != response.info.myInfo.chatMessage[0]._id) {
            Static.messageList.list_records[0].message.unshift(response.info.myInfo.chatMessage[0])
          }
        }
        Static.chatsList.list_records.forEach(async chat => {
          if (chat.users[0]._id == response.info.myInfo.chatMessage[0].author || chat.users[1]._id == response.info.myInfo.chatMessage[0].author) {
            if (chat.message[0]._id != response.info.myInfo.chatMessage[0]._id && ((!Static.activeUser) || !(Static.activeUser._id == response.info.myInfo.chatMessage[0].author))) {
              console.log('INCREMENT')
              if (typeof chat.unreadMessage == "undefined") {
                chat.unreadMessage = 1
              } else {
                chat.unreadMessage++
              }
            } else if (Static.activeUser && Static.activeUser._id == response.info.myInfo.chatMessage[0].author) {
              console.log("QUERY")
              Static.messageList = await sendApi.send({
                action: "getUserChats", short: true,
                filter: {
                  "$and": [
                    {
                      "users": chat.users[0]
                    },
                    {
                      "users": chat.users[1]
                    }
                  ]
                },
                select: {
                  "message": {
                    "$slice": [
                      0,
                      120
                    ]
                  },
                  "users": 1
                }
              });
            }
            chat.message[0] = response.info.myInfo.chatMessage[0]
            Static.chatsList = await sendApi.send({
              action: "getUserChats", short: true,
              select: {
                "message": {
                  "$slice": [
                    0,
                    1
                  ]
                },
                "users": 1
              },
              sort: {
                'message.showDate': -1
              }
            });
            setTimeout(() => {
              initReload()
            }, 100);
            // initReload()
          }
        })
      }
    }
    if (response && response.result && Object.keys(response.result).length) {
      //console.log('=df2a55=', response)
    }
  }

};

fn.percent = function (num1, num2) {
  return ((Number(num1) / Number(num2)) * 100)
};

fn.transactionTypeToLang = function (type) {
  let returnType = ""
  switch (type) {
    case 'registration':
      returnType = Variable.lang.p.transactionRegistration
      break
    case 'referral_registration':
      returnType = Variable.lang.p.transactionReferralRegistration
      break
    case 'other':
      returnType = Variable.lang.p.transactionOther
      break
    case 'awards':
      returnType = Variable.lang.p.transactionAwards
      break
    case 'level':
      returnType = Variable.lang.p.transactionLevel
      break
  }
  return returnType;

}
fn.numberFixWithSpaces = function (num, fix) {
  let x = parseFloat(num).toFixed(fix)
  var parts = x.toString().split(".");
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  return parts.join(".");
}

fn.CreateMenuItems = function (data) {

  let menues = []
  let text = "";
  let type = "";
  let color = "";
  let onlyAuth = "";
  let onclick = "";

  if (data && typeof data !== undefined) {
    let Checklength = []
    for (let a in data) {
      Checklength.push(data[a].length)
    }

    let CheckSumm = Checklength.filter((item, index) => {
      return Checklength.indexOf(item) === index
    });

    if (CheckSumm.length <= 1) {
      for (let i = 0; i < CheckSumm[0]; i++) {
        if (data.text[i]) {
          text = data.text[i]
        }
        if (data.type[i]) {
          type = data.type[i]
        }
        if (data.color[i]) {
          color = data.color[i]
        }
        if (data.auth[i]) {
          onlyAuth = data.auth[i]
        }
        if (data.onclick[i]) {
          onclick = data.onclick[i]
        }
        menues.push({ text, type, onlyAuth, color, onclick })
        text = ""
        type = ""
        color = ""
        onlyAuth = ""
        onclick = ""
      }
      return menues
    }
    else {
      console.log("Ошибка в количестве элементов " + Checklength)
    }
  }
}




fn.sliceString = function (str, number = 66) {
  let sliceStr = '';
  if (str.length >= number) {
    sliceStr = `${str.slice(0, number)} ...`;
  } else {
    sliceStr = str;
  }
  return sliceStr;
};

fn.NumFormat = function (num) {
  if (num === null || num === undefined) {
    return 0;
  }
  return num.toLocaleString('en-US')
};

fn.getDateFormat = function (data, type) {
  if (!data) {
    return null
  }
  Helpers.moment.locale(Variable.lang.code);
  data = data.replace(' ', 'T')
  switch (type) {
    case "now":
      let secondsBefor = Math.round(
        (Helpers.moment().format("x") - Helpers.moment(data).format("x")) / 1000
      );
      if (secondsBefor < 86400) {
        return Helpers.moment(data).fromNow();
      } else {
        return Helpers.moment(data).format("DD MMMM YYYY");
      };
    case "time":
      return Helpers.moment(data).format('YYYY-MM-DD hh:mm')
    case "chatdate":
      return Helpers.moment(data).format("dd, D MMM");
    case "chattime":
      let secondsBefore = Math.round(
        (Helpers.moment().format("x") - Helpers.moment(data).format("x")) / 1000
      );
      if (secondsBefore < 86400) {
        return Helpers.moment(data).fromNow();
      } else {
        return Helpers.moment(data).format("HH:mm");
      };
    case "chatlist":
      let secondBefore = Math.round(
        (Helpers.moment().format("x") - Helpers.moment(data).format("x")) / 1000
      );
      if (secondBefore < 86400) {
        return Helpers.moment(data).format("HH:mm");
      } else if (secondBefore < 604800) {
        return Helpers.moment(data).format("dddd");
      } else {
        return Helpers.moment(data).format("DD.MM.YY");
      };
    default:
      return Helpers.moment(data).format("YYYY-MM-DD");
  }
};

fn.siteLink = async function (e) {
  let link

  if (typeof e == "string") {
    link = e

  } else {
    // console.log(e)
    e.preventDefault();
    if (!e.currentTarget || !e.currentTarget.href) {
      console.error("Not have href")
      return
    }
    link = e.currentTarget.href;
  }
  // console.log('=fc61e3=', link, window.location.href, Variable.dataUrl)
  if (link == window.location.href || link == Variable.dataUrl.href) {
    history.pushState(null, null, link);
    initGo("newPage")
    // window.scrollTo({
    //   top: 0,
    //   behavior: "instant",
    // });
  } else {

    history.pushState(null, null, link);
    await parsingUrl()
  }
  return
}


fn.checkValid = function (Static, Array) {
  Static.isValid = true
  Array.forEach(function (elem) {
    if (!Static[elem] || !Static[elem].valid) {
      Static.isValid = false
    }
  })
  initReload()
  return;
}

fn.siteLinkModal = async function (e, data) {
  let link

  if (typeof e == "string") {
    link = e
  } else {
    e.preventDefault();
    e.stopPropagation();

    if (!e.currentTarget || (!e.currentTarget.href && !e.currentTarget.dataset.href)) {
      console.error("Not have href")
      return
    }
    link = e.currentTarget.href ? e.currentTarget.href : e.currentTarget.dataset.href
  }
  history.pushState(null, null, link);
  Variable.Modals = []
  // let dataUrl = parsingUrl(link)
  let dataUrl = await parsingUrl(link)
  // console.log('=cab10c=', link, dataUrl)
  await initPage(dataUrl, data);
  return
}

fn.recordsView = function (_id, action) {
  // console.log('=e0fd8f= recordsView', _id, action)
  let timeNow = Math.floor(Date.now() / 1000)
  let objView = getStorage("recordsView")
  if (!objView) (objView = {})
  if (!objView[_id]) {
    objView[_id] = timeNow
    fn.restApi[action].view({ _id })
    setStorage("recordsView", objView)
  } else {
    if (timeNow - objView[_id] >= 86400) {
      objView[_id] = timeNow
      fn.restApi[action].view({ _id })
      setStorage("recordsView", objView)
    }
  }
}

export { fn }