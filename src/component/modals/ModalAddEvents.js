import {
    jsx,
    jsxFrag,
    init
} from '@betarost/cemserver/cem.js';
import { fn } from '@src/functions/index.js';
import svg from "@assets/svg/index.js";
const ModalAddEvents = function ({ icon, text }, ID) {

    init(
        null,
        () => {
            return (
                <div class="c-modal c-modal--open" id="ModalAskQuestion">
                    <section class="c-modal__dialog">
                        <div class="search_mod">
                            <h4 class="conteiner_moda">Поиск заголовка</h4>
                            <button class="modal__close-1" href="#close"></button>
                            <form>
                                <div>
                                    <label>Страна</label>
                                    <input placeholder="Введите страну" type="text" style="border-radius: 10px;">

                                    </input>
                                    <label>Название мероприятия</label>
                                    <input placeholder="Введите страну" type="text" style="border-radius: 10px;">

                                    </input>


                                </div>
                            </form>
                        </div>
                    </section>

                </div>
            )
        }, ID
    )
};
export default ModalAddEvents;
// OK