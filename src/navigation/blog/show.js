import {
  jsx,
  jsxFrag,
  init,
  sendApi,
  Variable,
} from "@betarost/cemjs";
import { BlockNewsShow } from '@component/blocks/index.js';

const start = function () {
  let item;
  Variable.HeaderShow = true;
  Variable.FooterShow = true;

  init(
    async () => {
      item = await sendApi.send({ action: "getNews", short: true, limit: 1, filter: { _id: Variable.dataUrl.params } });
    },
    () => {
      return (
        <div class={[Variable.HeaderShow ? 'c-main__body' : 'c-main__body--noheader']}>
          <div class="full_news_container">
            <div class="full_news_block">
              <div class="full_news_content">
                <BlockNewsShow
                  item={item.list_records[0]}
                  type={"blog"}
                />
              </div>
            </div>
          </div>
        </div>
      );
    }
  );
};
//I check
export default start;
