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

const transactionType = function (type) {
  let returnType
  switch(type){
    case 'registration':
      returnType = 'transactionRegistration'
      break
    case 'referral_registration':
      returnType = 'transactionReferralRegistration'
      break
    case 'other':
      returnType = 'transactionOther'
      break
    case 'awards':
      returnType = 'transactionAwards'
      break
    case 'level':
      returnType = 'transactionLevel'
      break
  }
  return returnType;
};

const dateDelete = function(str){
  if(str == null){
    return
  }
	var b = str.split(/\D+/);
	var date = new Date(Date.UTC(b[0], --b[1], b[2], b[3], b[4], b[5], b[6]));
	date.setDate(date.getDate() + 14)
	var curr_date = date.getDate();
    var curr_month = date.getMonth();
	curr_month++;
	if(curr_date <= 9){
		curr_date="0"+curr_date
	}
	if(curr_month <= 9){
		curr_month="0"+curr_month
	}
	var curr_year = date.getFullYear();
	let result = curr_year + "-"+ curr_month + "-" + curr_date;
	return result;
}

export {
  ifHaveMedia, transactionType, dateDelete,
};
