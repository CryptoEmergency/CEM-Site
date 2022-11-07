import {
  jsx,
  jsxFrag,
  Variable,
  init,
} from "@betarost/cemjs";
// check
import { BlockNews } from '@component/blocks/index.js';

const start = function (data, ID) {
  let Static = {}
  init(
    async () => {
      Static.lang = Variable.lang.code
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