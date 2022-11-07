import {
  jsx,
  jsxFrag,
  sendApi,
  Variable,
  Helpers,
} from "@betarost/cemjs";
import { checkAnswerApi } from "@src/functions.js";

const api = async (data) => {
  let response = {}
  if (data.type == "get") {
    response = await sendApi.send(data);
    if (data.name) {
      Variable[data.name] = response
    }
  } else {
    response = await sendApi.create(data.action, data.data);
  }
  return response
}

const getWorldPress = async (count, sortBy = "score", sortType = "-1") => {
  let data = {
    limit: 10,
    sort: {},
  };
  if (count) {
    data.offset = 10 * count;
  }
  data.sort[sortBy] = Number(sortType);
  let response = checkAnswerApi(await sendApi.create("getPress", data));
  return response;
};

const giveNewCodeForReset = async (info) => {
  let data = {
    value: {},
  };
  let response;
  if (info.email) {
    data.value.email = info.email;
    //  data.value.newCode=true;
    //  data.value.reset=true;
    response = checkAnswerApi(await sendApi.create("resetPassword", data));
  } else {
    data.value.phone = info.phone;
    data.value.co = Variable.lang.code;
    response = checkAnswerApi(await sendApi.create("resetPassword", data));
  }
};

const sendResetMessage = async (info) => {
  let data = {
    value: { code: info.code, reset: true },
  };
  if (info.email) {
    data.value.email = info.email;
  } else {
    data.value.phone = info.phone;
    data.value.co = Variable.lang.code;
  }

  let response = checkAnswerApiE(await sendApi.create("confirm", data));

  return response;
};

const checkAnswerApiE = function (data) {
  if (!data || !data.result) {
    console.error("Wrong answer from Api!!!!");

    return { list_records: [{}], totalFound: 0 };
  }
  // console.log('=21f14e=',data)
  return data;
};

const sendInBlackList = async (info) => {
  let data = {
    value: {
      blackList: info.id,
    },
  };

  let response = checkAnswerApi(await sendApi.create("setUsers", data));
};


const delCom = async (info) => {

  let data = {
    value: {},
    _id: info.mainId,
  };

  if (info.typeSet === "doRole") {
    if (info.id === info.mainId) {
      data.value = { active: false };
      data.roleAction = info.roleAction;
    } else if (info.mainCom === true) {
      data.value.comments = {
        active: false,
        _id: info.id,
      };
      data.roleAction = info.roleAction;
    } else if (info.mainCom === false) {
      data.value.comments = {
        comments: {
          active: false,
          _id: info.id,
        },
      };
      data.roleAction = info.roleAction;
    }
  } else {
    if (info.id === info.mainId) {
      data.value = { active: false };
    } else if (info.mainCom === true) {
      data.value.comments = {
        active: false,
        _id: info.id,
      };
    } else if (info.mainCom === false) {
      data.value.comments = {
        comments: {
          active: false,
          _id: info.id,
        },
      };
    }
  }
  // let data = {
  //   value: {
  //     comments: {},
  //   },
  //   _id: Variable.Static.showNewsId,
  // };

  // info.mainCom
  //   ? (data.value.comments = {
  //     active: false,
  //     _id: info.id,
  //   })
  //   : (data.value.comments = {
  //     comments: {
  //       active: false,
  //       _id: info.id,
  //     },
  //   });
  let response = checkAnswerApi(await sendApi.create(info.typeSet, data));
};

const sendComplaintApi = async (info) => {
  let data = {
    value: {},
    _id: info.data.mainId,
  };

  if (info.data.id === info.data.mainId) {
    data.value.complain = info.complaint;
  } else if (info.data.mainCom === true) {
    data.value.comments = {
      complain: info.complaint,
      _id: info.data.id,
    };
  } else if (info.data.mainCom === false) {
    data.value.comments = {
      comments: {
        complain: info.complaint,
        _id: info.data.id,
      },
    };
  }

  // let data = {
  //   value: {
  //     comments: {},
  //   },
  //   _id: Variable.Static.showNewsId,
  // };

  // info.data.mainCom
  //   ? (data.value.comments = {
  //     complain: info.complaint,
  //     _id: info.data.id,
  //   })
  //   : (data.value.comments = {
  //     comments: {
  //       complain: info.complaint,
  //       _id: info.data.id,
  //     },
  //   });

  // if(info.data.typeSet ==="setAnswer"){
  //  data ={

  //       value: {
  //         complain: info.complaint,
  //       },
  //       _id: info.data.id,

  //  }
  // }
  let response = checkAnswerApi(await sendApi.create(info.data.typeSet, data));
};




export {
  getWorldPress,
  api,
  giveNewCodeForReset,
  sendResetMessage,
  delCom,
  sendInBlackList,
  sendComplaintApi,
};
