import {
  jsx,
  jsxFrag,
  Variable,
  initOne,
  initReload
} from '@betarost/cemjs';
import { fn } from '@src/functions/index.js';
import svg from "@assets/svg/index.js";
import images from '@assets/images/index.js';
import { Avatar, ButtonShowMore, Input, NotFound, TextArea } from '@component/element/index.js';


//если не авторизован
function checkAthorisation(Static) {
  if (Static.Auth) {
    return true
  }
  else {
    fn.modals.ModalNeedAuth()
    return false
  }
}

//чекнем системную комнату отинтерфейса
function CheckSystemInterface(Static) {

  Variable.ListSystemsRooms.list_records.forEach(function (room, i) {

    if (Variable.lang.code == room.languages.code) {
      //системная комната
      Static.Rooms = Variable.ListSystemsRooms.list_records[i]
    }
  })


}

//меняем комнаты
async function ChangeRooms(Static, _id, system) {

  document.getElementById("spinner").hidden = false
  Static.Rooms._id = _id

  let response = await fn.restApi.getUserRoom({ _id, filter: { system: system, _id: _id } })

  Static.Rooms = response.list_records[0]

  ShowMessage(Static)

  Static.MessageValue.el.value = ""
  initReload()

}

//пишем сообщения
async function sendRoomsMessage(Static, id, textdata) {

  let _id = id
  let text = textdata

  if (textdata && textdata.length > 0) {
    await fn.restApi.setUserRoomMessage.sendMessage({ _id, text })
  }
  let response = await fn.restApi.getUserRoom({ _id, filter: { _id: _id } })
  Static.Rooms = response.list_records[0]
  initReload()

}

//показываем сообщения
function ShowMessage(Static) {

  Static.MessageValue.id = Static.Rooms._id

  let authInput
  let authMessage

  


  let checkArray = []
  Static.Rooms.users.forEach(function (elem, i) {

    if (Variable.myInfo._id == elem._id) {
      checkArray.push(Variable.myInfo._id)
    }
  })


/**
   * делаем проверку на пользователя
   * если комната приватная и у руля её создатель то не запрашиваем пароль и отображаем все сообщения
  */
  if (Static.Rooms.settingsroom.status) {
    if (Static.Rooms.author._id == Variable.myInfo._id || checkArray.length > 0) {
      if (Static.Rooms.message.length > 0) {
        return Static.Rooms.message.map(function (userrooms, i) {


          return (
            <li class="c-chats__message c-message">
              <Avatar author={userrooms.author} parent={"c-message__avatar"} />
              {/* <div class="c-message__avatar micro_user_avatar">
                <img
                  style="position: absolute; top: 50%;left: 50%;z-index: 1; height: 69%; width: 69%; border-radius: 50%; transform: translateX(-50%) translateY(-50%);"
                  src="/assets/image/nft/sample4.png"
                  width="206"
                  height="198"
                  alt=""
                  class="c-message__img"
                />
                <img
                  style="position: absolute; top: 0;left: 50%;transform: translateX(-50%);z-index: 2; height:100%;width: 100%;"
                  src="/assets/profile/frame/default.svg"
                />
                <div class="user_avatar_level">
                  <img src="/assets/profile/levelGray.svg" />
                  <span>0</span>
                </div>
                <div class="avatar_user_online"></div>
                <div style="display: none;" class="avatar_user_offline">
                </div>
              </div> */}

              {
                //ники пользователей 
                <div class="c-message__title">
                  <div class="c-message__nick">{userrooms.author.nickname}</div>
                  <div class="c-message__date">{fn.getDateFormat(userrooms.showDate, "time")}</div>
                </div>
              }
              {
                //сообщения
                <div class="c-message__body">
                  {userrooms.text}
                </div>
              }
            </li>

          )


        })

      }
      else {
        //если сообщений нет
        return (
          <li class="c-chats__message c-message">
            <div class="c-message__title">
              <center>В данной комнате пока нет сообщений</center>

            </div>
          </li>
        )
      }

    }
    else {
      //если пользователь ввел пароль
      if (Static.confirmPasword.valid) {

        if (Static.Rooms.message.length > 0) {
          return Static.Rooms.message.map(function (userrooms, i) {


            return (
              <li class="c-chats__message c-message">
                <Avatar author={userrooms.author} parent={"c-message__avatar"} />
                {/* <div class="c-message__avatar micro_user_avatar">
                  <img style="position: absolute; top: 50%;left: 50%;z-index: 1; height: 69%; width: 69%; border-radius: 50%; transform: translateX(-50%) translateY(-50%);" src="/assets/image/nft/sample4.png" width="206" height="198" alt="" class="c-message__img" />
                  <img style="position: absolute; top: 0;left: 50%;transform: translateX(-50%);z-index: 2; height:100%;width: 100%;" src="/assets/profile/frame/default.svg" />
                  <div class="user_avatar_level">
                    <img src="/assets/profile/levelGray.svg" />
                    <span>0</span>
                  </div>
                  <div class="avatar_user_online"></div>
                  <div style="display: none;" class="avatar_user_offline">
                  </div>
                </div> */}

                {
                  //ники пользователей showDate

                  <div class="c-message__title">
                    <div class="c-message__nick">{userrooms.author.nickname}</div>
                    <div class="c-message__date">{fn.getDateFormat(userrooms.showDate, "time")}</div>
                  </div>
                }
                {
                  //сообщения
                  <div class="c-message__body">
                    {userrooms.text}
                  </div>
                }
              </li>

            )


          })

        }
        else {
          return (
            <li class="c-chats__message c-message">
              <div class="c-message__title">
                <center>В данной комнате пока нет сообщений</center>

              </div>
            </li>
          )
        }


      }
      //если пользователь авторизоваеый но не вводил пароль выводим инпут
      if (Static.Auth) {
        authInput = <Input className="" Static={Static.confirmPasword} />
        authMessage = "Данная комната защищена паролем и вся секретная информация в ней скрыта до тех пор пока не введешь пароль"
      }
      else {
        authMessage = "Только авторизованные пользователи могут просматривать данный контент"

      }
      return (
        <li class="c-chats__message c-message">
          <div class="c-message__title">
            <center>{
              authMessage
            }</center>
            <br />
            <br />
            <br />
            <br />
            <p><center>
              {authInput}
            </center></p>
          </div>

        </li>
      )

    }
  }
  else {

    //системные комнаты для не авторизованных пользователей
    if (!Static.Auth && Static.Rooms.system) {

        if (Static.Rooms.message.length > 0) {
          return Static.Rooms.message.map(function (userrooms, i) {


            return (
              <li class="c-chats__message c-message">
                <Avatar author={userrooms.author} parent={"c-message__avatar"} />
                {/* <div class="c-message__avatar micro_user_avatar">
                  <img style="position: absolute; top: 50%;left: 50%;z-index: 1; height: 69%; width: 69%; border-radius: 50%; transform: translateX(-50%) translateY(-50%);" src="/assets/image/nft/sample4.png" width="206" height="198" alt="" class="c-message__img" />
                  <img style="position: absolute; top: 0;left: 50%;transform: translateX(-50%);z-index: 2; height:100%;width: 100%;" src="/assets/profile/frame/default.svg" />
                  <div class="user_avatar_level">
                    <img src="/assets/profile/levelGray.svg" />
                    <span>0</span>
                  </div>
                  <div class="avatar_user_online"></div>
                  <div style="display: none;" class="avatar_user_offline">
                  </div>
                </div> */}

                {
                  //ники пользователей showDate

                  <div class="c-message__title">
                    <div class="c-message__nick">{userrooms.author.nickname}</div>
                    <div class="c-message__date">{fn.getDateFormat(userrooms.showDate, "time")}</div>
                  </div>
                }
                {
                  //сообщения
                  <div class="c-message__body">
                    {userrooms.text}
                  </div>
                }
              </li>

            )


          })

        }
        else {

          return (
            <li class="c-chats__message c-message">
              <div class="c-message__title">
                <center>В данной комнате пока нет сообщений</center>

              </div>
            </li>
          )
        }
        //вывод всех комнат для авторизованных пользоватлей
    } else if (Static.Auth) {
      if (Static.Rooms.message.length > 0) {
        return Static.Rooms.message.map(function (userrooms, i) {


          return (
            <li class="c-chats__message c-message">
              <Avatar author={userrooms.author} parent={"c-message__avatar"} />
              {/* <div class="c-message__avatar micro_user_avatar">
                <img style="position: absolute; top: 50%;left: 50%;z-index: 1; height: 69%; width: 69%; border-radius: 50%; transform: translateX(-50%) translateY(-50%);" src="/assets/image/nft/sample4.png" width="206" height="198" alt="" class="c-message__img" />
                <img style="position: absolute; top: 0;left: 50%;transform: translateX(-50%);z-index: 2; height:100%;width: 100%;" src="/assets/profile/frame/default.svg" />
                <div class="user_avatar_level">
                  <img src="/assets/profile/levelGray.svg" />
                  <span>0</span>
                </div>
                <div class="avatar_user_online"></div>
                <div style="display: none;" class="avatar_user_offline">
                </div>
              </div> */}

              {
                //ники пользователей showDate

                <div class="c-message__title">
                  <div class="c-message__nick">{userrooms.author.nickname}</div>
                  <div class="c-message__date">{fn.getDateFormat(userrooms.showDate, "time")}</div>
                </div>
              }
              {
                //сообщения
                <div class="c-message__body">
                  {userrooms.text}
                </div>
              }
            </li>

          )


        })

      }
      else {

        return (
          <li class="c-chats__message c-message">
            <div class="c-message__title">
              <center>В данной комнате пока нет сообщений</center>

            </div>
          </li>
        )
      }
    }
    else {
      authMessage = "Только авторизованные пользователи могут просматривать данный контент"
      return (
        <li class="c-chats__message c-message">
          <div class="c-message__title">
            <center>{
              authMessage
            }</center>

          </div>

        </li>
      )
    }


  }
}

//поиск
async function SearchRooms(Static) {
  Static.searchInput = {
    value: "",
    label: "",
    active: false,
    condition: async (value) => {
      let response
      if (value.length > 0) {
        Static.searchInput.active = true
        response = await fn.restApi.getUserRoom({ name: "ListUsersRooms", filter: { $text: { $search: value }, system: false }, limit: 10 })

        if (response.list_records.length == 1) {

          Static.ActiveListRooms = [response.list_records[0]]

        } else if (response.list_records.length == 0) {

          Static.ActiveListRooms = []

        } else {

          Static.ActiveListRooms = response.list_records

        }
      }
      else {



        await fn.restApi.getUserRoom({ name: "ListUsersRooms", filter: { system: false }, limit: 10 })
        Static.ActiveListRooms = Variable.ListUsersRooms.list_records
        CheckSystemInterface(Static)
      }

    }
  }
}


const BlockUserRooms = async function ({ Static }) {

  await initOne(async () => {
    await fn.restApi.getUserRoom({ cache: true, name: "ListSystemsRooms", filter: { system: true }, limit: 10 })

    await fn.restApi.getUserRoom({ cache: true, name: "ListUsersRooms", filter: { system: false }, limit: 10 })
    Static.nameRecords = "ListUsersRooms"
    //для пользовательских комнат которые пользователь сам создал
    await fn.restApi.getUserRoom({ cache: true, name: "UsersRooms", filter: { system: false }, limit: 10 })
    //при первом заходе открываем системный чат
    CheckSystemInterface(Static)
    //запускаем поиск и фильтры
    SearchRooms(Static)
    console.log(Variable)
  })

  //если не используем фильтры
  if (!Static.searchInput.active) {
    Static.ActiveListRooms = Variable.ListUsersRooms.list_records
  }

  let redborder
  let edit
  return (
    <div class="c-rooms c-container">
      <div class="c-rooms__langs c-chats__list c-chats__list--system">
        <ul class="c-chats__togglers">
          {

            //мапим системные комнаты
            Variable.ListSystemsRooms.list_records.map(function (systemsrooms, i) {
              if (Static.Rooms._id == systemsrooms._id) {
                redborder = "border:1px solid #ff22ac"
              }
              else {
                redborder = "border:1px solid #474c5a"
              }
              return (
                <li
                  class={[
                    "c-chats__toggler",
                    "c-toggler",
                    Static.Rooms._id == systemsrooms._id ? "c-toggler--active" : null
                  ]}
                  onclick={(e) => {
                    ChangeRooms(Static, systemsrooms._id, true)
                  }}
                >
                  <a href="#" class="c-toggler__link" data-action="viewChat" title={fn.sliceString(systemsrooms.settingsroom.title, 66)}>
                    <div class="c-toggler__wrap">
                      <span class="c-toggler__name">{systemsrooms.languages.code}</span>
                    </div>
                    {/* <img src={images["nft/creator-1"]} width="46" height="46" class="c-toggler__img" /> */}
                    <div class="c-toggler__delete" title="Удалить">
                      <img src={svg.close_group} alt="" width="" height="" class="c-toggler__close" />
                    </div>
                  </a>
                </li>
              )
            }
            )
          }
        </ul>
      </div>
      {/* <hr></hr> */}
      <div class="c-rooms__searchblock c-search">
        <div class="c-search__container">
          <div class="c-search__wrapper">
            <img class="c-search__icon" src={svg.search_icon} />
            <Input className="c-search__input" Static={Static.searchInput} customStyle={"border-radius: 3px"} />
            <img
              class="c-search__icon c-search__icon--filter"
              src={svg.filter}
              onClick={() => {

              }}
            />
          </div>
          <div style="display: none;" class="questions_search">
            <div class="question_search_half_empty">
              {Variable.lang.text.contInput}
            </div>
            <div style="display: none;" class="question_search_help"></div>
          </div>
        </div>
      </div>
      {/* <hr></hr> */}
      <div class="c-container">
        <div class=" c-chats__wrapper">
          <aside class="c-chats__aside">
            <div class="c-chats__list">
              <div class="c-chats__checkboxes">
                <div
                  class={[
                    "c-chats__check",
                    "c-chats__check--created",
                    true ? "c-chats__check--active" : null
                  ]}
                  title="Группы, созданные мной"
                  onClick={(e) => {
                    alert('Группы, созданные мной')
                  }}
                >
                  <img class="c-chats__checkimg" width="" height="" src={svg["icon/icon_group_created"]} />
                </div>
                <div
                  class={[
                    "c-chats__check",
                    "c-chats__check--fellowship",
                    false ? "c-chats__check--active" : null
                  ]}
                  title="Группы, в которых я состою"
                  onClick={(e) => {
                    alert('Группы, в которых я состою')
                  }}
                >
                  <img class="c-chats__checkimg" width="" height="" src={svg["icon/icon_group_fellowship"]} />
                </div>
              </div>
              <ul class="c-chats__togglers">
                {Variable.UsersRooms.list_records.map(function (userrooms, i) {
                  console.log('=8c56fb=', userrooms)

                  if (userrooms.author.nickname == Variable.myInfo.nickname) {
                    return (
                      <li
                        class={[
                          "c-chats__toggler",
                          "c-toggler",
                          Static.Rooms._id == userrooms._id ? "c-toggler--active" : null
                        ]}
                      >
                        <a class="c-toggler__link" title={userrooms.settingsroom.description} onclick={function (e) {
                          ChangeRooms(Static, userrooms._id, false)
                        }}>
                          {
                            userrooms.settingsroom.images ?
                              <img src={`assets/upload/rooms/${userrooms.settingsroom.images}`} width="46" height="46" class="c-toggler__img" />
                              :
                              <div class="c-toggler__wrap">
                                <span class="c-toggler__name">{userrooms.settingsroom.title}</span>
                              </div>
                          }
                          {
                            Static.Rooms._id == userrooms._id ?
                              <div
                                class="c-toggler__delete"
                                title="Удалить"
                                onClick={(e) => {
                                  e.preventDefault();
                                  e.stopPropagation();
                                  alert('Удаление')
                                }}
                              >
                                <img src={svg.close_group} alt="" width="" height="" class="c-toggler__close" />
                              </div>
                              :
                              null
                          }
                        </a>
                      </li>
                    )
                  }
                })}
              </ul>
            </div>
            <div class="c-chats__actions" onclick={() => {
              if (Static.Auth) {
                fn.modals.ModalCreateRoom({
                  callback: (response) => {

                    if (response.list_records.length > 0) {
                      Variable.ListUsersRooms.list_records.unshift(response.list_records[0])
                      initReload()
                    }
                  }
                })
              }
              else {
                fn.modals.ModalNeedAuth()
              }

            }}>
              <div class="c-action">
                <img src={svg.add_chats} class="c-action__icon" width="30" height="30" alt="" title="" />
                <span class="c-action__title">Создать комнату</span>
              </div>
            </div>
          </aside>
          <section class="c-chats__content" >
            <div class="c-chats__border">
              <h4 class="c-chats__title"><span>Комната: {Static.Rooms.settingsroom.title}</span></h4>
              <ul class="c-chats__messages" id="chatMessage">


                {
                  ShowMessage(Static)
                }

              </ul>
              <div class="c-chats__form c-form">

                <div class="c-form__wrapfield c-form__wrapfield--text">
                  <TextArea className="c-form__field" Static={Static.MessageValue} placeholder="Написать сообщение" />
                  <div class="c-form__actions">
                    <a href="#" class="c-form__action c-form__action--left" title="">
                      <img src={svg.smile} width="13" height="13" alt="" class="c-form__icon" />
                    </a>
                    <label for="file" class="c-form__action c-form__action--right" title="Прикрепить файл">
                      <img src={svg.attach} width="13" height="13" alt="" class="c-form__icon" />
                    </label>
                    <a href="#" class="c-form__action c-form__action--right" title="">
                      <img src={svg.email} width="13" height="13" alt="" class="c-form__icon" />
                    </a>
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
        </div>
      </div>

      {/*
    блок для пользовательских комнат
    */}
      {/* <br />
      <br />
      <br />
      <br />
      <br />
      <hr></hr> */}
      <div class="c-questions__list">

        {

          //мапим юзерские комнаты
          () => {

            if (Static.ActiveListRooms.length > 0) {

              return Static.ActiveListRooms.map(function (userrooms, i) {
                if (Variable.myInfo._id == userrooms.author._id) {
                  edit = <div class="c-question__footer">
                    <a
                      class="c-button c-button--outline2 buttonunswer"

                      onclick={(e) => {

                        if (Static.Auth) {
                          fn.modals.ModalEditRoom({
                            Static, userrooms,
                            callback: (response) => {

                              if (response.list_records.length > 0) {
                                Variable.ListUsersRooms.list_records.unshift(response.list_records[0])
                                Variable.UsersRooms.list_records.unshift(response.list_records[0])
                                initReload()
                              }
                            }
                          })
                        }
                        else {
                          fn.modals.ModalNeedAuth()
                        }

                      }}

                    >
                      <div class="c-button__wrapper">
                        редактировать
                      </div>
                    </a>
                  </div>
                }
                else {
                  edit = ''
                }

                if (Static.Rooms._id == userrooms._id) {
                  redborder = "border:1px solid #ff22ac"
                }
                else {
                  redborder = "border:1px solid #474c5a"
                }
                return (
                  <div style={redborder} class="c-questions__item c-question question-block questionLoad">
                    <div class="c-question__header">

                      <div class="c-question__avatar">

                      </div>
                      <div class="c-question__name">
                        <a
                          class="c-question__nickname"
                          style="display: block; left: 5px;bottom:5px"
                          href={`/user/${userrooms.author.nickname}`}
                          onclick={(e) => {

                          }}>
                          {userrooms.author.nickname}
                        </a>
                        <div class="c-question__info">
                          <div class="c-question__icons">
                            {userrooms.close ?
                              <img
                                class="c-question__icon c-question__icon--status"
                                src={svg[`${(typeof userrooms.bestId == "string") ? "best_answer" : "closed_question"}`]}
                              />
                              :
                              <img class="c-question__icon c-question__icon--status" src={svg.open_question} />
                            }
                            <img class={"c-question__icon"["c-question__icon", fn.ifHaveMedia(userrooms.media, "audio") ? "c-question__icon--active" : null]} src={svg.userrooms} />
                            <img class={"c-question__icon"["c-question__icon", fn.ifHaveMedia(userrooms.media, "video") ? "c-question__icon--active" : null]} src={svg.userrooms} />
                            <img class={"c-question__icon"["c-question__icon", fn.ifHaveMedia(userrooms.media, "image") ? "c-question__icon--active" : null]} src={svg.userrooms} />
                          </div>
                          <div class="c-question__langcontainer language_container ">
                            <div class="c-question__lang language-question">
                              {userrooms.languages.orig_name}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <a
                      style=""
                      href={`/chat/show/${userrooms._id}`}
                      class="c-question__body"

                      onclick={function (e) {

                      }}
                    >
                      <div class="c-question__preview">
                        <span class="">
                          {fn.sliceString(userrooms.settingsroom.title, 66)}
                        </span>

                      </div>
                    </a>
                    <span>количество сообщений {userrooms.message.length}</span>
                    <div class="c-question__statistic">
                      <div class="c-question__stats ">
                        <img />
                        {fn.getDateFormat(userrooms.showDate, "now")}
                      </div>
                    </div>

                    <div class="c-question__footer">
                      <a
                        class="c-button c-button--outline2 buttonunswer"

                        onclick={(e) => {

                          ChangeRooms(Static, userrooms._id, false)

                        }}

                      >
                        <div class="c-button__wrapper">
                          войти
                        </div>
                      </a>
                    </div>
                    <br />
                    {edit}

                  </div>
                )

              })
            }

            else {
              return (
                <div><center><h4>По данному запросу комнат не найдено</h4></center></div>
              )
            }
          }
        }
      </div>

      <ButtonShowMore Static={Static} action="getUserRoom" />
    </div>
  )
}

export { BlockUserRooms }