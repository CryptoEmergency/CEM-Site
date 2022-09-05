import {
    jsx,
    jsxFrag,
    getStorage,
    sendApi,
    getVariable,
} from "@betarost/cemjs";
import images from "@assets/images/index.js";
// import svg from "@assets/svg/index.js";

const PartnerItem = function ({ lang, partner}) {
    // console.log("PartnerItem", partner)

    return (
        <a
            target="_blank"
            rel="nofollow nooopener"
            href={partner.link}
            class="partner_item"
        >
            <img src={images["partners/"+partner.image]} />
        </a>
    )
}

export { PartnerItem }