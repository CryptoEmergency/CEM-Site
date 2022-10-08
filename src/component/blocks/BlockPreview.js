import {
    jsx,
    jsxFrag,
    Variable,
    Helpers
} from '@betarost/cemjs';

import svg from "@assets/svg/index.js";
import images from "@assets/images/index.js";
import { If } from '@component/helpers/All.js';
import { CourseCurrency } from '@component/element/CourseCurrency.js';

const BlockPreview = function () {
    return (
        <div class="с-preview">
            <img class="с-preview__lines" src={images["background/lines-preview-min"]} />
            <div class="с-preview__title">
                <img class="с-preview__bg" src={images["background/cem"]} />
                <div class="с-preview__text с-preview__text--auth">
                    <span>{Variable.lang.homePreview.ask}</span>
                    <div class="с-preview__imgblock">
                        <img class="с-preview__img" src={svg.two} />
                        <img class="с-preview__img" src={svg.two5} />
                        {Variable.lang.homePreview.earn}
                    </div>
                </div>
            </div>
            <div class="с-preview__parts">
                <a href="/lenta-users/" class="с-preview__part" onclick={Helpers.siteLink}>
                    <span>{Variable.lang.span.userNews}</span>
                </a>
                <If
                    data={Variable.auth}
                    dataIf={
                        <a
                            href="/user/"
                            class="с-preview__part"
                            onclick={Helpers.siteLink}
                        >
                            <span>{Variable.lang.a.profile}</span>
                        </a>
                    }
                    dataElse={
                        <a
                            class="с-preview__part"
                            onclick={(e) => {
                                Variable.SetModals({ name: "ModalReg", data: {} })
                                e.stopPropagation();
                            }}
                        >
                            <span>{Variable.lang.button.registration}</span>
                        </a>
                    }
                />
                {/* <a href="/chats/" class="с-preview__part" data-updating="true">
                    <span>{Variable.lang.span.chats}</span>
                </a> */}
                <a href="/question/" class="с-preview__part" onclick={Helpers.siteLink}>
                    <span>{Variable.lang.span.QA}</span>
                </a>
                <a href="/news/" class="с-preview__part" onclick={Helpers.siteLink}>
                    <span>{Variable.lang.span.news}</span>
                </a>
            </div>
            <div class="с-preview__crypto">
                {Variable.Course.list_records.length != 0 ?
                    Object.keys(Variable.Course.list_records[0]).filter((item) => typeof Variable.Course.list_records[0][item] == 'object').map(function (key) {
                        return (
                            <CourseCurrency course={Variable.Course.list_records[0][key]} key={key} />
                        )
                    })
                    :
                    <></>
                }
            </div>
        </div>
    )
}
//I check
export { BlockPreview }