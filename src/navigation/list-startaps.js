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

const start = function (data, ID) {
  let [Static] = fn.GetParams({ data, ID });

  load({
    ID,
    fnLoad: async () => {
      Static.recordsStartap = await fn.restApi.getStartaps({ filter: {} });
    },

    fn: () => {
      return (
        <Elements.page.MainContainer>
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
