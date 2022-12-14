import {
  jsx,
  jsxFrag,
  Variable,
  initOne,
  initReload,
  Static
} from '@betarost/cemjs';
import { fn } from '@src/functions/index.js';
import svg from "@assets/svg/index.js";
import images from '@assets/images/index.js';
import { Avatar, ButtonShowMore, Input, NotFound, TextArea } from '@component/element/index.js';


//подписаться на комнату
async function subscribeRoom(Static,title,_id)
{
 let text = "Пользователь:  "+ Variable.myInfo.nickname + " подписан на уведомления"
 Static.Subscription = true
if(Static.usChat.show)
{

 console.log("subscribeRoom left")
 await fn.restApi.setUserRoom.add({ _id })

 await fn.restApi.setUserRoomMessage.sendMessage({ _id, text })
 let resp = await fn.restApi.getUserRoom({ name: "UsersRooms", filter: { system: false }, limit: 10 })

 //если включены мои комнаты и я сижу в чужой комнате
 if(Static.Rooms._id == _id)
 {

  Static.Rooms ={}
  Static.ChatData = ""
  let newRoom= resp.list_records.filter((item) => {
    return item._id == _id;
  });
  
  Static.Rooms = newRoom[0]
  
   Static.ChatData  = await ShowMessage(Static)
 }
 

}
else{
  console.log("subscribeRoom right")
  await fn.restApi.setUserRoom.add({ _id })

  await fn.restApi.setUserRoomMessage.sendMessage({ _id, text })
  await fn.restApi.getUserRoom({ name: "ListUsersRooms", filter: {system: false,author:{"$ne":Variable.myInfo._id},subscribeUsers:Variable.myInfo._id }, limit:10})

 let resp = await fn.restApi.getUserRoom({ name: "UsersRooms", filter: { system: false }, limit: 10 })
 

 if(Static.Rooms._id == _id)
 {

  Static.Rooms ={}
  Static.ChatData = ""
  let newRoom= resp.list_records.filter((item) => {
    return item._id == _id;
  });
  
   Static.Rooms = newRoom[0] 
   Static.ChatData  = await ShowMessage(Static)
 }

}


}

//отписаться от комнаты
 async function unsubscribeRoom(Static,title,_id)
{
  let text = "Пользователь: "+ Variable.myInfo.nickname + " отписался от уведомлений"
  Static.Subscription = false
  if(Static.usChat.show)
  {
    console.log("unsubscribeRoom left")
  
    await fn.restApi.setUserRoom.quit({ _id })
    await fn.restApi.setUserRoomMessage.sendMessage({ _id, text })

   let resp = await fn.restApi.getUserRoom({ name: "UsersRooms", filter: { system: false }, limit: 10 })
    let newRoom= resp.list_records.filter((item) => {
      return item._id == _id;
    });
    Static.Rooms ={}
    Static.ChatData = ""
    Static.Rooms = newRoom[0]
    Static.ChatData  = await ShowMessage(Static)


  }
  else{
    console.log("unsubscribeRoom right")
   
    await fn.restApi.setUserRoom.quit({ _id })
    await fn.restApi.setUserRoomMessage.sendMessage({ _id, text })
    await fn.restApi.getUserRoom({ name: "ListUsersRooms", filter: {system: false,author:{"$ne":Variable.myInfo._id},subscribeUsers:Variable.myInfo._id }, limit:10})
 
   let resp = await fn.restApi.getUserRoom({ name: "UsersRooms", filter: { system: false }, limit: 10 })
    
    let newRoom= resp.list_records.filter((item) => {
      return item._id == _id;
    });
    Static.Rooms ={}
    Static.ChatData = ""
    Static.Rooms = newRoom[0]
    Static.ChatData  = await ShowMessage(Static)
     
  }


}

//мои комнаты и комнаты на которые подписан
async function chatRooms(Static,main)
{
  console.log("chatRooms")
  

  document.getElementById("spinner").hidden = false



if(main)
{
  Static.usChat.show = true
  await fn.restApi.getUserRoom({ name: "ListUsersRooms", filter: {system: false,author:Variable.myInfo._id }, limit:10})

  Static.ChatRooms = Variable.ListUsersRooms
}
else{
  await fn.restApi.getUserRoom({ name: "ListUsersRooms", filter: {system: false,author:{"$ne":Variable.myInfo._id},subscribeUsers:Variable.myInfo._id }, limit:10})

  Static.ChatRooms = Variable.ListUsersRooms
  
  Static.usChat.show  = false
}

  initReload()


}

//системные комнаты
const Tags = async function ({ Static, _id,classActive, text, type }) {
  
  Static.defaultUserRoom = "crypto"
  return (
    <div class={["tag_button", classActive]}
      onclick={async () => {

        Static.defaultUserRoom = type

        ChangeRooms(Static, _id, true)
    

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
 async function CheckSystemInterface(Static, tag) {
  console.log("CheckSystemInterface")

  let langCode = Static.lang.code


  await fn.restApi.getUserRoom({  name: "ListSystemsRooms", filter: { system: true, "settingsroom.category": Static.defaultUserRoom,"languages.code":langCode }, limit: 10 })

if(typeof Variable.ListSystemsRooms.list_records[0] == "undefined")
{
  Static.Rooms = Variable.UsersRooms.list_records[0]
}
else{
 //системная комната
 Static.Rooms = Variable.ListSystemsRooms.list_records[0]
}
     

 
  
  Static.ChatData  = await ShowMessage(Static)

  Static.RoomTitle =   Static.Rooms.settingsroom.title
  initReload()
}

//меняем комнаты
async function ChangeRooms(Static, _id, system) {

  console.log("ChangeRooms")
  Static.Rooms ={}


  document.getElementById("spinner").hidden = false
  Static.Rooms._id = _id
  let response = await fn.restApi.getUserRoom({ _id, filter: { system: system, _id: _id } })



  Static.Rooms = response.list_records[0]


  Static.ChatData  = await ShowMessage(Static)
  
  Static.RoomTitle =   Static.Rooms.settingsroom.title

  Static.MessageValue.el.value = ""

 

  initReload()

}

//пишем сообщения
async function sendRoomsMessage(Static, id, textdata) {
  console.log("sendRoomsMessage")
  let _id = id
  let text = textdata

  if (textdata && textdata.length > 0) {
    await fn.restApi.setUserRoomMessage.sendMessage({ _id, text })

  }
  let response = await fn.restApi.getUserRoom({ _id, filter: { _id: _id } })
  Static.Rooms = response.list_records[0]
 

  if(Static.usChat.show)
{


  await fn.restApi.getUserRoom({ name: "UsersRooms", filter: { system: false }, limit: 10 })
  
}
else{
  await fn.restApi.getUserRoom({ name: "ListUsersRooms", filter: {system: false,author:{"$ne":Variable.myInfo._id},subscribeUsers:Variable.myInfo._id }, limit:10})
}
Static.ChatData  = await ShowMessage(Static)

  
  initReload()

}

//показываем сообщения
async function ShowMessage(Static) {
  console.log("ShowMessage")
  Static.MessageValue.id = Static.Rooms._id

  let authInput
  let authMessage
  function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }



  Static.subMarker = ""
  if (Static.Auth) {
      let SubUnsab

      if(!Static.Rooms.system  && Static.Rooms.author._id!==Variable.myInfo._id)
      {
        if(!Static.Subscription && !Static.Rooms.subscribeUsers.includes(Variable.myInfo._id))
        {
          SubUnsab = "подписаться"
        }
        else{
          SubUnsab = "отписаться" 
        }


        Static.subMarker =  <a
        class="c-button c-button--outline2"
        onmouseover = {function(){
          if(Static.z> 3){
              this.style.top = getRandomInt(500)+"px"
              this.style.left = getRandomInt(900)+"px"
       
             }
      }}   
        onclick={ function(event){
          if(Static.z == 4){
          let el =  document.getElementsByClassName("scetch")
          el[0].classList.remove("scetch")
            this.classList.add("tbutton")

           }
           Static.z++
         
           if(!Static.Subscription && !Static.Rooms.subscribeUsers.includes(Variable.myInfo._id))
           {
            subscribeRoom(Static,"",Static.MessageValue.id);
           }else{
            unsubscribeRoom(Static,"",Static.MessageValue.id);
           }
          
        
   }}
    
      >
       
        <div class="c-button__wrapper">
        {SubUnsab}
        </div>
      </a>
      
      }
      else{
        Static.subMarker = ""
      }
     
    }


   

  /**
     * делаем проверку на пользователя
     * если комната приватная и у руля её создатель то не запрашиваем пароль и отображаем все сообщения
    */
  if (Static.Rooms.settingsroom.status) {
    if (Static.Rooms.author._id == Variable.myInfo._id || Static.Rooms.subscribeUsers.includes(Variable.myInfo._id)) {
      if (Static.Rooms.message.length > 0) {
        return Static.Rooms.message.map(function (userrooms, i) {


          return (
            <li class="c-chats__message c-message">
              <Avatar author={userrooms.author} parent={"c-message__avatar"} />
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
                <Avatar author={userrooms.author} parent={"c-message__avatar"} />{
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
              <Avatar author={userrooms.author} parent={"c-message__avatar"} />{
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
              <Avatar author={userrooms.author} parent={"c-message__avatar"} /> {
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
          <div class="c-chats__passmessage c-passmessage">
            <h4 class="c-passmessage__title">{authMessage}</h4>
            <div class="c-passmessage__form">
          
            </div>
          </div>
        </div>

      </li>
      
      )
    }


  }

}

//поиск
async function SearchRooms(Static) {
 
  console.log("searchroom")
  Static.searchInput = {
    value: "",
    label: "",
    active: false,
    condition: async (value) => {
    
      let response
      if (value.length > 0) {
        Static.searchInput.active = true
        response = await fn.restApi.getUserRoom({ name: "UsersRooms", filter: { $text: { $search: value }, system: false }, limit: 10 })

        if (response.list_records.length == 1) {

          Static.ActiveListRooms = [response.list_records[0]]

        } else if (response.list_records.length == 0) {

          Static.ActiveListRooms = []

        } else {

          Static.ActiveListRooms = response.list_records

        }
      }
      else {



        await fn.restApi.getUserRoom({ name: "UsersRooms", filter: { system: false }, limit: 10 })
        Static.ActiveListRooms = Variable.UsersRooms.list_records
     //   CheckSystemInterface(Static) ?????????????? хз зачем
      }

    }
  }
}







const BlockUserRooms = async function ({ Static }) {

  Static.ChatRooms = {}
 

  await initOne(async () => {
    Static.z=0
    Static.Subscription = false
    Static.Tag = {}
    //для тегов
    let resp = await fn.restApi.getUserRoom({ name: "ListSystemsRooms", filter: { system: true, "languages.code": Variable.lang.code }, limit: 10 })

   if(resp.totalFound == 0)
   {
    Static.showTag = false
   }
   else{
    Static.showTag = true
   }
    Static.Tag = resp
    Static.defaultUserRoom = "crypto"

    //комнаты в чате
    await fn.restApi.getUserRoom({ name: "ListUsersRooms", filter: { system: false, author: Variable.myInfo._id }, limit: 10 })

    //для пользовательских комнат которые пользователь сам создал
    await fn.restApi.getUserRoom({ name: "UsersRooms", filter: { system: false }, limit: 10 })
    Static.nameRecords = "UsersRooms"


    //при первом заходе открываем системный чат
    CheckSystemInterface(Static)
    //запускаем поиск и фильтры
    SearchRooms(Static)


    //комнаты в чате
    Static.usChat = { show: true }



    Static.subMarker
  })

  Static.ChatRooms = Variable.ListUsersRooms




  //если не используем фильтры
  if (!Static.searchInput.active) {
    Static.ActiveListRooms = Variable.UsersRooms.list_records
  }

  let redborder
  let edit
  let subscribe
  let roomImage
  let bell




  return (

    <div class="c-rooms c-container">

      <div class="c-rooms__langs c-chats__list c-chats__list--system">
        <ul class="c-chats__togglers">
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
                  let lang = Variable.listsLang.filter((item) => {
                    return item.code == langCode;
                  });
                  let searchLang = lang[0].code

                  let resp = await fn.restApi.getUserRoom({ name: "ListSystemsRooms", filter: { system: true, "languages.code": searchLang }, limit: 10 })
                  if (resp.totalFound > 0) {

                    Static.lang.name = langOrig;
                    Static.lang.code = langCode;
                    Static.Tag = resp

                    let systemroom = Static.Tag.list_records.filter((item) => {
                      return item.settingsroom.category == Static.defaultUserRoom;
                    });

                    if (Static.Rooms.system) {
                      ChangeRooms(Static, systemroom[0]._id, true)
                    }
                    // 
                  } else {
                    alert("Нет такой системной комнаты")
                  }
                },
              },
            });
          }}
        >{Static.lang.name}</div>
      </div>
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
                    chatRooms(Static, true)
                    Static.usChat.show = true

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
                    chatRooms(Static, false)
                    Static.usChat.show = true

                  }}
                >
                  <img class="c-chats__checkimg" width="" height="" src={svg["icon/icon_group_fellowship"]} />
                </div>
              </div>
              <ul class="c-chats__togglers">

                {

                  Variable.ListUsersRooms.list_records.map(function (userrooms, i) {
                    if (userrooms.settingsroom.title && typeof userrooms.settingsroom.title !== "undefined") {
                      return (
                        <li
                          class={[
                            "c-chats__toggler",
                            "c-toggler",
                            typeof Static.Rooms._id !== "undefined" && Static.Rooms._id == userrooms._id ? "c-toggler--active" : null
                          ]}
                        >
                          <a class="c-toggler__link" title={userrooms.settingsroom.description} onclick={function (e) {
                            ChangeRooms(Static, userrooms._id, false)



                          }}>
                            {
                              userrooms.settingsroom.images ?
                                <img src={`/assets/upload/chat/${userrooms.settingsroom.images}`} width="46" height="46" class="c-toggler__img" />
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
                  callback: async (response) => {

                    if (response.list_records.length == 1) {
                      await fn.restApi.getUserRoom({ name: "ListUsersRooms", filter: { system: false, author: Variable.myInfo._id }, limit: 10 })

                      //для пользовательских комнат которые пользователь сам создал
                      await fn.restApi.getUserRoom({ name: "UsersRooms", filter: { system: false }, limit: 10 })
                      initReload()
                    }
                    else {
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
              {Static.subMarker

              }
              <center><div class="scetch">ПОПРОБУЙ ТЕПЕРЬ НАЖАТЬ!!!!!!!!!!1111111</div></center>
              <h4 class="c-chats__title"><span>Комната: {Static.RoomTitle}</span></h4>
              <ul class="c-chats__messages" id="chatMessage">


                {

                  Static.ChatData
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

      {()=>{
       
        if(Static.showTag){
      return  Static.Tag.list_records.map(function (tag) {
          return (
            <Tags
              Static={Static}
              _id={tag._id}
              text={tag.settingsroom.title}
              classActive={Static.defaultUserRoom == tag.settingsroom.category ? "tag_button_active" : ""}
              type={tag.settingsroom.category}

            />)
        })
      }
}
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

                if (userrooms.settingsroom.images.length > 0) {
                  roomImage = "/assets/upload/chat/" + userrooms.settingsroom.images
                }
                else {
                  roomImage = images["banners/ecosystem"]
                }

                if (userrooms.subscribeUsers.includes(Variable.myInfo._id) && !userrooms.settingsroom.system && userrooms.author._id !== Variable.myInfo._id) {
                  bell = svg.bell

                }
                else {
                  bell = svg.bell_1
                }
                if (Static.Auth) {
                if (userrooms.author && Variable.myInfo._id == userrooms.author._id) {
                  edit =
                    <a class="c-room__settings" href="" onclick={(e) => {

                      if (Static.Auth) {
                        fn.modals.ModalEditRoom({
                          Static, userrooms,
                          callback: async (response) => {

                            if (response.status == "ok") {
                              await fn.restApi.getUserRoom({ name: "ListUsersRooms", filter: { system: false, author: Variable.myInfo._id }, limit: 10 })

                              //для пользовательских комнат которые пользователь сам создал
                              await fn.restApi.getUserRoom({ name: "UsersRooms", filter: { system: false }, limit: 10 })

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
                  subscribe = ''
                }
                else {
                  edit = ''
                  subscribe =
                    <a class="c-room__settings" href=""
                      onclick={(e) => {if(!userrooms.subscribeUsers.includes(Variable.myInfo._id)){subscribeRoom(Static, userrooms.settingsroom.title, userrooms._id)} }}><img class="c-room__icon" src={bell} width="20" height="20" title="подписаться" /></a>
                }
              }


                if (typeof Static.Rooms._id !== "undefined" && Static.Rooms._id == userrooms._id) {
                  redborder = "border:1px solid #ff22ac"
                }
                else {
                  redborder = "border:1px solid #474c5a"
                }
                return (
                  <div style={redborder} class="c-room">
                    <header class="c-room__header">
                      {/* <date class="c-room__datecreate" datetime="">{fn.getDateFormat(userrooms.showDate, "now")}</date> */}
                  
                        <div class="c-question__lang language-question ">{userrooms.languages.orig_name}</div>
                      
                      <div>
                        {subscribe}
                      </div>
                      {edit}

                    </header>
                    <figure class="c-room__wrapper">
                      <div class="c-room__image c-room__image--rectangle" style="border-radius: 5px; border:1px solid #474c5a">
                        <img src={roomImage} alt="" />
                      </div>
                      <figcaption>
                        <div class="c-room__caption">
                          {/*<span class="c-room__lang c-question__langcontainer language_container">
                            <div class="c-question__lang language-question">{userrooms.languages.orig_name}</div>
                </span>*/}
                          {<h4 class="c-room__title">

                            <span class="c-room__subtitle" title="Категория">
                              <span><i>Категория: </i>{userrooms.settingsroom.category ? fn.sliceString(userrooms.settingsroom.category, 66) : null} </span>
                            </span>
                            <span class="c-room__subtitle"  title="Комната">
                              <span><i>Комната: </i>{userrooms.settingsroom.title ? fn.sliceString(userrooms.settingsroom.title, 66) : null} </span>
                            </span>
                          </h4>}

                          { /*<h4 class="c-room__title" title="Название комнаты">
                          
                </h4>*/}</div>
                        <p class="c-room__count">Количество участников: {userrooms.subscribeUsers.length + 1}</p>
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