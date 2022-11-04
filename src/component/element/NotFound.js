import {
    jsx,
    jsxFrag,
    Variable,
    Helpers
} from "@betarost/cemjs";

import svg from "@assets/svg/index.js";

const NotFound = function (data) {
    return (
        <div class="nothing_found">
            <img src={svg['partner-list_icon']} />
            <p>{Variable.lang.p.notFound}</p>
        </div>
    )
}

export { NotFound }