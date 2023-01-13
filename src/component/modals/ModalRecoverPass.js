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
    let close = true
    init(()=>{

        Static.email = {
            value: "",
            valid: false,
            error: false,
            label: Variable.lang.label.email,
            placeholder: Variable.lang.placeholder.email,
            errorText: Variable.lang.error_div.wrong_email,
            type: "text",
            condition: (value) => {
return true

        
                
            }

        }

    },
    ()=>{
return(
        <div class="c-modal c-modal--open" id="ModalRecoverPass"   onclick={function(e){ if(close){ 
  
            fn.modals.close(ID)
            }}}>
        <section class="c-modal__dialog" onmouseover={function(){
           
           close = false
    
         }}
         onmouseleave={function(){
           
          close = true
      
           }}>
            <header class="c-modal__header">
                <h2 class="c-modal__title">Восстановление пароля</h2>
                <button
                    type="button"
                    class="c-modal__close"
                    onclick={() => {

                            Variable.DelModals(ID)

                    }}
                ></button>
            </header>
            <div class="c-modal__body">
                <div class="c-mobileoremail">
                   
                </div>

                <form >
                    <input style="display: none;" type="submit" />
                    <div class="reset_password_input_block">
             

                        <Input classDiv="input-div" Static={Static.email} />

                    </div>
                </form>
                <div id="response"></div>   
            </div>
            <footer class="c-modal__footer">
                <button
                    class={`c-button c-button--gradient2 false`}
                    type="button"
                    onclick={async function()
                        {
                               let response = await fn.restApi.resetPassword(Static.email.value)
                               if(response.status == "ok")
                               {
                           let res =  document.getElementById("response")
                           res.innerText="На электронную почту отправлено письмо с инструкциями по восстановлению"

                                setTimeout(function(){
                        Variable.DelModals(ID)
                        
                                },3000)
                               }
                        }}
                   >
                    <span class="c-button__text">
                        Восстановить
                    </span>
                </button>
            </footer>
        </section>
    </div>
)

    },ID)
}
export default ModalRecoverPass;