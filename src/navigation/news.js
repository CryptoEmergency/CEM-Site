import {
  jsx,
  jsxFrag,
  init,
} from "@betarost/cemjs";
// check
import { BlockNews } from '@component/blocks/index.js';

const start = function (data, ID) {
  let Static = {}
  init(
    async () => {
      Static.activeCategory = "All"
    },
    () => {
      return (
        <div class="blog_page_container c-main__body">
          <BlockNews
            nameRecords="PageNews"
            type="news"
            Static={Static}
          />
        </div>
      )
    }, ID
  );
};
export default start;