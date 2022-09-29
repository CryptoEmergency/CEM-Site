import {
  jsx,
  jsxFrag,
  getStorage,
  sendApi,
  initGo,
  Variable
} from "@betarost/cemjs";
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

const getUserTransactions = async () => {
  let data = {
    sort: {
      showDate: -1
    },
    limit: 15, 
    filter: {
      'amount.cemd': {$gt: 0},
      userTo: Variable.myInfo._id
    }
  }
  let response = checkAnswerApi(await sendApi.create("getTransactions", data));
  return response
};


export {
  mainTrades, getUserTransactions,
};
