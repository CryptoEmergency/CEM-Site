import {
    jsx,
    jsxFrag,
    Variable,
    initReload,
    initOne,
    sendApi,
    init
} from '@betarost/cemjs';
import svg from "@assets/svg/index.js";
import images from '@assets/images/index.js';
import { fn } from '@src/functions/index.js';
import { Input } from '@component/element/index.js';



const ModalRecoverPass = function(data, ID){


    let Static = fn.GetParams({ data, ID })

    init(()=>{},
    ()=>{

        <div class="c-modal c-modal--open" id="ModalRecoverPass">
        <section class="c-modal__dialog" ref={elem}>
            <header class="c-modal__header">
                <h2 class="c-modal__title">Восстановление пароля</h2>
                <button
                    type="button"
                    class="c-modal__close"
                    onclick={() => {
                      //  if(Variable.dataUrl.adress!== "rooms")
                    //    {
                            Variable.DelModals(ID)
                      //  } 
                    }}
                ></button>
            </header>
            <div class="c-modal__body">
                <div class="c-mobileoremail">
                   
                </div>

                <form onsubmit={sendAuthorization}>
                    <input style="display: none;" type="submit" />
                    <div class="reset_password_input_block">
                        <WayAuthForm />
                    </div>
                    <div class="container-input">

                        <Input classDiv="input-div" Static={Static.pass} />

                    </div>
                </form>

            </div>
            <footer class="c-modal__footer">
                <button
                    class={`c-button c-button--gradient2 ${!Static.isValid && "c-button--inactive"}`}
                    type="button"
                    ref={elemButton}
                    onClick={sendAuthorization}>
                    <span class="c-button__text">
                        {Variable.lang.button.login}
                    </span>
                </button>
            </footer>
        </section>
    </div>


    }),ID
}
export default ModalRecoverPass;