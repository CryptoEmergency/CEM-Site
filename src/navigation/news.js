import {
  jsx,
  jsxFrag,
  load,
  Variable,
  initOne,
} from "@betarost/cemserver/cem.js";
import { fn } from "@src/functions/index.js";
// import { BlockNews } from "@component/blocks/index.js";
import Elements from "@src/elements/export.js";

const start = function (data, ID) {
  let [Static] = fn.GetParams({ data, ID, initData: "news" });
  load({
    ID,
    fnLoad: async () => {
      Static.records = await fn.socket.get({
        method: "News",
        params: { filter: { type: "news" } },
      });
    },
    fn: () => {
      return (
        <Elements.page.MainContainer class="blog_page_container">
          {/* <BlockNews Static={Static} /> */}

          <Elements.page.Container class="tags pb--0 pt--10">
            {Static.records.map((item) => {
              return <Elements.Tags text={Variable.lang.categoryName.all} />;
            })}
            {/* <Elements.Tags></Elements.Tags> */}
          </Elements.page.Container>

          <Elements.page.Container class="section-g p-lr pt--70">
            {Static.records.map((item) => {
              return (
                <Elements.cards.Standart
                  link={{
                    type: "modal",
                    data: {
                      title: fn.sliceString(item.title, 85),
                      item,
                      items: fn.itemsMenu.news({
                        url: "/news/show/" + item._id,
                      }),
                    },
                  }}
                  title={{
                    text: item.title,
                    class: "card-subtitle el-size--18 el-w--700 pt--10",
                  }}
                  description={{
                    text: item.preview,
                    class: "card-desc",
                  }}
                  image={{
                    src: "/assets/upload/news/" + item.image,
                    class: "img-rect_news",
                  }}
                  statistic={{
                    question_views: {
                      value: item.statistic.view,
                      class: "statistic-icon",
                    },
                    question_answers: {
                      value: item.statistic.comments,
                      class: "statistic-icon",
                    },
                    showDate: {
                      value: fn.getDateFormat(item.showDate),
                    },
                  }}
                  statisticClass="card-statistic"
                />
              );
            })}
          </Elements.page.Container>
        </Elements.page.MainContainer>
      );
    },
  });
  return;
};

export default start;
