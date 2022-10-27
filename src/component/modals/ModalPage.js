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

import { BlockNewsShow, BlockQuestionsShow, BlockLentaUsers, BlockUniversityItem } from '@component/blocks/index.js';

import { If } from "@component/helpers/All.js";
import { getDateFormat } from "@src/functions.js";
import { BlockUserComment } from "@src/component/blocks/user/BlockUserComment.js";
import { CommentInput } from "@src/component/element/CommentInput.js";
import { getNewsItemInShow } from "@src/apiFunctions.js";
import { BottomMenu } from '@component/element/BottomMenu.js';
import { AnswerAdditionallyToggle } from '@component/element/index.js'
let news;

const ModalPage = function ({ item, type }, reload) {
  let mainId = item._id;

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
                    onclick={() => { Variable.DelModals("ModalPage") }}
                  >
                    <img class="c-goback__arrow" src={svg["go_back_icon"]} />
                    <span class="c-goback__text">{Variable.lang.span.back}</span>
                  </a>
                  <AnswerAdditionallyToggle
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
                  />
                </div>

                <div class="c-fullnews__itemwrapp">
                  <p>Lorem Ipsum - это текст-"рыба", часто используемый в печати и вэб-дизайне. Lorem Ipsum является стандартной "рыбой" для текстов на латинице с начала XVI века. В то время некий безымянный печатник создал большую коллекцию размеров и форм шрифтов, используя Lorem Ipsum для распечатки образцов. Lorem Ipsum не только успешно пережил без заметных изменений пять веков, но и перешагнул в электронный дизайн. Его популяризации в новое время послужили публикация листов Letraset с образцами Lorem Ipsum в 60-х годах и, в более недавнее время, программы электронной вёрстки типа Aldus PageMaker, в шаблонах которых используется Lorem Ipsum.</p>
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
