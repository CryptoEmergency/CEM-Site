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


  // {
  //   link: "https://duma.network/",
  //   icon: "logo-preload",
  //   name: "Duma",
  //   lang: "us",
  //   images: true
  // }
]

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
              <div class="btns-wrap">
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

                {/*Пример по думе 
                      <a href={item.link} class="btn-item" target="_blank">
                        <img class="btn-item_img" src={!item.images ? svg[`train/${item.icon}`] : images[item.icon]} alt={item.name} />
                        <span>{item.name}</span>
                        <img class="btn-item_img-flag" src={svg['train/' + item.lang]} alt="Flag" />
                      </a> */}

                {/* <a href="https://t.me/cryptoemergencychat" class="btn-item" target="_blank">
                  <img class="btn-item_img" src={images['logo-preload']} alt="Telegram" />
                  <span>Telegram!!!!!</span>
                  <img class="btn-item_img-flag" src={svg['train/ru']} alt="Flag" />
                </a> */}
                {/* <a href="https://t.me/emergencycrypto" class="btn-item" target="_blank">
                  <img class="btn-item_img" src={svg['train/telegram']} alt="Telegram" />
                  <span class>Telegram</span>
                  <img class="btn-item_img-flag" src={svg['train/european_union']} alt="Flag" />
                </a>


                <a href="https://instagram.com/cryptoemergency" class="btn-item" target="_blank">
                  <img class="btn-item_img" src={svg['train/instagram']} alt="Telegram" />
                  <span>Instagram</span>
                  <img class="btn-item_img-flag" src={svg['train/ru']} alt="Flag" />
                </a>
                <a href="https://instagram.com/cryptoemergency" class="btn-item" target="_blank">
                  <img class="btn-item_img" src={svg['train/instagram']} alt="Telegram" />
                  <span>Instagram</span>
                  <img class="btn-item_img-flag" src={svg['train/us']} alt="Flag" />
                </a>


                <a href="https://www.tiktok.com/@cryptoemergencyrussia" class="btn-item" target="_blank">
                  <img class="btn-item_img" src={svg['train/tiktok_icon']} alt="Telegram" />
                  <span>Tiktok</span>
                  <img class="btn-item_img-flag" src={svg['train/ru']} alt="Flag" />
                </a>
                <a href="https://vm.tiktok.com/ZSefExJrr" class="btn-item" target="_blank">
                  <img class="btn-item_img" src={svg['train/tiktok_icon']} alt="Telegram" />
                  <span>Tiktok</span>
                  <img class="btn-item_img-flag" src={svg['train/us']} alt="Flag" />
                </a> */}
              </div>
            </div>
            <div class="block-section-2">

              <h4 class="H3">Наши сайты/партнеры</h4>
              <div class="btns-wrap-2">
                <a href="https://duma.network/" class="btn-item-2" target="_blank">
                  <img class="btn-item_img" src={images['logo-preload']} alt="Telegram" />
                  <span class="SP2">Duma
                    <p class="P1">
                      CEM Wallet - официальный криптовалютный кошелек Crypto Emergency. Отправляйте и получайте CEM и многие другие криптовалюты с помощью мобильного приложения CEM Wallet
                    </p>
                  </span>
                  <img class="btn-item_img-flag" src={svg['train/ru']} alt="Flag" />
                </a>
                <a href="https://sberunity.ru/profile/879d88aa-4729-4788-a541-20cc8cc3cb14" class="btn-item-2" target="_blank">
                  <img class="btn-item_img" src={svg['train/telegram']} alt="Telegram" />
                  <span class="SP2">Сбер Unity
                    <p class="P1">
                      CEM Wallet - официальный криптовалютный кошелек Crypto Emergency. Отправляйте и получайте CEM и многие другие криптовалюты с помощью мобильного приложения CEM Wallet
                    </p>
                  </span>
                  <img class="btn-item_img-flag" src={svg['train/ru']} alt="Flag" />
                </a>

                <a href="https://cemblockchain.com" class="btn-item-2" target="_blank">
                  <img class="btn-item_img" src={svg['train/cem_logo']} alt="Telegram" />
                  <span class="SP2">Blockchain
                    <p class="P1">
                      CEM Wallet - официальный криптовалютный кошелек Crypto Emergency. Отправляйте и получайте CEM и многие другие криптовалюты с помощью мобильного приложения CEM Wallet
                    </p>
                  </span>
                  <img class="btn-item_img-flag" src={svg['train/ru']} alt="Flag" />
                </a>
                <a href="https://chainlist.org/chain/193" class="btn-item-2" target="_blank">
                  <img class="btn-item_img" src={svg['train/cem_logo']} alt="Telegram" />
                  <span class="SP2">ChainList
                    <p class="P1">
                      CEM Wallet - официальный криптовалютный кошелек Crypto Emergency. Отправляйте и получайте CEM и многие другие криптовалюты с помощью мобильного приложения CEM Wallet
                    </p>
                  </span>
                  <img class="btn-item_img-flag" src={svg['train/ru']} alt="Flag" />
                </a>

                <a href="https://cemscan.com" class="btn-item-2" target="_blank">
                  <img class="btn-item_img" src={svg['train/cem_logo']} alt="Telegram" />
                  <span class="SP2">Block Explorer
                    <p class="P1">
                      CEM Wallet - официальный криптовалютный кошелек Crypto Emergency. Отправляйте и получайте CEM и многие другие криптовалюты с помощью мобильного приложения CEM Wallet
                    </p>
                  </span>
                  <img class="btn-item_img-flag" src={svg['train/ru']} alt="Flag" />
                </a>
                <a href="https://github.com/CryptoEmergency" class="btn-item-2" target="_blank">
                  <img class="btn-item_img" src={svg['train/cem_logo']} alt="Telegram" />
                  <span class="SP2">GitHub
                    <p class="P1">
                      CEM Wallet - официальный криптовалютный кошелек Crypto Emergency. Отправляйте и получайте CEM и многие другие криптовалюты с помощью мобильного приложения CEM Wallet
                    </p>
                  </span>
                  <img class="btn-item_img-flag" src={svg['train/ru']} alt="Flag" />
                </a>

              </div>


            </div>
            <div class="block-section-3">

              <h5 class="H3">Мобильные приложения</h5>
              <div class="btns-wrap-3">

                <div class="#" >
                  <a href="https://play.google.com/store/apps/details?id=com.cryptoemergency&hl=en&gl=US" class="btn-item-2" target="_blank">
                    <img class="btn-item_img" src={svg['cem_logo']} alt="Telegram" />
                    <h5 class="H5">Crypto Emergency
                      <p class="P2">
                        Here you can find crypto experts from any country, in any language and learn crypto skills from them: what is blockchain, what is cryptocurrency, how does it work, how to make money on it, how to create your own crypto startup and get other tips.
                        Communicating on the platform, you get up-to-date knowledge and coins that can be exchanged for real money. Our slogan: “Create2Earn” - create and earn. Every person on the platform earns CEM coins for every action.
                        Our project is international and available in 60 languages.
                      </p>
                    </h5>
                    {/* <img class="btn-item_img-flag" src={svg['train/ru']} alt="Flag" /> */}
                  </a>
                </div>

                {/* <div class="#">
                  <a href="https://apps.apple.com/ru/app/crypto-emergency/id1635628021" class="btn-item-2" target="_blank">
                    <img class="btn-item_img" src={svg['train/telegram']} alt="Telegram" />
                    <span>Crypto Emergency</span>
                    <img class="btn-item_img-flag" src={svg['train/ru']} alt="Flag" />
                  </a>
                </div> */}

                <a href="https://play.google.com/store/apps/details?id=com.cemwallet&hl=en&gl=US" class="btn-item-2" target="_blank">
                  <img class="btn-item_img" src={svg['cem_logo']} alt="Telegram" />
                  <h5 class="H5">CEM Wallet
                    <p class="P1">
                      CEM Wallet - официальный криптовалютный кошелек Crypto Emergency. Отправляйте и получайте CEM и многие другие криптовалюты с помощью мобильного приложения CEM Wallet
                    </p>
                  </h5>
                  {/* <img class="btn-item_img-flag" src={svg['train/ru']} alt="Flag" /> */}
                </a>
                {/* <a href="https://apps.apple.com/ru/app/cem-wallet/id1637300554" class="btn-item-2" target="_blank">
                  <img class="btn-item_img" src={svg['train/telegram']} alt="Telegram" />
                  <span>CEM Wallet</span>
                  <img class="btn-item_img-flag" src={svg['train/ru']} alt="Flag" />
                </a> */}

              </div>
            </div>
          </div>
          {/* <div class="titul_page style_titul">
            <div> Наши соц.сети </div>

            <div class=" group_batton_1">
              <a href="https://t.me/emergencycrypto" target="_blank" class="Button_1 style_titul">
                Telegram
              </a>
              <a class=" Batton_1-2">
                Telegram
              </a>
            </div>


            <div class=" group_batton_2">
              <a href="https://www.tiktok.com/@cryptoemergencyrussia" target="_blank" class="Button_2-1">
                Тik tok
              </a>
              <a href="https://www.tiktok.com/@cryptoemergencyrussia" target="_blank" class="Button_2-2">
                Тik tok
              </a>
            </div>


            <div class=" group_batton_3">
              <a href="https://www.youtube.com/channel/UCb9Fx-fNikzs-OZwnTXepLg" target="_blank" class="Button_3">
                Youtube

              </a>
              <a href="https://www.youtube.com/channel/UCb9Fx-fNikzs-OZwnTXepLg" target="_blank" class="Button_3-2">
                Youtube

              </a>
            </div>
            <div>



            </div>
          </div> */}
        </div>
      );
    },
  });
};

export default start;
