import {
    jsx,
    jsxFrag,
    Variable,
    initReload,
    parsingUrl,
    initOne,
    init
} from '@betarost/cemserver/cem.js';
import svg from "@assets/svg/index.js";
import { fn } from "@src/functions/index.js";

const ModalLangChange = function (data, ID) {
    let close = true
    init(
        null,
        () => {
            return (
                <div
                    class="c-changelanguage"
                >
                    <div class="c-changelanguage__header">
                        <h4 class="c-changelanguage__title">{Variable.lang.h.modal_listLanguage}</h4>
                        <button type="button" class="c-modal__close" onClick={function (e) { Variable.Modals.pop(); initReload("modals") }}></button>
                    </div>
                    <ul class="c-changelanguage__list" >
                        {Object.keys(Variable.languages).map(function (key) {
                            return (
                                <li class="c-changelanguage__item">
                                    <a
                                        class="c-changelanguage__link"
                                        href={"/" + key + "/" + Variable.dataUrl.adress}
                                        onclick={async function (e) {
                                            e.preventDefault();
                                            Variable.Modals.pop()
                                            history.pushState(null, null, this.href);
                                            await parsingUrl()
                                        }}
                                    >
                                        <span class="c-changelanguage__text">{Variable.languages[key].lang_orig}</span></a>
                                </li>
                            )
                        })}
                    </ul>
                </div>
            )
        }, ID
    )


};

export default ModalLangChange;