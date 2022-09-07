import {
  jsx,
  jsxFrag,
  getVariable,
  makeDOM,
  getStorage,
  setValue,
  getValue,
  sendApi,

} from "@betarost/cemjs";
import {checkAnswerApi } from "@src/functions.js";
import svg from "@assets/svg/index.js";

let count = 0;
const getLentaUsersList = async (firstLoad) => {
  let data = {
    select: {
      author: 1,
      forFriends: 1,
      languages: 1,
      media: 1,
      showDate: 1,
      statistic: 1,
      text: 1,
      title: 1,
      updateTime: 1,
    },
    sort: {
      showDate: -1,
    },
  };
  if (firstLoad) {
    data.filter = { "languages.code": "ru" };
    data.limit = 12;
  } else {
    data.filter = { "languages.code": "ru" };
    data.limit = 6;
    data.offset = 12 + 6 * (count - 1);
  }
  let response = checkAnswerApi(await sendApi.create("getPost", data));
  console.log(response);
  if(firstLoad){
    return response;
  } else {
    let prevList = getValue(ID, "lentaUsers");
    response.list_records = [
      ...prevList.list_records,
      ...response.list_records,
    ];
    setValue(ID, "lentaUsers", response);
    // init(true);
  }


};

const lentaUsersView = function () {
  const lang = getVariable("languages")[getStorage("lang")];

  return (
    <div class="page-content page-content--full">
      <div class="users_news">
        <div class="users_news_left">
          <div class="user_news_top">
            <div class="user_news_title">
              <h4>{lang.span.userNews}</h4>
            </div>
            <div style="display: flex; grid-gap: 20px">
              <div
                class="news_category_filter"
                data-action="SSSrankFilterSummon"
              >
                <img src={svg["filter"]} />
              </div>
              <div
                data-language="{{lang.lang}}"
                data-language_code="{{lang.code}}"
                class="alt_language_change"
                data-action="userNewsFilterLanguage"
              >
                {lang.lang_orig}
              </div>
            </div>
          </div>
          <div class="user_news_filter">
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
          </div>
          <div class="users_news_categories">
            <div
              data-type="all"
              data-action="user_news_category_toggle"
              class="users_news_category users_news_category_active"
            >
              <img src={svg["sections/news_all"]} />
            </div>
            <div
              data-type="photo"
              data-action="user_news_category_toggle"
              class="users_news_category"
            >
              <img src={svg["sections/news_photo_inactive"]} />
            </div>
            <div
              data-type="video"
              data-action="user_news_category_toggle"
              class="users_news_category"
            >
              <img src={svg["sections/news_video_inactive"]} />
            </div>
            <div
              data-type="audio"
              data-action="user_news_category_toggle"
              class="users_news_category"
            >
              <img src={svg["sections/news_audio_inactive"]} />
            </div>
            <div
              data-type="text"
              data-action="user_news_category_toggle"
              class="users_news_category"
            >
              <img src={svg["sections/news_text_inactive"]} />
            </div>
          </div>
          <div class="userNewsBlock">
            <div
              data-touchmove="userNewsSlide"
              data-touchstart="userNewsSlideStart"
              data-touchend="userNewsSlideEnd"
              class="bl_one bl_active"
            >
              <div class="user_news_block">{/* {{>userPost}} */}</div>
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
  );
};

const ID = "mainBlock";

const init = async function (reload) {
  if (!reload) {
    if (!reload) {
      if (!getValue(ID, "lentaUsers")) {
        setValue(ID, "lentaUsers", await getLentaUsersList(true));
      }
    }
  }
  setValue("mainHeader", "show", true);
  setValue("mainFooter", "show", true);
  makeDOM(lentaUsersView(), ID);
};

export default init;
