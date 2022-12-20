import {
    jsx,
    jsxFrag,
    init,
    Variable,
  } from "@betarost/cemjs";

  import {  Input} from '@component/element/index.js';
  import { BlockError404 } from '@component/blocks/index.js';
  import { fn } from '@src/functions/index.js';

  
  const start = function () {
    let Static = {}


    Static.pass = {
      value: "",
      valid: false,
      error: false,
      label: "Придумайте пароль",
      placeholder: "",
      errorText: Variable.lang.error_div.password5,
      type: "password",
      condition: (value) => {
          return fn.validator.isStrongPassword(value, {
              minLength: 8,
              minLowercase: 0,
              minUppercase: 0,
              minNumbers: 0,
              minSymbols: 1,
          });
      },
      afterValid: () => {

        fn.checkValid(Static, ["confirmpass", "pass"])

    }

  }

  Static.confirmpass = {
      value: "",
      valid: false,
      error: false,
      label: "Подтвердите пароль",
      placeholder: "",
      errorText: "Пароли не сопадают",
      type: "password",
      condition: (value) => {
          if(Static.pass.value!==value)
          {
           return false
          }else{
              return true
          }
        
         
      },
      afterValid: () => {

        fn.checkValid(Static, ["confirmpass", "pass"])

    }
  }
//R2D2C4Mp5Ak47!

    init(
     async()=>{
      Static.isValid = false
      if(Variable.dataUrl.params){
      Static.params = Variable.dataUrl.params.split(":")
     

Static.check = {}
let response = await fn.restApi.getUsers({ name: "checkUser", filter: { "confirm.linkOne": Static.params[0], "confirm.linkTwo": Static.params[1] } })
Static.check=response.totalFound
 }
     },
      () => {
     
if(Static.params && Static.params.length == 2 && Static.check == 1){
        return (
<div class="c-rooms c-container" >
                   <center> <section class="" >
          <header class="c-modal__header">
                            <h2 class="c-modal__title">Восстановление пароля</h2>
                        
                        </header>
          <div id="body_reg-fast" class="c-modal__body">
          <div class="c-mobileoremail">
            <div class='c-main__body'>
       <form >
                                <input style="display: none;" type="submit" />
                            
                                

                                <div class="container-input">
                                    <Input
                                        classDiv="input-div"
                                        Static={Static.pass}
                                    />
                                </div>

                                <div class="container-input">
                                    <Input
                                        classDiv="input-div"
                                        Static={Static.confirmpass}
                                    />
                                </div>

                                <footer class="c-modal__footer">
                                    <button
                                        class={['c-button c-button--gradient2', !Static.isValid ? 'c-button--inactive' : null]}
                                        id="fast_reg"
                                        type="button"
                                        onClick={(e) => { 
                                          
                                         let response = fn.restApi.setNewPassword(Static.params[0],Static.params[1],Static.pass.value)
                                          
                                          if(response.status == "ok")
                                          {
                                      let res =  document.getElementById("response")
                                      res.innerText="Пароль успешно изменен"
           
                                           setTimeout(function(){
                                  
                                            window.location.replace("/")
                                           },3000)
                                          }
                                          }}>
                                        <span class="c-button__text">
                                            Отправить
                                        </span>
                                    </button>
                                </footer>
                            </form>
            </div>
            </div>
            <div id={"response"}></div>
            </div>
            </section></center>
            </div>
        )
      }
      else{
        return(
        <div>
        <BlockError404 />
      </div>)
      }
      }
    )
  }

  export default start;