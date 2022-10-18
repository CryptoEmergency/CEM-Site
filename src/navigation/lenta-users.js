import {
  jsx,
  jsxFrag,
  sendApi,
  Variable,
  init,
  initReload,
  Helpers
} from "@betarost/cemjs";

import svg from "@assets/svg/index.js";
import { If, Map } from '@component/helpers/All.js';
import { BlockLentaUsers } from "@component/blocks/BlockLentaUsers.js";

import Swiper from 'swiper/bundle';
import 'swiper/css/bundle';

let swiperitem = []

const swiperGo = function () {
  console.log('=e46652=', "ffffgggg")
  // if (!swiperitem) {
  if (swiperitem[0]) {
    console.log('=db86dd=', "ffff")
    return
  }
  swiperitem[0] = new Swiper(".swiper-post_media", {
    effect: "cube",
    grabCursor: true,
    cubeEffect: {
      shadow: true,
      slideShadows: true,
      shadowOffset: 20,
      shadowScale: 0.94,
    },
    loop: false,
    // autoHeight: true,
    pagination: {
      el: '.swiper-pagination-post_media',
    },
    scrollbar: {
      el: '.swiper-scrollbar-post_media',
    },
    slidesPerView: 1,
    spaceBetween: 20
  });
  // }
}

const start = function () {
  let elem = []
  Variable.HeaderShow = true
  Variable.FooterShow = true

  init(
    async () => {

      elem = []
      Variable.Static.lentaPage = "all"
      Variable.PageLentaall = await sendApi.send({
        action: "getPost", short: true, cache: true, name: "PageLentaall", limit: 15,
        filter: Helpers.getFilterLenta({}, "all")
      });

      Variable.PageLentaphoto = await sendApi.send({
        action: "getPost", short: true, cache: true, name: "PageLentaphoto", limit: 15,
        filter: Helpers.getFilterLenta({}, "photo")
      });

      Variable.PageLentavideo = await sendApi.send({
        action: "getPost", short: true, cache: true, name: "PageLentavideo", limit: 15,
        filter: Helpers.getFilterLenta({}, "video")
      });

      Variable.PageLentaaudio = await sendApi.send({
        action: "getPost", short: true, cache: true, name: "PageLentaaudio", limit: 15,
        filter: Helpers.getFilterLenta({}, "audio")
      });

      Variable.PageLentatext = await sendApi.send({
        action: "getPost", short: true, cache: true, name: "PageLentatext", limit: 15,
        filter: Helpers.getFilterLenta({}, "text")
      });
    },

    () => {

      return (
        <div class={[Variable.HeaderShow ? 'c-main__body' : 'c-main__body--noheader']}>
          <div class="page-content page-content--full">
            <div class="users_news">
              <div class="users_news_left">
                <div class="user_news_top">
                  <div class="user_news_title">
                    <h4>{Variable.lang.span.userNews}</h4>
                  </div>
                  <div style="display: flex; grid-gap: 20px">
                    <div class="news_category_filter" >
                      <img src={svg["filter"]} />
                    </div>
                    <div class="alt_language_change" >
                      {Variable.lang.lang_orig}
                    </div>
                  </div>
                </div>
                {/* <div class="user_news_filter">
                  <div style="display: none;" class="user_news_filter_checkboxes">
                    <div
                      class="user_news_filter_checkbox"
                      data-action="user_news_checkbox_toggle"
                    >
                      <p>Аудио</p>
                      <div class="settings_checkbox_wrapper">
                        <div
                          class="settings_checkbox_container"
                          style="background: none;"
                        >
                          <span class="settings_checkbox_on" style="opacity: 1;">
                            Вкл.
                          </span>
                          <span class="settings_checkbox_off" style="opacity: 0;">
                            Выкл.
                          </span>
                          <div
                            class="settings_checkbox_point"
                            style="right: 4px; transform: none; background: linear-gradient(246.16deg, rgb(255, 255, 255) 18.32%, rgba(255, 255, 255, 0) 117.34%);"
                          ></div>
                          <input
                            data-change="settingsCheckbox"
                            id="audio_checkbox"
                            checked="checked"
                            class="settings_checkbox"
                            type="checkbox"
                          />
                        </div>
                      </div>
                    </div>
                    <div
                      class="user_news_filter_checkbox"
                      data-action="user_news_checkbox_toggle"
                    >
                      <p>Видео</p>
                      <div class="settings_checkbox_wrapper">
                        <div
                          class="settings_checkbox_container"
                          style="background: none;"
                        >
                          <span class="settings_checkbox_on" style="opacity: 1;">
                            Вкл.
                          </span>
                          <span class="settings_checkbox_off" style="opacity: 0;">
                            Выкл.
                          </span>
                          <div
                            class="settings_checkbox_point"
                            style="right: 4px; transform: none; background: linear-gradient(246.16deg, rgb(255, 255, 255) 18.32%, rgba(255, 255, 255, 0) 117.34%);"
                          ></div>
                          <input
                            data-change="settingsCheckbox"
                            id="video_checkbox"
                            checked="checked"
                            class="settings_checkbox"
                            type="checkbox"
                          />
                        </div>
                      </div>
                    </div>
                    <div
                      class="user_news_filter_checkbox"
                      data-action="user_news_checkbox_toggle"
                    >
                      <p>Фото</p>
                      <div class="settings_checkbox_wrapper">
                        <div
                          class="settings_checkbox_container"
                          style="background: none;"
                        >
                          <span class="settings_checkbox_on" style="opacity: 1;">
                            Вкл.
                          </span>
                          <span class="settings_checkbox_off" style="opacity: 0;">
                            Выкл.
                          </span>
                          <div
                            class="settings_checkbox_point"
                            style="right: 4px; transform: none; background: linear-gradient(246.16deg, rgb(255, 255, 255) 18.32%, rgba(255, 255, 255, 0) 117.34%);"
                          ></div>
                          <input
                            data-change="settingsCheckbox"
                            id="photo_checkbox"
                            checked="checked"
                            class="settings_checkbox"
                            type="checkbox"
                          />
                        </div>
                      </div>
                    </div>
                    <div
                      class="user_news_filter_checkbox"
                      data-action="user_news_checkbox_toggle"
                    >
                      <p>Текст</p>
                      <div class="settings_checkbox_wrapper">
                        <div
                          class="settings_checkbox_container"
                          style="background: none;"
                        >
                          <span class="settings_checkbox_on" style="opacity: 1;">
                            Вкл.
                          </span>
                          <span class="settings_checkbox_off" style="opacity: 0;">
                            Выкл.
                          </span>
                          <div
                            class="settings_checkbox_point"
                            style="right: 4px; transform: none; background: linear-gradient(246.16deg, rgb(255, 255, 255) 18.32%, rgba(255, 255, 255, 0) 117.34%);"
                          ></div>
                          <input
                            data-change="settingsCheckbox"
                            id="text_checkbox"
                            checked="checked"
                            class="settings_checkbox"
                            type="checkbox"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div> */}
                <div class="users_news_categories">

                  <div
                    data-type="all"
                    class={['users_news_category']}
                    hidden={Variable.Static.lentaPage == "all"}
                    onClick={async () => {
                      if (Variable.Static.lentaPage == "all") {
                        return
                      }
                      Variable.Static.lentaPage = "all"
                      Variable.PageLentaall = await sendApi.send({
                        action: "getPost", short: true, cache: true, name: "PageLentaall", limit: 15, filter: Helpers.getFilterLenta({}, "all")
                      });
                      initReload()
                    }}
                  >
                    <img src={svg['sections/news_all_inactive']} />
                  </div>

                  <div
                    class={['users_news_category', 'users_news_category_active']}
                    hidden={Variable.Static.lentaPage != "all"}
                  >
                    <img src={svg['sections/news_all']} />
                  </div>


                  <div
                    data-type="photo"
                    class={['users_news_category']}
                    hidden={Variable.Static.lentaPage == "photo"}
                    onClick={async () => {
                      if (Variable.Static.lentaPage == "photo") {
                        return
                      }
                      Variable.Static.lentaPage = "photo"
                      Variable.PageLentaphoto = await sendApi.send({
                        action: "getPost", short: true, cache: true, name: "PageLentaphoto", limit: 15,
                        filter: Helpers.getFilterLenta({}, "photo")
                      });
                      initReload()
                    }}
                  >
                    <img src={svg['sections/news_photo_inactive']} />
                  </div>

                  <div
                    class={['users_news_category', 'users_news_category_active']}
                    hidden={Variable.Static.lentaPage != "photo"}
                  >
                    <img src={svg['sections/news_photo']} />
                  </div>



                  <div
                    data-type="video"
                    class={['users_news_category']}
                    hidden={Variable.Static.lentaPage == "video"}
                    onClick={async () => {
                      if (Variable.Static.lentaPage == "video") {
                        return
                      }
                      Variable.Static.lentaPage = "video"
                      Variable.PageLentavideo = await sendApi.send({
                        action: "getPost", short: true, cache: true, name: "PageLentavideo", limit: 15,
                        filter: Helpers.getFilterLenta({}, "video")
                      });
                      initReload()
                    }}
                  >
                    <img src={svg['sections/news_video_inactive']} />
                  </div>

                  <div
                    class={['users_news_category', 'users_news_category_active']}
                    hidden={Variable.Static.lentaPage != "video"}
                  >
                    <img src={svg['sections/news_video']} />
                  </div>


                  <div
                    data-type="audio"
                    class={['users_news_category']}
                    hidden={Variable.Static.lentaPage == "audio"}
                    onClick={async () => {
                      if (Variable.Static.lentaPage == "audio") {
                        return
                      }
                      Variable.Static.lentaPage = "audio"
                      Variable.PageLentaaudio = await sendApi.send({
                        action: "getPost", short: true, cache: true, name: "PageLentaaudio", limit: 15,
                        filter: Helpers.getFilterLenta({}, "audio")
                      });
                      initReload()
                    }}
                  >
                    <img src={svg['sections/news_audio_inactive']} />
                  </div>

                  <div
                    class={['users_news_category', 'users_news_category_active']}
                    hidden={Variable.Static.lentaPage != "audio"}
                  >
                    <img src={svg['sections/news_audio']} />
                  </div>


                  <div
                    data-type="text"
                    class={['users_news_category']}
                    hidden={Variable.Static.lentaPage == "text"}
                    onClick={async () => {
                      if (Variable.Static.lentaPage == "text") {
                        return
                      }
                      Variable.Static.lentaPage = "text"
                      Variable.PageLentatext = await sendApi.send({
                        action: "getPost", short: true, cache: true, name: "PageLentatext", limit: 15,
                        filter: Helpers.getFilterLenta({}, "text")
                      });
                      initReload()
                    }}
                  >
                    <img src={svg['sections/news_text_inactive']} />
                  </div>

                  <div
                    class={['users_news_category', 'users_news_category_active']}
                    hidden={Variable.Static.lentaPage != "text"}
                  >
                    <img src={svg['sections/news_text']} />
                  </div>



                </div>

                <div class="userNewsBlock">
                  <div
                    data-touchmove="userNewsSlide"
                    data-touchstart="userNewsSlideStart"
                    data-touchend="userNewsSlideEnd"
                    class="bl_one bl_active"
                  >
                    <div class="user_news_block" After={() => {
                      // swiperGo()
                    }}>
                      <Map
                        data={Variable[`PageLenta${Variable.Static.lentaPage}`].list_records}
                        dataIf={
                          (item, index) => {
                            elem[index] = []
                            return <BlockLentaUsers item={item} numIndex={index} elem={elem} />
                          }
                        }
                      />
                    </div>
                  </div>
                  <div
                    data-touchmove="userNewsSlide"
                    data-touchstart="userNewsSlideStart"
                    data-touchend="userNewsSlideEnd"
                    class="bl_one overflowNo"
                  ></div>
                  <div
                    data-touchmove="userNewsSlide"
                    data-touchstart="userNewsSlideStart"
                    data-touchend="userNewsSlideEnd"
                    class="bl_one overflowNo"
                  ></div>
                  <div
                    data-touchmove="userNewsSlide"
                    data-touchstart="userNewsSlideStart"
                    data-touchend="userNewsSlideEnd"
                    class="bl_one overflowNo"
                  ></div>
                  <div
                    data-touchmove="userNewsSlide"
                    data-touchstart="userNewsSlideStart"
                    data-touchend="userNewsSlideEnd"
                    class="bl_one overflowNo"
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div >
      )
    }
  )
};

export default start;
