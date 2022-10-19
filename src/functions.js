import {
  jsx,
  jsxFrag,
  Variable,
  getStorage,
  setValue,
  getValue,
  getAction,
  getVariable,
  sendApi,
  delDOM,
  timersClear,
  parsingUrl,
  initGo,
  initReload,
  Helpers,
} from "@betarost/cemjs";
import list from "@src/routerList.js";
import validator from "validator";
import moment from "moment";

import {
  changeStatistic,
  showVotersApi,
  getNewsItemInShow,
} from "@src/apiFunctions.js";
import { renderModalFullNews } from "@src/apiFunctionsE.js";

const wrapTextWithATag = (text) => {
  let textTag = text;
  textTag = Helpers.sanitizeHtml(textTag);
  textTag = textTag.replace(new RegExp("\n\n", 'g'), "\n").split("\n");
  //  let res = "<p>"+textTag.join("</p><p>") + "</p>";
  let res = "";
  for (let item of textTag) {
    res += "<p>" + item + "</p>";
  }
  return res;
};

const sliceString = function (str, number = 66) {
  let sliceStr = '';
  if (str.length >= number) {
    sliceStr = `${str.slice(0, number)} ...`;
  } else {
    sliceStr = str;
  }
  return sliceStr;
};

const wrapTagToText = (text) => {
  let textTag = Helpers.sanitizeHtml(text, { allowedTags: ['p'] });

  textTag = textTag.replace(new RegExp("</p><p>", 'gi'), "\n")

  textTag = textTag.replace(new RegExp("<p>", 'gi'), "").replace(new RegExp("</p>", 'gi'), "")
  console.log('=e8599e=3', textTag)


  return textTag;
};

const clickHide = function (e) {
  if (Variable.OutHideWindows.length != 0) {
    Variable.OutHideWindows.map((item, index) => {
      if (!document.body.contains(item[0]())) {
        Variable.OutHideWindows.splice(index, 1);
        return;
      }
      if (item[0]() === e.target || item[0]().contains(e.target)) {
      } else {
        if (item[1] && typeof item[1] == "function") {
          if (typeof item[1]() != "boolean") {
            item[1]().hidden = true;
          }
        } else if (typeof item[1] == "string") {
          Variable.DelModals(item[1]);
        }
        Variable.OutHideWindows.splice(index, 1);
      }
    });
  }
};

const timerTik = function () {
  //console.log("timerTik", "tt")
};

const getNewsItem = async function (type, count, category, mediaActveCategory) {
  let getLang = "en";
  let a = 6;
  let b = 12;
  if (getStorage("lang") == "ru") {
    getLang = "ru";
  }

  if (type === "media") {
    getLang = mediaActveCategory || getStorage("lang");
  }

  let data = {
    filter: {
      type: type,
      "languages.code": getLang,
    },
    select: {
      title: 1,
      preview: 1,
      image: 1,
      showDate: 1,
      "statistic.view": 1,
      "statistic.comments": 1,
    },
    sort: {
      showDate: -1,
    },
    limit: 6,
  };

  if (count > 0) {
    data.limit = b;
    data.offset = a + (count - 1) * b;
  }

  if (category && category != "All") {
    data.filter["category.name"] = category;
  }

  var response = checkAnswerApi(await sendApi.create("getNews", data));
  return response;
};

const getDateFormat = function (data, type) {
  // const lang = getVariable("languages")[getStorage("lang")];
  moment.locale(Variable.lang.code);
  //console.log("=b12dd9=", moment.locale());
  switch (type) {
    case "lenta":
      let secondsBefor = Math.round(
        (moment().format("x") - moment(data).format("x")) / 1000
      );
      if (secondsBefor < 86400) {
        return moment(data).fromNow();
      } else {
        return moment(data).format("DD MMMM YYYY");
      }
    case "userComment":
      return moment(data).format("YYYY-MM-DD hh:mm");
    default:
      return moment(data).format("YYYY-MM-DD");
  }
};

const siteLink = function (e) {
  e.preventDefault();
  let link = this.href;
  history.pushState(null, null, link);
  // timersClear();
  window.scrollTo({
    top: 0,
    // behavior: "smooth",
    behavior: "instant",
  });
  parsingUrl();
  //getAction("App", "start")();
};

const checkAnswerApi = function (data) {
  // console.log("checkAnswerApi", data);
  if (!data || !data.result) {
    console.error("Wrong answer from Api");
    return { list_records: [], totalFound: 0 };
  }
  return data.result;
};

const allValidation = (str, type, condition) => {
  if (type == "email") {
    return validator.isEmail(str);
  }
  if (condition) {
    return validator.matches(str, condition);
  }

  if (type == "phone") {
    return validator.matches(str, /[0-9]{10}/i);
  }

  if (type == "name") {
    return validator.matches(str, /[a-zA-Zа-яА-Яё\d]{2,500}/i);
  }

  if (type == "text") {
    return validator.matches(str, /[a-zA-Zа-яА-Яё\d]{2,500}/i);
  }

  if (type == "pass") {
    return validator.isStrongPassword(str, {
      minLength: 8,
      minLowercase: 0,
      minUppercase: 0,
      minNumbers: 0,
      minSymbols: 1,
    });
  }

  if (type == "inputNumberPaste") {
    return validator.matches(str, /^\d{1,}$/);
  }
  if (type == "inputNumber") {
    return validator.matches(str, /[0-9]{1}/i);
  }

  if (type == "passwordResetPass") {
    return validator.matches(str, /[0-9]{6}/i);
  }

  if (type == "agreement") {
    return str;
    // return str = !str;
  }
  if ((type = "nickName")) {
    return validator.matches(str, /^[a-zA-Z0-9_-]{3,16}$/);
  }
};

const changeActiveCommentsInput = (id) => {
  Variable.Static.activeCommentsInput = id;
  Variable.Static.showMainInput = false;
  initReload();
};

let sec = 0;
let interval;
const showVotersAndchangeStatistic = async (e, id, typeGet, typeSet, mainId, commentId, callBack) => {
  e.preventDefault();
  let type = e.target.dataset.name;
  if (e.type === "mousedown" || e.type === "touchstart") {
    interval = setInterval(async () => {
      sec = sec + 100;
      if (sec === 1000) {
        clearInterval(interval);
        sec = 0;
        let response = await showVotersApi(id, typeGet);
        if (response !== undefined) {
          response = response.list_records[0].evaluation.filter(
            (item) => item.type === type
          );
          Variable.SetModals(
            { name: "ModalWhoLike", data: { response } },
            true
          );
        }
      }
    }, 100);
  } else {
    clearInterval(interval);
    if (sec < 1000) {
      await changeStatistic(e, id, typeSet, mainId, commentId);
      if (typeof callBack == "function") {
        callBack();
      }
      // if (Variable.dataUrl.params === undefined) {
      //   await renderModalFullNews();
      // }
    }
    if (700 <= sec && sec < 1000) {
      let response = await showVotersApi(id, typeGet);
      response = response.list_records[0].evaluation.filter(
        (item) => item.type === type
      );

      Variable.SetModals({ name: "ModalWhoLike", data: { response } }, true);
    }
    sec = 0;
  }
};

function isEmpty(obj) {
  for (let key in obj) {
    return false;
  }
  return true;
}

const changeNewsCategory = async (e, type, init) => {
  const ID = "mainBlock";
  // e.target.closest('.tags').childNodes.forEach(function(child) {
  //   child.classList.remove('tag_button_active');
  // });
  // e.currentTarget.classList.add('tag_button_active');
  let typeCategory = e.currentTarget.dataset.name;
  setValue(ID, "activeCategory", typeCategory);
  let data = {
    select: {
      title: 1,
      preview: 1,
      image: 1,
      showDate: 1,
      "statistic.view": 1,
      "statistic.comments": 1,
    },
    sort: {
      showDate: -1,
    },
    limit: 6,
  };
  let response;
  if (type === "media") {
    if (typeCategory !== "en") {
      setValue(ID, `${type}Item`, await getNewsItem(type));
    } else {
      data.filter = {
        "languages.code": "en",
        type: type,
      };
      response = checkAnswerApi(await sendApi.create("getNews", data));
      setValue(ID, `${type}Item`, response);
    }
  } else {
    if (typeCategory === "All") {
      setValue(ID, `${type}Item`, await getNewsItem("news"));
    } else {
      let getLang = "en";
      if (getStorage("lang") == "ru") {
        getLang = "ru";
      }
      data.filter = {
        type,
        "languages.code": getLang,
        "category.name": typeCategory,
      };

      response = checkAnswerApi(await sendApi.create("getNews", data));
      setValue(ID, `${type}Item`, response);
    }
  }
  //init(true);
};

const ifHaveMedia = function (mediaArr, type, whatReturn) {
  if (mediaArr === null) {
    return "";
  }
  var media = mediaArr.filter((tmp) => tmp.type == type);
  if (media.length == 0) {
    return "";
  }
  return whatReturn;
};


const uploadMedia = function (file, type, onload, onprogress, xhr) {
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


export {
  sliceString,
  wrapTextWithATag,
  isEmpty,
  showVotersAndchangeStatistic,
  changeActiveCommentsInput,
  changeNewsCategory,
  getDateFormat,
  getNewsItem,
  siteLink,
  timerTik,
  clickHide,
  checkAnswerApi,
  allValidation,
  ifHaveMedia,
  uploadMedia,
  wrapTagToText
};
