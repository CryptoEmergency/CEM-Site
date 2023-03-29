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
          <div class="titul_page style_titul">
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
            {/* <img src={svg["testTelega"]} > */}
          </div>



          <div class="Our_sait">
            <div>
              Наши сайты
              <a href="#" class="Button_sait">


              </a>
            </div>
          </div>


        </div>
      );
    },
  });
};

export default start;
