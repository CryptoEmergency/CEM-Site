import {
  jsx,
  jsxFrag,
  getStorage,
  sendApi,
  initGo,
  Variable,
  initReload,
  Helpers,
} from "@betarost/cemjs";
import { checkAnswerApi } from "@src/functions.js";
import { renderModalFullNews } from "@src/apiFunctionsE.js";

const changeStatistic = async function (
  e,
  commentId,
  type,
  mainId,
  subcommentId
) {

  console.log('=7d2ace=',commentId,
  type,mainId)
  let data;
  if ((type === "setAnswer" || type === "setPost" ) && !mainId) {
    console.log('=1=')
     data = {
      value: {
        evaluation: e.target.dataset.name,
      },
      _id: commentId,
    };
  } else if (!subcommentId) {
    console.log('=2=')
    data = {
      value: {
        comments: {
          _id: commentId,
          evaluation: e.target.dataset.name,
        },
      },
      _id: mainId,
    };
  } else {
    data = {
      value: {
        comments: {
          _id: subcommentId,
          comments: {
            evaluation: e.target.dataset.name,
            _id: commentId,
          },
        },
      },
      _id: mainId,
    };
    //   if (subcommentId) {
    //     data.value.comments.comments = {
    //       evaluation: e.target.dataset.name,
    //       _id: subcommentId,
    //     };
    //   } else {
    //     data.value.comments.evaluation = e.target.dataset.name;
    //   }
  }
  console.log('=datadatadatadata=',data)
  let response = checkAnswerApi(await sendApi.create(type, data));
  // initReload();
  if (Variable.dataUrl.params !== undefined) {
    initReload();
  }

  if(type === "setPost"){
    Variable[`PageLenta${ Variable.Static.lentaPage}`] = await sendApi.send({
      action: "getPost", short: true, cache: true, name: `PageLenta${ Variable.Static.lentaPage}`, limit: 15, filter: Helpers.getFilterLenta({}, Variable.Static.lentaPage)
    });
  }
};

const changeSubscription = async (id,type) => {
  let data = {
    value: {
      subscribed: id
    }
  };
  let response = checkAnswerApi(await sendApi.create(type, data));
 Variable.Static.answerAdditionally = "";
    Variable[`PageLenta${ Variable.Static.lentaPage}`] = await sendApi.send({
      action: "getPost", short: true, cache: true, name: `PageLenta${ Variable.Static.lentaPage}`, limit: 15, filter: Helpers.getFilterLenta({}, Variable.Static.lentaPage)
    });
  
}

const showVotersApi = async (id, type) => {
  console.log("=id=", id);
  let data = {
    filter: {
      _id: id,
    },
    select: {
      evaluation: 1,
    },
  };
  let response = checkAnswerApi(await sendApi.create(type, data));
  // let response = await sendApi.send({ action: type, filter:{
  //   _id: id
  // }, select: {
  //   evaluation: 1
  // } });
  // return response.result
  return response;
};

const sendNewCommentApi = async function (
  item,
  comment,
  typeSet,
  mainId,
  commentId
) {
  console.log("=096bf2=", item, comment, typeSet, mainId, commentId);

  let data = {
    value: {
      comments: {},
    },
    _id: mainId,
  };

  if (item.image ) {
    data.value.comments = { text: comment };
    data._id = item._id
  }
  else if ((typeSet == "setAnswer" || typeSet == "setNews") && Variable.Static.EditInput.length > 0) {
    if (!commentId) {
      data.value = {
        comments: {
          text: comment,
          _id: item._id,
        },
      };
    } else {
      data.value.comments = {
        comments: {
          text: comment,
          _id: item._id,
        },
      };
    }
  } else if (!commentId && typeSet == "setAnswer" && mainId === item._id) {
    data.value.comments = { text: comment };
  } else if (!commentId) {
    data.value.comments = {
      comments: {
        quote: item._id,
        text: comment,
      },
      _id: item._id,
    };
  } else {
    data.value.comments = {
      comments: {
        quote: item._id,
        text: comment,
      },
      _id: commentId,
    };
  }

  // if (item.image || typeSet == "setAnswer") {
  //   data.value.comments = { text: comment };
  // } else if (edit !== undefined && edit.mainCom) {
  //   data.value.comments = {
  //     text: comment,
  //     _id: commentId,
  //   };
  // } else if (edit !== undefined && !edit.mainCom) {
  //   data.value.comments = {
  //     comments: {
  //       text: comment,
  //       _id: commentId,
  //     },
  //   };
  // } else {
  //   data.value.comments = {
  //     comments: {
  //       quote: item._id,
  //       text: comment,
  //     },
  //     _id: commentId,
  //   };

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
  // }
  console.log("=data=", data);
  let response = checkAnswerApi(await sendApi.create(typeSet, data));

  // if (Variable.dataUrl.params === undefined) {
  //   await renderModalFullNews();
  // }
  // return response;
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
  console.log("=df5226=", response);
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

export {
  changeSubscription,
  showVotersApi,
  changeStatistic,
  sendNewCommentApi,
  mainUsers,
  getNewsItemInShow,
  getPostsItemInShow,
  getQuestionItemInShow,
  getWorldPress,
};
