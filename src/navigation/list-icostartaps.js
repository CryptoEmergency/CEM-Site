import {
  jsx,
  jsxFrag,
  load,
  initReload
} from "@betarost/cemserver/cem.js";

import { fn } from '@src/functions/index.js';
import svg from "@assets/svg/index.js";
import images from "@assets/images/index.js";

const listCategories = [
  {
    name: "ICO",
  },
  {
    name: "IDO",
  },
  {
    name: "IEO",
  },
  {
    name: "IGO",
  },
];
const listIcoStartaps = [
  {
    category: "active",
    iconScr: images["ico/ico1"],
    title: "Solidus AI Tech",
    description: "Blockchain Service",
    objective: "6,440,000",
    have: "8,660,000",
    procentDone: 74,
    timeStart: "Not Rated",
    timeEnd: "4h left",
  },
  {
    category: "upcoming",
    iconSrc: images["ico/ico3"],
    title: "SnakeMoney",
    description: "Gaming",
    objective: "490,000",
    have: "640,000",
    procentDone: 18,
    timeStart: "Not Rated",
    timeEnd: "1d left",
  },
]
0

const showBtn = function (listCategories) {
  return listCategories.map((item) => {
    return (
      <div class="tag_button tag_button-ico">
        <span>{item.name}</span>
      </div>
    )
  })
}

const showListIco = function (listIcoStartaps) {
  return listIcoStartaps.map((item) => {
    return (
      <div class="ico-list_item">
        <img class="item-img" src={item.iconScr}></img>
        <div class="item-info">
          <h5 class="item-title">{item.title}</h5>
          <p class="item-desc">{item.description}</p>
          <div>
            <p class="item-sum">
              <span class="item-sum_obj">${item.objective}</span> / ${item.have} <span class="item-sum_procent">{item.procentDone}%</span>
            </p>
          </div>
        </div>
        <div class="item-date">
          <span>{item.timeStart}</span>
          <span>{item.timeEnd}</span>
        </div>
      </div>
    )
  })
}

const showListCalendar = function (listCategories) {
  return listCategories.map((item) => {
    return (
      <li>{item.name}</li>
    )
  })
}

const start = function (data, ID) {

  let [Static] = fn.GetParams({ data, ID })
  let filterDropdown = false

  load({
    ID,
    fn: () => {
      return (
        <div class="book_container c-main__body">
          <div class="book-inner">
            <div class="tags tags-ico">
              {showBtn(listCategories)}
            </div>

            <div class="ico-list">

              <div class="ico-filtes">

                <div class="search-wrap">
                  <form class="ico-search">
                    <img src={svg["book/search"]} class="ico-search_icon"></img>
                    <input type="search" class="search" placeholder="Search ico"></input>
                  </form>
                  <img
                    class="filter-search_icon"
                    src={svg.filter}
                    onclick={() => {
                      filterDropdown = !filterDropdown
                      initReload()
                    }}
                  ></img>
                </div>

                <div hidden={filterDropdown ? false : true}>
                  <div class="filter-dropdowns">
                    <div class="dropdown">
                      <span class="dropdown-title">ICO календарь</span>
                      <ul class="dropdown-list">
                        {showListCalendar(listCategories)}
                      </ul>
                    </div>
                    <div class="dropdown">
                      <span class="dropdown-title">По дате</span>
                      <ul class="dropdown-list">
                        <li>По дате</li>
                      </ul>
                    </div>
                  </div>
                </div>

              </div>

              {showListIco(listIcoStartaps)}
            </div>

          </div>
        </div>


      )
    }
  })
}



export default start;