import { jsx, jsxFrag, load } from "@betarost/cemserver/cem.js";

import { fn } from "@src/functions/index.js";

const start = function (data, ID) {
  let [Static] = fn.GetParams({ data, ID });
  load({
    ID,
    fn: () => {
      return (
        <div class="container-voice">
          <h1 class="voice-title">Голосование</h1>
          <div class="btns-wrap"> 
          <div class="voice-inner">
            <h3 class="name">Название</h3>
            <p class="description">
              Описание описание описание описание описание
            </p>
            <ol class="list-voice">
              <li class="list-el">
                <span>1. Москва</span>
                <input type="checkbox" class="checkbox-train"></input>
              </li>
              <li class="list-el">
                <span>2. Новороссийск</span>
                <input type="checkbox" class="checkbox-train"></input>
              </li>
              <li class="list-el">
                <span>3. Краснодар</span>
                <input type="checkbox" class="checkbox-train"></input>
              </li>
              <li class="list-el">
                <span>4. Санкт-Петербург</span>
                <input type="checkbox" class="checkbox-train"></input>
              </li>
              <li class="list-el">
                <span>5. Екатеринбург</span>
                <input type="checkbox" class="checkbox-train"></input>
              </li>
              <li class="list-el">
                <span>6. Казань</span>
                <input type="checkbox" class="checkbox-train"></input>
              </li>
              <li class="list-el">
                <span>7. Нижний Новгород</span>
                <input type="checkbox" class="checkbox-train"></input>
              </li><li class="list-el">
                <span>8. Текст текст</span>
                <input type="checkbox" class="checkbox-train"></input>
              </li>
              <li class="list-el">
                <span>9. Челябинск</span>
                <input type="checkbox" class="checkbox-train"></input>
              </li>
            </ol>
            <div class="wrap-btn">
              <button class={["btn", Static.checked ? "btn-checked" : null]}>
                {" "}
                Проголосовать{" "}
              </button>
            </div>
          </div>

          <div class="voice-inner">
            <h3 class="name">Название</h3>
            <p class="description">
              Описание описание описание описание описание
            </p>
            <ol class="list-voice">
              <li class="list-el">
                <span>1. Хабаровск</span>
                <input type="checkbox" class="checkbox-train"></input>
              </li>
              <li class="list-el">
                <span>2. Ульяновск</span>
                <input type="checkbox" class="checkbox-train"></input>
              </li>
              <li class="list-el">
                <span>3. Иркутск</span>
                <input type="checkbox" class="checkbox-train"></input>
              </li>
              <li class="list-el">
                <span>4. Красноярск</span>
                <input type="checkbox" class="checkbox-train"></input>
              </li>
              <li class="list-el">
                <span>5. Самара</span>
                <input type="checkbox" class="checkbox-train"></input>
              </li>
              <li class="list-el">
                <span>6. Уфа</span>
                <input type="checkbox" class="checkbox-train"></input>
              </li>
              <li class="list-el">
                <span>7. Ростов-на-Дону</span>
                <input type="checkbox" class="checkbox-train"></input>
              </li><li class="list-el">
                <span>8. Текст текст</span>
                <input type="checkbox" class="checkbox-train"></input>
              </li>
              <li class="list-el">
                <span>9. Омск</span>
                <input type="checkbox" class="checkbox-train"></input>
              </li>
            </ol>
            <div class="wrap-btn">
              <button class={["btn", Static.checked ? "btn-checked" : null]}>
                {" "}
                Проголосовать{" "}
              </button>
            </div>
            </div>
            <div class="voice-inner">
            <h3 class="name">Название</h3>
            <p class="description">
              Описание описание описание описание описание
            </p>
            <ol class="list-voice">
              <li class="list-el">
                <span>1. Барнаул</span>
                <input type="checkbox" class="checkbox-train"></input>
              </li>
              <li class="list-el">
                <span>2. Ижевск</span>
                <input type="checkbox" class="checkbox-train"></input>
              </li>
              <li class="list-el">
                <span>3. Махачкала</span>
                <input type="checkbox" class="checkbox-train"></input>
              </li>
              <li class="list-el">
                <span>4. Воронеж</span>
                <input type="checkbox" class="checkbox-train"></input>
              </li>
              <li class="list-el">
                <span>5. Пермь</span>
                <input type="checkbox" class="checkbox-train"></input>
              </li>
              <li class="list-el">
                <span>6. Волгоград</span>
                <input type="checkbox" class="checkbox-train"></input>
              </li>
              <li class="list-el">
                <span>7. Саратов</span>
                <input type="checkbox" class="checkbox-train"></input>
              </li><li class="list-el">
                <span>8. Тюмень</span>
                <input type="checkbox" class="checkbox-train"></input>
              </li>
              <li class="list-el">
                <span>9. Тольятти</span>
                <input type="checkbox" class="checkbox-train"></input>
              </li>
            </ol>
            <div class="wrap-btn">
              <button class={["btn", Static.checked ? "btn-checked" : null]}>
                {" "}
                Проголосовать{" "}
              </button>
            </div>
            </div>
          </div>
        </div>
      );
    },
  });
};

export default start;
