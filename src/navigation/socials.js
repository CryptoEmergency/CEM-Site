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
          <div class="title-page">Наши соц. сети</div>
          <div class="content-page">
            <div class="socials-button">Будет кнопка</div>
            <div class="socials-button">Будет кнопка2</div>
          </div>
        </div>
      );
    },
  });
};

export default start;
