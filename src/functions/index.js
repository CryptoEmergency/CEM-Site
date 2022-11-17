import { Variable, parsingUrl, initPage, Helpers, getStorage, setStorage, sendApi, initGo, initReload } from "@betarost/cemjs";
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
fn.validator = Helpers.validator
fn.sanitizeHtml = Helpers.sanitizeHtml
fn.test = function () {
  console.log('=f83cf3 FN=', this)
  return true

}

fn.clearText = function (data) {
  return Helpers.stringToHtml(Helpers.sanitizeHtml(data))
}

fn.paragraph = function (str) {
  let textTag = str;
  textTag = textTag.replace(new RegExp("\n\n", 'g'), "\n").split("\n");
  let res = "";
  for (let item of textTag) {
    res += "<p>" + item + "</p>";
  }
  return res;
}

fn.ifHaveMedia = function (mediaArr, type) {
  if (!mediaArr || !mediaArr.length || !Array.isArray(mediaArr)) {
    return false
  }
  var media = mediaArr.filter((tmp) => tmp.type == type);
  if (media.length == 0) {
    return false
  }
  return true;
};

fn.editText = function (str, filter = {}) {
  if (!str) { str = "" }
  let out = str.trim()

  if (filter.clear) {
    out = out.replace(new RegExp("</p><p>", 'gi'), "</p><p>\n")
    out = Helpers.sanitizeHtml(out, { allowedTags: [], allowedAttributes: {} })
  }

  if (filter.slice) {
    out = fn.sliceString(out, filter.slice)
  }



  if (filter.paragraph) {
    out = fn.paragraph(out).trim()
  }

  if (filter.html) {
    out = Helpers.stringToHtml(out)
  }

  return out
}

fn.splitArray = function (arr, size) {
  let arrReturn = [];
  for (let i = 0; i < arr.length; i += size) {
    arrReturn.push(arr.slice(i, i + size));
  }
  return arrReturn
}
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
  // console.log("timerTik", "tt")
  let response = await sendApi.create("tik", {})
  if (response && response.result && Object.keys(response.result).length) {
    console.log('=df2a55=', response)
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
  // console.log('=fc61e3=', link, window.location.href, Variable.dataUrl)
  if (link == window.location.href || link == Variable.dataUrl.href) {
    initGo("newPage")
    // window.scrollTo({
    //   top: 0,
    //   behavior: "instant",
    // });
  } else {

    history.pushState(null, null, link);
    parsingUrl()
  }
  return
}


fn.checkValid = function (Static, Array) {
  Static.isValid = true
  Array.forEach(function (elem) {
    if (!Static[elem].valid) {
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