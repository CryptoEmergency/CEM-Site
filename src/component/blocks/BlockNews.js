import {
  jsx,
  jsxFrag,
  Variable,
  initOne
} from "@betarost/cemserver/cem.js";
import { fn } from '@src/functions/index.js';
import svg from "@assets/svg/index.js";
import { NotFound, ButtonShowMore, LazyImage } from "@component/element/index.js";

const Tags = function ({ Static, classActive, text, type }) {
  return (
    <div class={["tag_button", classActive]}
      onclick={async () => {
        if (Static.activeCategory == type) {
          return;
        }
        Static.activeCategory = type;
        Static.apiFilter = makeFilter(Static)
        await fn.restApi.getNews({ name: Static.nameRecords, filter: Static.apiFilter })
      }}>
      <span>{text}</span>
    </div>
  )
}

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

const BlockNews = async function ({ Static }) {
  console.log('=43094c=',Static)
  console.log('=43094c=',Variable)
  await initOne(
    async () => {
      Static.apiFilter = makeFilter(Static)
      if (Static.type != "media") {
        await fn.restApi.getCategories({ cache: true, name: Static.nameRecords + "Category", filter: Static.apiFilter })
      }
      await fn.restApi.getNews({ cache: true, name: Static.nameRecords, filter: Static.apiFilter })
    }
  )
  return (
    <div class="blog_page">
      <div class="blog_filter">
        {!Static.openModals ? <h2>{Variable.lang.h[Static.type]}</h2> : null}
      </div>
      {
        () => {
          if (Static.type == "media") {
            let arrReturn = [
              <Tags
                Static={Static}
                text={Variable.languages.en.lang_orig}
                classActive={Static.activeCategory == "en" ? "tag_button_active" : ""}
                type="en"
              />
            ]
            if (Variable.lang.code !== "en") {
              arrReturn.push(
                <Tags
                  Static={Static}
                  text={Variable.lang.lang_orig}
                  classActive={Static.activeCategory != "en" ? "tag_button_active" : ""}
                  type={Variable.lang.code}
                />
              )
            }
            return (
              <div class="tags">
                {arrReturn}
              </div>
            )
          } else {
            return (
              <div class="tags">
                <Tags
                  Static={Static}
                  text={Variable.lang.categoryName.all}
                  classActive={Static.activeCategory == "All" ? "tag_button_active" : ""}
                  type="All"
                />
                {() => {
                  if (Variable[Static.nameRecords + "Category"]) {
                    let arrReturn = Variable[Static.nameRecords + "Category"].list_records.filter((item) => item.name !== null).map((item) => {
                      return (
                        <Tags
                          Static={Static}
                          text={Variable.lang.categoryName[item.name]}
                          classActive={Static.activeCategory == item.name ? "tag_button_active" : ""}
                          type={item.name}
                        />
                      )
                    })
                    return arrReturn
                  }
                }}
              </div>
            )
          }
        }
      }
      <div class="userNewsBlock">
        <div class="bl_one bl_active">
          <div class="blog_news">
            {
              !Variable[Static.nameRecords] || !Variable[Static.nameRecords].list_records.length
                ?
                <NotFound />
                :
                Variable[Static.nameRecords].list_records.map(
                  (item) => {
                    return (
                      <a
                        class="blog_news_item"
                        href={`/${Static.type}/show/${item._id}`}
                        onclick={(e) => {
                          fn.siteLinkModal(e, { title: fn.sliceString(item.title, 85), item, items: fn.itemsMenu.news({ url: `/${Static.type}/show/${item._id}` }) })
                        }} >
                        {/* <LazyImage path={"/assets/upload/news/" + item.image} /> */}
                        <img src={"/assets/upload/news/" + item.image} />
                        <p class="blog_new_title">{fn.sliceString(item.title, 85)}</p>
                        <span class="blog_new_text">{fn.sliceString(item.preview, 170)}</span>
                        <div class="blog_post_stat blog_post_stat--list" >
                          <span>
                            <img src={svg["question_views"]} />
                            {item.statistic.view}
                          </span>
                          <span>
                            <img src={svg["question_answers"]} />
                            {item.statistic.comments}
                          </span>
                          <span>{fn.getDateFormat(item.showDate)}</span>
                        </div>
                      </a>
                    );
                  }
                )
            }
          </div>
          <ButtonShowMore Static={Static} action="getNews" />
        </div>
      </div>
    </div>
  );
};
export { BlockNews };
// OK