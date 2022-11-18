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
import { Input, CheckBox, Select, TextArea } from '@component/element/index.js';
import { fn } from '@src/functions/index.js';

const ModalCreateRoom = function (data, ID) {


 


    let [Static] = fn.GetParams({ data, ID })

  //инпут название
    Static.label ={
    label:"Назвние"
    }
//инпут описание
    Static.Title={
    label:"Описание"
    }
    
    //приват
    Static.Private={
        value: false,
        }
    //видимость
    Static.Visible={
        value: false,

        }
    //кодовое слово
    Static.Confirm={
        label:"Описание"

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
                        <div class="c-modal__body">
                        <div class="c-mobileoremail">
                        
                            </div>
                          
                        <div class="container-input">
                
                       
                                    <Input
                                        classDiv="input-div"
                                        Static={Static.label}
                                    />
                                </div>
                                <div class="c-comments__field create_post_container1">
                      
                                    <TextArea 
                                       className="create_post_chapter"
                                        Static={Static.Title}
                                    />
                                </div>
                
                                
                                <div class="container-checkbox">
              <div class="checkbox">
                <input
             
                  class="checkbox__input complain_checkbox"
                  onChange={function() { 
                 
                  }}
                  type="checkbox"
              
              
                />
                <label class="checkbox__label">
                  Приватная комната
                  <span class="cont_a-link"></span>
                </label>
              </div>
            </div>
            
                                <div class="container-checkbox">
              <div class="checkbox">
                <input
           
                  class="checkbox__input complain_checkbox"
                  onChange={function() { 
                 
                  }}
                  type="checkbox"
                  
              
                 
                />
                <label class="checkbox__label">
                  только для друзей
                  <span class="cont_a-link"></span>
                </label>
              </div>
            </div>
                                
                             
                
                       

                          
                          
                                </div>
                        </section>

                </div>
            )

    }, ID)
  
}

export default ModalCreateRoom;