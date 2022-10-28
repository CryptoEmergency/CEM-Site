import {
  jsx,
  jsxFrag,
  init,
  initReload,
  Variable,
  sendApi,
  Helpers,
  initGo,
} from "@betarost/cemjs";
import svg from "@assets/svg/index.js";
import images from '@assets/images/index.js';

import { uploadMedia, wrapTextWithATag } from "@src/functions.js";
import {
  MediaButton,
  Avatar,
  AnswerAdditionallyToggleNew,
  MediaPreview
} from "@component/element/index.js";

import { If, Map } from "@component/helpers/All.js";

let formInputs, selectAspect;

const changeTextPost = (e) => {
  // let text = wrapTextWithATag(e.target.innerText.trim());
  let text = e.target.innerText.trim();
  formInputs.textInputs.value = wrapTextWithATag(text);
  if (text || formInputs.mediaInputs.length > 0) {
    formInputs.isValid = true;
  } else {
    formInputs.isValid = false;
  }
  initReload();
};

const sendPost = async (e) => {
  console.log('=c4213b=', formInputs)
  e.preventDefault();
  if (!formInputs.isValid) {
    return false;
  }
  // console.log('=formInputs=',formInputs.mediaInputs.value)

  let data = {
    value: {
      forFriends: formInputs.forFriends,
      languages: formInputs.lang.code,
      media: formInputs.mediaInputs.value,
      text: formInputs.textInputs.value,
    },
  };
  console.log("=data=", data);

  let tmpRes = await sendApi.create("setPost", data);
  console.log("=66d247=", tmpRes);

  if (tmpRes.status === "ok") {
    console.log("=reload=");
    initGo();
  } else {
    Variable.SetModals(
      {
        name: "ModalAlarm",
        data: {
          icon: "alarm_icon",
          text: Variable.lang.error_div[tmpRes.error],
        },
      },
      true
    );
  }
  return;
};

const deleteMediaFile = function (index) {
  formInputs.mediaInputs.value.splice(index, 1);
  if (formInputs.mediaInputs.value.length == 0) {
    selectAspect = null;
  }
};

const start = function () {
  Variable.HeaderShow = true
  Variable.FooterShow = true
  Variable.showUserMenu = false

  let authorPosts;



  const sendPhoto = async function (crooper) {
    if (!crooper) {
      return
    }
    let canvas;
    formInputs.mediaInputs.selectAspect = crooper.options.aspectRatio;
    canvas = crooper.getCroppedCanvas({
      // width: 166,
      // height: 166,
    });
    let previewObj = {
      src: canvas.toDataURL(),
      type: "image",
      upload: 0,
      size: 0
    };
    formInputs.mediaInputs.show = true;
    formInputs.mediaInputs.value.push(previewObj);
    let numItem = formInputs.mediaInputs.value.length - 1
    initReload();
    await canvas.toBlob(function (blob) {
      uploadMedia(
        blob,
        "posts",
        async function () {
          formInputs.mediaInputs.show = true;
          if (!this.response) {
            return
          }
          let response = JSON.parse(this.response);
          formInputs.mediaInputs.value[numItem] = {
            aspect: formInputs.mediaInputs.selectAspect,
            type: response.mimetype.split("/")[0],
            name: response.name
          }
          formInputs.isValid = true;
          initReload();
        },
        async function (e) {
          let contentLength;
          if (e.lengthComputable) {
            contentLength = e.total;
          } else {
            contentLength = parseInt(
              e.target.getResponseHeader(
                "x-decompressed-content-length"
              ),
              10
            );
          }

          if (formInputs.mediaInputs.value[numItem].upload === formInputs.mediaInputs.value[numItem].size && formInputs.mediaInputs.value[numItem].upload !== 0) {
            console.log('=DANGERRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRR=')
            formInputs.mediaInputs.value.splice(numItem, 1);
            initReload()
            return
          }
          formInputs.mediaInputs.value[numItem].upload = e.loaded
          formInputs.mediaInputs.value[numItem].size = contentLength;
          console.log("=3c5fa7= ", "Загружено", e.loaded, "из", contentLength);
          initReload();
        }
      );
      initReload();
      Variable.DelModals("ModalCropImage");
    });
    return
  }


  const sendVideo = async function (files) {
    let blob = new Blob([files], { type: 'video/mp4' });
    let previewObj = {
      src: URL.createObjectURL(blob),
      type: "video",
      upload: 0,
      size: 0
    }
    formInputs.mediaInputs.show = true;
    formInputs.mediaInputs.value.push(previewObj);
    let numItem = formInputs.mediaInputs.value.length - 1
    initReload();

    uploadMedia(
      files[0],
      "posts",
      async function () {
        formInputs.mediaInputs.show = true;


        // formInputs.mediaInputs.value.push(obj);
        let response = JSON.parse(this.response);
        formInputs.mediaInputs.value[numItem] = {
          aspect: undefined,
          type: response.mimetype.split("/")[0],
          name: response.name
        }

        formInputs.isValid = true;
        initReload();
      },
      async function (e) {
        let contentLength;
        if (e.lengthComputable) {
          contentLength = e.total;
        } else {
          contentLength = parseInt(
            e.target.getResponseHeader(
              "x-decompressed-content-length"
            ),
            10
          );
        }
        formInputs.mediaInputs.value[numItem].upload = e.loaded
        formInputs.mediaInputs.value[numItem].size = contentLength;
        console.log(
          "=3c5fa7= ",
          "Загружено",
          e.loaded,
          "из",
          contentLength
        );
        initReload()
      }
    );
    return
  }

  const toggleAdditionalyMenu = function (e) {
    if (e.currentTarget.children[1].style.display == "none") {
      e.currentTarget.children[1].style = "display: block";
      showAdditionalyMenu = true;
    } else {
      e.currentTarget.children[1].style = "display: none";
      showAdditionalyMenu = false;
    }
  };

  const sendAuthorization = async function (e) {
    e.preventDefault();
    if (!formInputs.isValid) {
      return false;
    }
  };

  const arrayLengthOne = function (arr) {
    let count = 0;
    arr.forEach((element) => {
      if (element.type != "audio") {
        count++;
      }
    });
    if (count > 1) {
      return true;
    } else {
      return false;
    }
  };

  const audioCountCheck = function (array) {
    let audioCount = 0;
    let otherMediaCount = 0;
    array.forEach((element) => {
      if (element.type == "audio") {
        audioCount++;
      } else {
        otherMediaCount++;
      }
    });
    if (audioCount <= 2 && audioCount != 0 && otherMediaCount == 0) {
      return true;
    } else {
      return false;
    }
  };

  const textLengthCheck = function (str) {
    let pCount = (str.match(new RegExp("<p>", "g")) || []).length;
    if (str.length < 150 + pCount * 8 && pCount <= 5) {
      return true;
    } else {
      return false;
    }
  };

  init(
    async () => {
      formInputs = {
        textInputs: {
          value: "",
          show: false,
        },
        mediaInputs: {
          value: [],
          show: false,
        },
        lang: {
          code: Variable.myInfo.mainLanguage.code,
          name: Variable.myInfo.mainLanguage.orig_name
        },
        forFriends: false,
        isValid: false,
      };

      selectAspect = null;

      authorPosts = await sendApi.send({
        action: "getPost",
        short: true,
        cache: true,
        name: "MainPosts",
        filter: {
          //Helpers.getFilterQuestions(filtersQuestions),
          author: Variable.myInfo._id,
        },
        sort: {
          //Helpers.getSortQuestions(filtersQuestions)
          showDate: -1,
        },
      });

    },

    () => {

      return (
        <div class="c-userpostcreate">
          <h3 class="c-userpostcreate__title">{Variable.lang.h.createPost}</h3>
          <form id="userPostCreate" class="c-userpostcreate__form" onsubmit={sendAuthorization}>
            <input class="c-userpostcreate__submit" hidden type="submit" />
            <div class="c-userpostcreate__lang">
              <label for="">{Variable.lang.label.lang}:</label>
              <div
                class="blog_filter_language"
                onclick={() => {
                  Variable.SetModals({
                    name: "ModalChangeLanguage",
                    data: {
                      onclick: async (langCode, langName, langOrig) => {
                        formInputs.lang.name = langOrig;
                        formInputs.lang.code = langCode;
                        initReload()
                      },
                    },
                  });
                }}
              >{formInputs.lang.name}</div>
            </div>
            <div data-type="posts" class="c-userpostcreate__container create_post_container">
              <If
                data={formInputs.textInputs.show}
                dataIf={
                  <div
                    class="create_post_chapter create_post_main_text"
                    contenteditable="true"
                    oninput={changeTextPost}
                  ></div>
                }
              />
              <If
                data={formInputs.mediaInputs.show && formInputs.mediaInputs.value.length}
                dataIf={
                  <div class="create_post_chapter createPostImage">
                    {
                      formInputs.mediaInputs.value.map((item, index) => {
                        if (item.type != "audio") {
                          return (
                            <MediaPreview
                              item={item}
                              index={index}
                              type="posts"
                              formInputs={formInputs}
                            />
                          );
                        }
                      })
                    }
                  </div>
                }
              />
            </div>

            <MediaButton

              onclickText={function () {
                if (formInputs.textInputs.show === true) {
                  return;
                } else {
                  formInputs.textInputs.show = true;
                  initReload();
                }
              }}

              onclickPhoto={function () {
                if (this.files.length == 0) {
                  return;
                }

                Variable.SetModals({
                  name: "ModalCropImage",
                  data: {
                    file: this.files[0],
                    typeUpload: 'posts',
                    arrMedia: formInputs.mediaInputs.value,
                    aspectSelect: formInputs.mediaInputs.selectAspect,
                    uploadCropImage: async function (cropper) {
                      await sendPhoto(cropper)
                      return;
                    }
                  },
                }, true);
                // formInputs.isValid = true;
                this.value = '';
              }}

              onclickVideo={function () {
                if (this.files.length == 0) {
                  return;
                }
                sendVideo(this.files)
                this.value = '';
                return;
              }}
            />



            <div class="c-userpostcreate__forfriends">
              <div class="checkbox">
                <input
                  id="forfrends"
                  data-complain="abusive"
                  class="checkbox__input complain_checkbox"
                  onchange={(e) => {
                    formInputs.forFriends = e.target.checked;
                  }}
                  type="checkbox"
                />
                <label class="checkbox__label" for="forfrends">
                  {Variable.lang.span.forFriends}
                  <span class="cont_a-link"></span>
                </label>
              </div>
            </div>
            <div style={"display:flex; width: 100%; max-width: 500px; margin: 20px auto"}>
              {/* <button
                class={[
                  "c-button c-button--gradient2",
                  !formInputs.isValid ? "c-button--inactive" : "",
                ]}
                style="margin-right: 30px"
                type="button"
              //   onClick={sendQuestion}
              >
                <span class="c-button__text">
                  {Variable.lang.button.pre_view}
                </span>
              </button> */}
              <button
                class={[
                  "c-button c-button--gradient2",
                  !formInputs.isValid ? "c-button--inactive" : "",
                ]}
                type="button"
                onClick={sendPost}
              >
                <span class="c-button__text">
                  {Variable.lang.button.create}
                </span>
              </button>
            </div>

            <div class="c-userpostcreate__myposts my_posts">
              {Variable.lang.h.posts_my}
              <div class="user_news_block">
                {/* {{> userPost}} */}
                {authorPosts.list_records.map(function (post, i) {
                  return (
                    <div class="user_news_item" data-author={post.author._id}>
                      <div class="main_comment" data-link={post._id}>
                        <Avatar
                          author={post.author}
                          nickName={post.author.nickname}
                        />

                        {/* <div class="comment_body"> */}
                        {post.media.length > 0 ? (
                          <div class="comment_body">
                            <If
                              data={arrayLengthOne(post.media)}
                              dataIf={
                                <div class="swiper-container">
                                  <div class="swiper swiper-post_media">
                                    <div class="swiper-wrapper">
                                      {post.media.map(function (mediafile, i) {
                                        return (
                                          <If
                                            data={mediafile.type != "audio"}
                                            dataIf={
                                              <a class="swiper-slide">
                                                {mediafile.type == "image" ? (
                                                  <div class="swiper-post_media_image_container">
                                                    <img
                                                      src={`/assets/upload/posts/${mediafile.name}`}
                                                    />
                                                  </div>
                                                ) : mediafile.type ==
                                                  "video" ? (
                                                  {
                                                    /* {{>videoPlayer src=name path="/assets/upload/posts/"}} */
                                                  }
                                                ) : (
                                                  <></>
                                                )}
                                              </a>
                                            }
                                          />
                                        );
                                      })}
                                    </div>
                                    <div class="swiper-pagination swiper-pagination-post_media"></div>
                                    <div class="swiper-scrollbar-post_media"></div>
                                  </div>
                                </div>
                              }
                              dataElse={
                                <If
                                  data={post.media[0].type != "audio"}
                                  dataIf={
                                    <a class="swiper-slide">
                                      {post.media[0].type == "image" ? (
                                        <div class="swiper-post_media_image_container">
                                          <img
                                            src={`/assets/upload/posts/${post.media[0].name}`}
                                          />
                                        </div>
                                      ) : post.media[0].type == "video" ? (
                                        {
                                          /* {{>videoPlayer src=name path="/assets/upload/posts/"}} */
                                        }
                                      ) : (
                                        <></>
                                      )}
                                    </a>
                                  }
                                />
                              }
                            />
                            <div class="post_audio_container">
                              <If
                                data={audioCountCheck(post.media) == true}
                                dataIf={
                                  <div>
                                    {post.text ? (
                                      post.media.map(function (mediafile, i) {
                                        return (
                                          <div>
                                            {mediafile.type == "audio" ? (
                                              <div></div> /* audioPlayer src=name path="/assets/upload/posts/" */
                                            ) : (
                                              <></>
                                            )}
                                          </div>
                                        );
                                      })
                                    ) : (
                                      <div class="user_post_text_background">
                                        {/* {{#arrayWhile media}} */}
                                        {/* {{#is type "audio"}} */}
                                        {/* {{>audioPlayer src=name path="/assets/upload/posts/"}} */}
                                        {/* {{/is}} */}
                                        {/* {{/arrayWhile}} */}
                                      </div>
                                    )}
                                  </div>
                                }
                                dataElse={
                                  // {{#arrayWhile media}}
                                  // {{#is type "audio"}}
                                  {
                                    /* {{>audioPlayer src=name path="/assets/upload/posts/"}} */
                                  }
                                  // {{/is}}
                                  // {{/arrayWhile}}
                                }
                              />
                            </div>
                            <span class="comment_text">
                              {Helpers.clearText(post.text)}
                            </span>
                          </div>
                        ) : textLengthCheck(post.text) == true ? (
                          <div class="comment_body">
                            <div class="user_post_text_background">
                              <span class="comment_text">
                                {Helpers.clearText(post.text)}
                              </span>
                            </div>
                          </div>
                        ) : (
                          <div class="comment_body">
                            <span class="comment_text">
                              {Helpers.clearText(post.text)}
                            </span>
                          </div>
                        )}
                        {/* </div> */}

                        <div class="comment_icons">
                          {/* <AnswerAdditionallyToggleNew item={post} typeApi={"setAnswer"} type={
                              {
                                delete: true,
                                complainAnswer: true,
                                complainUser: true,
                                blackList: true,
                              }} /> */}
                          <div
                            class={[
                              "comment_icon_type-1",
                              "answer_additionally_toggle",
                              Variable.auth != true ? "comment_inactive" : null,
                            ]}
                            onClick={(e) => {
                              toggleAdditionalyMenu(e);
                            }}
                          >
                            <img
                              class="answer_additionally_toggle_img"
                              src={svg.points}
                            />
                            <div
                              class="answer_additionally_container"
                              style="display: none"
                            >
                              <div class="answer_additionally">
                                <If
                                  data={post.author._id == Variable.myInfo._id}
                                  dataIf={
                                    <div>
                                      <div
                                        class="answer_additionally_item share"
                                        data-answer-id={post._id}
                                        data-type="post"
                                      >
                                        {Variable.lang.select.share}
                                      </div>
                                      <div
                                        class="answer_additionally_item edit"
                                        data-answer-id={post._id}
                                        data-type="post"
                                      >
                                        {Variable.lang.button.edit}
                                      </div>
                                      <div
                                        class="answer_additionally_item delete"
                                        data-answer-id={post._id}
                                        data-type="post"
                                      >
                                        {Variable.lang.select.delete}
                                      </div>
                                    </div>
                                  }
                                  dataElse={
                                    <div>
                                      <div
                                        class="answer_additionally_item subscribe"
                                        data-answer-id={post.author._id}
                                        data-type="post"
                                      >
                                        <span style="">
                                          {post.subscribe
                                            ? Variable.lang.button.subscribe
                                            : Variable.lang.button.unsubscribe}
                                        </span>
                                      </div>
                                      <div
                                        class="answer_additionally_item share"
                                        data-answer-id={post._id}
                                        data-type="post"
                                      >
                                        {Variable.lang.select.share}
                                      </div>
                                      <div
                                        class="answer_additionally_item complain c-text--error"
                                        data-answer-id={post._id}
                                        data-type="post"
                                      >
                                        {Variable.lang.select.complainPost}
                                      </div>
                                      <div
                                        class="answer_additionally_item complain c-text--error"
                                        data-answer-id={post.author._id}
                                        data-type="user"
                                      >
                                        {Variable.lang.select.complainUser}
                                      </div>
                                      <div
                                        class="answer_additionally_item block c-text--error"
                                        data-answer-id={post.author._id}
                                        data-type="user"
                                      >
                                        {Variable.lang.select.blackList}
                                      </div>
                                    </div>
                                  }
                                />
                                <If
                                  data={Variable.myInfo.status.role}
                                  dataIf={
                                    <div
                                      style="color: #32DE80"
                                      class="answer_additionally_item delete"
                                      data-answer-id={post._id}
                                      data-type="post"
                                    >
                                      {Variable.lang.select.delete}
                                    </div>
                                  }
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </form>
        </div>
      );
    }
  );
};

export default start;
