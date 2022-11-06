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


const changeStatistic = async function (
  e,
  commentId,
  type,
  mainId,
  subcommentId
) {

  let data;
  if ((type === "setAnswer" || type === "setPost") && !mainId) {
    data = {
      value: {
        evaluation: e.target.dataset.name,
      },
      _id: commentId,
    };
  } else if (!subcommentId) {
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
  let response = checkAnswerApi(await sendApi.create(type, data));
  // initReload();
  if (Variable.dataUrl.params !== undefined) {
    initReload();
  }

  if (type === "setPost") {
    Variable[`PageLenta${Variable.Static.lentaPage}`] = await sendApi.send({
      action: "getPost", short: true, cache: true, name: `PageLenta${Variable.Static.lentaPage}`, limit: 15, filter: Helpers.getFilterLenta({}, Variable.Static.lentaPage)
    });
  }
};

const changeSubscription = async (id, type, callBack) => {
  let data = {
    value: {
      subscribed: id
    }
  };
  let response = checkAnswerApi(await sendApi.create(type, data));
  Variable.Static.answerAdditionally = "";

  Variable[`PageLenta${Variable.Static.lentaPage}`] = await sendApi.send({
    action: "getPost", short: true, cache: true, name: `PageLenta${Variable.Static.lentaPage}`, limit: 15, filter: Helpers.getFilterLenta({}, Variable.Static.lentaPage)
  });
  if (typeof callBack == "function") {
    callBack();
  }
}

const showVotersApi = async (id, type) => {
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
  let data = {
    value: {
      comments: {},
    },
    _id: mainId,
  };


  if (item.media) {
    data.value.comments = { text: comment };
    data._id = item._id
  }
  else if (Variable.Static.EditInput.length > 0) {
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
  } else if (!commentId && (typeSet == "setAnswer" || typeSet == "setNews") && mainId === item._id) {
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
  let response = checkAnswerApi(await sendApi.create(typeSet, data));

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


export {
  changeSubscription,
  showVotersApi,
  changeStatistic,
  sendNewCommentApi,
  getPostsItemInShow,
  getWorldPress,
  api
};
