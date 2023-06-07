import {
    jsx,
    jsxFrag,
    Variable,
    initReload,
    initOne,
    sendApi,
    Data,
    load,
    CEM
} from "@betarost/cemserver/cem.js";

import { Input, InputDiv } from '@elements/element/index.js';

const { svg, fn } = CEM

const ModalExchange = function (data, ID) {
    let [Static] = fn.GetParams({ data, ID })
    Static.elCemd = null
    Static.trade = null
    Static.Insufficient = false

    load({
        ID,
        fnLoad: async () => {
            Static.course = await fn.socket.get(
                { method: "Course", params: { filter: {} } },
            );
        },
        fn: () => {
            // console.log('=82203f=', data)
            return (
                <div class="c-modal c-modal--open"
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
                        <header class="c-modal__header">
                            <button
                                style="top: 10px; right: 10px;"
                                type="button"
                                class="c-modal__close"
                                onclick={() => {
                                    fn.modals.close(ID)
                                }}
                            ></button>
                            <h2 class="c-modal__title"
                                style="padding-right: 0;"
                            >Обмен</h2>
                        </header>
                        <div class="c-modal__body">
                            <div class="modal-exchange__subtitle">
                                {Variable.lang.button.exchange}
                            </div>
                            <div class="modal-exchange__section">
                                <span class="modal-exchange__section_name">CEMD</span>
                                <input 
                                    type="number"
                                    placeholder="0"
                                    Element={($el) => {
                                        Static.elCemd = $el;
                                    }}
                                    oninput={() => {
                                        Static.Insufficient = false
                                        if (Static.elCemd.value > data.balance) {
                                            Static.Insufficient = true
                                        } 
                                        Static.trade = fn.numberFixWithSpaces(Static.elCemd.value / Static.course.cem.usdt, 8)
                                        initReload()
                                    }}
                                />
                                <span
                                    class="modal-exchange__section_max"
                                    onclick={() => {
                                        Static.elCemd.value = data.balance;
                                        Static.trade = fn.numberFixWithSpaces(Static.elCemd.value / Static.course.cem.usdt, 8)
                                        initReload()
                                    }}
                                >max</span>
                            </div>
                            {
                                Static.Insufficient
                                    ?
                                    <p class="modal-exchange__section_conditions modal-exchange__section_weight">Недостаточно CEMD для выполнения этой транзакции</p>
                                    :
                                    null
                            }
                            <p class="modal-exchange__section_conditions">{data.balance} CEMD доступны для обмена</p>

                            <div class="modal-exchange__subtitle">
                                Обменять на
                            </div>
                            <div class="modal-exchange__section">
                                <img class="modal-exchange__icon" src="/assets/icons/coins/cem.svg"></img>
                                <span class="modal-exchange__section_name">CEM</span>
                                <span>{Static.trade != 0 ? Static.trade : null}</span>
                            </div>
                        </div>
                        <div class="c-modal__footer">
                            <button
                                class={["c-button", "c-button--gradient2",
                                    !Static.Insufficient && Static.elCemd?.value > 0 ? null : "c-button--inactive"
                                ]}
                                type="button"
                                onclick={() => {
                                    Static.callback(Static.trade, Static.elCemd.value, "cem");
                                    fn.modals.close(ID);
                                }}
                            >
                                <span class="c-button__text">{Variable.lang.button.exchange}</span>
                            </button>
                        </div>
                    </section>
                </div>
            );
        }
    })
}

export default ModalExchange;