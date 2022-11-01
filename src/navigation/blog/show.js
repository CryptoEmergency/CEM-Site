import {
  jsx,
  jsxFrag,
  init,
  sendApi,
  Variable,
} from "@betarost/cemjs";
import { BlockNewsShow } from '@component/blocks/index.js';

const start = function (data, ID = "mainBlock") {
  let item;
  init(
    async () => {
      if (data && data.item) {
        item = data.item
      } else {
        let response = await sendApi.send({ action: "getNews", short: true, limit: 1, filter: { _id: Variable.dataUrl.params } });
        item = response.list_records[0]
      }
    },
    () => {
      return (
        <div class="c-main__body">
          <div class="full_news_container">
            <div class="full_news_block">
              <div class="full_news_content">
                <BlockNewsShow
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
