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
} from "@betarost/cemjs";
import svg from "@assets/svg/index.js";

import { BlockNewsShow, BlockQuestionsShow,BlockLentaUsers } from '@component/blocks/index.js';

import { If } from "@component/helpers/All.js";
import { getDateFormat } from "@src/functions.js";
import { BlockUserComment } from "@src/component/blocks/user/BlockUserComment.js";
import { CommentInput } from "@src/component/element/CommentInput.js";
import { getNewsItemInShow } from "@src/apiFunctions.js";
let news;

const ModalFullSize = function ({ item, type }, reload) {
  console.log("=84781a=", item, type, reload);

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
    <div class="c-modal c-modal--open c-modal--fullscreen" id="ModalFullNews">
      <section class="c-modal__dialog">
        <div class="c-modal__body">
          <div class="c-fullnews">{/*  full_news_container */}
            <div class="c-fullnews__block">{/*  full_news_block */}
              <div class="c-fullnews__content">{/*  full_news_content */}
                <div class="c-fullnews__header">{/*  user_post_header */}
                  <a
                    class="c-goback"
                    onclick={() => { Variable.DelModals("ModalFullSize") }}
                  >
                    <img class="c-goback__arrow" src={svg["go_back_icon"]} />
                    <span class="c-goback__text">{Variable.lang.span.back}</span>
                  </a>
                </div>

                <BlockNewsShow
                  item={item}
                  type={type}
                />

                <BlockQuestionsShow
                  item={item}
                  type={type}
                />
                
                {/* <BlockLentaUsers
                item ={item}
                type = {type}
                /> */}


              </div>
            </div>
          </div>
        </div>
        <footer class="c-modal__footer">
        </footer>
      </section>
    </div>
  );
};

export default ModalFullSize;
