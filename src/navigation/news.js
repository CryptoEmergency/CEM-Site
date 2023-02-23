import {
  jsx,
  jsxFrag,
  load
} from "@betarost/cemserver/cem.js";
import { fn } from '@src/functions/index.js';
import { BlockNews } from '@component/blocks/index.js';
import Elements from '@src/elements/export.js';

const start = function (data, ID) {
  let [Static] = fn.GetParams({ data, ID })
  load({
    ID,
    fnLoad: async () => {
      fn.initData.news(Static)
    },
    fn: () => {
      return (
        <Elements.page.MainContainer
          class="blog_page_container">
          <BlockNews Static={Static} />
        </Elements.page.MainContainer>
      )
    }
  })
  return
};

export default start;