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
// import swiperload from "@assets/js/swiper.js";

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

export {
  ifHaveMedia,
};
