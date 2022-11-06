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


import { If } from "@component/helpers/All.js";
import { getDateFormat } from "@src/functions.js";
import { BottomMenu } from '@component/element/BottomMenu.js';
import { ItemsMenu } from '@component/element/index.js'
let news;

const ModalPage = async function (ID, reload) {
  let data = Variable.ModalsPage[ID].data
  console.log('=c1d88c=2 ModalPage', ID, reload, data)
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
  }

  return (
    <div
      class="c-modal c-modal--open c-modal--fullscreen c-modal--menu"
      id="ModalFullNews"

    >
      <section class="c-modal__dialog">
        <div class="c-modal__body" >
          <div class="c-fullnews" id="test" Element={($el) => { Variable.ModalsPage[ID].el = $el }}>{/*  full_news_container */}
            <div class="c-fullnews__block">{/*  full_news_block */}
              <div class="c-fullnews__content" >{/*  full_news_content. style={type === "university" ? "max-width:1100px" : null} */}
                <div class="c-fullnews__header">{/*  user_post_header */}
                  <div class="c-container">
                    <a
                      class="c-goback"
                      onclick={() => {
                        Variable.ModalsPage.splice(ID, 1)
                        initReload("modalsPage")
                      }}
                      title={Variable.lang.span.back}
                    >
                      <img class="c-goback__arrow" src={svg["chats_back"]} />
                      {/* <span class="c-goback__text">{Variable.lang.span.back}</span> */}
                    </a>

                    <h5 class="c-fullnews__title">{data.title}</h5>

                    <ItemsMenu
                    />
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
