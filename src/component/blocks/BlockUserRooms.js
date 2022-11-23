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
import { Avatar, ButtonShowMore, Input, NotFound,TextArea } from '@component/element/index.js';

const BlockUserRooms = async function ({Static}) {

  //настройки языка
  Static.UserLang = Variable.myInfo.mainLanguage
  //Зарегистрирован или нет
  Static.Auth = Variable.auth
  //динамическая идишка
  let roomsId

  Static.MessageValue = {
    id:""
  }

  await initOne(async () => {
    await fn.restApi.getUserRoom({ cache: true, name: "ListSystemsRooms", filter: { system: true }, limit: 10 })
    await fn.restApi.getUserRoom({ cache: true, name: "SystemsRooms", filter: { system: true }, limit: 10 })
    await fn.restApi.getUserRoom({ cache: true, name: "ListUsersRooms", filter: { system: false }, limit: 10 })
    await fn.restApi.getUserRoom({ cache: true, name: "UsersRooms", filter: { system: false }, limit: 10 })
      CheckSystemInterface()
  })

    //если не авторизован
    function checkAthorisation(Static)
  {
    if(Static.Auth)
    {
      return true
    }
    else{
      fn.modals.ModalNeedAuth()
      return false
    }
    }

   //чекнем системную комнату отинтерфейса
   function CheckSystemInterface()
   {
 
   Variable.ListSystemsRooms.list_records.forEach(function(room,i){
 
     if(Variable.lang.code == room.languages.code /*&& Variable.Language.eng_name == room.languages.eng_name && Variable.Language.orig_name == room.languages.orig_name*/)
     {
       //системная комната
      Static.Rooms = Variable.ListSystemsRooms.list_records[i]
     }
    })
 
 
   }
 
   //меняем комнаты
   async function ChangeRooms(_id,system)
   {
    
    document.getElementById("spinner").hidden=false  

   let response = await fn.restApi.getUserRoom({_id,  filter: { system: system,  _id: _id } })

     Static.Rooms = response.list_records[0]

     ShowMessage(Static)
     
     Static.MessageValue.el.value = ""
     initReload()

   }
  
  //пишем сообщения
  async function sendRoomsMessage(id,textdata)
  {
 
    let _id = id
    let text = textdata

    if(textdata.length > 0)
    {
     await fn.restApi.setUserRoomMessage.sendMessage({_id,text})
    }
    let response = await fn.restApi.getUserRoom({_id,filter: { _id: _id } })
    Static.Rooms = response.list_records[0]
initReload()

  }

  //показываем сообщения
 function ShowMessage(Static)
  {
    Static.MessageValue.id = Static.Rooms._id
    if(Static.Rooms.message.length > 0)
    {

  

     return  Static.Rooms.message.map(function (userrooms, i) {

         return(
       <li class="c-chats__message c-message">
       <div class="c-message__avatar micro_user_avatar">
           <img style="position: absolute; top: 50%;left: 50%;z-index: 1; height: 69%; width: 69%; border-radius: 50%; transform: translateX(-50%) translateY(-50%);" src="/assets/image/nft/sample4.png" width="206" height="198" alt="" class="c-message__img" />
           <img style="position: absolute; top: 0;left: 50%;transform: translateX(-50%);z-index: 2; height:100%;width: 100%;" src="/assets/profile/frame/default.svg" />
             <div class="user_avatar_level">
               <img src="/assets/profile/levelGray.svg" />
            <span>0</span>
           </div>
           <div class="avatar_user_online"></div>
           <div style="display: none;" class="avatar_user_offline">
           </div>
       </div>
       
       {
       //ники пользователей showDate
      
       <div class="c-message__title">
           <div class="c-message__nick">{userrooms.author.nickname}</div>
           <div class="c-message__date">{userrooms.showDate}</div>
       </div>
       }
       {
       //сообщения
       <div class="c-message__body">
         {userrooms.text}
       </div>
     }
   </li>
     
         )})
   }
   else{

    return(
      <li class="c-chats__message c-message">
      <div class="c-message__title">
          <center>В данной комнате пока нет сообщений</center>

      </div>
 </li>
    )
  
   }
   
 
  }





  return (
    <div>
    <div class="c-questions__list questions-blocks c-chats__wrapper">
     
      {


     
      Variable.ListSystemsRooms.list_records.map(function (systemsrooms, i) 
      {
      
        return (
      
            <div class="c-questions__item c-question question-block questionLoad">
              <div class="c-question__header">
                <div class="c-question__avatar">
        
                </div>
                <div class="c-question__name">
                  <a
                    class="c-question__nickname"
                    style="display: block; left: 5px;bottom:5px"
                    href={`/user/${systemsrooms.author.nickname}`}
                    onclick={(e) => {
                   
                    }}>
                   {systemsrooms.author.nickname}
                  </a>
                  <div class="c-question__info">
                    <div class="c-question__icons">
                      {systemsrooms.close ?
                              <img
                                class="c-question__icon c-question__icon--status"
                                src={svg[`${(typeof systemsrooms.bestId == "string") ? "best_answer" : "closed_question"}`]}
                              />
                              :
                              <img class="c-question__icon c-question__icon--status" src={svg.open_question} />
                          }
                      <img class={"c-question__icon"["c-question__icon", fn.ifHaveMedia(systemsrooms.media, "audio") ? "c-question__icon--active" : null]} src={svg.systemsrooms} />
                      <img class={"c-question__icon"["c-question__icon", fn.ifHaveMedia(systemsrooms.media, "video") ? "c-question__icon--active" : null]} src={svg.systemsrooms} />
                      <img class={"c-question__icon"["c-question__icon", fn.ifHaveMedia(systemsrooms.media, "image") ? "c-question__icon--active" : null]} src={svg.systemsrooms} />
                    </div>
                    <div class="c-question__langcontainer language_container ">
                      <div class="c-question__lang language-question">
                        {systemsrooms.languages.orig_name}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <a
                style=""
                href={`/chat/show/${systemsrooms._id}`}
                class="c-question__body"
                //ссылка твой вопрос
                onclick={function (e) {
             alert()
                }}
              >
                <div class="c-question__preview">
                  <span class="">
                    {fn.sliceString(systemsrooms.settingsroom.title, 66)}
                  </span>
                  
                </div>
              </a>
           {()=>{
        if(systemsrooms.message.length >0){
        
        }
           }
           }
              <div class="c-question__statistic">
                <div class="c-question__stats ">
                  <img />
                  {fn.getDateFormat(systemsrooms.showDate, "now")}
                </div>
              </div>
              <div class="c-question__footer">
                <a
                  class="c-button c-button--outline2 buttonunswer"
                   
                  onclick={ (e) => {
                    roomsId = systemsrooms._id
                   ChangeRooms(roomsId,true)
                  
                  }}
        
                >
                  <div class="c-button__wrapper">
                войти
                  </div>
                </a>
              </div>
            </div>
          
        )
        
      }
      )
 
}
      

     
    </div>
    <hr></hr>
    <div class="c-container">
    <div class=" c-chats__wrapper">
    <aside class="c-chats__aside">
        <div class="c-chats__list">
          <ul class="c-chats__togglers">
          {Variable.UsersRooms.list_records.map(function (userrooms, i) {
  
           if(userrooms.author.nickname == Variable.myInfo.nickname)
           {
        return (
            <li class="c-chats__toggler c-toggler c-toggler--active">
              <a class="c-toggler__link" onclick={function (e) {
           roomsId = userrooms._id
           ChangeRooms(roomsId,false)
                }}>
              </a>
            </li>
        )
          }})}
          </ul>
        </div>
        <div class="c-chats__actions" onclick={() => {
          if (Static.Auth) {
            fn.modals.ModalCreateRoom({callback:(response)=>{

              if(response.list_records.length >0)
              {
                Variable.UsersRooms.list_records.unshift(response.list_records[0])
                initReload()
              }
          }})
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
      <section class="c-chats__content" >
    <div class="c-chats__border">
            <ul class="c-chats__messages" id="chatMessage">
  

            {
               ShowMessage(Static)
            }
            
             </ul>
      </div>
      <div class="c-chats__form c-form">

                <div class="c-form__block">
<div class="">
<TextArea className="c-form__field" Static={Static.MessageValue} />
 
  <button onclick={ ()=>{
     //оправим сообщение
     checkAthorisation(Static)
     sendRoomsMessage(Static.MessageValue.id,Static.MessageValue.el.value)
     Static.MessageValue.el.value = ""
    }} 
    
   >
       отправить
    </button>
</div>  

<div class="c-form__wrapfield" style="display: none;">
    <input type="file" id="file" class="c-form__field" name="file" />
</div>
</div>

</div>
      </section>
      </div>
    </div>  
    {/*
    блок для пользовательских комнат
    */} 
    <br />
    <br />
    <br />
    <br />
    <br />
    <div class="c-questions__list">
{Variable.ListUsersRooms.list_records.map(function (userrooms, i) {

  return (
    <div class="c-questions__item c-question question-block questionLoad">
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
        //ссылка твой вопрос
        onclick={function (e) {
          // fn.siteLinkModal(e, { title: Variable.lang.span.QA, item: question, author: question.author, items: hrefMenuitems, editVisible: false })
          //fn.siteLinkModal(e, { title: Variable.lang.span.QA, item: question })
        }}
      >
        <div class="c-question__preview">
          <span class="">
            {fn.sliceString(userrooms.settingsroom.title, 66)}
          </span>
          
        </div>
      </a>
   {()=>{
if(userrooms.message.length >0){

}
   }
   }
      <div class="c-question__statistic">
        <div class="c-question__stats ">
          <img />
          {fn.getDateFormat(userrooms.showDate, "now")}
        </div>
      </div>
      <div class="c-question__footer">
        <a
          class="c-button c-button--outline2 buttonunswer"
           
          onclick={ (e) => {
            roomsId = userrooms._id
           ChangeRooms(roomsId,false)
          
          }}

        >
          <div class="c-button__wrapper">
        войти
          </div>
        </a>
      </div>
    </div>
  )
})
}
</div>

<ButtonShowMore Static={Static} action="getRooms" />
</div>
  )
}

export { BlockUserRooms }