import {
    jsx,
    jsxFrag,
    Variable,
    CEM
} from "@betarost/cemserver/cem.js";

const { images, svg, fn } = CEM

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