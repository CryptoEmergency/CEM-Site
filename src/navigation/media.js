import {
  jsx,
  jsxFrag,
  Variable,
  init,
} from "@betarost/cemjs";
import { fn } from '@src/functions/index.js';
import { BlockNews } from '@component/blocks/index.js';

const start = function (data, ID) {
  let [Static] = fn.GetParams({ data, ID })
  init(
    async () => {
      Static.lang = Variable.lang.code
      Static.activeCategory = Variable.lang.code
      Static.type = "media"
      Static.nameRecords = "PageMedia"
    },
    () => {
      return (
        <div class="blog_page_container c-main__body">
          <BlockNews
            nameRecords="PageMedia"
            type="media"
            Static={Static}
          />
        </div>
      )
    }, ID
  );
};
export default start;
// OK