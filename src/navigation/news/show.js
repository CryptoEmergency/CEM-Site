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
  Variable.HeaderShow = true;
  Variable.FooterShow = true;
  console.log('=5c27ea= show', item)
  init(
    async () => {

      item = await sendApi.send({ action: "getNews", short: true, limit: 1, filter: { _id: Variable.Static.DataUrl.params } });
      console.log('=5c27ea= init1', item, Variable.Static)

    },
    () => {
      console.log('=5c27ea= init2', item)
      return (
        <div class={[Variable.HeaderShow ? 'c-main__body' : 'c-main__body--noheader']}>
          <div class="full_news_container">
            <div class="full_news_block">
              <div class="full_news_content">
                <BlockNewsShow
                  item={item.list_records[0]}
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
//I check
export default start;
