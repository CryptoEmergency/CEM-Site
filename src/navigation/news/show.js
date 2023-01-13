import {
  jsx,
  jsxFrag,
  init
} from "@betarost/cemserver/cem.js";
import { fn } from '@src/functions/index.js';
import { BlockShowNews, BlockError404 } from '@component/blocks/index.js';

const start = function (data, ID) {
  let [Static, item] = fn.GetParams({ data, ID })
  init(
    async () => {
      fn.initData.news_show(Static)
      if (!Static.openModals) {
        item = await fn.restApi.getNews({ filter: { _id: item._id }, firstRecord: true, defaultReset: true })
      }
    },
    () => {
      if (!item._id) { return (<div><BlockError404 /></div>) }
      return (
        <div class="c-main__body">
          <div class="full_news_container">
            <div class="full_news_block">
              <div class="full_news_content">
                <BlockShowNews Static={Static} item={item} />
              </div>
            </div>
          </div>
        </div>
      );
    }, ID
  );
};
export default start;
// OK