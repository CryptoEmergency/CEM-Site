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
} from "@betarost/cemjs";
import list from "@src/routerList.js";
import validator from "validator";
import moment from "moment";
import swiperload from "@assets/js/swiper.js";

const ifHaveMedia = function (mediaArr, type, whatReturn) {
  if (mediaArr === null) {
    return "";
  }
  var media = mediaArr.filter(tmp => tmp.type == type)
  if (media.length == 0) {
    return "";
  }
  return whatReturn;
};


const showAnswerAdditionallyContainer = (id) => {
  Variable.Static.answerAdditionallyShow = id;
  console.log('=Variable.Static.answerAdditionally2=',Variable.Static.answerAdditionally)
initReload()
}

const closeAnswerAdditionally = (e) => {
  e.stopPropagation()
  Variable.Static.answerAdditionally =true;
  Variable.Static.answerAdditionallyShow = "";
}


export {
  ifHaveMedia,
  showAnswerAdditionallyContainer,
  closeAnswerAdditionally,
};
