import {
  jsx,
  jsxFrag,
  load,
  Variable,
  initReload,
} from "@betarost/cemserver/cem.js";
import { fn } from "@src/functions/index.js";
import Elements from "@src/elements/export.js";

const start = function (data, ID) {
  let [Static] = fn.GetParams({ data, ID, initData: "news" });
  load({
    ID,
    fnLoad: async () => {
      Static.categoryList = await fn.restApi.getCategories({
        filter: { type: "news" },
        limit: 20,
      });
      console.log("=ef5982=", Static.categoryList.list_records);
      Static.records = await fn.socket.get({
        method: "News",
        params: {
          filter: {
            type: "news",
            "languages.code": Variable.lang.code == "ru" ? "ru" : "en",
            moderation: true
          },
        },
      });
    },
    fn: () => {
      return (
        <Elements.page.MainContainer class="blog_page_container">
          {/* <BlockNews Static={Static} /> */}

          <Elements.page.Container class="tags pb--0 pt--10">
            <Elements.button.Category
              class={Static.activeCategory == "All" ? "tag_button_active" : ""}
              text={Variable.lang.categoryName.all}
              onclick={async () => {
                Static.activeCategory = "All";
                Static.records = await fn.socket.get({
                  method: "News",
                  params: {
                    filter: {
                      type: "news",
                      "languages.code":
                        Variable.lang.code == "ru" ? "ru" : "en",
                        moderation: true
                    },

                  },
                });
                initReload();
              }}
            />
            {Static.categoryList.list_records.map((item) => {
              return (
                <Elements.button.Category
                  class={
                    Static.activeCategory == item.name
                      ? "tag_button_active"
                      : ""
                  }
                  text={Variable.lang.categoryName[item.name]}
                  onclick={async () => {
                    Static.activeCategory = item.name;
                    Static.records = await fn.socket.get({
                      method: "News",
                      params: {
                        filter: {
                          type: "news",
                          "languages.code":
                            Variable.lang.code == "ru" ? "ru" : "en",
                          "category.name": item.name,
                          moderation: true
                        },
                      },
                    });
                    initReload();
                  }}
                />
              );
            })}
          </Elements.page.Container>

          <Elements.page.Container class="section-g p-lr pt--70">
            {Static.records.map((item) => {
              return (
                <Elements.cards.Standart
                  link={{
                    type: "modal",
                    href: "/news/show/" + item._id,
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
