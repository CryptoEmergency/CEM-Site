import { Variable, parsingUrl, initPage, Helpers, getStorage, setStorage } from "@betarost/cemjs";
import { modals } from "./modals.js"
import { initData } from "./initData.js"
import { apiData } from "./apiData.js"
import { restApi } from "./restApi.js"
import { itemsMenu } from "./itemsMenu.js"

const fn = {}
fn.modals = modals
fn.initData = initData
fn.apiData = apiData
fn.restApi = restApi
fn.itemsMenu = itemsMenu

fn.test = function () {
  console.log('=f83cf3 FN=', this)
  return true

}
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

fn.Static = {}

fn.GetParams = function ({ data, reload, ID = "mainBlock", actual = false }) {
  let item = { _id: Variable.dataUrl.params }
  if (actual) { return [this.Static[ID]] }
  if (!reload || !this.Static[ID]) {
    this.Static[ID] = {};
    if (data) {
      this.Static[ID] = Object.assign(this.Static[ID], data)
    }
  }
  if (data) {
    this.Static[ID].openModals = true
    if (data.item) { item = data.item }
  }


  return [this.Static[ID], item]
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
    default:
      return Helpers.moment(data).format("YYYY-MM-DD");
  }
};

fn.siteLink = function (e) {
  let link
  if (typeof e == "string") {
    link = e
  } else {
    e.preventDefault();
    if (!e.currentTarget || !e.currentTarget.href) {
      console.error("Not have href")
      return
    }
    link = e.currentTarget.href;
  }
  history.pushState(null, null, link);
  parsingUrl()
  return
}

fn.siteLinkModal = async function (e, data) {
  e.preventDefault();
  e.stopPropagation();
  if (!e.currentTarget || (!e.currentTarget.href && !e.currentTarget.dataset.href)) {
    console.error("Not have href")
    return
  }
  let link = e.currentTarget.href ? e.currentTarget.href : e.currentTarget.dataset.href
  history.pushState(null, null, link);
  let dataUrl = parsingUrl(link)
  await initPage(dataUrl, data);
  return
}

fn.recordsView = function (_id, action) {
  console.log('=e0fd8f= recordsView', _id, action)
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