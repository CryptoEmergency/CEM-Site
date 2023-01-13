import {
    jsx,
    jsxFrag,
    Variable,
    getValue,
    initReload
} from '@betarost/cemserver/cem.js';

import images from '@assets/images/index.js';


let abbr = "ru" //j
let codeTitle = "7"
let showPhoneSelect = false
const PhoneCode = function () {
    // console.log('=bbd92f=', { lang, changeCode, abbr, codeTitle, ID })

    const changeCode = function () {
        // console.log('=566a6a=', "changeCode")
        showPhoneSelect = true
        initReload()
    }
    return (
        <div class="country-phone2">
            <div class="country-phone-selector2">
                <div class="country-phone-selected2" onClick={(e) => { changeCode(e) }}>
                    <span>
                        +{codeTitle}
                        <img src={images.blank} class={`flag flag-${abbr}`} />
                    </span>
                </div>
                <div class="country-phone-options2" style={showPhoneSelect ? "display:block" : "display : none"}>
                    <input type="text" class="country-phone-search2" value="" />
                    <label class="country-phone-search-label2" style="display: none;">Введите страну</label>
                    <ul>
                        {
                            Variable.phoneCodes.map(function (item) {
                                return (
                                    <li data-phone={item.code} data-co={item.abbr} class="country-phone-option2" onClick={(e) => changeCode(e, item)}>
                                        <span>
                                            +{item.code}
                                            <img src="/assets/image/blank.gif" class={`flag flag-${item.abbr}`} />
                                        </span>
                                        {item.text}
                                    </li>
                                )
                            })
                        }
                    </ul>
                </div>
            </div>
        </div>
    )
}

export { PhoneCode };