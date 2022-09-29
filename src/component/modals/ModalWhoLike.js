import {
    jsx,
    jsxFrag,
    Variable,
    initReload
} from '@betarost/cemjs';
import svg from "@assets/svg/index.js";

//"alarm_icon" : "confirm_icon"
const ModalWhoLike = function (data, reload) {


    return (
        <div class="c-modal c-modal--open" id="ModalWhoLike">
            <section class="c-modal__dialog">
                <header class="c-modal__header">
                    <h2 class="c-modal__title">{Variable.lang.h.modal_login}</h2>
                    <button
                        type="button"
                        class="c-modal__close"
                        onclick={() => { Variable.Modals = [] }}
                    ></button>
                </header>
                <div class="c-modal__body">

                    <div>dfhdfh2222</div>


                </div>

            </section>

        </div>
    )

};

export default ModalWhoLike;