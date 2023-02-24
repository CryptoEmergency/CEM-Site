import {
  jsx,
  jsxFrag,
  load
} from "@betarost/cemserver/cem.js";

import { fn } from '@src/functions/export.js';
import Elements from "@src/elements/export.js";

import { BlockShowNews, BlockError404 } from '@component/blocks/index.js';

const start = function (data, ID = "mainBlock") {
  let [Static, item] = fn.GetParams({ data, ID })
  console.log('=72d8b8=', Static, item)
  load({
    ID,
    fnLoad: async () => {
      // fn.initData.media_show(Static)
      if (!Static.openModals) {
        Static.item = await fn.socket.get({ method: "News", _id: item._id });
      }
    },
    fn: () => {
      if (!Static.item._id) { return (<div><BlockError404 /></div>) }
      return (
        <Elements.page.MainContainer title={Static.item.title}>
          <div class="full_news_container">
            <div class="full_news_block">
              <div class="full_news_content">
                {/* <BlockShowNews Static={Static} item={item} /> */}
              </div>
            </div>
          </div>
        </Elements.page.MainContainer>
      );
    }
  })
  return
};

export default start;