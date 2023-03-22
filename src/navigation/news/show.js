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

import { jsx, jsxFrag, load, Variable, initReload } from "@betarost/cemserver/cem.js";

import { fn } from "@src/functions/index.js";
import svg from "@assets/svg/index.js";
import Elements from "@src/elements/export.js";
import { Comment, TextArea, ButtonSubmit, NotFound } from "@component/element/index.js";

import { BlockError404 } from "@component/blocks/index.js";

const start = function (data, ID = "mainBlock") {
  let [Static, item] = fn.GetParams({ data, ID });
  load({
    ID,
    fnLoad: async () => {
      // fn.initData.media_show(Static)
      if (!Static.openModals) {
        // Static.item = await fn.socket.get({ method: "News", _id: item._id });
        Static.item = await fn.restApi.getNews({ filter: { _id: item._id }, firstRecord: true, defaultReset: true })
      }
      if (!Static.item._id) {
        // Static.item = await fn.socket.get({ method: "News", action:"findOne", _id: Variable.DataUrl.params });
        Static.item = await fn.restApi.getNews({ filter: { _id: Variable.DataUrl.params }, firstRecord: true, defaultReset: true })
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
          <Elements.page.Container class="p-lr pt--20" ElemVisible={() => {
            fn.recordsView(Static.item._id, "setNews")
          }}>
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
            <Elements.text.Main text={fn.editText(Static.item.text, { clear: true, paragraph: true, html: true })} class="text mb--20" />

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

            <div class="news_page_comments" style="padding-bottom:40px;">
              <h2>{Variable.lang.h.modal_comment}</h2>
              <div class="c-comments__form">
                <div class="c-comments__field">
                  <TextArea
                    Static={Static.mainComment}
                    className="text1 create_post_chapter"
                  />
                </div>
                <ButtonSubmit
                  text={<img class="c-comments__icon" src={svg["send_message"]} />}
                  className="c-comments__send"
                  onclick={async (tmp, el) => {
                    if (!Variable.auth) {
                      fn.modals.ModalNeedAuth()
                      return
                    }
                    if (!Static.mainComment.el.value.trim().length) { return }
                    let text = Static.mainComment.el.value.trim()
                    let response = await fn.restApi.setNews.comment({ _id: Static.item._id, text })
                    // let response = await api({ type: "set", action: "setNews", data: { _id: item._id, value: { comments: { text: text } } } })
                    if (response.status === "ok") {
                      Static.mainComment.el.value = ""
                      if (Static.mainComment.adaptive) {
                        Static.mainComment.el.style.height = (Static.mainComment.el.dataset.maxHeight / Static.mainComment.adaptive) + 'px';
                      }
                      if (response.list_records[0]) {
                        let newRes = response.list_records[0]
                        Static.item.comments.unshift(newRes)
                        initReload();
                      }
                    }
                  }}
                />
              </div>
              {
                !Static.item.comments || !Static.item.comments.length
                  ?
                  null
                  // <NotFound />
                  :
                  <div class="post_comments">
                    <div class="user_news_item">
                      {Static.item.comments.map(function (itemComments, index) {
                        return (
                          <Comment
                            Static={Static}
                            item={itemComments}
                            index={index}
                            mainId={Static.item._id}
                            action="News"
                          />
                        )
                      })}
                    </div>
                  </div>
              }
            </div>

          </Elements.page.Container>
        </Elements.page.MainContainer>
      );
    },
  });
  return;
};

export default start;
