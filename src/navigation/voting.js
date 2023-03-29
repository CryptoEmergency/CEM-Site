import { jsx, jsxFrag, load } from "@betarost/cemserver/cem.js";

import { fn } from "@src/functions/index.js";

const start = function (data, ID) {
  let [Static] = fn.GetParams({ data, ID });
  load({
    ID,
    fn: () => {
      return (
        <div class="Main_vers">
        <div class="voting">
          <p class = "text">Голосование</p>
          <div class="Opis">
            Описание
          </div>
          <ol class="list">
            <li class="list-city">Москва</li>
            <li>Новороссийск</li>
            <li>Краснодар</li>
          </ol>
        </div>
        <div>
<a class="voice"> Проголосовать</a>
        </div>
        </div>
      )
    },
  });
};

export default start;
