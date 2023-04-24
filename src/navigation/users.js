import {
    jsx,
    jsxFrag,
    load,
    CEM,
    Variable
} from "@betarost/cemserver/cem.js";

const { images, svg, fn, elements } = CEM

import { BlockUsers } from '@elements/blocks/index.js';
import { Avatar, ButtonShowMore, Input, NotFound } from '@elements/element/index.js';

const start = function (data, ID) {
    let [Static] = CEM.fn.GetParams({ data, ID, initData: "users" })
    load({
        ID,
        fnLoad: async () => {
            CEM.fn.initData.users(Static)
        },
        fn: () => {
            return (
                <div class="page-main">
                    <div class="page-main__container">
                        {
                            !Static.openModals
                                ?
                                <div class="page-main__title">
                                    <h1>
                                        {Variable.lang.h.top_users}
                                    </h1>
                                </div>
                                :
                                null
                        }
                        <div class="page-main__content">
                            <div class="filters">
                                <div class="filters__container">
                                    <div class="filters__search filters__search_icon_loupe">
                                        <input class="filters__input"
                                            placeholder={Variable.lang.placeholder.findFriends}
                                        ></input>
                                        <div class="filters__toggle"
                                        // onClick={() => {
                                        //     if (Static.elFilters.dataset.active === "true") {
                                        //         Static.elFilters.dataset.active = false
                                        //         Static.elFilters.style = "height: 0px"
                                        //     } else {
                                        //         Static.elFilters.dataset.active = true
                                        //         Static.elFilters.style = "";
                                        //         let h = Static.elFilters.offsetHeight;
                                        //         Static.elFilters.style = `height: ${h}px; margin-bottom: 20px;`
                                        //     }
                                        // }}
                                        >
                                            <img src={svg.filter} />
                                            <span>{Variable.lang.span.filter}</span>
                                        </div>
                                    </div>
                                    <div class="filters__advanced">
                                        <div class="c-friends__wrapper">
                                            <Input classDiv="language_select_wrapper" className="c-friends__lang" Static={Static.filters.language} />
                                            <img style="display: none;" class="refresh_language" src={svg.refresh_filter} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )

            return (
                <div class="c-main__body page-inner">

                    <BlockUsers Static={Static} />

                </div>

                // <Elements.page.MainContainer>

                // </Elements.page.MainContainer>
            )
        }
    })
    return
}

export default start;