import {
    jsx,
    jsxFrag,
    init,
    CEM
} from '@betarost/cemserver/cem.js';
// import { fn } from '@src/functions/index.js';

const fn = CEM.fn

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
                                    <div>
                                        <label>
                                            Страна
                                        </label>
                                        <input placeholder="Введите страну" type="text" style="border-radius: 10px;" required>
                                            <select>

                                            </select>
                                        </input>

                                    </div>
                                    <div class="">
                                        <label>Город</label>
                                        <input placeholder="Введите город" type="text" style="border-radius: 10px;" required>

                                        </input>
                                    </div>
                                    <label>Название мероприятия</label>
                                    <input placeholder="Введите название мероприятий" type="text" style="border-radius: 10px;">
                                    </input>
                                    <label for="start"> Дата проведения
                                        <input
                                            class="calendar__1"
                                            placeholder="Введите название мероприятий"

                                            type="date"
                                            style="border-radius: 10px;"
                                            value="0000-00-00"
                                            min="2023-01-01"
                                            max="2026-12-31"
                                        >

                                        </input>



                                    </label>
                                    <div class="fa-fa">
                                        <button type="submit" class="fa-fa-search">
                                            {/* <i class="fa-fa-search"></i> */}
                                            <span>Поиск</span>
                                        </button>
                                    </div>
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