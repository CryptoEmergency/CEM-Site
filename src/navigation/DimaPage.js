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

import test from "@fn/main/test.js"
//worldPress

const start = function (data, ID) {
    test()
    fn.test()
    let [Static] = fn.GetParams({ data, ID })

    load({
        ID,
        fn: () => {

            // if (!Variable.auth || !Variable.myInfo || !Variable.myInfo.status || !Variable.myInfo.role){
            if (!Variable.auth || !Variable.myInfo || !Variable.myInfo.status) {
                fn.siteLink("/")
                return
            }

            return (
                <div class="mt--70">
                    <div
                        class="button-container-preview mb--10"
                        onclick={() => {
                            fn.siteLink("/DimaPage/records-ico/")
                            // fn.siteLinkModal("/DimaPage/records-ico/", { title: "Список ICO" })
                        }}
                    >
                        <span class="btn-news-preview">
                            <span >
                                Список ICO
                            </span>
                        </span>
                    </div>

                    {/* <div class="mb--2">gdg</div> */}
                    <div
                        class="button-container-preview"
                        onclick={() => {
                            fn.siteLink("/DimaPage/records-startaps/")
                            // fn.siteLinkModal("/DimaPage/records-ico/", { title: "Список ICO" })
                        }}
                    >
                        <span class="btn-news-preview">
                            <span >
                                Список Стартапов
                            </span>
                        </span>
                    </div>
                </div>
            )
        }
    })

}


export default start;