import {
    jsx,
    jsxFrag,
    load,
    Variable,
    initReload
} from "@betarost/cemserver/cem.js";

import { fn } from '@src/functions/index.js';
import svg from "@assets/svg/index.js";
import images from "@assets/images/index.js";




const start = function (data, ID) {

    let [Static] = fn.GetParams({ data, ID })

    load({
        ID,
        fnLoad: async () => {
            Static.recordsIco = await fn.restApi.getIco({ filter: {} })
        },
        fn: () => {

            // if (!Variable.auth || !Variable.myInfo || !Variable.myInfo.status || !Variable.myInfo.role){
            if (!Variable.auth || !Variable.myInfo || !Variable.myInfo.status) {
                fn.siteLink("/")
                return
            }

            return (
                <div class="c-main__body">
                    <div class="ico-list">
                        <div
                            class="ico-list_item"
                            onclick={() => {
                                fn.siteLinkModal("/DimaPage/edit-university/", { title: "Добавить Компанию в университет" })
                            }}>
                            <img src={svg["radius_plus"]} width="100" height="100" />
                        </div>

                    </div>
                </div>
            )
        }
    })

}


export default start;