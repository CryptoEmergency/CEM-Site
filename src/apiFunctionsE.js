import { jsx, jsxFrag, getStorage, sendApi, Variable, initGo } from "@betarost/cemjs";
import { checkAnswerApi } from "@src/functions.js";

const mainTrades = async () => {
  let data = {
    sort: {
      score: -1,
    },
    limit: 6,
  };

  let response = checkAnswerApi(
    await sendApi.create("getTrade", data)
  ).list_records;
  return response;
};


const giveNewCodeForReset = async (info) => {
  let data = {
    value:{},
  }
  let response
  if(info.email) {
   data.value.email=info.email;
  //  data.value.newCode=true;
  //  data.value.reset=true;
    response = checkAnswerApi(await sendApi.create("resetPassword", data));
  }else{
    data.value.phone=info.phone;
    data.value.co=Variable.lang.code;
     response = checkAnswerApi(await sendApi.create("resetPassword", data));
  } 
}


const sendResetMessage = async (info) => {
  let data = {
    value:{code:info.code ,reset: true,},
  }
  if(info.email) {
   data.value.email=info.email
  }else{
    data.value.phone=info.phone;
    data.value.co=Variable.lang.code;
  } 

  let response = checkAnswerApiE(await sendApi.create("confirm", data));
  console.log('=2342424=',response)
 return response
}

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
}

const delCom = async (info) => {
  console.log("=info=", info);
  let data = {
    value: {
      comments: {},
    },
    _id: Variable.Static.showNewsId,
   
  };

  info.mainCom
    ? (data.value.comments = {
        active: false,
        _id: info.id,
      })
    : (data.value.comments = {
        comments: {
          active: false,
          _id: info.id,
        },
      });
      let response = checkAnswerApi(await sendApi.create("setNews", data));
};

const sendComplaintApi = async (info) =>{
  console.log('=info=',info)
  let data = {
    value: {
      comments: {
       
      },
    },
    _id: Variable.Static.showNewsId,
  };


  info.data.mainCom
    ? (data.value.comments = {
      complain:info.complaint,
      _id:info.data.id
      })
    : (data.value.comments = {
        comments: {
          complain:info.complaint,
        _id:info.data.id
        },
      });

  console.log('=data=',data)
  let response = checkAnswerApi(await sendApi.create("setNews", data));
}

export {
  giveNewCodeForReset,
  sendResetMessage,
  delCom,
  mainTrades,
  sendInBlackList,
  sendComplaintApi
}
