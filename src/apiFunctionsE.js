import {
  jsx,
  jsxFrag,
  getStorage,
  sendApi,
  Variable,
  initGo,
} from "@betarost/cemjs";
import { checkAnswerApi } from "@src/functions.js";
import { getNewsItemInShow } from "@src/apiFunctions.js";


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

const checkNickName = async (nickName) => {
  let data = {
    filter: {
      nickname: nickName
    }
  }
  let response = checkAnswerApi(await sendApi.create("getUsers", data));
  return response.totalFound
}

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
  console.log("=2342424=", response);
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
const getQuestionsItemInShow = async function (id, type) {
  let data = {
    filter: {},
    select: {
      author: 1,
      best: 1,
      comments: 1,
      media: 1,
      showDate: 1,
      statistic: 1,
      text: 1,
      title: 1,
      close: 1,
    },
    sort: { showDate: -1 },
    limit: 12,
  };

  if (type === "getQuestions") {
    data.filter._id = id
  } else {
    data.filter.questionId = id
  }
  let response = checkAnswerApi(await sendApi.create(type, data));
  return response;
};

const delCom = async (info) => {
  console.log("=info=", info);
  
  let data = {
    value:{},
    _id: info.mainId,
  }
  if(info.typeSet ==="setAnswer" ){
    if( info.id === info.mainId){
      data.value = {active:false};

    }
    else if( info.mainCom === true){
      data.value.comments = {
        active:false,
        _id : info.id,
      }

    }
    else if( info.mainCom === false){
      data.value.comments = {
        comments :{
          active:false,
        _id : info.id,
      }
      }

    }

  }else if(info.typeSet ==="doRole"){

    if( info.id === info.mainId){
      data.value = {active:false};
      data.roleAction = info.roleAction
    }
    // else if( info.mainCom === true){
    //   data.value.comments = {
    //     active:false,
    //     _id : info.id,
    //   }
    //   data.roleAction = info.roleAction
    // }
    // else if( info.mainCom === false){
    //   data.value.comments = {
    //     comments :{
    //       active:false,
    //     _id : info.id,
    //   }
    //   }
    //   data.roleAction = info.roleAction
    // }

    // data._id = info.id;
    // data.value = {
    //   active:false
    // };
    // data.roleAction = info.roleAction
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
  console.log('=data=',data)
  let response = checkAnswerApi(await sendApi.create(info.typeSet, data));
  console.log('=3c68aa=',response)
};

const sendComplaintApi = async (info) => {
  console.log("=info=", info);

  let data ={
    value:{},
    _id: info.data.mainId,
  }

  if(info.data.typeSet ==="setAnswer"){
    data.value.complain = info.complaint;
    
  }

  if(info.data.typeSet ==="setAnswer" && info.data.id === info.data.mainId){
    data.value.complain = info.complaint;
  }
  else if(info.data.typeSet ==="setAnswer" && info.data.mainCom === true){
    data.value.comments = {
      complain : info.complaint,
      _id : info.data.id,
    }
  }
  else if(info.data.typeSet ==="setAnswer" && info.data.mainCom === false){
    data.value.comments = {
      comments :{
      complain : info.complaint,
      _id : info.data.id,
    }
    }
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

  console.log("=data=", data);
  let response = checkAnswerApi(await sendApi.create(info.data.typeSet, data));
};

const renderModalFullNews = async () => {
  Variable.Modals.pop();
  let news = await getNewsItemInShow(Variable.Static.showNewsId);
  news = news.list_records[0];
  Variable.SetModals({
    name: "ModalFullNews",
    data: { news: news },
  });
};

export {
  checkNickName,
  getQuestionsItemInShow,
  renderModalFullNews,
  giveNewCodeForReset,
  sendResetMessage,
  delCom,
  sendInBlackList,
  sendComplaintApi,
};
