import {
  jsx,
  jsxFrag,
  load,
  initReload,
  Variable,
} from "@betarost/cemserver/cem.js";

import { fn } from "@src/functions/index.js";
import svg from "@assets/svg/index.js";
import Elements from "@src/elements/export.js";

let dateDrop,
  showFilters = false;
let listStatus = {};
let listCategories;

const showBtn = function (Static) {
  return listCategories.map((item) => {
    return (
      <div
        class={[
          "tag_button",
          "tag_button-ico",
          Static.filtersSearch.categoryActive == item.name
            ? "tag_button_active"
            : null,
        ]}
        onclick={async () => {
          Static.filtersSearch.categoryActive = item.name;
          Static.recordsIco = await fn.restApi.getIco(makeFiltersApi(Static));
          initReload();
        }}
      >
        <span>{item.name}</span>
      </div>
    );
  });
};

const showListCalendar = function (Static) {
  return listStatus.map((item) => {
    return (
      <div
        class={[
          "ico-tabs",
          Static.filtersSearch.textCalendar == item.name
            ? "ico_tabs-active"
            : null,
        ]}
        onclick={async () => {
          Static.filtersSearch.textCalendar = item.name;
          Static.recordsIco = await fn.restApi.getIco(makeFiltersApi(Static));
          initReload();
        }}
      >
        <span>{item.name}</span>
      </div>
    );
  });
};

const makeFiltersApi = function (Static, onlySearch = false) {
  let filter = {};
  let sort = { _id: -1 };

  if (onlySearch) {
    filter = { $text: { $search: Static.filtersSearch.textSearch } };
    return { filter, sort };
  }
  Static.filtersSearch.textSearch = "";
  if (Static.filtersSearch.sortDate) {
    sort._id = 1;
  }
  if (Static.filtersSearch.categoryActive !== Variable.lang.categoryName.all) {
    filter.category = Static.filtersSearch.categoryActive;
  }
  if (Static.filtersSearch.textCalendar == Variable.lang.select.active) {
    filter["$and"] = [];
    filter["$and"].push({ startDate: { $lte: new Date() } });
    filter["$and"].push({ endDate: { $gte: new Date() } });
  } else if (
    Static.filtersSearch.textCalendar == Variable.lang.select.upcoming
  ) {
    filter["$and"] = [];
    filter["$and"].push({ startDate: { $gte: new Date() } });
  } else if (Static.filtersSearch.textCalendar == Variable.lang.select.ended) {
    filter["$and"] = [];
    filter["$and"].push({ endDate: { $lt: new Date() } });
  }

  if (Static.filtersSearch.filterCheck) {
    filter.checked = true;
  }

  return { filter, sort, limit: 10 };
};

const start = function (data, ID) {
  listCategories = [
    {
      name: Variable.lang.categoryName.all,
    },
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
  ];

  let [Static] = fn.GetParams({ data, ID });
  Static.timerChange = null;
  Static.filtersSearch = {
    textSearch: null,
    categoryActive: Variable.lang.categoryName.all,
    textCalendar: Variable.lang.select.active,
    sortDate: false,
    filterCheck: false,
  };

  load({
    ID,
    fnLoad: async () => {
      Static.recordsIco = await fn.restApi.getIco(makeFiltersApi(Static));
      console.log("=2a5a4f=", Static.recordsIco);
    },
    fn: () => {
      return (
        <Elements.page.MainContainer>
          {/* <img src={svg["background/left"]} class={["ico-back", "ico-back-left"]} /> */}
          {/* <img src={svg["background/right"]} class={["ico-back", "ico-back-right"]} /> */}

          <div class="tags tags-ico">{showBtn(Static)}</div>
          <Elements.page.Container class="pt--70">
            <div class="list-ico_wrap">
              <div class="list-ico_tabs">{showListCalendar(Static)}</div>
              <Elements.cards.Horizon
                records={Static.recordsIco.list_records}
              />
            </div>
          </Elements.page.Container>

          {/*<div class="ico-inner">
            <div class="tags tags-ico">{showBtn(Static)}</div>
            <div class="ico-list">
               <div class="ico-filtes">
                <div class="search-wrap">
                  <div class="ico-search">
                    <img src={svg.search_icon} class="ico-search_icon"></img>
                    <input
                      type="search"
                      class="search"
                      placeholder={Variable.lang.button.search}
                      value={Static.filtersSearch.textSearch}
                      oninput={function () {
                        Static.filtersSearch.textSearch = this.value.trim();
                        if (Static.timerChange) {
                          clearTimeout(Static.timerChange);
                        }
                        Static.timerChange = setTimeout(async () => {
                          if (Static.filtersSearch.textSearch.length > 2) {
                            Static.recordsIco = await fn.restApi.getIco(
                              makeFiltersApi(Static, true)
                            );
                          } else if (
                            Static.filtersSearch.textSearch.length == 0
                          ) {
                            Static.recordsIco = await fn.restApi.getIco(
                              makeFiltersApi(Static)
                            );
                          }
                          initReload();
                        }, 300);
                      }}
                    ></input>
                  </div>
                  <img
                    class="filter-search_icon"
                    src={svg.filter}
                    onclick={() => {
                      showFilters = !showFilters;
                      initReload();
                    }}
                  ></img>
                </div>

                <div hidden={showFilters ? false : true}>
                  <div class="filter-dropdowns">
                    <div class="filter-dropdown_date">
                      <span class="filter-name">{Variable.lang.span.sort}</span>
                      {
                        <div class="dropdown">
                          <div
                            class={["dropdown-title", "dropdown-title_date"]}
                            onclick={() => {
                              dateDrop = !dateDrop;
                              initReload();
                            }}
                          >
                            {Variable.lang.select.byDate}
                            <span
                              class={[
                                "dropdown-arrow",
                                dateDrop ? "dropdown-checked" : null,
                              ]}
                            >
                              <img src={svg["arrow-select"]}></img>
                            </span>
                          </div>

                          <ul
                            hidden={dateDrop ? false : true}
                            class="dropdown-list"
                            onclick={() => {
                              dateDrop = !dateDrop;
                              initReload();
                            }}
                          >
                            <li class="dropdown-list_el">
                              {Variable.lang.select.byDate}
                            </li>
                          </ul>
                        </div>
                      }

                      <img
                        src={
                          Static.filtersSearch.sortDate
                            ? svg["filter_arrow_top"]
                            : svg["filter_arrow_bottom"]
                        }
                        class={["arrow-sort"]}
                        onclick={async () => {
                          Static.filtersSearch.sortDate =
                            !Static.filtersSearch.sortDate;
                          Static.recordsIco = await fn.restApi.getIco(
                            makeFiltersApi(Static)
                          );
                          initReload();
                        }}
                      ></img>
                    </div>

                    <div class="filter-check">
                      <input
                        type="checkbox"
                        id="cryptoCheck"
                        checked={
                          Static.filtersSearch.filterCheck ? true : false
                        }
                        class="custom-checkbox"
                        required="required"
                        onChange={async () => {
                          Static.filtersSearch.filterCheck =
                            !Static.filtersSearch.filterCheck;

                          Static.recordsIco = await fn.restApi.getIco(
                            makeFiltersApi(Static)
                          );
                          initReload();
                        }}
                      ></input>
                      <label for="cryptoCheck" class="filter-item">
                        {Variable.lang.select.verified} Crypto Emergency
                      </label>
                    </div>
                  </div>
                </div>
              </div> 

            </div>
          </div>*/}
        </Elements.page.MainContainer>
      );
    },
  });
};

export default start;
