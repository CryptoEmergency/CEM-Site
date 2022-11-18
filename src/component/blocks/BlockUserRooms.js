import {
  jsx,
  jsxFrag,
  Variable,
  initOne
} from '@betarost/cemjs';
import { fn } from '@src/functions/index.js';
import svg from "@assets/svg/index.js";
import images from '@assets/images/index.js';
import { Avatar, ButtonShowMore, Input, NotFound } from '@component/element/index.js';

const BlockUserRooms = async function (Static) {


  //настройки языка
  Static.UserLang = Variable.myInfo.mainLanguage
  //Зарегистрирован или нет
  Static.Auth = Variable.auth





  await initOne(async () => {
    await fn.restApi.getUserRoom({ cache: true, name: "SystemsRooms", filter: { system: true }, limit: 10 })
    await fn.restApi.getUserRoom({ cache: true, name: "UsersRooms", filter: { system: false }, limit: 10 })
    console.log(Variable.UsersRooms)

  })

  return (
    <div class="c-questions__list questions-blocks c-chats__wrapper">
      <aside class="c-chats__aside">
        <div class="c-chats__list">
          <ul class="c-chats__togglers">
            <li class="c-chats__toggler c-toggler c-toggler--active">
              <a href="#" class="c-toggler__link" data-action="viewChat" title="Одна группа">
                <img src="/assets/image/nft/creator-1.png" width="46" height="46" class="c-toggler__img" />
                <div class="c-toggler__delete" title="Удалить">
                  <img src="/assets/icon/close_group.svg" alt="" width="" height="" class="c-toggler__close" />
                </div>
              </a>
            </li>
          </ul>
        </div>
        <div class="c-chats__actions" onclick={() => {
          if (Static.Auth) {
            fn.modals.ModalCreateRoom({})
          }
          else {
            fn.modals.ModalNeedAuth()
          }

        }}>
          <div data-needauth="true" data-action="addNewChat" class="c-action">
            <img src="/assets/icon/add_chats.svg" class="c-action__icon" width="30" height="30" alt="" title="" />
            <span class="c-action__title">Создать комнату</span>
          </div>
        </div>
      </aside>
      {Variable.SystemsRooms.list_records.map(function (rooms, i) {
        return (
          <div class="c-questions__item c-question question-block questionLoad">
            <div class="c-question__header">
              <div class="c-question__avatar">

              </div>
              <div class="c-question__name">
                <a
                  class="c-question__nickname"
                  style="display: block; left: 5px;bottom:5px"
                  //href={/*`/user/${question.author.nickname}`*/}
                  onclick={(e) => {

                  }}>
                  {/*question.author.nickname*/}
                </a>
                <div class="c-question__info">
                  <div class="c-question__icons">
                    {/*question.close ?
                            <img
                              class="c-question__icon c-question__icon--status"
                              src={svg[`${(typeof question.bestId == "string") ? "best_answer" : "closed_question"}`]}
                            />
                            :
                            <img class="c-question__icon c-question__icon--status" src={svg.open_question} />
                        */}
                    <img class={"c-question__icon"/*["c-question__icon", fn.ifHaveMedia(question.media, "audio") ? "c-question__icon--active" : null]} src={svg.question_audio} */} />
                    <img class={"c-question__icon"/*["c-question__icon", fn.ifHaveMedia(question.media, "video") ? "c-question__icon--active" : null]} src={svg.question_video}*/} />
                    <img class={"c-question__icon"/*["c-question__icon", fn.ifHaveMedia(question.media, "image") ? "c-question__icon--active" : null]} src={svg.question_photo}*/} />
                  </div>
                  <div class="c-question__langcontainer language_container ">
                    <div class="c-question__lang language-question">
                      {/*question.languages.orig_name*/}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <a
              style=""
              //href={/*`/question/show/${question._id}`*/}
              class="c-question__body"
              //ссылка твой вопрос
              onclick={function (e) {
                // fn.siteLinkModal(e, { title: Variable.lang.span.QA, item: question, author: question.author, items: hrefMenuitems, editVisible: false })
                //fn.siteLinkModal(e, { title: Variable.lang.span.QA, item: question })
              }}
            >
              <div class="c-question__preview">
                <span class="">
                  {/*fn.sliceString(question.title, 66)*/}
                </span>
              </div>
            </a>
            <div class="c-question__statistic">
              <div class="c-question__stats ">
                <img />
                {/*question.statistic.answer*/}
              </div>
              <div class="c-question__stats ">
                <img />
                {/*question.statistic.view*/}
              </div>
              <div class="c-question__stats ">
                <img />
                {/*fn.getDateFormat(question.showDate, "now")*/}
              </div>
            </div>
            <div class="c-question__footer">
              <a
                class="c-button c-button--outline2 buttonunswer"
                // href={/*`/question/show/${question._id}`*/}
                onclick={(e) => {
                  /* fn.siteLinkModal(e, { title: Variable.lang.span.QA, item: question, })*/
                }}
              >
                <div class="c-button__wrapper">
                  {/*Variable.lang.button.giveAnswer*/}
                </div>
              </a>
            </div>
          </div>
        )
      })
      }

      <ButtonShowMore Static={Static} action="getRooms" />
    </div>

  )
}

export { BlockUserRooms }