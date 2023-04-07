import {
  jsx,
  jsxFrag,
  load,
  initReload,
  Variable,
} from "@betarost/cemserver/cem.js";
import { fn } from "@src/functions/index.js";
import svg from "@assets/svg/index.js";
import images from "@assets/images/index.js";
import Elements from "@src/elements/export.js";

const showListStartaps = function (listStartaps) {
  return listStartaps.map((item) => {
    return (
      <div
        class="ico-list_item startaps-item"
        onclick={() => {
          fn.siteLinkModal("/list-startaps/show/" + item._id, {
            title: item.title,
            item,
          });
        }}
      >
        <div class="item-img">
          <img
            class="item-img_el"
            src={`/assets/upload/worldPress/${item.icon}`}
          ></img>
        </div>
        <div class="item-info">
          <h5 class="item-title">{item.title}</h5>
          <div class="item-desc_wrap">
            <p class="item-desc">{item.descriptionShort}</p>
          </div>
        </div>
      </div>
    );
  });
};

let listCategories;

const showBtn = function (Static) {
  return listCategories.map((item) => {
    return (
      <div
        class={[
          "tag_button",
          "tag_button-startap",
          Static.filtersSearch.categoryActive == item.name
            ? "tag_button_active"
            : null,
        ]}
        onclick={async () => {
          Static.filtersSearch.categoryActive = item.name;
          Static.recordsStartap = await fn.restApi.getStartaps(makeFiltersApi(Static));
          console.log('=0788e8= Static.recordsStartap = ',Static.recordsStartap)
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

  return { filter, sort };
};

const start = function (data, ID) {
  listCategories = [
    {
      name: Variable.lang.categoryName.all,
    },
    {
      name: "DeFi",
    },
    {
      name: "Web3",
    },
    {
      name: "IT",
    },
    {
      name: "Games",
    },
    {
      name: "NFT",
    },
    {
      name: "Blockchain",
    },
  ];

  let [Static] = fn.GetParams({ data, ID });
  Static.filtersSearch = {
    categoryActive: Variable.lang.categoryName.all,
  };

  load({
    ID,
    fnLoad: async () => {
      Static.recordsStartap = await fn.restApi.getStartaps({ filter: {} });
      // console.log('=98b2d4= Static.recordsStartap =', Static.recordsStartap)
      
      // let unique = Static.recordsStartap.list_records.reduce((acc, elem) => acc.add(elem.category), new Set())
      // console.log('=90bc8a= unique =',unique)
    },

    fn: () => {
      return (
        <Elements.page.MainContainer>
          <div class="tags tags-ico tags-startaps">{showBtn(Static)}</div>
          <div class="startap-inner">
            <h2>{Variable.lang.a.starups}</h2>
            <div class="list-startaps">
              {showListStartaps(Static.recordsStartap.list_records)}
            </div>
          </div>
        </Elements.page.MainContainer>
      );
    },
  });
  return;
};

export default start;
