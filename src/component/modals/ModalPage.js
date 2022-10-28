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
  getInitList
} from "@betarost/cemjs";
import svg from "@assets/svg/index.js";

import { BlockNewsShow, BlockQuestionsShow, BlockLentaUsers, BlockUniversityItem } from '@component/blocks/index.js';

import { If } from "@component/helpers/All.js";
import { getDateFormat } from "@src/functions.js";
import { BlockUserComment } from "@src/component/blocks/user/BlockUserComment.js";
import { CommentInput } from "@src/component/element/CommentInput.js";
import { getNewsItemInShow } from "@src/apiFunctions.js";
import { BottomMenu } from '@component/element/BottomMenu.js';
import { AnswerAdditionallyToggle } from '@component/element/index.js'
let news;

const ModalPage = async function (ID, reload) {
  console.log('=c1d88c=2 ModalPage', getInitList())
  // let mainId = item._id;

  initOne(async () => {
    // Variable.Static.ShowVoterInteval = { timer: 0 };
    // Variable.Static.resultShowVoter = undefined;
    // Variable.Static.activeCommentsInput = "";
    // Variable.Static.answerAdditionallyShow = "";
    // Variable.Static.showMainInput = true;
    // Variable.Static.activeEditInputs = [];
    // Variable.Static.answerAdditionally = false;
    // Variable.Static.showNewsId = news._id;
  });
  // news =  getNewsItemInShow(item._id);
  // console.log('=c0791d=',news)
  // news = news.list_records[0];
  //  news = item
  return (
    <div class="c-modal c-modal--open c-modal--fullscreen c-modal--menu" id="ModalFullNews">
      <section class="c-modal__dialog">
        <div class="c-modal__body">
          <div class="c-fullnews">{/*  full_news_container */}
            <div class="c-fullnews__block">{/*  full_news_block */}
              <div class="c-fullnews__content" >{/*  full_news_content. style={type === "university" ? "max-width:1100px" : null} */}
                <div class="c-fullnews__header">{/*  user_post_header */}
                  <a
                    class="c-goback"
                    onclick={() => {
                      Variable.ModalsPage.splice(ID, 1)
                      initReload("modals")
                    }}
                    title={Variable.lang.span.back}
                  >
                    <img class="c-goback__arrow" src={svg["chats_back"]} />
                    <span class="c-goback__text">{Variable.lang.span.back}</span>
                  </a>

                  {Variable.lang.a.about}

                  <div class={`comment_icon_type-1 answer_additionally_toggle} `}>
                    <img class="answer_additionally_toggle_img" src={svg["points"]} />
                  </div>
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

                <div class="c-fullnews__itemwrapp">
                  {getInitList()[0].function(reload)}
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
