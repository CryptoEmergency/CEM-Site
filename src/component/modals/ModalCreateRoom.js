import {
    jsx,
    jsxFrag,
    Variable,
    sendApi,
    initReload,
    initGo,
    initOne,
    init
} from '@betarost/cemjs';
import svg from "@assets/svg/index.js";
import images from '@assets/images/index.js';
import { Input, CheckBox, Select } from '@component/element/index.js';
import { fn } from '@src/functions/index.js';

const ModalCreateRoom = function (data, ID) {

    let [Static] = fn.GetParams({ data, ID })

  
    Static.label =
    {
    label:"Назвние"
    }

    Static.Confirm =
    {
    label:"Введите проверочное слово"
    }

    init(null,()=>{





        return (
            <div class="c-modal c-modal--open" id="ModalCreateRoom">
                 <section class="c-modal__dialog">
                        <header class="c-modal__header">
                            <h2 class="c-modal__title">Создать комнату</h2>
                            <button
                                type="button"
                                class="c-modal__close"
                                onclick={() => {
                                    Variable.DelModals(ID)
                                }}
                            ></button>
                        </header>
                        <div class="container-input">
                        <h4 class="c-modal__title">Название</h4>
                                    <Input
                                        classDiv="input-div"
                                        Static={Static.label}
                                    />
                                </div>
                                <div class="container-input">
                        <h4 class="c-modal__title">описание</h4>
                                    <Input
                                        classDiv="input-div"
                                        Static={Static.Confirm}
                                    />
                                </div>
                                <div class="container-input">
                        <h4 class="c-modal__title">категория</h4>
                      {//<Select options={Static} />
                      }
                                </div>
                                <div class="container-input">
                        <h4 class="c-modal__title">приватная/не приватная</h4>
                                    <CheckBox
                                        Static={Static}
                                      
                                    />
                                </div>
                                <div class="container-input">
                        <h4 class="c-modal__title">только для друзей</h4>
                        <CheckBox
                                        Static={Static}
                                      
                                    />
                                </div>
                        </section>

                </div>
            )

    }, ID)
  
}

export default ModalCreateRoom;