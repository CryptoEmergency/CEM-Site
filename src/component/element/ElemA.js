/** @jsx jsx */
/** @jsxFrag jsxFrag */
import {jsx,jsxFrag} from '../../../CEM-js/index.js'
const ElemA = function(...data){
    console.log("ElemA",data);
    return (
        <a class="log-in link" data-action="loginModal">ytyty</a>
    )
}

export {ElemA}