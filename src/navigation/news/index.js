import {
  jsx,
  jsxFrag,
  load,
  Variable,
  initReload,
  CEM
} from "@betarost/cemserver/cem.js";
// import { fn } from "@src/functions/index.js";
import Elements from "@src/elements/export.js";

const fn = CEM.fn

let isDrag = false;
let startX, startScrollLeft;
let x1 = null; 
let y1 = null;

let body = document.querySelector('body');

const dragStart = (e, Static) => {
  isDrag = true;
  Static.categoryCarousel.classList.add("dragging");
  startX = e.pageX;
  startScrollLeft = Static.categoryCarousel.scrollLeft
}

const dragging = (e, Static) => {
  if(!isDrag) return;
  e.preventDefault();
  Static.categoryCarousel.scrollLeft = startScrollLeft - (e.pageX - startX);
}

const dragStop = (e, Static) => {
  isDrag = false;
  Static.categoryCarousel.classList.remove("dragging");
}

const infiniteScroll = (e, Static) => {
  if(Static.categoryCarousel.scrollLeft === 0){
    Static.containerCategory.classList.remove('category-wrap_shadow-left')
  }else if(Static.categoryCarousel.scrollLeft === Static.categoryCarousel.scrollWidth - Static.categoryCarousel.offsetWidth){
    Static.containerCategory.classList.remove('category-wrap_shadow-rigth')
  } else{
    Static.containerCategory.classList.add('category-wrap_shadow-left')
    Static.containerCategory.classList.add('category-wrap_shadow-rigth')
  }

}

const mouseWheel = (e, Static) => {
  if(e.deltaY < 0){
    Static.categoryCarousel.scrollLeft += Static.categoryEl.offsetWidth;
  } else if(e.deltaY > 0){
    Static.categoryCarousel.scrollLeft -= Static.categoryEl.offsetWidth;
  }
}

const handleTouchStart = (e) => {
  const firstTouch = e.touches[0];
  x1 = firstTouch.clientX;
  y1 = firstTouch.clientY;
}

const handleTouchMove = (e, Static) => {
  if(!x1 || !y1) return false;
  let x2 = e.touches[0].clientX;
  let y2 = e.touches[0].clientY;
  let xDiff = x2 - x1;
  let yDiff = y2 - y1;

  if(Math.abs(xDiff) > Math.abs(yDiff)){
    if(xDiff > 0){
      Static.categoryCarousel.scrollLeft -= Static.categoryEl.offsetWidth;
    }  
    else{
      Static.categoryCarousel.scrollLeft += Static.categoryEl.offsetWidth;
    }
  }
  x1 = null;
  y1 = null;
}

const makeFilter = (Static) => {
  let ret = {}
  ret["type"] = "news"
  ret["languages.code"] = Variable.lang.code == "ru" ? "ru" : "en"
  ret["moderation"] = true
  ret["showDate"] = { $lte: new Date() }

  if (Static.activeCategory != "All") {
    ret["category.name"] = Static.activeCategory
  } else {
    null
  }

  return ret
}

const start = function (data, ID) {
  let [Static] = fn.GetParams({ data, ID, initData: "news" });
  Static.showMore = true

  load({
    ID,
    fnLoad: async () => {
      Static.categoryList = await fn.socket.get({
        method: "ListCategory",
        params: {
          filter: { type: "news", active: "true" },
        },
        limit: 20,
      });
      Static.records = await fn.socket.get({
        method: "News",
        params: {
          filter: {
            type: "news",
            "languages.code": Variable.lang.code == "ru" ? "ru" : "en",
            moderation: true,
            showDate: { $lte: new Date() }
          },
          limit: 20,
        },
      });

    },
    fn: () => {
      return (
        <Elements.page.MainContainer class="blog_page_container">
          <div
            Element={($el)=>{
              Static.containerCategory = $el;
            }}
            class={[
              "category-wrap",
              "category-wrap_shadow-right",
              
            ]}
          >
            <ul
              class="category-carousel pY--15"
              Element={($el)=>{
                Static.categoryCarousel = $el;
              }}
              onmousedown={(e)=>{
                  dragStart(e, Static);
              }}
              onmousemove={(e)=>{
                  dragging(e, Static);
              }}
              onmouseup={(e)=>{
                  dragStop(e, Static);
              }}
              onscroll={(e)=>{
                  infiniteScroll(e, Static);
              }}
              onmouseout={(e)=>{
                dragStop(e, Static);
              }}
              onwheel={(e)=>{
                  mouseWheel(e, Static);
              }}
              ontouchstart={(e)=>{
                handleTouchStart(e)
              }}
              ontouchmove={(e)=>{
                handleTouchMove(e, Static)
              }}
              onmouseenter={(e)=>{
                body.classList.add('disable_scroll');
              }}
              onmouseleave={(e)=>{
                body.classList.remove('disable_scroll');
              }}
            >
              <li
                draggable="false"
                class={["category-item", Static.activeCategory == "All" ? "category-item_active" : ""]}
                onclick={async () => {
                  Static.showMore = true
                  Static.activeCategory = "All";
                  Static.records = await fn.socket.get({
                    method: "News",
                    params: {
                      filter: {
                        type: "news",
                        "languages.code":
                          Variable.lang.code == "ru" ? "ru" : "en",
                        moderation: true,
                        showDate: { $lte: new Date() }
                      },

                    },
                  });
                  initReload();
                }}>
                <span>{Variable.lang.categoryName.all}</span>
              </li>
              {Static.categoryList.map((item) => {
                return (
                  <li
                    draggable = "false"
                    Element={($el)=>{
                        Static.categoryEl = $el;
                    }}
                    class={["category-item", Static.activeCategory == item.name
                      ? "category-item_active"
                      : ""]}
                    onclick={async () => {
                      Static.showMore = true
                      Static.activeCategory = item.name;
                      Static.records = await fn.socket.get({
                        method: "News",
                        params: {
                          filter: {
                            type: "news",
                            "languages.code":
                              Variable.lang.code == "ru" ? "ru" : "en",
                            "category.name": Static.activeCategory,
                            moderation: true
                          },
                        },
                      });
                      initReload();
                    }}>
                    <span>{Variable.lang.categoryName[item.name]}</span>
                  </li>
                );
              })}
            </ul>
            
          </div>

          <Elements.page.Container class="c-news section-g p-lr">
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
                    // question_views: {
                    //   value: item.statistic.view,
                    //   class: "statistic-icon",
                    // },
                    question_answers: {
                      value: item.statistic.comments,
                      class: "statistic-icon",
                    },
                    showDate: {
                      value: fn.getDateFormat(item.showDate),
                    },
                  }}
                  statisticClass="card-statistic"
                  ElemVisible={() => {
                    fn.recordsView(item._id, "setNews")
                  }}
                />
              );
            })}
          </Elements.page.Container>
          <div
            replace={Static.showMore}
            ElemVisible={async () => {

              let tmp = await fn.socket.get({
                method: "News",
                params: {
                  filter: makeFilter(Static),
                  limit: 20,
                  offset: Static.records.length
                },
              });

              if (!tmp || !tmp.length) {
                Static.showMore = false
              } else {
                Static.records.push(...tmp)
              }

              initReload()

              // console.log('=2b6dcf=', "dfhdfh", tmp)
              // let tmp = await fn.socket.get({
              //     method: "News",
              //     params: {
              //         filter: {},
              //         sort: { showDate: -1 },
              //         limit: 20,
              //         offset: Static.records.length
              //     }
              // })


              // if (!tmp || !tmp.length) {
              //     Static.showMore = false
              // } else {
              //     Static.records.push(...tmp)
              // }

              // initReload()
            }}>
          </div>
        </Elements.page.MainContainer>
      );
    },
  });
  return;
};

export default start;
