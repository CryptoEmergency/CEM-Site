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

const start = function (data, ID) {
  let [Static] = fn.GetParams({ data, ID });

  load({
    ID,
    fn: () => {
      return (
        <div class='c-main__body'>
          <div class="container-social">
            <h1 class="H1">Ссылки Crypto Emergency</h1>
            <div class="block-section social">
              <h3 class="H3">Социальные сети</h3>
              <div class="btns-wrap">
                <a href="https://t.me/emergencycrypto" class="btn-item" target="_blank">
                  <img class="btn-item_img" src={svg['train/telegram']} alt="Telegram" />
                  <span>Telegram</span>
                  <img class="btn-item_img-flag" src={svg['train/ru']} alt="Flag" />
                </a>
                <a href="https://t.me/emergencycrypto" class="btn-item" target="_blank">
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
                </a>
              </div>
            </div>
            <div class="block-section">

              <h4 class="H3">Наши сайты/партнеры</h4>
              <div class="btns-wrap">
                <a href="https://duma.network/" class="btn-item" target="_blank">
                  <img class="btn-item_img" src={svg['train/telegram']} alt="Telegram" />
                  <span>Duma</span>
                  <img class="btn-item_img-flag" src={svg['train/ru']} alt="Flag" />
                </a>
                <a href="https://sberunity.ru/profile/879d88aa-4729-4788-a541-20cc8cc3cb14" class="btn-item" target="_blank">
                  <img class="btn-item_img" src={svg['train/telegram']} alt="Telegram" />
                  <span>Сбер Unity</span>
                  <img class="btn-item_img-flag" src={svg['train/ru']} alt="Flag" />
                </a>

                <a href="https://cemblockchain.com" class="btn-item" target="_blank">
                  <img class="btn-item_img" src={svg['train/cem_logo']} alt="Telegram" />
                  <span>Blockchain</span>
                  <img class="btn-item_img-flag" src={svg['train/ru']} alt="Flag" />
                </a>
                <a href="https://chainlist.org/chain/193" class="btn-item" target="_blank">
                  <img class="btn-item_img" src={svg['train/cem_logo']} alt="Telegram" />
                  <span>ChainList</span>
                  <img class="btn-item_img-flag" src={svg['train/ru']} alt="Flag" />
                </a>

                <a href="https://cemscan.com" class="btn-item" target="_blank">
                  <img class="btn-item_img" src={svg['train/cem_logo']} alt="Telegram" />
                  <span>Block Explorer</span>
                  <img class="btn-item_img-flag" src={svg['train/ru']} alt="Flag" />
                </a>
                <a href="https://github.com/CryptoEmergency" class="btn-item" target="_blank">
                  <img class="btn-item_img" src={svg['train/cem_logo']} alt="Telegram" />
                  <span>GitHub</span>
                  <img class="btn-item_img-flag" src={svg['train/ru']} alt="Flag" />
                </a>

              </div>


            </div>
            <div class="block-section">

              <h5 class="H3">Мобильные приложения</h5>
              <div class="btns-wrap">

                <a href="https://play.google.com/store/apps/details?id=com.cryptoemergency&hl=en&gl=US" class="btn-item" target="_blank">
                  <img class="btn-item_img" src={svg['cem_logo']} alt="Telegram" />
                  <span>Crypto Emergency</span>
                  <img class="btn-item_img-flag" src={svg['train/ru']} alt="Flag" />
                </a>
                <a href="https://apps.apple.com/ru/app/crypto-emergency/id1635628021" class="btn-item" target="_blank">
                  <img class="btn-item_img" src={svg['train/telegram']} alt="Telegram" />
                  <span>Crypto Emergency</span>
                  <img class="btn-item_img-flag" src={svg['train/ru']} alt="Flag" />
                </a>

                <a href="https://play.google.com/store/apps/details?id=com.cemwallet&hl=en&gl=US" class="btn-item" target="_blank">
                  <img class="btn-item_img" src={svg['train/telegram']} alt="Telegram" />
                  <span>CEM Wallet</span>
                  <img class="btn-item_img-flag" src={svg['train/ru']} alt="Flag" />
                </a>
                <a href="https://apps.apple.com/ru/app/cem-wallet/id1637300554" class="btn-item" target="_blank">
                  <img class="btn-item_img" src={svg['train/telegram']} alt="Telegram" />
                  <span>CEM Wallet</span>
                  <img class="btn-item_img-flag" src={svg['train/ru']} alt="Flag" />
                </a>

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
