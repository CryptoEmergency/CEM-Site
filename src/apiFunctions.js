import {
  jsx,
  jsxFrag,
  sendApi,
  Variable,
  Helpers,
  initReload
} from "@betarost/cemjs";

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






//==========================
const restApi = {}

restApi.getPost = async function ({ cache, name, limit = 6, offset = 0, filter, select, sort }) {
  // console.log('=847793=', "restApi.getPost", cache, name, limit, offset, filter, select, sort)
  let response = { totalFound: 0, list_records: [] }
  let data = { type: "get", action: "getPost", short: true, cache, name, limit, offset, filter, select, sort }
  let tmp = await sendApi.send(data);
  if (tmp) {
    if (typeof tmp.totalFound == "undefined")
      tmp.totalFound = 0
  }
  if (!tmp.list_records) {
    tmp.list_records = []
  }
  response = tmp
  if (name) {
    Variable[name] = response
  }
  return response
}

export {
  api,
  restApi
};
