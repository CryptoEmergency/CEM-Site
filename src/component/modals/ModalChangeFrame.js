import {
    jsx,
    jsxFrag,
    Variable,
    init
} from "@betarost/cemserver/cem.js";
import { fn } from '@src/functions/index.js';
import { Avatar } from '@component/element/index.js';



const ModalChangeFrame = function ({ author }, ID) {
    let [Static] = fn.GetParams({ data: { author } })
    let close = true
    // console.log('=7637ad=', author)
    // console.log('=b20eed=', Variable)

    let frames = [];

    init(
        async () => {
            let data = await fn.restApi.getFrames({ cache: true, name: "getFrames", filter: {} })
            data.list_records.forEach((frame) => {
                frames.push(frame);
            })
        },
        () => {
            return (
                <div class="c-modal c-modal--open" id="addFrame" onclick={function(e){ if(close){ 
  
					fn.modals.close(ID)
				  }}}>
                    <section class="c-modal__dialog" onmouseover={function(){
           
           close = false
    
         }}
           onmouseleave={function(){
           
           close = true
      
           }}>
                        <header class="c-modal__header">
                            <h2 class="c-modal__title">{Variable.lang.h.modal_changeFrame}</h2>
                            <button
                                class="c-modal__close"
                                onclick={() => {
                                    fn.modals.close(ID)
                                }}
                            ></button>
                        </header>
                        <div class="c-modal__body">
                            <div class="frames_list">
                                {
                                    frames.map((item, index) => {
                                        return (
                                            <Avatar author={author} frame={item} parent={'chooseFrame'} />
                                        )
                                    })
                                }
                            </div>
                            <div class="add_avatar_button_container" data-action="sendFrame">
                                <div class="add_avatar_button">
                                    <span>Выбрать</span>
                                </div>
                            </div>
                        </div>
                        <div class="c-modal__footer"></div>
                    </section>
                </div>
            );
        }, ID
    )


};

export default ModalChangeFrame;