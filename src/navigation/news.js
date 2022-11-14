import {
  jsx,
  jsxFrag,
  init
} from "@betarost/cemjs";
import { fn } from '@src/functions/index.js';
import { BlockNews } from '@component/blocks/index.js';

const start = function (data, ID) {
  let [Static] = fn.GetParams({ data, ID })
  init(
    async () => {
      fn.initData.news(Static)
    },
    () => {
      return (
        <div class="blog_page_container c-main__body">
          <BlockNews Static={Static} />
        </div>
      )
    }, ID
  );
};
export default start;
// OK