import {
  jsx,
  jsxFrag,
  init,
  Variable
} from "@betarost/cemjs";
import { fn } from '@src/functions/index.js';
import { BlockShowLenta, BlockError404 } from "@component/blocks/index.js";

const start = function (data, ID) {
  Variable.Static.FooterShow = false
  let [Static, item] = fn.GetParams({ data, ID })

  init(
    async () => {
      fn.initData.lenta_users_show(Static)
      if (!Static.openModals) {
        item = await fn.restApi.getPost({ filter: { _id: item._id }, firstRecord: true })
      }
    },
    async () => {
      return (
        <div>
          {
            !item._id
              ?
              <BlockError404 />
              :
              <div class="answer_container c-main__body">
                <BlockShowLenta
                  Static={Static}
                  item={item}
                />
              </div>
          }
        </div>
      )
    }, ID
  );
};
export default start;
//  OK
