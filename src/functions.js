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
  initGo
} from "@betarost/cemjs";
import list from "@src/routerList.js";
import validator from "validator";
import moment from "moment";
import swiperload from "@assets/js/swiper.js";

const numberFixWithSpaces = function (num, fix) {
  let x = parseFloat(num).toFixed(fix);
  var parts = x.toString().split(".");
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  return parts.join(".");
};

const start = async function (reload) {
  const dataUrl = getVariable("dataUrl");
  let page = dataUrl.adress;
  if (!dataUrl.adress || dataUrl.adress == "") {
    await list.index(reload);
    after();
    return;
  }

  if (dataUrl.category) {
    page += "/" + dataUrl.category;
  } else if (dataUrl.adress == "user") {
    page = "user/index";
  }

  if (!list[page]) {
    await list.error404(reload);
    after();
    return;
  }

  await list[page](reload);
  after();
  return;
};

const after = function () {
  swiperload();
};

const clickCancel = function (e) {
  e.stopPropagation();
};

const clickHide = function (e) {
  //console.log("clickHide", e.target)
  Variable.langListShow = false
  //setValue("mainHeader", "langListShow", false);

  let obj = getValue("mainBlock", "showObject");
  for (let key in obj) {
    obj[key] = false;
  }
  setValue("mainBlock", "showObject", obj);
};

const timerTik = function () {
  //console.log("timerTik", "tt")
};

const getNewsItem = async function (type, category) {
  let getLang = "en";
  if (getStorage("lang") == "ru") {
    getLang = "ru";
  }

  if (type === "media") {
    getLang = getStorage("lang");
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

  if (category && category != "All") {
    data.filter["category.name"] = category
  }

  var response = checkAnswerApi(await sendApi.create("getNews", data));
  return response;
};

const getDateFormat = function (data, type) {
  const lang = getVariable("languages")[getStorage("lang")];
  moment.locale(lang.code);
  //console.log("=b12dd9=", moment.locale());
  switch (type) {
    case "lenta":
      let secondsBefor = Math.round(
        (moment().format("x") - moment(data).format("x")) / 1000
      );
      if (secondsBefor < 86400) {
        return moment(data).fromNow();
      } else {
        // return moment(data).format("LL")
        return moment(data).format("DD MMMM YYYY");
      }
    default:
      return moment(data).format("YYYY-MM-DD");
  }
};

const getNewsCategory = async function (type) {
  let getLang = "en";
  if (getStorage("lang") == "ru") {
    getLang = "ru";
  }
  let data = {
    filter: {
      type,
    },
  };
  data.filter["count." + getLang] = { $gt: 0 };

  var response = checkAnswerApi(await sendApi.create("getCategories", data));
  console.log('=response=',response)
  return response;
};

const timerCourse = async function () {
  var course = checkAnswerApi(await sendApi.getCourse());
  setValue("mainBlock", "mainCourse", course.list_records[0]);
};

const siteLink = function (e) {
  e.preventDefault();
  let link = this.href;
  history.pushState(null, null, link);
  timersClear();
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
  parsingUrl()
  //getAction("App", "start")();
};

const changeLang = function (e) {
  e.preventDefault();
  let link = this.href;
  history.pushState(null, null, link);
  timersClear();
  parsingUrl()
  //initGo()
  //getAction("App", "start")();
};

const checkAnswerApi = function (data) {
  // console.log(data);
  if (!data || !data.result) {
    console.error("Wrong answer from Api");
    return { list_records: [{}], totalFound: 0 };
  }
  return data.result;
};

const allValidation = (str, type, condition) => {
  console.log(validator);
  if (type == "email") {
    return validator.isEmail(str);
  }
  if (condition) {
    return validator.matches(str, condition);
  }

  if (type == "phone") {
    return validator.matches(str, /[0-9]{10}/i);
  }

  if (type == "pass") {
    return validator.isStrongPassword(str, {
      minLength: 8,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 1,
    });
  }

  if (type == "agreement") {
    return str;
    // return str = !str;
  }
};

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

const createParagraf = function (arr) {
  let result = [];
  for (let i of arr) {
    switch (i.nodeName) {
      case "A":
        let a = (
          <a target="_blank" rel="nofollow noopener" href={i.innerText}>
            {i.innerText}
          </a>
        );
        result.push(a);
        break;
      case "SPAN":
        let span = <span>{i.innerText}</span>;
        result.push(span);
        break;
      default:
        let text = i.nodeValue;
        result.push(text);
    }
  }
  return result;
};

const parseTextforJsx = function (text) {
  const parser = new DOMParser();
  let responseText = parser.parseFromString(text, "text/html");
  let htmlDoc = [...responseText.body.childNodes];
  let result = [];
  for (let i of htmlDoc) {
    let arr = i.childNodes;
    let tegP = (
      <p>
        {createParagraf(arr).map((i) => {
          return i;
        })}
      </p>
    );
    result.push(tegP);
  }
  return result;
};

// const getExchangeOrTradeList = async (e, firstLoad, count) => {

//   const ID = "mainBlock";
//   let apiType = e.currentTarget.dataset.apitype;
//   let firstLimit = e.currentTarget.dataset.firstlimit;
//   let secondLimit = e.currentTarget.dataset.secondlimit;
//   let type = e.currentTarget.dataset.type;
//   let data = {};
//   if (firstLoad) {
//     data = {
//       limit: +firstLimit,
//       sort: {
//         score: -1,
//       },
//     };
//   } else {
//     console.log(count)
//     data = {
//       limit: +secondLimit,
//       offset: +firstLimit + secondLimit * (count - 1),
//     };
//     console.log(data)
//   }
//   console.log(apiType)
//   let response
//     = checkAnswerApi(await sendApi.create(`${apiType}`, data));
//   console.log(response)
//   if (firstLoad) {
//     return response;
//   } else {
//     let prevList = getValue(ID, `${type}List`);
//     response.list_records = [
//       ...prevList.list_records,
//       ...response.list_records,
//     ];
//     console.log(response)
//     setValue(ID, `${type}List`, response);

//   }
// }

export {
  parseTextforJsx,
  changeNewsCategory,
  getDateFormat,
  getNewsItem,
  getNewsCategory,
  siteLink,
  changeLang,
  timerTik,
  timerCourse,
  clickHide,
  clickCancel,
  start,
  checkAnswerApi,
  allValidation,
  numberFixWithSpaces,
};
