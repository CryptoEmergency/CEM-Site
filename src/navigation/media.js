import {
  jsx,
  jsxFrag,
  init,
  load,
  Variable
} from "@betarost/cemserver/cem.js";

import { fn } from '@src/functions/index.js';
import Elements from '@src/elements/export.js';
import { BlockNews } from '@component/blocks/index.js';

const start = function (data, ID) {
  let [Static] = fn.GetParams({ data, ID, initData: "news" })
  // console.log('=aea00d=', Static)

  load({
    ID,
    fnLoad: () => {

    },
    fn: () => {
      return (
        <Elements.page.MainContainer class="blog_page_container">
          <Elements.page.Container>
            <Elements.page.Title title={Variable.lang.h.mediaUs} />
            {/* <BlockNews Static={Static} /> */}
          </Elements.page.Container>
        </Elements.page.MainContainer>
      )
    }
  })

  return
  init(
    async () => {
      // fn.initData.media(Static)
    },
    () => {
      return (
        <div class="blog_page_container c-main__body">
          {/* <BlockNews Static={Static} /> */}
        </div>
      )
    }, ID
  );
};

export default start;