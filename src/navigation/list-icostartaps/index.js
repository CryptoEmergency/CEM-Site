import {
  jsx,
  jsxFrag,
  load,
  initReload,
  Variable,
  CEM
} from "@betarost/cemserver/cem.js";

// import { fn } from "@src/functions/index.js";
// import svg from "@assets/svg/index.js";
import Elements from "@src/elements/export.js";

const { svg, fn } = CEM

let dateDrop,
  showFilters = false;
let listStatus = {};
let listCategories;
let filterICO;

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
          filterICO = makeFiltersApi(Static)
          Static.recordsIco = await fn.socket.get({
            method: "Ico",
            params: {
              filter: filterICO.filter,
              sort: filterICO.sort,
            }
          });
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
          filterICO = makeFiltersApi(Static)
          console.log('=b24f82=', filterICO.filter)
          Static.recordsIco = await fn.socket.get({
            method: "Ico",
            params: {
              filter: filterICO.filter,
              sort: filterICO.sort,
            }
          });
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
    filter["$or"] = [];
    filter["$or"].push({ dateIsKnow: true }, { startDate: { $gte: new Date() } });
  } else if (Static.filtersSearch.textCalendar == Variable.lang.select.ended) {
    filter["$and"] = [];
    filter["$and"].push({ endDate: { $lt: new Date() } });
  }

  if (Static.filtersSearch.filterCheck) {
    filter.checked = true;
  }

  return { filter, sort };
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
    {
      name: "IFO",
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
  filterICO = makeFiltersApi(Static)
  Static.showMore = true

  load({
    ID,
    fnLoad: async () => {
      // Static.recordsIco = await fn.restApi.getIco(makeFiltersApi(Static));
      Static.recordsIco = await fn.socket.get({
        method: "Ico",
        params: {
          filter: filterICO.filter,
          sort: filterICO.sort,
        }
      });
      console.log('=e889c7=',Static.recordsIco)
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
                records={Static.recordsIco}
                Static={Static}
                filter={filterICO}
              />
            </div>
          </Elements.page.Container>
          
        </Elements.page.MainContainer>
        
      );
    },
  });
};

export default start;
