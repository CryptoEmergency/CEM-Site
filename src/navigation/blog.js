import {
  jsx,
  jsxFrag,
  Variable,
  load,
  CEM
} from "@betarost/cemserver/cem.js";

import Elements from "@src/elements/export.js";
// import { fn } from '@src/functions/export.js';
const fn = CEM.fn

const start = function (data, ID) {
  let [Static] = fn.GetParams({ data, ID })
  console.log('=c200a1=', Static)
  load({
    ID,
    fnLoad: async () => {
      Static.records = await fn.socket.get({ method: "News", params: { filter: { type: "blog" } } })
      console.log('=c36b1b=', Static.records)
    },
    fn: () => {
      return (
        <Elements.page.MainContainer
          // class="blog_page_container"
          title={!Static.openModals ? Variable.lang.h.blog : null}>
          <Elements.page.Container
          >
            <Elements.page.Container class="userNewsBlock" resetClass={true}>
              <Elements.page.Container class="bl_one" resetClass={true}>
                <Elements.page.Container class="blog_news" resetClass={true}>
                  {
                    Static.records.map((item) => {
                      return (
                        <Elements.cards.News
                          item={item}
                          nameUrl="blog"
                        />
                      )
                    })
                  }
                </Elements.page.Container>
              </Elements.page.Container>
            </Elements.page.Container>
          </Elements.page.Container>
        </Elements.page.MainContainer>
      )
    }
  })
};
export default start;
// OK