import {
  jsx,
  jsxFrag,
  init,
  Variable,
  initReload
} from "@betarost/cemserver/cem.js";
// poydet data-action
// import EmojiPicker from "rm-emoji-picker";
// console.log('=8eafb8=', EmojiPicker)
// console.log('=8eafb8=', new EmojiPicker.default())
// const picker = new EmojiPicker.default();
// const emoji_text = EmojiPicker.default.render('lol! :laughing:')
// console.log(emoji_text)
import { fn } from '@src/functions/index.js';
import svg from "@assets/svg/index.js";
import { Avatar, ButtonShowMore, Input, NotFound, TextArea, Select } from '@component/element/index.js';

//$text: { $search: Static.quest.value }
let tmp = 0
const start = function (data, ID) {

  Variable.Static.tpm = 5
  init(
    async () => {
      //  await fn.restApi.setUserRoom.create({ visible: true, system: true, title: "Крипто RU", description: "Chat with other users on various topics", images: "111", languages: "ru", category: "Crypto" })
      //   await fn.restApi.setUserRoom.create({ visible: true, system: true, title: "Флудилка RU", description: "Chat with other users on various topics", images: "111", languages: "ru", category: "Flood" })


      // const tmp = await fn.restApi.getIco({ filter: { startDate: { $gte: new Date() } } })
      const tmp = await fn.restApi.getStartaps({ filter: {} })
      console.log('=e5bcc8=', tmp)
      return

      await fn.restApi.SetCommunity.create({
        title: 'CryptoMetaDao',
        icon: 'cryptometa_logo',
        cover: 'cryptometa_cover',
        usersCount: 100,
        country: 'ru',
        city: 'Планета Земля',
        languages: 'ru',
        еvents: [
          {
            city: 'Москва',
            description: 'Web3 Завтраки по Четвергам'
          }
        ],
        gallery: [
          {
            type: 'image',
            name: 'cryptometa_gallery_1',
          },
          {
            type: 'image',
            name: 'cryptometa_gallery_2',
          },
          {
            type: 'image',
            name: 'cryptometa_gallery_3',
          },
          {
            type: 'image',
            name: 'cryptometa_gallery_4',
          },
          {
            type: 'image',
            name: 'cryptometa_gallery_5',
          },
          {
            type: 'image',
            name: 'cryptometa_gallery_6',
          },
          {
            type: 'image',
            name: 'cryptometa_gallery_7',
          },
          {
            type: 'image',
            name: 'cryptometa_gallery_8',
          },
          {
            type: 'image',
            name: 'cryptometa_gallery_9',
          },
          {
            type: 'image',
            name: 'cryptometa_gallery_10',
          },
          {
            type: 'image',
            name: 'cryptometa_gallery_11',
          }
        ],
        contacts: {
          site: 'https://cryptometa.media/',
          telegram: 'https://t.me/IVA8_8'
        },
        social: [
          {
            channel: 'telegram',
            name: 'CRYPTOMETA',
            description: 'Растем вместе с окружением',
            url: 'https://t.me/cryptometamedia'
          },
          {
            channel: 'youtube',
            name: 'CRYPTOMETA',
            description: 'Cryptometa - это проект, созданный друзьями для того, чтобы делиться своим анализом криптовалютного рынка и получать обратную связь.',
            url: 'https://www.youtube.com/c/CRYPTOMETAMEDIA'
          }
        ],
        interest: ['Сообщество', 'Инвестиции'],
        shortDescription: 'Нам интересен фундаментал, прозрачность, полезность и устойчивое развитие. Мы создаем экосистему «умных денег» и стабильного дохода.',
        fullDescription: '',
        category: ['Сообщество', 'Инвестиции'],
        foundationDate: '12.01.2021'
      })

      await fn.restApi.SetCommunity.create({
        title: 'CryptoClub NVRSK',
        icon: 'cryptoclubnvrsk',
        cover: 'cryptoclubnvrsk',
        usersCount: 9,
        country: 'ru',
        city: 'Новороссийск',
        languages: 'ru',
        еvents: [
          {
            city: 'Новороссийск',
            description: 'Встреча каждую субботу 16-00 в кафе/баре(по согласованию)'
          }
        ],
        gallery: [
          {
            type: 'image',
            name: 'cryptoClub_gallery_1',
          },
          {
            type: 'image',
            name: 'cryptoClub_gallery_2',
          },
          {
            type: 'image',
            name: 'cryptoClub_gallery_3',
          },
          {
            type: 'image',
            name: 'cryptoClub_gallery_4',
          },
          {
            type: 'image',
            name: 'cryptoClub_gallery_5',
          },
          {
            type: 'image',
            name: 'cryptoClub_gallery_6',
          },
          {
            type: 'image',
            name: 'cryptoClub_gallery_7',
          },
          {
            type: 'image',
            name: 'cryptoClub_gallery_8',
          },
          {
            type: 'image',
            name: 'cryptoClub_gallery_9',
          },
          {
            type: 'image',
            name: 'cryptoClub_gallery_10',
          },
          {
            type: 'image',
            name: 'cryptoClub_gallery_11',
          }
        ],
        contacts: {
          telegram: 'https://t.me/+vmw6S8KTzGMxZWYy'
        },
        social: [
          {
            channel: 'telegram',
            name: 'CryptoClub NVRSK',
            description: 'Сообщество криптоинтузиастов',
            url: 'https://t.me/+vmw6S8KTzGMxZWYy'
          }
        ],
        interest: ['Крипта', 'Блокчейн', 'Технологии', 'Майнинг', 'Трейдинг', 'Финансовая грамотность', 'Цифровая гигиена', 'NFT', 'DeFi'],
        shortDescription: 'Сообщество по интересам связным с криптой и блокчейн технологиями.',
        fullDescription: 'Сообщество криптоинтузиастов для встреч и общения. На встречах обсуждаем - майнинг, трейдинг, дефай, нфт, различные блокчейн проекты и делимся своим мнением в целом о крипте. Планируются встречи с экспертами из разных направлений и мастермаинды.',
        category: ['NFT', 'Безопасность', 'Defi', 'token', 'altcoin', 'Mining', 'Trading', 'ICO', 'GameFi', 'Move2Earn', 'Блокчейн'],
        foundationDate: '19.12.2022'
      })



      await fn.restApi.SetCommunity.create({
        title: 'Anonymous',
        icon: 'anonlogo',
        cover: 'anonlogo',
        usersCount: 5500,
        country: 'ru',
        city: 'Анапа',
        languages: 'ru',
        еvents: [
          {
            city: 'Анапа',
            description: 'Встреча каждую субботу 16-00 в кафе/баре(по согласованию)'
          }
        ],
        gallery: [
          {
            type: 'image',
            name: 'anonymous_gallery_1',
          },
          {
            type: 'image',
            name: 'anonymous_gallery_2',
          },
          {
            type: 'image',
            name: 'anonymous_gallery_3',
          },
          {
            type: 'image',
            name: 'anonymous_gallery_4',
          },
          {
            type: 'image',
            name: 'anonymous_gallery_5',
          }
        ],
        contacts: {
          site: 'https://anon-nft.com/',
          telegram: 'https://t.me/tonanon_nft'
        },
        social: [
          {
            channel: 'telegram',
            name: 'Anonymous NFT TON',
            description: 'Сообщество криптоинтузиастов',
            url: 'https://t.me/tonanon_nft'
          },
          {
            channel: 'instagram',
            name: 'CryptoClub NVRSK',
            description: 'Сообщество криптоинтузиастов',
            url: 'https://instagram.com/tonanon_nft'
          },
          {
            channel: 'Anonymous TON NFT Project',
            name: 'CryptoClub NVRSK',
            description: 'Сообщество криптоинтузиастов',
            url: 'https://twitter.com/tonanon_nft'
          },
          {
            channel: 'tiktok',
            name: 'CryptoClub NVRSK',
            description: 'Сообщество криптоинтузиастов',
            url: 'https://vm.tiktok.com/ZSegAPB7e/'
          },
          {
            channel: 'discord',
            name: 'CryptoClub NVRSK',
            description: 'Сообщество криптоинтузиастов',
            url: 'https://discord.gg/RXmtPQk2'
          }
        ],
        interest: ['Аноним', 'Анонимность', 'anonymous', 'nft', 'collection', 'project', 'merch', 'мерч', 'проект nft', 'шифры', 'инвестиции', 'cryptographic', 'crypto project'],
        shortDescription: 'Anonymous NFT  - это коллекция уникальных NFT для blockchain TON (The Open Network).',
        fullDescription: 'Anonymous NFT  - это коллекция уникальных NFT для blockchain TON (The Open Network). Основная коллекция 5000 Anonymous состоит из пяти классификаций персонажей. Pre-sale проходит в пять этапов по 100 NFT. С каждым новым этапом цена будет выше, чем в предыдущий. Pre-sale доступен по ссылке: @anonymous_TON_bot',
        category: ['NFT', 'web3'],
        foundationDate: '11.01.2022'
      })

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
                               await fn.restApi.setUserRoom.create({staus:false, visible: false, system: true, title: name.roomName+" "+elem.code.toUpperCase(), description: "", images: "", languages: elem.code, category: name.category }) 
                           })
                    
                       }
                       else{
                           systemrooms[1].en.forEach(async function(name){
                               await fn.restApi.setUserRoom.create( {staus:false, visible: false, system: true, title: name.roomName+" "+elem.code.toUpperCase(), description: "", images: "", languages: elem.code, category: name.category }) 
                           }) 
                       }
            
              
                 //  console.log(elem)
   
               })
          */
      //   let request = { status, visible, confirmuser, title, description, images, languages, country,category }
      // console.log(Static.mediaInputs.value[0].name)
      //   let requier = await fn.restApi.setUserRoom.create(request)
    },
    () => {


      return (
        <div>

        </div>
      )
      var div = document.getElementsByClassName('block1');

      var listener = function (e) {

        div[0].style.left = e.pageX - 50 + "px";
        div[0].style.top = e.pageY - 50 + "px";
      };
      /*    
          circle.addEventListener('mousedown', e => {
              document.addEventListener('mousemove', listener);
          });
          
          circle.addEventListener('mouseup', e => {
              document.removeEventListener('mousemove', listener);
          });
*/





      let StaticMessageValue = ""



      // window.location.replace("/")




      function getRandomInt(max) {
        return Math.floor(Math.random() * max);
      }
      let f = 0

      var z = 0
      let goal = 1
      let stop = false
      return (
        <div class="c-main__body">

          Version page {Variable.Static.tpm}


          <section class="c-chats__content" >
            <div class="c-chats__border"> <a href=""
              class="c-button c-button--outline2"
              onmouseover={function () {
                if (z > 4) {
                  this.style.top = getRandomInt(10) + "px"
                  this.style.left = getRandomInt(10) + "px"

                }
              }}
              onclick={function (event) {

                if (z == 4) {
                  stop = true
                  z = 4
                  let el = document.getElementsByClassName("scetch")
                  let t1 = "Понравыилось нажимать кнопку?"
                  let t2 = "ПОПРОБУЙ ТЕПЕРЬ НАЖАТЬ!!!!!!!!!!1111"
                  let thisButton = this
                  el[0].innerText = t1
                  thisButton.disabled = true;
                  thisButton.style = "background: #000;opacity: 0.6;"

                  setTimeout(function () {
                    el[0].innerText = t2
                    thisButton.classList.add("tbutton")
                    thisButton.style = ""
                    z = 5
                  }, 3000)

                }
                if (z > 4) {
                  if (z == 5) {
                    fn.modals.ModalNeedAuth({ game: "begin" })
                  }

                  let el2 = document.getElementsByClassName("game")

                  el2[0].innerText = "Ваш счёт: " + goal
                  goal++
                }
                if (z !== 4) {
                  z++
                }
                if (goal == 40) {
                  alert("ВЫ ОЧЕНЬ УПЁРТЫЙ, ВСЕГО ХОРОШЕГО")
                  window.location.replace("http://google.com")
                }

                if (!stop) {
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



          <div onmousedown={function (e) { document.addEventListener('mousemove', listener); }} onmouseup={function (e) { document.removeEventListener('mousemove', listener); }} class="block1">
            <div class="c-chats__form c-form">

              <div class="c-form__wrapfield c-form__wrapfield--text">

                <div class="c-form__actions">
                  {/*<a href="#" class="c-form__action c-form__action--left" title="">
      <img src={svg.smile} width="13" height="13" alt="" class="c-form__icon" />
    </a>
    <label for="file" class="c-form__action c-form__action--right" title="Прикрепить файл">
      <img src={svg.attach} width="13" height="13" alt="" class="c-form__icon" />
    </label>
    <a href="#" class="c-form__action c-form__action--right" title="">
      <img src={svg.email} width="13" height="13" alt="" class="c-form__icon" />
</a>*/}
                </div>
                <button
                  class="c-form__send"
                  onclick={() => {
                    //оправим сообщение
                    //  checkAthorisation(Static)
                    //  sendRoomsMessage(Static, Static.MessageValue.id, Static.MessageValue.el.value)
                    //  Static.MessageValue.el.value = ""
                  }}
                >
                  <img src={svg.send} width="13" height="13" alt="" class="c-form__icon" />
                </button>
              </div>

            </div>
          </div>
          <div>={tmp}=</div>
          <img src={svg['load']} />
        </div>
      )
    }, ID)
};
//init (function,function,ID)
export default start;