import {
  jsx,
  jsxFrag,
  init,
  Variable
} from "@betarost/cemserver/cem.js";
import { fn } from '@src/functions/index.js';
import { BlockShowLenta, BlockError404 } from "@component/blocks/index.js";

const start = function (data, ID) {
  Variable.Static.FooterShow = false
  let [Static, item] = fn.GetParams({ data, ID })
  init(
    async () => {
      fn.initData.lenta_users_show(Static)

      if (!Static.openModals || typeof item.text == "undefined") {

        item = await fn.restApi.getPost({ filter: { _id: item._id }, firstRecord: true })
      }
    },
    async () => {
      if (Static.item) {
        item = Static.item
      }
      if (!item._id) { return (<div><BlockError404 /></div>) }
      return (
        <div class="answer_container c-main__body">
          <BlockShowLenta Static={Static} item={item} />
        </div>
      );
    }, ID
  );
};
export default start;
//  OK
