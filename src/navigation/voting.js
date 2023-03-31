import { jsx, jsxFrag, load,  } from "@betarost/cemserver/cem.js";

import { fn } from "@src/functions/index.js";

const start = function (data, ID) {
  let [Static] = fn.GetParams({ data, ID });
  load({
    ID,
    fn: () => {
      return (
        <div class="container-voice">
          <h1 class="voice-title">Голосование</h1>   
            <div class="voice-inner">
              <h3 class="name">Название</h3>
              <p class="description">Описание описание описание описание описание</p>
              <ol class="list-voice">
                <li class="list-el">
                  1. Москва
                  <input type="checkbox" class="checkbox-train"></input>
                </li>
                <li class="list-el">  
                  2. Новороссийск
                <input type="checkbox" class="checkbox-train"></input>
                </li>
                <li class="list-el"> 
                  3. Краснодар 
                <input type="checkbox" class="checkbox-train"></input>
                </li>
              </ol>
              <div class="wrap-btn">
                <button class={["btn", Static.checked ? "btn-checked" : null]} > Проголосовать </button>
              </div>
            </div>     
        </div>
      );
    },
  });
};

export default start;
