import { Variable, sendApi } from "@betarost/cemjs";

const restApi = {}

restApi.getCategories = async function ({ cache, name, limit = 6, offset = 0, filter, select, sort }) {
    let objResponse = { totalFound: 0, list_records: [] }

    let defaultFilter = {}
    defaultFilter["count." + (Variable.lang.code != "ru" ? "en" : "ru")] = { $gt: 0 }

    let data = {
        action: "getCategories",
        short: true,
        cache,
        name,
        limit,
        offset,
        filter: Object.assign(defaultFilter, filter),
        select,
        sort
    }

    let response = await sendApi.send(data);
    if (response) {
        if (typeof response.totalFound == "undefined") {
            response.totalFound = 0
        }
        if (!response.list_records) {
            response.list_records = []
        }
        objResponse = response
    }
    if (name) {
        Variable[name] = objResponse
    }
    return objResponse
}
export { restApi };