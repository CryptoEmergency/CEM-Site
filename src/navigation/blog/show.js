import {
  jsx,
  jsxFrag,
  init,
  Variable,
} from "@betarost/cemjs";
// check
import { api } from '@src/apiFunctions.js'
import { BlockShowNews, BlockError404 } from '@component/blocks/index.js';

const start = function (data, ID = "mainBlock") {
  let item;
  init(
    async () => {
      if (data && data.item) {
        item = data.item
      } else {
        let response = await api({ type: "get", action: "getNews", short: true, limit: 1, filter: { _id: Variable.dataUrl.params } })
        if (!response.list_records || !response.list_records[0]) {
          item = {}
          return
        }
        item = response.list_records[0]
      }
      return
    },
    () => {
      if (!item._id) {
        return (
          <div><BlockError404 /></div>
        )
      }
      return (
        <div class="c-main__body">
          <div class="full_news_container">
            <div class="full_news_block">
              <div class="full_news_content">
                <BlockShowNews
                  item={item}
                  type={"blog"}
                />
              </div>
            </div>
          </div>
        </div>
      );
    }, ID
  );
};
export default start;