import {
    jsx,
    jsxFrag,
    init,
    Variable,
    initReload
} from "@betarost/cemjs";
// poydet data-action
// import EmojiPicker from "rm-emoji-picker";
// console.log('=8eafb8=', EmojiPicker)
// console.log('=8eafb8=', new EmojiPicker.default())
// const picker = new EmojiPicker.default();
// const emoji_text = EmojiPicker.default.render('lol! :laughing:')
// console.log(emoji_text)
import { fn } from '@src/functions/index.js';
import svg from "@assets/svg/index.js";
let tmp = 0
const start = function (data, ID) {

    Variable.Static.tpm = 5
    init(
        async () => {
          //  await fn.restApi.setUserRoom.create({ visible: true, system: true, title: "Крипто RU", description: "Chat with other users on various topics", images: "111", languages: "ru", category: "Crypto" })
         //   await fn.restApi.setUserRoom.create({ visible: true, system: true, title: "Флудилка RU", description: "Chat with other users on various topics", images: "111", languages: "ru", category: "Flood" })
       

         //let resp = await fn.restApi.getUserRoom({ name: "ListSystemsRooms", filter: { system: true, "languages.code": "ru" }, limit: 10 })
        //    console.log(resp)
//var go = document.getElementsByClassName("tbutton")
//addEventListener('mouseover', (event) => {console.log(1)});




       

           
       
      

/*
let systemrooms = [{ru:[{roomName:"Крипто",category:"crypto"},{roomName:"Флудилка",category:"flood"}]},{en:[{roomName:"Crypto",category:"crypto"},{roomName:"Flood",category:"flood"}]}]

            Variable.listsLang.forEach(function(elem,i){
          
                    if(elem.code == "ru")
                    {
                        systemrooms[0].ru.forEach(async function(name){
                            await fn.restApi.setUserRoom.create({ visible: true, system: true, title: name.roomName+" "+elem.code.toUpperCase(), description: "", images: "", languages: elem.code, category: name.category }) 
                        })
                 
                    }
                    else{
                        systemrooms[1].en.forEach(async function(name){
                            await fn.restApi.setUserRoom.create( { visible: true, system: true, title: name.roomName+" "+elem.code.toUpperCase(), description: "", images: "", languages: elem.code, category: name.category }) 
                        }) 
                    }
         
           
              //  console.log(elem)

            })*/
       
         //   let request = { status, visible, confirmuser, title, description, images, languages, country,category }
            // console.log(Static.mediaInputs.value[0].name)
          //   let requier = await fn.restApi.setUserRoom.create(request)
        },
        () => {
      
            function getRandomInt(max) {
                return Math.floor(Math.random() * max);
              }
              let f = 0

            var z = 0
            let goal = 1
            let stop = false
            return (
                <div class="c-main__body">
                    {/* <div class={[Variable.HeaderShow ? 'c-main__body' : 'c-main__body--noheader']}> */}
                    Version page {Variable.Static.tpm}
                    <section class="c-chats__content" >
            <div class="c-chats__border"> <a href=""
        class="c-button c-button--outline2"
        onmouseover = {function(){
            if(z> 4){
                this.style.top = getRandomInt(300)+"px"
                this.style.left = getRandomInt(800)+"px"
         
               }
        }}   
        onclick={ function(event){
        
   if(z == 4){
    stop = true
    z = 4
    let el =  document.getElementsByClassName("scetch")
    let t1 = "Понравыилось нажимать кнопку?"
    let t2 = "ПОПРОБУЙ ТЕПЕРЬ НАЖАТЬ!!!!!!!!!!1111"
    let thisButton = this
    el[0].innerText=t1
    thisButton.disabled = true;
    thisButton.style = "background: #000;opacity: 0.6;"

    setTimeout(function(){
      el[0].innerText=t2
      thisButton.classList.add("tbutton")
      thisButton.style = ""
      z = 5
    },3000)
     
   }
   if(z > 4)
   {
    fn.modals.ModalNeedAuth(true)
    let el2 =  document.getElementsByClassName("game")
    
    el2[0].innerText = "Ваш счёт: "+goal
    goal++
   }
          if(z!== 4)
          {
            z++
          } 
          if(z==40)
          {
            alert("ВЫ ОЧЕНЬ УПЁРТЫЙ")

          }

          if(!stop){
            f++
     console.log(f)
      
      
          }
        
   }}
    
      >
        <div class="c-button__wrapper fun">
        подписаться
        </div>
</a>
</div>
</section>

<center><div class="scetch"></div><div class="game"></div></center>

<a disabled >нажми</a>
                    <div>={tmp}=</div>
                    <img src={svg['load']} />
                </div>
            )
        }, ID)
};
//init (function,function,ID)
export default start;