import {
  jsx,
  jsxFrag,
  load,
  Variable
} from "@betarost/cemserver/cem.js";

import { fn } from '@src/functions/index.js';
import Elements from '@src/elements/export.js';


const makeFilter = function (Static) {
  let objReturn = { type: Static.type }
  if (Static.type == "media") {
    objReturn["languages.code"] = Static.activeCategory
  } else {
    if (Static.activeCategory != "All") {
      objReturn["category.name"] = Static.activeCategory
    }
  }
  return objReturn
}

const start = function (data, ID) {
  let [Static] = fn.GetParams({ data, ID, initData: "news" })
  // console.log('=aea00d=', Static)

  load({
    ID,
    fnLoad: async () => {
      Static.apiFilter = makeFilter(Static)
      Static.records = await fn.restApi.getNews({ cache: true, name: Static.nameRecords, filter: Static.apiFilter })
    },
    fn: () => {
      return (
        <Elements.page.MainContainer class="blog_page_container">
          <Elements.page.Container
            title={!Static.openModals ? <h2>{Variable.lang.h.mediaUs}</h2> : null}>
            <Elements.page.Container class="userNewsBlock" resetClass={true}>
              <Elements.page.Container class="blog_news" resetClass={true}>
                {
                  Static.records.list_records.map((item) => {
                    return (
                      <Elements.cards.News
                        item={item}
                      />
                    )
                  })
                }
              </Elements.page.Container>
            </Elements.page.Container>
          </Elements.page.Container>
        </Elements.page.MainContainer>
      )
    }
  })
}

export default start;