//       return (
//         <Elements.page.MainContainer
//           title={Static.item.title}
//         ></Elements.page.MainContainer>
//         <div class="c-main__body">
//           <div class="full_news_container">
//             <div class="full_news_block">
//               <div class="full_news_content">
//                 <BlockShowNews Static={Static} item={item} />
//               </div>
//             </div>
//           </div>
//         </div>
//       );

import { jsx, jsxFrag, load, Variable } from "@betarost/cemserver/cem.js";

import { fn } from "@src/functions/export.js";
import svg from "@assets/svg/index.js";
import Elements from "@src/elements/export.js";

import { BlockError404 } from "@component/blocks/index.js";

const start = function (data, ID = "mainBlock") {
  let [Static, item] = fn.GetParams({ data, ID });
  load({
    ID,
    fnLoad: async () => {
      // fn.initData.media_show(Static)
      if (!Static.openModals) {
        Static.item = await fn.socket.get({ method: "News", _id: item._id });
      }
    },
    fn: () => {
      if (!Static.item._id) {
        return (
          <div>
            <BlockError404 />
          </div>
        );
      }
      return (
        <Elements.page.MainContainer title={Static.item.title} classTitle="p-lr" class="pt--20">
          <Elements.page.Container class="p-lr pt--20">
            {Static.item.image ? (
              <Elements.image.imgFull
                src={"/assets/upload/news/" + Static.item.image}
              />
            ) : null}

            {Static.item.preview ? (
              <Elements.text.Main
                text={Static.item.preview}
                class="text mY--30"
              />
            ) : null}
            {/* <p class="text mr20" tohtml={true}>
              {Static.item.text}
            </p> */}
            <Elements.text.Main text={Static.item.text} class="text mb--20" />

            {Static.item.source ? (
              <p class="source mr20">
                {Variable.lang.p.source}:{" "}
                <noindex>
                  <a
                    class="link"
                    href={Static.item.source}
                    rel="nofollow noopener"
                    target="_blank"
                  >
                    {fn.Str.domain(Static.item.source)}
                  </a>
                </noindex>
              </p>
            ) : null}
            <div style="display: flex" class="blog_post_stat">
              <p class="full_news_date">
                <img src={svg["question_views"]} /> {Static.item.statistic.view}
              </p>
              <p class="full_news_date">
                <img src={svg["question_answers"]} />
                {Static.item.statistic.comments}
              </p>
              <p class="full_news_date">
                {fn.Date.onlyDate(Static.item.showDate)}
              </p>
            </div>
            <Elements.page.Container>
              {/* <Elements.comments.Comment
                title={Variable.lang.h.modal_comment}
                src={svg["send_message"]}
                value={"Оставьте свой комментарий"}
              /> */}
            </Elements.page.Container>

            {/* <Elements.page.Container>
              <Elements.input.Div class="text1" />
            </Elements.page.Container> */}
            {/* <BlockShowNews Static={Static} item={item} /> */}
          </Elements.page.Container>
        </Elements.page.MainContainer>
      );
    },
  });
  return;
};

export default start;
