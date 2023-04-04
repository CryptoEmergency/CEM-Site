import { jsx, jsxFrag, load } from "@betarost/cemserver/cem.js";

import { fn } from "@src/functions/index.js";


const arrVoting = [
  {
    title: "Самый большой город",
    discription:"Выбери самый большой город",
    voting:["Новороссийск","Москва","Краснодар"],
    active:null
  },
  {
    title: "Твой город",
    discription:"Выбери свой любимый город ",
    voting:["Новороссийск","Москва","Краснодар","Саратов","Красноярск","Мяч",],
    active:null
  },
  {
    title: "Самые сложные предметы",
    discription:"Выбери свой любимый предмет",
    voting:["История","Математика","Элементы высшей математики","Русский язык","Философия","ИС","БД","Метрология","ОС",],
    active:null
  }
]


const start = function (data, ID) {
  let [Static] = fn.GetParams({ data, ID });
  load({
    ID,
    fn: () => {
      return (
        <div class="container-voice">
          <h1 class="voice-title">Голосование</h1>
          <div class="btns-wrap"> 






            {arrVoting.map((item,index)=>{
  console.log(item,index)
  return (
    <div class="voice-inner">
            <h3 class="name">{item.title}</h3>
            <p class="description">
             {item.discription}
            </p>
            <ol class="list-voice">
            {item.voting.map((item2,index2)=>{
              console.log(index2)
return(
  
  <li class="list-el">
                <span>{index2+1}. {item2}</span>
                <input type="checkbox" class="checkbox-train"></input>
              </li>
)
            })}
            </ol>
            <div class="wrap-btn">
              <button class={["btn", Static.checked ? "btn-checked" : null]}>
                {" "}
                Проголосовать{" "}
              </button>
            </div>
            </div>
    )
})}
          </div>
        </div>
      );
    },
  });
};

export default start;
