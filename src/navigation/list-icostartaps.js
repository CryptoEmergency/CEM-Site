import {
  jsx,
  jsxFrag,
  load,
  initReload,
  Variable
} from "@betarost/cemserver/cem.js";

import { fn } from '@src/functions/index.js';
import svg from "@assets/svg/index.js";

let dateDrop = false
let listStatus = {}
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



const showBtn = function (Static) {
  return listCategories.map((item) => {
    return (
      <div
        class={["tag_button", "tag_button-ico", Static.filtersSearch.categoryActive == item.name ? "tag_button_active" : null]}
        onclick={async () => {
          Static.filtersSearch.categoryActive = item.name
          Static.recordsIco = await fn.restApi.getIco(makeFiltersApi(Static))
          initReload()
        }}>
        <span>{item.name}</span>
      </div>
    )
  })
}

const showListIco = function (listIcoStartaps) {
  return listIcoStartaps.map((item) => {
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
              <span class="item-sum_obj">${item.nowMoney && item.nowMoney > 0 ? item.nowMoney : 0}</span> / ${item.targetMoney} <span class="item-sum_procent">{Math.round(((item.nowMoney && item.nowMoney > 0 ? item.nowMoney : 0) * 100) / item.targetMoney)}%</span>
            </p>
          </div>
        </div>
        <span class="item-date item-date_start">{fn.getDateFormat(item.startDate, "time")}</span>
        <span class="item-date item-date_end">{fn.getDateFormat(item.endDate, "time")}</span>

      </div>
    )
  })
}

const showListCalendar = function (Static) {
  return listStatus.map((item) => {
    return (
      <div
        class={["ico-tabs", Static.filtersSearch.textCalendar == item.name ? "ico_tabs-active" : null]}
        onclick={async () => {
          Static.filtersSearch.textCalendar = item.name
          Static.recordsIco = await fn.restApi.getIco(makeFiltersApi(Static))
          initReload()
        }}
      >
        <span>{item.name}</span>
      </div>
    )
  })
}

const makeFiltersApi = function (Static, onlySearch = false) {
  let filter = {}
  let sort = { _id: -1 }

  if (onlySearch) {
    filter = { $text: { $search: Static.filtersSearch.textSearch } }
    return { filter, sort }
  }
  Static.filtersSearch.textSearch = ""
  if (Static.filtersSearch.sortDate) {
    sort._id = 1
  }

  filter.category = Static.filtersSearch.categoryActive
  if (Static.filtersSearch.textCalendar == Variable.lang.select.active) {
    filter["$and"] = []
    filter["$and"].push({ startDate: { $lte: new Date() } })
    filter["$and"].push({ endDate: { $gte: new Date() } })
  } else if (Static.filtersSearch.textCalendar == Variable.lang.select.upcoming) {
    filter["$and"] = []
    filter["$and"].push({ startDate: { $gte: new Date() } })
  } else if (Static.filtersSearch.textCalendar == Variable.lang.select.ended) {
    filter["$and"] = []
    filter["$and"].push({ endDate: { $lt: new Date() } })
  }

  if (Static.filtersSearch.filterCheck) {
    filter.checked = true
  }

  return { filter, sort, limit: 10 }
}


const start = function (data, ID) {

  listStatus = [
    {
      name: Variable.lang.select.active,
    },
    {
      name: Variable.lang.select.upcoming,
    },
    {
      name: Variable.lang.select.ended,
    },
  ]

  let [Static] = fn.GetParams({ data, ID })
  Static.timerChange = null
  Static.filtersSearch = {
    textSearch: null,
    categoryActive: "ICO",
    textCalendar: Variable.lang.select.active,
    sortDate: false,
    filterCheck: false
  }

  load({
    ID,
    fnLoad: async () => {
      Static.recordsIco = await fn.restApi.getIco(makeFiltersApi(Static))
      console.log('=bacf0f=', Static.recordsIco)
    },
    fn: () => {
      return (
        <div class="book_container c-main__body">
          <div class="book-inner ico-inner">
            <div class="tags tags-ico">
              {showBtn(Static)}
            </div>
            <div class="ico-list">
              <div class="ico-filtes">
                <div class="search-wrap">
                  <div class="ico-search">
                    <img src={svg.search_icon} class="ico-search_icon"></img>
                    <input type="search" class="search" placeholder={Variable.lang.button.search}
                      value={Static.filtersSearch.textSearch}
                      oninput={function () {
                        Static.filtersSearch.textSearch = this.value.trim()
                        if (Static.timerChange) {
                          clearTimeout(Static.timerChange);
                        }
                        Static.timerChange = setTimeout(async () => {
                          if (Static.filtersSearch.textSearch.length > 2) {
                            Static.recordsIco = await fn.restApi.getIco(makeFiltersApi(Static, true))
                          } else if (Static.filtersSearch.textSearch.length == 0) {
                            Static.recordsIco = await fn.restApi.getIco(makeFiltersApi(Static))
                          }
                          initReload()
                        }, 300);
                      }}>
                    </input>
                  </div>
                  <img
                    class="filter-search_icon"
                    src={svg.filter}
                    onclick={() => {
                      if (Static.filterContent.dataset.active == "true") {
                        Static.filterContent.dataset.active = false
                        Static.filterContent.style = "height: 0px"
                      } else {
                        Static.filterContent.dataset.active = true
                        Static.filterContent.style = ""
                        let h = Static.filterContent.offsetHeight
                        Static.filterContent.style = `height: ${h}px; margin-bottom: 20px`
                      }
                      console.log('=e1d085=', Static.filterContent.dataset.active)
                    }}></img>
                </div>


                <div class="filter-dropdowns"
                  data-active={false}
                  style={"height: 0px"}
                  Element={($el) => {
                    Static.filterContent = $el;
                  }}>

                  <div class="filter-dropdown_date">

                    <span class="filter-name">{Variable.lang.span.sort}</span>
                    {

                      <div class="dropdown">
                        <div
                          class={["dropdown-title", "dropdown-title_date"]}
                          onclick={() => {
                            dateDrop = !dateDrop
                            initReload()
                          }}>
                          {Variable.lang.select.byDate}
                          <span class={["dropdown-arrow", dateDrop ? "dropdown-checked" : null]}>
                            <img src={svg["arrow-select"]}></img>
                          </span>
                        </div>
                        <ul
                          class={["dropdown-list", dateDrop ? "dropdown-list_show" : null]}
                          hidden={dateDrop ? false : true}
                          onclick={() => {
                            dateDrop = !dateDrop
                            initReload()
                          }}
                        >
                          <li class="dropdown-list_el">{Variable.lang.select.byDate}</li>
                        </ul>
                      </div>
                    }


                    <img
                      src={Static.filtersSearch.sortDate ? svg["filter_arrow_top"] : svg["filter_arrow_bottom"]}
                      class={["arrow-sort"]}
                      onclick={async () => {
                        Static.filtersSearch.sortDate = !Static.filtersSearch.sortDate
                        Static.recordsIco = await fn.restApi.getIco(makeFiltersApi(Static))
                        initReload()
                      }}
                    ></img>

                  </div>

                  <div class="filter-check">
                    <input
                      type="checkbox"
                      id="cryptoCheck"
                      checked={Static.filtersSearch.filterCheck ? true : false}
                      class="custom-checkbox"
                      required="required"
                      onChange={async () => {
                        Static.filtersSearch.filterCheck = !Static.filtersSearch.filterCheck

                        Static.recordsIco = await fn.restApi.getIco(makeFiltersApi(Static))
                        initReload()
                      }}>
                    </input>
                    <label for="cryptoCheck" class="filter-item">Проверено Crypto Emergency</label>
                  </div>

                </div>

              </div>

              <div class="list-ico_wrap">
                <div class="list-ico_tabs">
                  {showListCalendar(Static)}
                </div>
                <div class="list-ico">
                  {showListIco(Static.recordsIco.list_records)}
                </div>
              </div>

            </div>
          </div>
        </div>
      )
    }
  })
}

export default start;