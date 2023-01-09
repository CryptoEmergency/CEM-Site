import {
  jsx,
  jsxFrag,
  setAction,
  setValue,
  Variable,
  getValue,
  initReload,
  sendApi,
  initGo,
  initOne,
  stringToHtml,
  initAfter,
  getInitList
} from "@betarost/cemjs";
import svg from "@assets/svg/index.js";


import { BottomMenu } from '@component/element/BottomMenu.js';
import { ItemsMenu } from '@component/element/index.js'
let news;

const ModalPage = async function (ID, reload) {

  let data = Variable.ModalsPage[ID].data

  // let mainId = item._id;

  initAfter(
    () => {
      if (Variable.ModalsPage[ID].el && Variable.ModalsPage[ID].top) {
        Variable.ModalsPage[ID].el.scrollTop = Variable.ModalsPage[ID].top;
      }
    },
    null,
    true
  )
  if (!reload && getInitList()[ID].firstStart) {
    await getInitList()[ID].firstStart(reload)
    if (Variable.Static.elArrowTop && Variable.Static.elArrowTop.style.display != "none") {
      Variable.Static.elArrowTop.style.display = "none"
      // Variable.Static.elArrowTopLink = null
    }
  }

  return (
    <div
      class="c-modal c-modal--open c-modal--fullscreen c-modal--menu"
      id="ModalFullNews"

    >
      <section class="c-modal__dialog">
        <div class="c-modal__body" >
          <div
            class="c-fullnews"
            id="test"
            Element={($el) => { Variable.ModalsPage[ID].el = $el }}
            After={(el) => {
              el.addEventListener("scroll", function () {
                // if (Variable.ModalsPage[ID].el.scrollTop > 500 && !Variable.Static.elArrowTopLink) {
                //   Variable.Static.elArrowTop.style.display = "block"
                //   Variable.Static.elArrowTopLink = setTimeout(() => {
                //     Variable.Static.elArrowTop.style.display = "none"
                //     Variable.Static.elArrowTopLink = null
                //   }, 2500);
                // } else if (Variable.ModalsPage[ID].el.scrollTop > 500) {
                //   clearTimeout(Variable.Static.elArrowTopLink);
                //   Variable.Static.elArrowTopLink = setTimeout(() => {
                //     Variable.Static.elArrowTop.style.display = "none"
                //     Variable.Static.elArrowTopLink = null
                //   }, 2500);
                // }

                let windowPosition = {
                  top: window.pageYOffset,
                  left: window.pageXOffset,
                  right: window.pageXOffset + document.documentElement.clientWidth,
                  bottom: window.pageYOffset + document.documentElement.clientHeight
                };
                Variable.ElemVisible.map((item, index) => {
                  let targetPosition = {
                    top: window.pageYOffset + item.elem.getBoundingClientRect().top,
                    left: window.pageXOffset + item.elem.getBoundingClientRect().left,
                    right: window.pageXOffset + item.elem.getBoundingClientRect().right,
                    bottom: window.pageYOffset + item.elem.getBoundingClientRect().bottom
                  }
                  if (targetPosition.bottom > windowPosition.top &&
                    targetPosition.top < windowPosition.bottom &&
                    targetPosition.right > windowPosition.left &&
                    targetPosition.left < windowPosition.right) {
                    item.fn()
                    Variable.ElemVisible.splice(index, 1);
                  }
                })
              });
            }}>{/*  full_news_container */}
            <div class="c-fullnews__block">{/*  full_news_block */}
              <div class="c-fullnews__content" >{/*  full_news_content. style={type === "university" ? "max-width:1100px" : null} */}
                <div class="c-fullnews__header">{/*  user_post_header */}
                  <div class="c-container">
                    <a
                      class="c-goback"
                      onclick={() => {
                        // console.log('=acda1c=', Variable.Static, Variable.dataUrl)
                        // Variable.Static.DataUrl = Variable.dataUrl
                        Variable.ModalsPage.splice(ID, 1)
                        initReload("modalsPage")
                      }}
                      title={Variable.lang.span.back}
                    >
                      <img class="c-goback__arrow" src={svg["chats_back"]} />
                      {/* <span class="c-goback__text">{Variable.lang.span.back}</span> */}
                    </a>

                    <h5 class="c-fullnews__title">{data.title}</h5>

                    {<ItemsMenu items={data.items} author={data.author} />}
                    {/* <div class={`comment_icon_type-1 answer_additionally_toggle} `}>
                      <img class="answer_additionally_toggle_img" src={svg["points"]} />
                    </div> */}
                    {/* <AnswerAdditionallyToggle
                    item={item}
                    typeApi={"setPost"}
                    type={{
                      delete: true,
                      edit: true,
                      complainPost: true,
                      complainUser: true,
                      blackList: true,
                      subscription: true,
                      share: true,
                    }}
                    mainId={mainId}
                  // callBack={getItem}
                  /> */}
                  </div>
                </div>

                <div class="c-fullnews__itemwrapp" style={data.style ? data.style : ''} >
                  {async () => {
                    return await getInitList()[ID].function(reload)
                  }}

                </div>
              </div>
            </div>
          </div>
        </div>
        <footer class="c-modal__footer">
          <BottomMenu />
        </footer>
      </section>
    </div>
  );
};

export default ModalPage;
