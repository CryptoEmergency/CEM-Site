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
                <div class="c-modal c-modal--open" id="ModalAskQuestion"
                    onclick={function (e) {
                        if (close) {

                            fn.modals.close(ID)
                        }
                    }}
                >

                    <section class="c-modal__dialog"
                        onmouseover={function () {

                            close = false

                        }}
                        onmouseleave={function () {

                            close = true

                        }}
                    >
                        <div class="search_mod">
                            <h4 class="conteiner_moda-2">Поиск заголовка</h4>
                            <button class="modal__close-1" href="#close" onclick={() => {
                                fn.modals.close(ID)
                            }}></button>
                            <form>
                                <div class="polya-1">
                                    <div class="">
                                        <label>Страна</label>
                                        <input placeholder="Введите страну" type="text" style="border-radius: 10px;" required>

                                        </input>
                                    </div>
                                    <label>Название мероприятия</label>
                                    <input placeholder="Введите название мероприятий" type="text" style="border-radius: 10px;">
                                    </input>
                                    <label> Дата проведения
                                        <input placeholder="Введите название мероприятий" type="date" id="start" style="border-radius: 10px;"
                                            value="2023-04-15" min="2023-01-01" max="2024-12-31">

                                        </input>
                                    </label>

                                    <button type="submit" class="fa-fa-search">
                                        {/* <i class="fa-fa-search"></i> */}
                                        <span>Поиск</span>
                                    </button>
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