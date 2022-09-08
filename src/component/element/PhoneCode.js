import { jsx, jsxFrag, getVariable, getStorage, makeDOM, timersStart, setValue, getValue, sendApi } from '@betarost/cemjs';
import svg from '@assets/svg/index.js';
import images from '@assets/images/index.js';

const phoneCodes = [
    {
        code: 7,
        abbr: "ru",
        text: "Russia (Россия)"
    }, {
        code: 61,
        abbr: "au",
        text: "Australia (Australia)"
    }, {
        code: 43,
        abbr: "at",
        text: "Austria (Österreich)"
    },
];

const PhoneCode = function ({ lang, changeCode, abbr, codeTitle, ID }) {
    console.log('=bbd92f=', { lang, changeCode, abbr, codeTitle, ID })
    console.log('=ee1cbb=', getValue("modals", "showPhoneSelect"))

    return (
        <div class="country-phone2">
            <div class="country-phone-selector2">
                <div class="country-phone-selected2" onClick={(e) => { changeCode(e) }}>
                    <span>
                        +{codeTitle}
                        <img src={images.blank} class={`flag flag-${abbr}`} />
                    </span>
                </div>
                <div class="country-phone-options2" style={getValue(ID, "showPhoneSelect") ? "display:block" : "display : none"}>
                    <input type="text" class="country-phone-search2" value="" />
                    <label class="country-phone-search-label2" style="display: none;">Введите страну</label>
                    <ul>
                        {
                            phoneCodes.map(function (item) {
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