import {
    jsx,
    jsxFrag,
    init,
    initReload,
    Variable,
    Helpers,
    sendApi
} from "@betarost/cemjs";

import { BlockUsers } from '@component/blocks/index.js';

const start = function () {
    let filters
    let type = "creator"
    Variable.HeaderShow = true
    Variable.FooterShow = true
    Variable.visibleFilterUser = false

    init(
        async () => {
            filters = {
                lang: {
                    code: "",
                    name: "all"
                },
                country: {
                    code: "",
                    name: "all"
                },
                group: {
                    common: false,
                    content: false,
                    expert: true
                },
                online: false
            }
            Variable.PageCreators = await sendApi.send({ action: "getUsers", short: true, cache: true, name: "PageCreators", limit: 21, filter: Helpers.getFilterUsers(filters, type) });
        },
        () => {

            return (
                <div class={[Variable.HeaderShow ? 'c-main__body' : 'c-main__body--noheader']}>
                    <BlockUsers
                        title={Variable.lang.h.top_users}
                        filters={filters}
                        items={Variable.PageCreators}
                        type={type}
                        name={"PageCreators"}
                    />
                </div>
            )
        }
    )
}
//I check
export default start;