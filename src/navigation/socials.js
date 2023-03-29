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
          <div class="titul_page">
            <div> Наши соц.сети </div>

            <a href="https://t.me/emergencycrypto" target="_blank" class="Button_1">

              Моя супер желтая кнопк
            </a>
            <a href="https://www.tiktok.com/@cryptoemergencyrussia" target="_blank" class="Button_2">
              Тики токи :
            </a>
            <a href="https://www.youtube.com/channel/UCb9Fx-fNikzs-OZwnTXepLg" target="_blank" class="Button_3">
              Ютубчик *ХЪ

            </a>
            {/* <img src={svg["testTelega"]} > */}
          </div>
        </div>
      );
    },
  });
};

export default start;
