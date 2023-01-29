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

const listCalendar = [
  {
    name: "Active",
  },
  {
    name: "Upcoming",
  },
  {
    name: "Ended",
  },
]

const showBtn = function (Static, listCategories) {
  return listCategories.map((item) => {
    return (
      <div
        class={["tag_button", "tag_button-ico", Static.categoryActive == item.name ? "tag_button_active" : null]}
        onclick={async () => {
          Static.categoryActive = item.name
          Static.recordsIco = await fn.restApi.getIco({ filter: { category: Static.categoryActive } })
          initReload()
        }}
      >
        <span>{item.name}</span>
      </div>
    )
  })
}

const showListIco = function (listIcoStartaps) {
  return listIcoStartaps.map((item) => {
    // console.log(item)
    return (
      <div class="ico-list_item"
        onclick={() => {
          fn.siteLinkModal("/list-icostartaps/show/" + item._id, { title: item.title, item })
        }}>
        <div class="item-img">
          <img class="item-img_el" src={`/assets/upload/worldPress/${item.icon}`}></img>
        </div>
        <div class="item-info">
          <h5 class="item-title">{item.title}</h5>
          <div class="item-desc_wrap">
            <p class="item-desc">{item.description}</p>
          </div>
          <div class="item-sum_wrap">
            <p class="item-sum">
              <span class="item-sum_obj">${item.nowMoney}</span> / ${item.targetMoney} <span class="item-sum_procent">{Math.round((item.nowMoney * 100) / item.targetMoney)}%</span>
            </p>
          </div>
        </div>
        <div class="item-date">
          <span>{fn.getDateFormat(item.startDate, "time")}</span>
          <span>{fn.getDateFormat(item.endDate, "time")}</span>
        </div>
      </div>
    )
  })
}

let filterDropdown, icoDrop, dateDrop = false
let textCalendar = "ICO календарь"
let textDate = "По дате"

const showListCalendar = function (listCalendar) {
  return listCalendar.map((item) => {
    return (
      <li 
        onclick={()=>{
          if(icoDrop){
            textCalendar = item.name
            icoDrop = !icoDrop
            console.log(icoDrop)

          }else if(dateDrop){
            console.log(dateDrop)
            textDate = item.name
            dateDrop = !dateDrop
            console.log(dateDrop)

          }
          initReload()
        }}
      >{item.name}</li>
    )
  })
}

const start = function (data, ID) {

  let [Static] = fn.GetParams({ data, ID })
  Static.categoryActive = "ICO"


  load({
    ID,
    fnLoad: async () => {
      Static.recordsIco = await fn.restApi.getIco({ filter: { category: Static.categoryActive } })
      // console.log(Static.recordsIco)
    },
    fn: () => {
      return (
        <div class="book_container c-main__body">
          <div class="book-inner ico-inner">
            <div class="tags tags-ico">
              {showBtn(Static, listCategories)}
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
                    }}></img>
                </div>

                <div hidden={filterDropdown ? false : true}>
                  <div class="filter-dropdowns">
                    <div class="dropdown">
                      <div
                        class="dropdown-title"
                        onclick={() => {
                          icoDrop = !icoDrop
                          // console.log(listCategories.name)
                          initReload()
                        }}>
                        {textCalendar}
                        <span class={["dropdown-arrow", icoDrop ? "dropdown-checked" : null]}>
                          <img src={svg["arrow-select"]}></img>
                        </span>
                      </div>

                      <ul
                        class={["dropdown-list", icoDrop ? "dropdown-checked" : null]}
                        hidden={icoDrop ? false : true}>
                        {showListCalendar(listCalendar)}
                      </ul>
                    </div>
                    <div class="dropdown">
                      <div
                        class="dropdown-title"
                        onclick={() => {
                          dateDrop = !dateDrop
                          console.log(dateDrop)
                          initReload()
                        }}>
                        {textDate}
                        <span class={["dropdown-arrow", dateDrop ? "dropdown-checked" : null]}>
                          <img src={svg["arrow-select"]}></img>
                        </span>
                      </div>
                      <ul
                        class="dropdown-list"
                        hidden={dateDrop ? false : true}>
                        <li>По дате</li>
                      </ul>
                    </div>
                  </div>
                </div>

              </div>
              <div class="list-ico">
                {showListIco(Static.recordsIco.list_records)}
              </div>
              
            </div>

          </div>
        </div>


      )
    }
  })
}



export default start;