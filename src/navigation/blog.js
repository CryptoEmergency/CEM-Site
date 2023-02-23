import {
  jsx,
  jsxFrag,
  Variable,
  load
} from "@betarost/cemserver/cem.js";
import { fn } from '@src/functions/index.js';
import { BlockNews } from '@component/blocks/index.js';
import Elements from "@src/elements/export.js";

const start = function (data, ID) {
  let [Static] = fn.GetParams({ data, ID })

  load({
    ID,
    fnLoad: async () => {
      fn.initData.blog(Static)
    },
    fn: () => {
      return (
        <Elements.page.MainContainer
          class="blog_page_container"
          title={!Static.openModals ? Variable.lang.h.blog : null}
        >
          {/* <div class="blog_page_container c-main__body"> */}
          <BlockNews Static={Static} />
          {/* </div> */}
        </Elements.page.MainContainer>
      )
    }
  })
};
export default start;
// OK