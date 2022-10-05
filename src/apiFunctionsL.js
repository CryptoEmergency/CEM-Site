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

const getUserTransactions = async (count = 0) => {
  let data = {
    sort: {
      showDate: -1
    },
    limit: 5,
    offset: 5 * count,
    filter: {
      'amount.cemd': {$gt: 0},
      userTo: Variable.myInfo._id
    }
  }
  let response = checkAnswerApi(await sendApi.create("getTransactions", data));
  return response
};

const getUserBlackList = async (count = 0) => {
  let data = {
    select: {
      blackList: 1
    },
    limit: 5,
    offset: 5 * count,
    filter: {
      _id: Variable.myInfo._id
    }
  }
  let response = checkAnswerApi(await sendApi.create("getUsers", data));
  return response
}

const changePassword = async (oldPassword, newPassword) => {
  let data = {
    value: {
      oldPassword: oldPassword,
      newPassword: newPassword 
    }
  }
  let response = checkAnswerApi(await sendApi.create("changePassword", data));
  return response
}

const deleteUser = async () => {
  let data = {
    value: {
      'status.delete': true,
      startDelete: new Date().toISOString()
    }
  }
  let response = checkAnswerApi(await sendApi.create("setUsers", data));
  return response
}

const restoreUser = async () => {
  let data = {
    value: {
      'status.delete': false,
      startDelete: ''
    }
  }
  let response = checkAnswerApi(await sendApi.create("setUsers", data));
  return response
}

const deleteUserFromBlacklist = async (user) => {
  let data = {
    value: {
      blackList: user
    }
  }
  let response = checkAnswerApi(await sendApi.create("setUsers", data));
  return response
}

export {
  mainTrades, getUserTransactions, getUserBlackList, changePassword, deleteUser, restoreUser, deleteUserFromBlacklist
};
