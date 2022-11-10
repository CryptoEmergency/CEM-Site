import {
  jsx,
  jsxFrag,
  Variable,
  parsingUrl,
  initReload,
  Helpers,
  sendApi
} from "@betarost/cemjs";

const validator = Helpers.validator
// import validator from "validator";
import moment from "moment";




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


const wrapTagToText = (text) => {
  let textTag = Helpers.sanitizeHtml(text, { allowedTags: ['p'] });

  textTag = textTag.replace(new RegExp("</p><p>", 'gi'), "\n")

  textTag = textTag.replace(new RegExp("<p>", 'gi'), "").replace(new RegExp("</p>", 'gi'), "")
  // console.log('=e8599e=3', textTag)


  return textTag;
};

const clickHide = function (e) {
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

const timerTik = async function () {
  // console.log("timerTik", "tt")
  let response = await sendApi.create("tik", {})
  if (response && response.result && Object.keys(response.result).length) {
    console.log('=df2a55=', response)
  }

};


const getDateFormat = function (data, type) {
  // const lang = getVariable("languages")[getStorage("lang")];
  moment.locale(Variable.lang.code);
  // console.log("=b12dd9=", moment.locale());
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
      return moment(data).format("YYYY-MM-DD HH:mm");
    default:
      return moment(data).format("YYYY-MM-DD");
  }
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


let sec = 0;
let interval;

function isEmpty(obj) {
  for (let key in obj) {
    return false;
  }
  return true;
}


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

const checkValid = function (Static, Array) {

  Static.isValid = true
  Array.forEach(function (elem) {
    if (!Static[elem].valid) {
      Static.isValid = false
    }
  })

  initReload()
  return;
}


export {
  wrapTextWithATag,
  isEmpty,
  getDateFormat,
  timerTik,
  clickHide,
  checkAnswerApi,
  allValidation,
  uploadMedia,
  wrapTagToText,
  validator,
  checkValid
};
