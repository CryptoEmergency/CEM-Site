import {
  jsx,
  jsxFrag,
  getStorage,
  sendApi,
  initGo,
  Variable
} from "@betarost/cemjs";
import { checkAnswerApi } from "@src/functions.js";
import { renderModalFullNews } from "@src/apiFunctionsE.js";

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

const changeStatistic = async function (e, commentId, subcommentId) {
  let data;
  data = {
    value: {
      comments: {
        _id: commentId,
      },
    },
    _id: Variable.Static.showNewsId,
  };

  if (subcommentId) {
    data.value.comments.comments = {
      evaluation: e.target.dataset.name,
      _id: subcommentId,
    }
  } else {
    data.value.comments.evaluation = e.target.dataset.name
  }
  console.log('=changeStatistic=', changeStatistic)
  let response = checkAnswerApi(await sendApi.create("setNews", data));
  if (Variable.dataUrl.params !== undefined) {
    initGo()
  }


};

const showVotersApi = async (id) => {
  let data = {
    filter: {
      _id: id
    },
    select: {
      evaluation: 1
    }
  };
  let response = checkAnswerApi(await sendApi.create("getComments", data));
  return response
}

const sendNewCommentApi = async function (item, comment, commentId, edit) {
  console.log('=096bf2=', item, comment, commentId, edit)

  let data = {
    value: {
      comments: {},
    },
    _id: Variable.Static.showNewsId,
  };
  if (item.image) {
    data.value.comments = { text: comment }
  } else if (edit !== undefined && edit.mainCom) {
    data.value.comments = {
      text: comment,
      _id: commentId
    }
  } else if (edit !== undefined && !edit.mainCom) {
    data.value.comments = {
      comments: {
        text: comment,
        _id: commentId,
      }

    }
  } else {
    data.value.comments = {
      comments: {
        quote: item._id,
        text: comment,
      },
      _id: commentId,
    }

    // data = {
    //   value: {
    //     comments: {
    //       comments: {
    //         quote: item._id,
    //         text: comment,
    //       },
    //       _id: commentId,
    //     },
    //   },
    //   _id: Variable.Static.showNewsId,
    // };
  }
  let response = checkAnswerApi(await sendApi.create("setNews", data));


  if (Variable.dataUrl.params === undefined) {
    await renderModalFullNews()
  }
  return response;
};

const getNewsItemInShow = async function (id) {
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

const getPostsItemInShow = async function (id) {
  let data = {
    filter: {
      _id: id,
    },
    // select: {
    //   author: 1,
    //   forFriends: 1,
    //   languages: 1,
    //   media: 1,
    //   showDate: 1,
    //   statistic: 1,
    //   text: 1,
    //   title: 1,
    //   updateTime: 1
    // },
    // limit: 12,
  };
  let response = checkAnswerApi(await sendApi.create("getPost", data));
  return response;
};



const getQuestionItemInShow = async function (id) {


  let data = {
    filter: {
      questionId: id,
    },
    sort: {
      showDate: -1,
    },
    select: {
      best: 1,
      author: 1,
      statistic: 1,
      showDate: 1,
      media: 1,
      text: 1,
      comments: 1,
    },
    limit: 12,
  };

  let response = checkAnswerApi(await sendApi.create("getQuestions", data));
  console.log('=df5226=', response)
  return response;
};

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

const mainUsers = async (limit = 6, offset = 0, additional = null) => {
  let filter = {
    "confirm.registrasion": true,
  };



  filter["$or"] = [
    {
      "rank.basic": true,
      "rank.expert": false,
      "rank.creator": false,
    },
    {
      "rank.basic": false,
      "rank.expert": true,
      "rank.creator": false,
    },
    {
      "rank.basic": false,
      "rank.expert": false,
      "rank.creator": true,
    },
  ];

  if (additional != null) {
    // console.log('=efba5f=', additional[0].group)
    if (additional[0].group == "experts") {
      filter["rank.expert"] = true;
      delete filter.$or;
    } else if (additional[0].group == "creator") {
      filter["rank.creator"] = true;
      delete filter.$or;
    }
    additional.forEach((check) => {
      if (check.id == "common") {
        if (check.active) {
          filter["$or"][0]["rank.basic"] = true;
        } else {
          filter["$or"][0]["rank.basic"] = false;
        }
      }
      if (check.id == "content-makers") {
        if (check.active) {
          filter["$or"][2]["rank.creator"] = true;
        } else {
          filter["$or"][2]["rank.creator"] = false;
        }
      }
      if (check.id == "specialists") {
        if (check.active) {
          filter["$or"][1]["rank.expert"] = true;
        } else {
          filter["$or"][1]["rank.expert"] = false;
        }
      }
      if (check.id == "online") {
        if (check.active) {
          filter["online"] = true;
        } else {
          delete filter.online;
        }
      }
    });
  }

  let data = {
    filter: filter,
    select: {
      rank: 1,
      social: 1,
      subscribe: 1,
      nickname: 1,
      fullname: 1,
      "information.speciality": 1,
      "avatar.name": 1,
      "frame.name": 1,
      statistic: 1,
      online: 1,
      awards: 1,
      status: 1,
    },
    limit: limit,
    offset: offset,
  };

  let response = checkAnswerApi(await sendApi.create("getUsers", data));
  return response;
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
  showVotersApi,
  changeStatistic,
  sendNewCommentApi,
  mainTrades,
  mainExchanges,
  mainUsers,
  mainNews,
  getNewsItemInShow,
  getPostsItemInShow,
  getQuestionItemInShow,
  getTradeOrExchangeList,
  getUserInfoProfile,
  getUserAboutProfile,
  mainQuestions,
  getWorldPress,
};
