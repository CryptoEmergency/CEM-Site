import {
    jsx,
    jsxFrag,
    Variable
} from '@betarost/cemjs';
import svg from "@assets/svg/index.js";
import images from "@assets/images/index.js";
import { PartnerItem } from '@component/element/PartnerItem.js';

const BlockInfoPartners = function ({ lang, partners }) {

    return (
        <div class="top_professionals c-infopartners">
            <h2 class="c-infopartners__title">{lang.h.partners}</h2>
            <div data-mainpage="true" class="c-infopartners__list partners_container">
                {
                    partners.map(function (partner) {
                        return (
                            <PartnerItem lang={lang} partner={partner} />
                        )
                    })
                }
            </div>
            <div class="c-infopartners__more">
                <a class="c-button c-button--gray" href="partners/">
                    <span class="c-button__wrapper">{lang.button.allPartners}</span>
                </a>
            </div>
        </div>
    )
}

export { BlockInfoPartners }