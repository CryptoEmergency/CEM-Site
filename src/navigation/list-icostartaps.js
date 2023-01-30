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

const listStatus = [
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
        class={["tag_button", "tag_button-ico", Static.filtersSearch.categoryActive == item.name ? "tag_button_active" : null]}
        onclick={async () => {
          Static.filtersSearch.categoryActive = item.name
          Static.recordsIco = await fn.restApi.getIco({ filter: makeFiltersApi(Static) })
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

const showListCalendar = function (Static, listStatus) {
  return listStatus.map((item) => {
    return (
      <li
        onclick={async () => {
          if (icoDrop) {
            Static.filtersSearch.textCalendar = item.name
            // textCalendar = item.name
            icoDrop = !icoDrop
            // console.log(icoDrop)

          } else if (dateDrop) {

            dateDrop = !dateDrop


          }
          Static.recordsIco = await fn.restApi.getIco({ filter: makeFiltersApi(Static) })
          initReload()
        }}
      >{item.name}</li>
    )
  })
}


const makeFiltersApiTes = function (Static, onlySearch = false) {
  let filter = {}
  let sort = { _id: 1 }
  console.log('=bf888f=', Static.filtersSearch)
  if (onlySearch) {
    filter = { $text: { $search: Static.filtersSearch.textSearch } }
    return filter
  }

  filter.category = Static.filtersSearch.categoryActive
  if (Static.filtersSearch.textCalendar == "Active") {
    filter["$and"] = []
    filter["$and"].push({ startDate: { $lte: new Date() } })
    filter["$and"].push({ endDate: { $gte: new Date() } })
  } else if (Static.filtersSearch.textCalendar == "Upcoming") {
    filter["$and"] = []
    filter["$and"].push({ startDate: { $gte: new Date() } })
  } else if (Static.filtersSearch.textCalendar == "Ended") {
    filter["$and"] = []
    filter["$and"].push({ endDate: { $gte: new Date() } })
  }


  console.log('=bf888f filter=', filter)

  return { filter, sort }
}

const makeFiltersApi = function (Static, onlySearch = false) {
  let filter = {}
  console.log('=bf888f=', Static.filtersSearch)
  if (onlySearch) {
    filter = { $text: { $search: Static.filtersSearch.textSearch } }
    return filter
  }

  filter.category = Static.filtersSearch.categoryActive
  if (Static.filtersSearch.textCalendar == "Active") {
    filter["$and"] = []
    filter["$and"].push({ startDate: { $lte: new Date() } })
    filter["$and"].push({ endDate: { $gte: new Date() } })
  } else if (Static.filtersSearch.textCalendar == "Upcoming") {
    filter["$and"] = []
    filter["$and"].push({ startDate: { $gte: new Date() } })
  }


  console.log('=bf888f filter=', filter)

  return filter
}

const start = function (data, ID) {

  let [Static] = fn.GetParams({ data, ID })
  // Static.filtersSearch.categoryActive = "ICO"
  Static.timerChange = null
  Static.filtersSearch = {
    textSearch: null,
    categoryActive: "ICO",
    textCalendar: "Active",

  }

  load({
    ID,
    fnLoad: async () => {
      // Static.recordsIco = await fn.restApi.getIco({ filter: makeFiltersApi(Static), sort: { _id: 1 } })
      Static.recordsIco = await fn.restApi.getIco(makeFiltersApiTes(Static))

      // Static.recordsIco = await fn.restApi.getIco({ filter: {} })
      // Static.recordsIco = await fn.restApi.getIco({ filter: { category: Static.filtersSearch.categoryActive } })

      // Static.recordsIco = await fn.restApi.getIco({
      //   filter: {
      //     $and: [{ startDate: { $lte: new Date() } }, { endDate: { $gte: new Date() } }]
      //   }
      // }) // на активные
      // Static.recordsIco = await fn.restApi.getIco({
      //   filter: {
      //     $and: [{ startDate: { $gte: new Date() } }]
      //   }
      // }) // на ожидание
      // Static.recordsIco = await fn.restApi.getIco({
      //   filter: {
      //     $and: [{ endDate: { $lte: new Date() } }]
      //   }
      // }) // завершенные
      // Static.recordsIco = await fn.restApi.getIco({ filter: { endDate: { $gte: new Date() } } })
      console.log('=8be739=', Static.recordsIco)

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
                    <input type="search" class="search" placeholder="Search ico"
                      oninput={function () {

                        Static.filtersSearch.textSearch = this.value.trim()

                        if (Static.timerChange) {
                          clearTimeout(Static.timerChange);
                        }
                        Static.timerChange = setTimeout(async () => {
                          // console.log('=2cfa27= start ', "setTimeout")
                          if (Static.filtersSearch.textSearch.length > 2) {
                            Static.recordsIco = await fn.restApi.getIco({ filter: makeFiltersApi(Static, true) })
                          } else if (Static.filtersSearch.textSearch.length == 0) {
                            Static.recordsIco = await fn.restApi.getIco({ filter: makeFiltersApi(Static) })
                          }
                          initReload()
                        }, 300);
                      }}
                    ></input>
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
                    <span class="filter-name">ICO статус</span>
                    <div class="dropdown">
                      <div
                        class="dropdown-title"
                        onclick={() => {
                          icoDrop = !icoDrop
                          // console.log(listCategories.name)
                          initReload()
                        }}>
                        {Static.filtersSearch.textCalendar}
                        <span class={["dropdown-arrow", icoDrop ? "dropdown-checked" : null]}>
                          <img src={svg["arrow-select"]}></img>
                        </span>
                      </div>

                      <ul
                        class={["dropdown-list", icoDrop ? "dropdown-checked" : null]}
                        hidden={icoDrop ? false : true}>
                        {showListCalendar(Static, listStatus)}
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
                        По дате
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