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



async function chatRooms(Static,main)
{
  Static.chatRooms = {}
  let arr = []
if(main)
{
  await fn.restApi.getUserRoom({ name: "ListChatUsersRooms", filter: {system: false } })
   Variable.ListChatUsersRooms.list_records.forEach(function(e,i){
console.log(e)
   if (e.author.nickname == Variable.myInfo.nickname) { 

    arr.push(e)
   }
   })
   Static.chatRooms.list_records = arr
}
else{
  await fn.restApi.getUserRoom({ name: "ListChatUsersRooms", filter: {system: false } })
  Variable.ListChatUsersRooms.list_records.forEach(function(e){
    //перебираем массив с юзерами
    e.users.forEach(function(u){
     if(u._id == Variable.myInfo._id)
     {
      arr.push(e)
     }
    })
  
    })
    Static.chatRooms.list_records = arr
}
console.log(Static.chatRooms)


initReload()
}


//системные комнаты
const Tags = function ({ Static, classActive, text, type }) {

  return (
    <div class={["tag_button", classActive]}
      onclick={async () => {

        Static.defaultUserRoom = type

        await fn.restApi.getUserRoom({ name: "ListSystemsRooms", filter: { system: true, "settingsroom.description": Static.defaultUserRoom }, limit: 10 })


        CheckSystemInterface(Static, true)
        ChangeRooms(Static, Static.Rooms._id, true)

      }}>
      <span>{text}</span>
    </div>
  )
}

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
function CheckSystemInterface(Static, tag) {
  let langCode
  if (tag) {
    langCode = Static.Rooms.languages.code
  }
  else {
    langCode = Variable.lang.code
  }
  Variable.ListSystemsRooms.list_records.forEach(function (room, i) {

    if (langCode == room.languages.code) {

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

  Static.lang.name = Static.Rooms.languages.orig_name
  Static.lang.code = Static.Rooms.languages.code

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
        authInput = <Input classDiv="c-form__wrapfield" className="c-form__field" Static={Static.confirmPasword} />
        authMessage = "Данная комната защищена паролем и вся секретная информация в ней скрыта до тех пор пока не введешь пароль"
      }
      else {
        authMessage = "Только авторизованные пользователи могут просматривать данный контент"

      }
      return (
        <li class="c-chats__message c-message">
          <div class="c-message__title">
            <div class="c-chats__passmessage c-passmessage">
              <h4 class="c-passmessage__title">{authMessage}</h4>
              <div class="c-passmessage__form">
                {authInput}
              </div>
            </div>
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

    Static.defaultUserRoom = "crypto"
    await fn.restApi.getUserRoom({ cache: true, name: "ListSystemsRooms", filter: { system: true, "settingsroom.description": Static.defaultUserRoom }, limit: 10 })

    await fn.restApi.getUserRoom({ cache: true, name: "ListUsersRooms", filter: { system: false }, limit: 10 })
    Static.nameRecords = "ListUsersRooms"
    //для пользовательских комнат которые пользователь сам создал
    await fn.restApi.getUserRoom({ cache: true, name: "UsersRooms", filter: { system: false }, limit: 10 })
    //при первом заходе открываем системный чат
    CheckSystemInterface(Static)
    //запускаем поиск и фильтры
    SearchRooms(Static)
    // console.log(Variable)

    Static.chatRooms = Variable.ListUsersRooms
  })

  //если не используем фильтры
  if (!Static.searchInput.active) {
    Static.ActiveListRooms = Variable.ListUsersRooms.list_records
  }

  let redborder
  let edit
  let roomImage

  return (

    <div class="c-rooms c-container">

      <div class="c-rooms__langs c-chats__list c-chats__list--system">
        <ul  class="c-chats__togglers">
          {/*

            //мапим системные комнаты

            Variable.ListSyst
            emsRooms.list_records.map(function (systemsrooms, i) {

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
           
                  </a>
                </li>
              )
            }
            )
          */}
        </ul>
        <div
          class="blog_filter_language"
          onclick={() => {
            Variable.SetModals({
              name: "ModalChangeLanguage",
              data: {
                onclick: async (langCode, langOrig) => {
                  let lang = Variable.ListSystemsRooms.list_records.filter((item) => {
                    return item.languages.code == langCode;
                  });

                  if (lang.length > 0) {
                    Static.lang.name = langOrig;
                    Static.lang.code = langCode;
                    ChangeRooms(Static, lang[0]._id, true)
                  } else {
                    alert("Нет такой системной комнаты")
                  }
                },
              },
            });
          }}
        >{Static.lang.name}</div>
      </div>
      {/*
        <Tags
          Static={Static}
          text={Variable.lang.categoryName.all}
          classActive={Static.defaultUserRoom == "all" ? "tag_button_active" : ""}
          type="all"

        />
*/
      }

      <div class="c-rooms__chats">
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
                    chatRooms(Static,true) 
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
                    chatRooms(Static,false) 
                  }}
                >
                  <img class="c-chats__checkimg" width="" height="" src={svg["icon/icon_group_fellowship"]} />
                </div>
              </div>
              <ul class="c-chats__togglers">
                {
                Static.chatRooms.list_records.map(function (userrooms, i) {
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
                              <img src={`/assets/upload/rooms/${userrooms.settingsroom.images}`} width="46" height="46" class="c-toggler__img" />
                              :
                              <div class="c-toggler__wrap">
                                <span class="c-toggler__name">{userrooms.settingsroom.title}</span>
                              </div>
                          }
                        </a>
                      </li>
                    )
                  }
                })
                }
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

      {

<Tags
  Static={Static}
  text={"ФЛУДИЛКА"}
  classActive={Static.defaultUserRoom == "flood" ? "tag_button_active" : ""}
  type="flood"

/>
}
{

<Tags
  Static={Static}
  text={"CRYPTO"}
  classActive={Static.defaultUserRoom == "crypto" ? "tag_button_active" : ""}
  type="crypto"

/>
}

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
      {/*
    блок для пользовательских комнат
    */}

      <div class="c-rooms__list">
     
        {

          //мапим юзерские комнаты
          () => {

            if (Static.ActiveListRooms.length > 0) {

              return Static.ActiveListRooms.map(function (userrooms, i) {
                
                if(userrooms.settingsroom.images.length > 0)
                {
                  roomImage = userrooms.settingsroom.images
                }
                else{
                  roomImage  = images["banners/ecosystem"]
                }
                   
                if (Variable.myInfo._id == userrooms.author._id) {
                  edit = 
                  <a class="c-room__settings" href=""  onclick={(e) => {

                    if (Static.Auth) {
                      fn.modals.ModalEditRoom({
                        Static, userrooms,
                        callback: (response) => {
                  
                          if (response.status =="ok") {
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
                  }}>
                      <img class="c-room__icon" src={svg.settings_icon} width="20" height="20" title="Редактировать" />
                    </a>
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
                  <div style={redborder} class="c-room">
                  <header class="c-room__header">
                    <date class="c-room__datecreate" datetime="">{fn.getDateFormat(userrooms.showDate, "now")}</date>
                    {edit}
                  </header>
                  <figure class="c-room__wrapper">
                    <div class="c-room__image c-room__image--quadro" style="border-radius: 5px; border:1px solid #474c5a">
                      <img src={roomImage} alt="" />
                    </div>
                    <figcaption>
                      <div class="c-room__caption">
                        <span class="c-room__lang c-question__langcontainer language_container">
                          <div class="c-question__lang language-question">{userrooms.languages.orig_name}</div>
                        </span>
                       { /*<h4 class="c-room__title" title="Категория">
                          <span>категория</span>
                        </h4>*/}
                      </div>
                      <h4 class="c-room__title" title="Название комнаты">
                          <span> {fn.sliceString(userrooms.settingsroom.title, 66)} </span>
                        </h4>
                      <p class="c-room__count">Количество участников: {userrooms.users.length}</p>
                      <div class="c-question__footer">
                              <a
                                class="c-button c-button--outline2"
        
                                onclick={(e) => {
        
                                  ChangeRooms(Static, userrooms._id, false)
        
                                }}
        
                              >
                                <div class="c-button__wrapper">
                                  войти
                                </div>
                              </a>
                            </div>
                    </figcaption>
                  </figure>
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

      <ButtonShowMore Static={Static} action="getUserRoom" limit={10} />
    </div>
  )
}

export { BlockUserRooms }