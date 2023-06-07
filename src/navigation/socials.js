import {
  jsx,
  jsxFrag,
  init,
  Variable,
  initReload,
  load,
  CEM
} from "@betarost/cemserver/cem.js";

// import svg from "@assets/svg/index.js";
// import images from "@assets/images/index.js";
// import { fn } from '@src/functions/export.js';

const { images, svg, fn } = CEM

const arrSocials = [
  {
    link: "https://t.me/cryptoemergencychat",
    icon: "telegram1",
    name: "Telegram",
    lang: "ru",
    lan: "ru"
  },
  {
    link: "https://t.me/emergencycrypto",
    icon: "telegram1",
    name: "Telegram",
    lang: "gb",
    lan: "eng"
  },
  {
    link: "https://instagram.com/cryptoemergency",
    icon: "iconizer-instagram",
    name: "Instagram",
    lang: "ru",
    lan: "ru"

  },
  {
    link: "https://instagram.com/cryptoemergency",
    icon: "iconizer-instagram",
    name: "Instagram",
    lang: "gb",
    lan: "eng"
  },
  {
    link: "https://www.tiktok.com/@cryptoemergencyrussia",
    icon: "tiktok_icon",
    name: "Tiktok",
    lang: "ru",
    lan: "ru"
  },
  {
    link: "https://vm.tiktok.com/ZSefExJrr",
    icon: "tiktok_icon",
    name: "Tiktok",
    lang: "gb",
    lan: "eng"
  },
  {
    link: "https://youtube.com/channel/UCb9Fx-fN",
    icon: "youtube_icon",
    name: "Youtube",
    lang: "ru",
    lan: "ru"
  },
  {
    link: "https://www.facebook.com/groups/crypt",
    icon: "facebook_icon",
    name: "Facebook",
    lang: "gb",
    lan: "eng"
  },
  {
    link: "https://vk.com/club209389938",
    icon: "vk_icon",
    name: "Vk",
    lang: "ru",
    lan: "ru"
  },

  {
    link: "https://twitter.com/cryptoemergency",
    icon: "twitter1",
    name: "Twitter",
    lang: "gb",
    lan: "eng"
  }



  // {
  //   link: "https://duma.network/",
  //   icon: "logo-preload",
  //   name: "Duma",
  //   lang: "us",
  //   images: true
  // }
]
const projectS = [{
  link: "https://duma.network/",
  icon: "logo-preload",
  name: "Duma",
  opis: "Инструмент для инвесторов. Исследования, аналитика, безопасный вклад любой суммы, разделение SAFT и продажа через платформу.",
  images: true
},
{
  link: "https://cemblockchain.com",
  icon: "cem_logo",
  name: "Blockchain",
  opis: "Crypto Emergency — общедоступная блокчейн-платформа с открытым исходным кодом, низкими комиссиями и отличной поддержкой продуктов."
},
{

  link: "https://cemscan.com",
  icon: "cem_logo",
  name: "Block Explorer",
  opis: "Визуализации блоков, истории транзакций и показателей блокчейна Crypto Emergency.",
},
{
  link: "https://cemwallet.com/",
  icon: "azpvs-eu044",
  name: "Cem Wallet",
  opis: "CEM Wallet - официальный криптовалютный кошелек Crypto Emergency. Отправляйте и получайте CEM и многие другие криптовалюты с помощью мобильного приложения CEM Wallet",
  imeges: true
}
]

// const sait = [
//   {
//     link: "https://chainlist.org/chain/193",
//     icon: "chainList",
//     name: "ChainList",
//     opis: "Chainlist — это список сетей EVM. Пользователи могут использовать эту информацию для подключения своих кошельков и поставщиков промежуточного программного обеспечения Web3 к соответствующему идентификатору цепочки и идентификатору сети для подключения к правильной цепочке."
//   },
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
//]
const sait_small = [{

  link: "https://sberunity.ru/profile/879d88aa-4729-4788-a541-20cc8cc3cb14",
  icon: "sber",
  name: "Сбер Unity",
  opis: "Платформу для взаимодействия инвесторов и стартапов Инвесторы могут оставлять запросы, а стартапы напрямую откликаться на них.",
  //small: true
},
{
  link: "https://chainlist.org/chain/193",
  icon: "chainList",
  name: "ChainList",
  opis: "Chainlist — это список сетей EVM. Пользователи могут использовать эту информацию для подключения своих кошельков и поставщиков промежуточного программного обеспечения Web3 к соответствующему идентификатору цепочки и идентификатору сети для подключения к правильной цепочке."
},

{
  link: "https://github.com/CryptoEmergency",
  icon: "github_icon",
  name: "Github",
  opis: "Крупнейший веб-сервис для хостинга IT-проектов и их совместной разработки.",
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
                        {/* <img class="btn-item_img-flag" src={svg['train/' + item.lang]} alt="Flag" /> */}
                        <div> {item.lan} </div>
                        {/* <img class="btn-item_img-flag" src={`/assets/icons/flagsnew/${item.lang}.svg`} alt="Flag" /> */}
                      </a>



                    )
                  })
                }


              </div>
            </div>
            <div class="block-section-2">

              <h4 class="H3">Наши проекты</h4>
              <div class="btns-wrap-2">
                {
                  projectS.map((item) => {
                    console.log('=c559f5=', item.link)
                    return (
                      <a
                        href={item.link}
                        class="btn-item-2 btn-small"
                        target="_blank"
                      >
                        {/* <img class="btn-item_img-2" src={!item.images ? svg[`train/${item.icon}`] : images[item.icon]} alt={item.name} /> */}

                        <img class="btn-item_img-2"
                          src={!item.images ? svg[`train/${item.icon}`] : images[item.icon]}
                          alt={item.name} />
                        <div class="decs">
                          <h5 class="SP2">
                            {item.name}
                          </h5>
                          <p class="p1">
                            {item.opis}
                          </p>
                        </div>

                      </a>
                    )
                  })
                }

              </div>



            </div>
            <div class="block-section-2">
              <h4 class="H3">Ссылки</h4>
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
                  <h5 class="H5">Crypto Emergency
                    <p class="P2">
                      <img class="btn-item_img-3" src={svg['cem_logo']} alt="Telegram" />
                      Crypto Emergency – крипто социальная сеть, основанная на собственном блокчейне, имеющая огромную экосистему из разнообразных продуктов.Здесь можно найти криптоэкспертов из любой страны, на любом языке и обучиться у них криптомастерству.
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

                <a href="https://play.google.com/store/apps/details?id=com.cemwallet&hl=en&gl=US" class="btn-item-3" target="_blank">
                  <h5 class="H5">CEM Wallet
                    <p class="P2">
                      <img class="btn-item_img-3" src={svg['train/azpvs-eu044']} alt="Telegram" />
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


              </div>
            </div>
          </div>

        </div>
      );
    },
  });
};

export default start;
