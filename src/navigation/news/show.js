import {
  jsx,
  jsxFrag,
  init,
  Variable,
} from "@betarost/cemjs";
// poydet
import { BlockShowNews } from '@component/blocks/index.js';
import { api } from '@src/apiFunctions.js'

const start = function (data, ID) {
  let item;
  init(
    async () => {
      if (data && data.item) {
        item = data.item
setTimeout(async () => {
  await api({ type: "get", action: "getNews", short: true, limit: 1, filter: { _id: item._id } })
}, 3000);
     


      } else {
        let response = await api({ type: "get", action: "getNews", short: true, limit: 1, filter: { _id: Variable.dataUrl.params } })
        item = response.list_records[0]
      }
    },
    () => {
      return (
        <div class="c-main__body">
          <div class="full_news_container">
            <div class="full_news_block">
              <div class="full_news_content">
                <BlockShowNews
                  item={item}
                  type={"news"}
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
