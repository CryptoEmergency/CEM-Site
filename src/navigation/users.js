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
            // return (
            //     <div class="page-main">
            //         <div class="page-main__container">
            //             {
            //                 !Static.openModals
            //                     ?
            //                     <div class="page-main__title">
            //                         <h1>
            //                             {Variable.lang.h.top_users}
            //                         </h1>
            //                     </div>
            //                     :
            //                     null
            //             }
            //             <div class="page-main__content">

            //                 <div class="filters">
            //                     <div class="filters__container">
            //                         <div class="filters__search filters__search_icon_loupe">
            //                             <input class="filters__input"
            //                                 placeholder={Variable.lang.placeholder.findFriends}
            //                             ></input>
            //                             <div class="filters__toggle"
            //                             // onClick={() => {
            //                             //     if (Static.elFilters.dataset.active === "true") {
            //                             //         Static.elFilters.dataset.active = false
            //                             //         Static.elFilters.style = "height: 0px"
            //                             //     } else {
            //                             //         Static.elFilters.dataset.active = true
            //                             //         Static.elFilters.style = "";
            //                             //         let h = Static.elFilters.offsetHeight;
            //                             //         Static.elFilters.style = `height: ${h}px; margin-bottom: 20px;`
            //                             //     }
            //                             // }}
            //                             >
            //                                 <img src={svg.filter} />
            //                                 <span>{Variable.lang.span.filter}</span>
            //                             </div>
            //                         </div>
            //                         <div class="filters__advanced">
            //                             <div class="filters__select">
            //                                 {Variable.lang.text.language}
            //                             </div>
            //                             <div class="filters__select filters__select_direction_horizont">
            //                                 {Variable.lang.text.country}
            //                             </div>
            //                             <div class="filters__checkboxes">
            //                                 <div class="filters__checkbox">
            //                                     <input
            //                                         checked={true}
            //                                         type="checkbox"
            //                                         id="common"
            //                                     // required="required"
            //                                     // onChange={async () => {
            //                                     //     Static.filters.group.common = !Static.filters.group.common
            //                                     //     Static.apiFilter = makeFilter(Static)
            //                                     //     await fn.restApi.getUsers({ name: Static.nameRecords, filter: Static.apiFilter })
            //                                     // }}
            //                                     />
            //                                     <label for="common">{Variable.lang.h.top_users}</label>
            //                                 </div>
            //                                 <div class="filters__checkbox">
            //                                     <input
            //                                         checked={true}
            //                                         type="checkbox"
            //                                         id="content-makers"
            //                                     // required="required"
            //                                     // onChange={async () => {
            //                                     //     Static.filters.group.content = !Static.filters.group.content
            //                                     //     Static.apiFilter = makeFilter(Static)
            //                                     //     await fn.restApi.getUsers({ name: Static.nameRecords, filter: Static.apiFilter })
            //                                     // }}
            //                                     />
            //                                     <label for="content-makers">{Variable.lang.select.users_contentCreater}</label>
            //                                 </div>
            //                                 <div class="filters__checkbox">
            //                                     <input
            //                                         checked={true}
            //                                         type="checkbox"
            //                                         id="specialists"
            //                                     // required="required"
            //                                     // onChange={async () => {
            //                                     //     Static.filters.group.expert = !Static.filters.group.expert
            //                                     //     Static.apiFilter = makeFilter(Static)
            //                                     //     await fn.restApi.getUsers({ name: Static.nameRecords, filter: Static.apiFilter })
            //                                     // }}
            //                                     />
            //                                     <label for="specialists">{Variable.lang.select.users_experts}</label>
            //                                 </div>
            //                                 <button
            //                                     class="filters__button"
            //                                     title={Variable.lang.a.resetFilter}
            //                                 >
            //                                     <img src={svg.reset_filter} width="30" height="30" />
            //                                 </button>
            //                             </div>
            //                         </div>
            //                     </div>
            //                 </div>

            //                 <div class="cards">
            //                     <div class="cards__container cards__container_type_users">
            //                         <div class="cards__card-users">
            //                             <div class="cards__card-users_background_light">
            //                                 <div class="cards__rank">
            //                                     <img src={images.content_creator} />
            //                                 </div>
            //                             </div>
            //                             <div class="cards__avatar">
            //                                 <a href={`/user/${Variable.myInfo.nickname}`} >
            //                                     {/* <div class="c-avataricon"> */}
            //                                     <img
            //                                         class={[
            //                                             // "c-avataricon__frame",
            //                                         ]}
            //                                         src={svg["profile/frame/default"]}
            //                                     />
            //                                     <img
            //                                         // class="c-avataricon__photo"
            //                                         // style="position: absolute; top: 50%;left: 50%;z-index: 1; height: 78%; width: 78%; border-radius: 50%; transform: translateX(-50%) translateY(-50%);"
            //                                         src={
            //                                             typeof Variable.myInfo.avatar != "undefined" && Variable.myInfo.avatar.name
            //                                                 ? `/assets/upload/avatar/${Variable.myInfo.avatar.name}`
            //                                                 : images["profile/avatar/default"]
            //                                         }
            //                                     />
            //                                     <img class="c-avataricon__team" src={svg.mini_logo} width="25" height="25" />
            //                                     {/* </div> */}
            //                                 </a>
            //                             </div>
            //                             {/* <div class="new_professional_card_avatar">
            //                                 <Avatar author={Variable.myInfo} nickName={true} speciality={[Variable.myInfo.information?.speciality ? Variable.myInfo.information.speciality : `(${Variable.lang.p.notSpec})`]} />
            //                             </div> */}

            //                         </div>


            //                     </div>
            //                 </div>

            //             </div>
            //         </div>
            //     </div>
            // )

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