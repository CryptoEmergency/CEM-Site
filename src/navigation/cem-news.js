import {
  jsx,
  jsxFrag,
  init,
  CEM
} from "@betarost/cemserver/cem.js";
// import { fn } from '@src/functions/index.js';
// import svg from "@assets/svg/index.js";
import { NotFound, ButtonShowMore, LazyImage } from "@elements/element/index.js";

const { images, svg, fn } = CEM

const start = function (data, ID) {
  let [Static] = fn.GetParams({ data, ID })
  init(
    async () => {
      fn.initData.news(Static)
      const tmp = await fn.web3Action.getNews()
      Static.list_records = tmp
      //  console.log("Static.list_records", Static.list_records)
    },
    () => {
      return (
        <div class="blog_page_container c-main__body">


          <div class="blog_page">

            <div class="userNewsBlock">
              <div class="bl_one bl_active">
                <div class="blog_news">
                  {
                    !Static.list_records || !Static.list_records.length
                      ?
                      <NotFound />
                      :
                      Static.list_records.map(
                        (item) => {
                          //   console.log("item", item, item[0], item[1])
                          return (
                            <a
                              class="blog_news_item">
                              {/* <LazyImage path={"/assets/upload/news/" + item.image} /> */}
                              {/* <img src={"/assets/upload/news/" + item[0]} /> */}
                              <p class="blog_new_title">{fn.sliceString(item[0], 85)}</p>
                              <span class="blog_new_text">{fn.sliceString(item[1], 170)}</span>
                              <div class="blog_post_stat blog_post_stat--list" >
                                <span>
                                  <img src={svg["question_views"]} />
                                  {/* {item.statistic.view} */}
                                </span>
                                <span>
                                  <img src={svg["question_answers"]} />
                                  {/* {item.statistic.comments} */}
                                </span>
                                {/* <span>{fn.getDateFormat(item.showDate)}</span> */}
                              </div>
                            </a>
                          );
                        }
                      )
                  }
                </div>
                {/* <ButtonShowMore Static={Static} action="getNews" /> */}
              </div>
            </div>
          </div>

        </div>
      )
    }, ID
  );
};
export default start;
// OK