import {
  jsx,
  jsxFrag,
  init,
} from "@betarost/cemjs";
// check
import { fn } from '@src/functions/index.js';
import { BlockNews } from '@component/blocks/index.js';

const start = function (data, ID) {
  let Static = {}
  // let Static = fn.GetParams({ data, ID })
  init(
    async () => {
      Static.activeCategory = "All"
    },
    () => {
      console.log('=792593StaticStaticStaticStaticStatic=', Static)
      return (
        <div class="blog_page_container c-main__body">
          <BlockNews
            nameRecords="PageBlog"
            type="blog"
            Static={Static}
          />
        </div>
      )
    }, ID
  );
};
export default start;