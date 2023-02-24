import {
  jsx,
  jsxFrag,
  load,
  Variable
} from "@betarost/cemserver/cem.js";

import { fn } from '@src/functions/export.js';
import svg from "@assets/svg/index.js";
import Elements from "@src/elements/export.js";

import { BlockShowNews, BlockError404 } from '@component/blocks/index.js';

const start = function (data, ID = "mainBlock") {
  let [Static, item] = fn.GetParams({ data, ID })
  load({
    ID,
    fnLoad: async () => {
      // fn.initData.media_show(Static)
      if (!Static.openModals) {
        Static.item = await fn.socket.get({ method: "News", _id: item._id });
      }
    },
    fn: () => {
      if (!Static.item._id) { return (<div><BlockError404 /></div>) }
      return (
        <Elements.page.MainContainer title={Static.item.title}>
          <Elements.page.Container class="p-lr">
            {Static.item.image ? <img class="full_news_image" src={"/assets/upload/news/" + Static.item.image} /> : null}
            {Static.item.preview ? <p class="full_news_text mrb30">{Static.item.preview}</p> : null}
            <p class="full_news_text mr20" tohtml={true}>{Static.item.text}</p>
            {Static.item.source ? <p class="full_news_disclaimer mr20">{Variable.lang.p.source}: <noindex><a href={Static.item.source} rel="nofollow noopener" target="_blank">{fn.Str.domain(Static.item.source)}</a></noindex></p> : null}
            <div style="display: flex" class="blog_post_stat">
              <p class="full_news_date">
                <img src={svg["question_views"]} /> {Static.item.statistic.view}
              </p>
              <p class="full_news_date">
                <img src={svg["question_answers"]} />
                {Static.item.statistic.comments}
              </p>
              <p class="full_news_date">{fn.Date.onlyDate(Static.item.showDate)}</p>
            </div>
            <Elements.page.Container>
              <Elements.input.Div class="text1" />
            </Elements.page.Container>
            {/* <BlockShowNews Static={Static} item={item} /> */}
          </Elements.page.Container>
        </Elements.page.MainContainer>
      );
    }
  })
  return
};

export default start;