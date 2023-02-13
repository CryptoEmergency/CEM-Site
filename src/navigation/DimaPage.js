import {
  jsx,
  jsxFrag,
  load,
  Variable,
  initReload,
} from "@betarost/cemserver/cem.js";

import { fn } from "@src/functions/index.js";
import svg from "@assets/svg/index.js";
import images from "@assets/images/index.js";

import test from "@fn/main/test.js";
import { ButtonGradient } from "@htmlElements/index.js";
//worldPress

const listItem = [
  {
    tab: "tab-1",
    name: "Статистика",
  },
  {
    tab: "tab-2",
    name: "Редактирование страниц",
  },
];

const showListItem = function (listItem) {
  return listItem.map((item) => {
    return (
      <li
        class="list-item"
        data-tab={item.tab}
        onclick={() => {
          const tabsContent = document.querySelectorAll("[data-tab-content]");
          const contentBox = document.querySelector(`#${item.tab}`);

          tabsContent.forEach((item) => {
            item.classList.add("content-hidden");
          });
          contentBox.classList.remove("content-hidden");
        }}
      >
        {item.name}
      </li>
    );
  });
};

const start = function (data, ID) {
  test();
  fn.test();
  let [Static] = fn.GetParams({ data, ID });

  load({
    ID,
    fn: () => {
      // if (!Variable.auth || !Variable.myInfo || !Variable.myInfo.status || !Variable.myInfo.role){
      if (!Variable.auth || !Variable.myInfo || !Variable.myInfo.status) {
        fn.siteLink("/");
        return;
      }

      return (
        <div class="mt--70">
          <div class="admin-inner">
            <div class="admin-wrap">
              <div class="sidebar">
                <ul class="list">{showListItem(listItem)}</ul>
              </div>
              <div class="admin-content" data-tab-content id="tab-2">
                <h2>Редактирование страниц</h2>
                <div class="wrap-btns">
                  <div class="button-container-preview mb--10">
                    <span
                      class="btn-news-preview"
                      onclick={() => {
                        fn.siteLink("/DimaPage/records-ico/");
                        // fn.siteLinkModal("/DimaPage/records-ico/", { title: "Список ICO" })
                      }}
                    >
                      <span>Список ICO</span>
                    </span>
                  </div>

                  {/* <div class="mb--2">gdg</div> */}
                  <div class="button-container-preview mb--10">
                    <span
                      class="btn-news-preview"
                      onclick={() => {
                        fn.siteLink("/DimaPage/records-startaps/");
                        // fn.siteLinkModal("/DimaPage/records-ico/", { title: "Список ICO" })
                      }}
                    >
                      <span>Список Стартапов</span>
                    </span>
                  </div>

                  <div class="button-container-preview mb--10">
                    <span
                      class="btn-news-preview"
                      onclick={() => {
                        fn.siteLink("/DimaPage/records-news/");
                      }}
                    >
                      <span>Новости</span>
                    </span>
                  </div>
                  <ButtonGradient
                    class="mb--10"
                    text="Крипто Университет"
                    onclick={() => {
                      fn.siteLink("/DimaPage/records-university/");
                    }}
                  />
                  <ButtonGradient
                    class="mb--10"
                    text="Новости новый формат"
                    onclick={() => {
                      fn.siteLink("/DimaPage/records-newsNew/");
                    }}
                  />
                </div>
              </div>

              <div
                class="admin-content content-hidden"
                data-tab-content
                id="tab-1"
              >
                <h2>Статистика</h2>
              </div>
            </div>
          </div>
        </div>
      );
    },
  });
};

export default start;
