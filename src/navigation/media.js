import {
  jsx,
  jsxFrag,
  load,
  Variable
} from "@betarost/cemserver/cem.js";

import { fn } from '@src/functions/index.js';
import Elements from '@src/elements/export.js';

const start = function (data, ID) {
  let [Static] = fn.GetParams({ data, ID, initData: "news" })

  load({
    ID,
    fnLoad: async () => {
      Static.records = await fn.socket.get({ method: "News", params: { filter: { type: "media" } } })
    },
    fn: () => {
      return (
        <Elements.page.MainContainer
          // class="blog_page_container"
          title={!Static.openModals ? Variable.lang.h.mediaUs : null}>
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
                          nameUrl="media"
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
}

export default start;