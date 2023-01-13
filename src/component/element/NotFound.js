import {
    jsx,
    jsxFrag,
    Variable,
} from "@betarost/cemserver/cem.js";
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
// OK