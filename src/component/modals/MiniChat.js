
import {
  jsx,
  jsxFrag,
  Variable,
  init
} from "@betarost/cemserver/cem.js";
import { fn } from '@src/functions/index.js';
import { Avatar, ButtonShowMore, Input, NotFound, TextArea, Select } from '@component/element/index.js';
import svg from "@assets/svg/index.js";






const MiniChat = function (data, ID) {



  let [Static] = fn.GetParams({ data, ID })

  let div = document.getElementsByName(Static.Rooms.author._id)


  function hide(el) {

    el[0].style.display = "none"
    let a = document.getElementById("showhide" + Static.Rooms.author._id)
    a.innerText = "Развернуть"
  }



  function isHidden(el) {
    if (el[0].style.display == "") {
      return false
    }
    else {
      return true
    }

  }

  function toggle(el) {

    isHidden(el) ? show(el) : hide(el)
  }


  function show(el) {
    el[0].style.display = ""
    let a = document.getElementById("showhide" + Static.Rooms.author._id)
    a.innerText = "Свернуть"
  }


  let checker = function (e) {

    if (Static.checker) {
      div[0].style.left = e.pageX - 50 + "px";
      div[0].style.top = e.pageY - 50 + "px";
    }
  }



  init(
    () => {
      document.getElementById('backdrop').classList.remove("c-backdrop--show");

    },
    () => {
      return (
        <div class="c-modal c-modal--open" id="MiniChat">
          <div name={Static.Rooms.author._id} class='c-modal__dialog block1' onmousedown={function (e) { document.addEventListener('mousemove', checker); }} onmouseup={function (e) { document.removeEventListener('mousemove', checker); }}>
            <div class="c-chats__form c-form">

              <div class="c-form__actions">

                <a class="c-form__action c-form__action--left " onclick={function () {
                  fn.modals.close(ID)
                }}>Закрыть</a>
                <a class="c-form__action c-form__action--right" id={"showhide" + Static.Rooms.author._id} onclick={function () { toggle(document.getElementsByName("chat" + Static.Rooms.author._id)) }}>Свернуть</a>
              </div>

            </div>
            <section name={"chat" + Static.Rooms.author._id} onmouseout={function (e) { Static.checker = true }} onmouseover={function (e) { Static.checker = false }} style="margin-top:40px; border-radius: 0 0 22px 22px" class="c-chats__content" >
              <div class="c-chats__border">

                <ul class="c-chats__messages" style="height:300px">


                  {

                    Static.ChatData
                  }

                </ul>
                <div class="c-chats__form c-form">

                  <div class="c-form__wrapfield c-form__wrapfield--text">
                    <TextArea className="c-form__field" Static={Static.MessageValue} placeholder="Написать сообщение" />
                    <div class="c-form__actions">
                      {/*<a href="#" class="c-form__action c-form__action--left" title="">
                        <img src={svg.smile} width="13" height="13" alt="" class="c-form__icon" />
                      </a>
                      <label for="file" class="c-form__action c-form__action--right" title="Прикрепить файл">
                        <img src={svg.attach} width="13" height="13" alt="" class="c-form__icon" />
                      </label>
                      <a href="#" class="c-form__action c-form__action--right" title="">
                        <img src={svg.email} width="13" height="13" alt="" class="c-form__icon" />
                </a>*/}
                    </div>
                    <button
                      class="c-form__send"
                      onclick={() => {
                        //оправим сообщение
                        checkAthorisation(Static)
                        sendRoomsMessage(Static, Static.MessageValue.id, Static.MessageValue.el.value)
                        Static.MessageValue.el.value = ""
                      }}
                    >
                      <img src={svg.send} width="13" height="13" alt="" class="c-form__icon" />
                    </button>
                  </div>

                </div>
              </div>
            </section>
          </div></div>)
    }, ID)

}
export default MiniChat;