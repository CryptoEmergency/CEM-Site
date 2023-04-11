import {
  jsx,
  jsxFrag,
  init,
  Variable,
  initReload,
  load,
} from "@betarost/cemserver/cem.js";

import svg from "@assets/svg/index.js";
import images from "@assets/images/index.js";
import { fn } from '@src/functions/export.js';


const arrSocials = [
  {
    link: "https://t.me/cryptoemergencychat",
    icon: "telegram",
    name: "Telegram",
    lang: "ru"
  },
  {
    link: "https://t.me/emergencycrypto",
    icon: "telegram",
    name: "Telegram",
    lang: "european_union"
  },
  {
    link: "https://instagram.com/cryptoemergency",
    icon: "instagram",
    name: "Instagram",
    lang: "ru"

  },
  {
    link: "https://instagram.com/cryptoemergency",
    icon: "instagram",
    name: "Instagram",
    lang: "us"
  },
  {
    link: "https://www.tiktok.com/@cryptoemergencyrussia",
    icon: "tiktok_icon",
    name: "Tiktok",
    lang: "ru"
  },
  {
    link: "https://vm.tiktok.com/ZSefExJrr",
    icon: "tiktok_icon",
    name: "Tiktok",
    lang: "us"
  },
  {
    link: "https://youtube.com/channel/UCb9Fx-fN",
    icon: "youtube_icon",
    name: "Youtube",
    lang: "ru"
  },
  {
    link: "https://vk.com/club209389938",
    icon: "vk_icon",
    name: "Vk",
    lang: "ru"
  },
  {
    link: "https://www.facebook.com/groups/crypt",
    icon: "facebook_icon",
    name: "Facebook",
    lang: "us"
  },
  {
    link: "https://twitter.com/cryptoemergency",
    icon: "twitter",
    name: "Twitter",
    lang: "us"
  }



  // {
  //   link: "https://duma.network/",
  //   icon: "logo-preload",
  //   name: "Duma",
  //   lang: "us",
  //   images: true
  // }
]
const sait = [{
  link: "https://duma.network/",
  icon: "logo-preload",
  name: "Duma",
  opis: "CEM Wallet - официальный криптовалютный кошелек Crypto Emergency. Отправляйте и получайте CEM и многие другие криптовалюты с помощью мобильного приложения CEM Wallet",
  images: true
},
{
  link: "https://sberunity.ru/profile/879d88aa-4729-4788-a541-20cc8cc3cb14",
  icon: "sber",
  name: "Сбер Unity",
  opis: "CEM Wallet - официальный криптовалютный кошелек Crypto Emergency. Отправляйте и получайте CEM и многие другие криптовалюты с помощью мобильного приложения CEM Wallet"
},
{
  link: "https://cemblockchain.com",
  icon: "cem_logo",
  name: "Blockchain",
  opis: "Crypto Emergency — общедоступная блокчейн-платформа с открытым исходным кодом, низкими комиссиями и отличной поддержкой продуктов."
},
{
  link: "https://chainlist.org/chain/193",
  icon: "chainList",
  name: "ChainList",
  opis: "Chainlist — это список сетей EVM. Пользователи могут использовать эту информацию для подключения своих кошельков и поставщиков промежуточного программного обеспечения Web3 к соответствующему идентификатору цепочки и идентификатору сети для подключения к правильной цепочке."
},
  // {
  //   link: "https://cemscan.com",
  //   icon: "cem_logo",
  //   name: "Block Explorer",
  //   opis: "Портал блоков",
  //   small: true
  // },
  // {
  //   link: "https://github.com/CryptoEmergency",
  //   icon: "github_icon",
  //   name: "Github",
  //   opis: "Ссылка на наш github",
  //   small: true
  // }
]
const sait_small = [{

  link: "https://cemscan.com",
  icon: "cem_logo",
  name: "Block Explorer",
  opis: "Портал блоков",
  //small: true
},
{
  link: "https://github.com/CryptoEmergency",
  icon: "github_icon",
  name: "Github",
  opis: "Ссылка на наш github",
  //small: true

}]

const start = function (data, ID) {
  let [Static] = fn.GetParams({ data, ID });
  Static.title = "Ссылки Crypto Emergency"
  Static.testif = 4
  load({
    ID,
    fn: () => {
      console.log('=3b30b5=', arrSocials)
      // if (Static.testif == 1) {
      //   console.log('=59d642=', 111)
      // } else {
      //   console.log('=59d642=', 77777)
      // }



      // setTimeout(() => {
      //   Static.title = "Другой текст!!!!"
      //   initReload()
      // }, 2000);

      return (
        <div class='c-main__body'>
          <div class="container-social">
            <h1 class="H1">{Static.title}</h1>
            <div class="block-section social">
              <h3 class="H3">Социальные сети</h3>
              <div class="btns-wrap-1">
                {
                  arrSocials.map((item, index) => {
                    console.log('=c559f5=', item.images)
                    return (
                      <a href={item.link} class="btn-item" target="_blank">
                        <img class="btn-item_img" src={!item.images ? svg[`train/${item.icon}`] : images[item.icon]} alt={item.name} />
                        <span>{item.name}</span>
                        <img class="btn-item_img-flag" src={svg['train/' + item.lang]} alt="Flag" />
                      </a>



                    )
                  })
                }


              </div>
            </div>
            <div class="block-section-2">

              <h4 class="H3">Наши сайты/партнеры</h4>
              <div class="btns-wrap-2">
                {
                  sait.map((item) => {
                    console.log('=c559f5=', item.link)
                    return (
                      <a
                        href={item.link}
                        class="btn-item-2"
                        target="_blank"
                      >
                        {/* <img class="btn-item_img-2" src={!item.images ? svg[`train/${item.icon}`] : images[item.icon]} alt={item.name} /> */}
                        <span class="SP2">{item.name}
                          <p class="p1">
                            <img class="btn-item_img-2" src={!item.images ? svg[`train/${item.icon}`] : images[item.icon]} alt={item.name} />
                            {item.opis}
                          </p>
                        </span>

                      </a>
                    )
                  })
                }

              </div>
              <div class="btns-wrap-2 btns-wrap-small">
                {sait_small.map((item) => {
                  console.log('=c559f5=', item.link)
                  return (
                    <a class="btn-small btn-item-2" href={item.link} target="_blank">
                      <img class="btn-item_img-2" src={!item.imeges ? svg[`train/${item.icon}`] : images[item.icon]}></img>
                      <div class="decs">
                        <h5 class="H5">{item.name}</h5>
                        <p class="p1">

                          {item.opis}</p>
                      </div>
                    </a>
                  )
                })
                }

              </div>

            </div>
            <div class="block-section-3">

              <h5 class="H3">Мобильные приложения</h5>
              <div class="btns-wrap-3">


                <div class="btn-item-3">
                  {/* <img class="btn-item_img" src={svg['cem_logo']} alt="Telegram" /> */}
                  <h5 class="H5">Crypto Emergency
                    <p class="P2">
                      <img class="btn-item_img-3" src={svg['cem_logo']} alt="Telegram" />
                      Here you can find crypto experts from any country, in any language and learn crypto skills from them: what is blockchain, what is cryptocurrency, how does it work, how to make money on it, how to create your own crypto startup and get other tips.
                      Communicating on the platform, you get up-to-date knowledge and coins that can be exchanged for real money. Our slogan: “Create2Earn” - create and earn. Every person on the platform earns CEM coins for every action.
                      Our project is international and available in 60 languages.
                    </p>
                  </h5>
                  <div class="apps-wrap">
                    <a href="https://play.google.com/store/apps/details?id=com.cryptoemergency&hl=en&gl=US" class="go-apps" target="_blank">
                      <img src={svg['googleplay']}></img>
                    </a>
                    <a href="https://apps.apple.com/ru/app/crypto-emergency/id1635628021" class="go-apps" target="_blank">
                      <img src={svg['appstore']}></img>
                    </a>
                  </div>

                </div>


                {/* <div class="#">
                  <a href="https://apps.apple.com/ru/app/crypto-emergency/id1635628021" class="btn-item-2" target="_blank">
                    <img class="btn-item_img" src={svg['train/telegram']} alt="Telegram" />
                    <span>Crypto Emergency</span>
                    <img class="btn-item_img-flag" src={svg['train/ru']} alt="Flag" />
                  </a>
                </div> */}

                <a href="https://play.google.com/store/apps/details?id=com.cemwallet&hl=en&gl=US" class="btn-item-3" target="_blank">
                  {/* <img class="btn-item_img-3" src={svg['cem_logo']} alt="Telegram" /> */}
                  <h5 class="H5">CEM Wallet
                    <p class="P2">
                      <img class="btn-item_img-3" src={svg['cem_logo']} alt="Telegram" />
                      CEM Wallet - официальный криптовалютный кошелек Crypto Emergency. Отправляйте и получайте CEM и многие другие криптовалюты с помощью мобильного приложения CEM Wallet
                    </p>
                  </h5>
                  <div class="apps-wrap">
                    <a href="https://play.google.com/store/apps/details?id=com.cemwallet&hl=en&gl=US" class="go-apps" target="_blank">
                      <img src={svg['googleplay']}></img>
                    </a>
                    <a href="https://apps.apple.com/ru/app/cem-wallet/id1637300554" class="go-apps" target="_blank">
                      <img src={svg['appstore']}></img>
                    </a>
                  </div>
                </a>
                {/* <a href="https://apps.apple.com/ru/app/cem-wallet/id1637300554" class="btn-item-2" target="_blank">
                  <img class="btn-item_img" src={svg['train/telegram']} alt="Telegram" />
                  <span>CEM Wallet</span>
                  <img class="btn-item_img-flag" src={svg['train/ru']} alt="Flag" />
                </a> */}

              </div>
            </div>
          </div>

        </div>
      );
    },
  });
};

export default start;
