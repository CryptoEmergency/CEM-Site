import {
  jsx,
  jsxFrag,
  getStorage,
  setValue,
  getValue,
  getAction,
  getVariable,
  sendApi,
  delDOM,
  timersClear,
  parsingUrl,
} from "@betarost/cemjs";
import { checkAnswerApi } from "@src/functions.js";

const getUserInfoProfile = async function (nickname) {
  const userInfo = checkAnswerApi(
    await sendApi.create("getUsers", {
      filter: {
        nickname: nickname,
      },
      select: {
        _id: 1,
        subscribe: 1,
        fullname: 1,
        nickname: 1,
        information: 1,
        "avatar.name": 1,
        "frame.name": 1,
        "background.name": 1,
        statistic: 1,
        online: 1,
        awards: 1,
        email: 1,
        country: 1,
        rank: 1,
        status: 1,
        startDelete: 1,
      },
      limit: 1,
    })
  );

  if (userInfo && userInfo.list_records && userInfo.list_records[0]) {
    return userInfo.list_records[0];
  } else {
    return {};
  }
};

const getNewsItemInShow = async function (id) {
  console.log('=8e0182=', id)
  let data = {
    filter: {
      _id: id,
    },
    select: {
      image: 1,
      preview: 1,
      showDate: 1,
      source: 1,
      "statistic.view": 1,
      "statistic.comments": 1,
      text: 1,
      title: 1,
    },
    limit: 4,
  };
  let response = checkAnswerApi(await sendApi.create("getNews", data));
  return response;
};

// const getExchangeList = async (count) => {
//     let data = {};
//     if (!count) {
//         data = {
//             limit: 10,
//             sort: {
//                 score: -1,
//             },
//         };
//     } else {
//         data = {
//             limit: 10, //limit12
//             offset: 10 + 10 * (count - 1),
//             sort: {
//                 score: -1,
//             },
//         };
//     }
//     let response = checkAnswerApi(await sendApi.create("getExchange", data));
//     return response
// };

const getTradeOrExchangeList = async (type, count) => {
  let a;
  let b;
  if (type === "getTrade") {
    a = 20;
    b = 50;
  } else {
    a = 10;
    b = 10;
  }

  let data = {};
  if (!count) {
    console.log("=first=");
    data = {
      limit: a,
      sort: {
        score: -1,
      },
    };
  } else {
    console.log("=more=");
    data = {
      limit: b,
      offset: a + b * (count - 1),
      sort: {
        score: -1,
      },
    };
  }
  let response = checkAnswerApi(await sendApi.create(type, data));
  return response;
};

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

const mainQuestions = async (optionsSelect, limit = 6, offset = 0) => {
  let filter = {
    "languages.code": getStorage("lang"),
  };

  let sort = {
    showDate: -1,
  };

  // optionsSelect.map((item) => {
  //     if (item) {
  //         if (item.active == "all") {
  //             console.log("active all");
  //         } else if (item.active == "open") {
  //             filter.close = false
  //         } else if (item.active == "closed") {
  //             filter.close = true
  //             // filter.bestId = {}
  //             // filter.bestId["$exist"] = false
  //         } else if (item.active == "best") {
  //             filter.close = true
  //             filter.bestId = {}
  //             filter.bestId["$exist"] = true
  //         } else if (item.active == "date") {
  //             console.log('=9988ee=', "date")
  //             sort.showDate = -1;
  //         } else if (item.active == "views") {
  //             console.log('=19f369=', "views")
  //             sort["statistic.view"] = -1
  //         } else if (item.active == "answers") {
  //             console.log('=952e23=', "answers")
  //             sort["statistic.answer"] = -1
  //         }
  //     }

  // })
  // if (optionsSelect) {
  //     if (optionsSelect.active == "all") {
  //         console.log("active all");
  //     } else if (optionsSelect.active == "open") {
  //         filter.close = false
  //     } else if (optionsSelect.active == "closed") {
  //         filter.close = true
  //         // filter.bestId = {}
  //         // filter.bestId["$exist"] = false
  //     } else if (optionsSelect.active == "best") {
  //         filter.close = true
  //         filter.bestId = {}
  //         filter.bestId["$exist"] = true
  //     } else if (optionsSelect.active == "date") {
  //         console.log('=9988ee=', "date")
  //         sort.showDate = -1;
  //     } else if (optionsSelect.active == "views") {
  //         console.log('=19f369=', "views")
  //         sort["statistic.view"] = -1
  //     } else if (optionsSelect.active == "answers") {
  //         console.log('=952e23=', "answers")
  //         sort["statistic.answer"] = -1
  //     }
  // }

  if (optionsSelect) {
    const question = optionsSelect.questions;
    const date = optionsSelect.date;

    if (question.active == "open") {
      filter.close = false;
    } else if (question.active == "closed") {
      filter.close = true;
      // filter.bestId = {}
      // filter.bestId["$exist"] = false
    } else if (question.active == "best") {
      filter.close = true;
      filter.bestId = {};
      filter.bestId["$exist"] = true;
    }

    if (date.active == "views") {
      console.log("=19f369=", "views");
      sort = {
        "statistic.view": -1,
      };
    } else if (date.active == "answers") {
      console.log("=952e23=", "answers");
      sort = {
        "statistic.answer": -1,
      };
    }
  }

  let data = {
    filter: filter,
    select: {
      title: 1,
      showDate: 1,
      statistic: 1,
      languages: 1,
      close: 1,
      bestId: 1,
      media: 1,
      author: 1,
    },
    sort: sort,
    limit: limit,
    offset: offset,
  };
  console.log(" data filter", data);
  let response = checkAnswerApi(await sendApi.create("getQuestions", data));
  return response;
};

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

const mainExchanges = async () => {
  let data = {
    sort: {
      score: -1,
    },
    limit: 6,
  };

  let response = checkAnswerApi(
    await sendApi.create("getExchange", data)
  ).list_records;
  return response;
};

const mainUsers = async (additional = NULL, limit = 6, offset = 0) => {
  let filter = {
    "confirm.registrasion": true
  };

  if (additional) {
    filter["$or"] = [
      {
        "rank.basic": true,
        "rank.creator": false,
        "rank.expert": false
      },
      {
        "rank.basic": false,
        "rank.creator": true,
        "rank.expert": false
      },
      {
        "rank.basic": false,
        "rank.creator": false,
        "rank.expert": true
      }
    ];
    switch (additional.id) {
      case "common":
        if (additional.active) {
          filter["$or"][0]["rank.basic"] = true;
        } else {
          filter["$or"][0]["rank.basic"] = false;
        }
      case "content-makers":
        if (additional.active) {
          filter["$or"][2]["rank.expert"] = true;
        } else {
          filter["$or"][2]["rank.expert"] = false;
        }
      case "specialists":
        if (additional.active) {
          filter["$or"][1]["rank.creator"] = true;
        } else {
          filter["$or"][1]["rank.creator"] = false;
        }
      case "online":
        if (additional.active) {
          filter["online"] = true;
        } else {
          delete filter.online;
        }
    }

    let data = {
      "filter": filter,
      "select": {
        "rank": 1,
        "social": 1,
        "subscribe": 1,
        "nickname": 1,
        "fullname": 1,
        "information.speciality": 1,
        "avatar.name": 1,
        "frame.name": 1,
        "statistic": 1,
        "online": 1,
        "awards": 1,
        "status": 1
      },
      "limit": limit,
      "offset": offset
    }

    console.log("! data filter", data)
    let response = checkAnswerApi(await sendApi.create("getUsers", data));
    return response
  }
};

const mainNews = async () => {
  let data = {
    filter: {
      type: "news",
      "languages.code": "ru",
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

  let response = checkAnswerApi(
    await sendApi.create("getNews", data)
  ).list_records;
  return response;
};

const getUserAboutProfile = async function (nickname) {
  const userInfo = checkAnswerApi(
    await sendApi.create("getUsers", {
      filter: {
        nickname: nickname,
      },
      select: {
        information: 1,
        work: 1,
        interest: 1,
        country: 1,
        fullname: 1,
      },
    })
  );

  if (userInfo && userInfo.list_records && userInfo.list_records[0]) {
    return userInfo.list_records[0];
  } else {
    return {};
  }
};

export {
  mainTrades,
  mainExchanges,
  mainUsers,
  mainNews,
  getNewsItemInShow,
  getTradeOrExchangeList,
  getUserInfoProfile,
  getUserAboutProfile,
  mainQuestions,
  getWorldPress,
};
