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
  AnswerAdditionallyToggle,
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
  e.preventDefault();
  if (!formInputs.isValid) {
    return false;
  }
  // console.log('=formInputs=',formInputs.mediaInputs.value)

  let data = {
    value: {
      forFriends: formInputs.forFriends,
      languages: Variable.myInfo.mainLanguage.code,
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
  Variable.HeaderShow = false;
  Variable.FooterShow = false;
  Variable.showUserMenu = true;

  let authorPosts;

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
      console.log("=84bd27=", authorPosts);
    },

    () => {
      // console.log("=83a186=", Variable.myInfo);
      return (
        <div class="c-userpostcreate">
          <h3 class="c-userpostcreate__title">{Variable.lang.h.createPost}</h3>
          <form id="userPostCreate" class="c-userpostcreate__form" onsubmit={sendAuthorization}>
            <input class="c-userpostcreate__submit" hidden type="submit" />
            <div class="c-userpostcreate__lang">
              <label for="">{Variable.lang.label.lang}:</label>
              <div class="blog_filter_language">{Variable.lang.lang}</div>
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
                data={
                  formInputs.mediaInputs.show &&
                  formInputs.mediaInputs.value.length
                }
                dataIf={
                  <div class="create_post_chapter createPostImage">
                    <Map
                      data={formInputs.mediaInputs.value}
                      dataIf={(item, index) => {
                        console.log('=item=', item, index)
                        return (
                          <div class="create_post_photo_preview">
                            <If
                              data={item.type === "image"}
                              dataIf={
                                <img
                                  class="fullsize media"
                                  src={item.src !== undefined ? item.src :
                                    `/assets/upload/posts/${item.name}`}
                                />
                              }
                              dataElse={
                                <If
                                  data={item.src !== undefined}
                                  dataIf={
                                    <img
                                      class="fullsize media"
                                      src={images["video_background"]}
                                    />
                                  }
                                  dataElse={

                                    <video
                                      class="fullsize media"
                                      src={`/assets/upload/posts/${item.name}`}
                                    />

                                  }
                                />

                              }
                            />


                            <If
                              data={item.size !== undefined}
                              dataIf={<div class="circle-wrap">
                                <div class="circle" >
                                  <div class="mask full" style={`transform: rotate( ${((360 / 200) * Math.round((item.upload / item.size) * 100))}deg`}>
                                    <div class="fill" style={`transform: rotate( ${((360 / 200) * Math.round((item.upload / item.size) * 100))}deg`}></div>
                                  </div>
                                  <div class="mask half">
                                    <div class="fill" style={`transform: rotate( ${((360 / 200) * Math.round((item.upload / item.size) * 100))}deg`}></div>
                                  </div>
                                </div>
                              </div>}
                            />

                            <If
                              data={
                                item.size === undefined
                              }
                              dataIf={
                                <div
                                  class="delete_post_media"
                                  style="display: block;"
                                  onClick={() => {
                                    deleteMediaFile(index);
                                    initReload();
                                  }}
                                >
                                  <img src={svg["delete_icon"]} />
                                </div>
                              }
                              dataElse={
                                <div class="stop_loading"
                                  onclick={() => {
                                    console.log('=STOP=')
                                    formInputs.mediaInputs.value[index].upload = formInputs.mediaInputs.value[index].size
                                  }}
                                >

                                </div>
                              }
                            />


                          </div>
                        );
                      }}
                    />
                  </div>
                }
              />
            </div>
            <MediaButton
              onclickText={() => {
                formInputs.textInputs.show = true;
                initReload();
              }}
              onclickPhoto={function (e) {
                if (this.files.length == 0) {
                  return;
                }
                let elem = e
                Variable.SetModals({
                  name: "ModalCropImage",
                  data: {
                    file: this.files[0],
                    typeUpload: "post",
                    arrMedia: formInputs.mediaInputs.value,
                    aspectSelect: selectAspect,
                    uploadCropImage: async function (cropper) {
                      // if (e.currentTarget.disabled === true) {
                      //   return false;
                      // }
                      var canvas;

                      const imageCrop = cropper.element;
                      const aspectValue = cropper.options.aspectRatio;

                      if (cropper) {
                        canvas = cropper.getCroppedCanvas({
                          // width: 166,
                          // height: 166,
                        });
                        var previewSrc = canvas.toDataURL();
                        console.log('=ea896f=', cropper)
                        let previewObj = {
                          src: previewSrc,
                          type: "image",
                          upload: 0,
                          size: 0
                        };
                        console.log('=83eada=', previewObj)
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
                              // if(formInputs.mediaInputs.value[numItem].upload ===  formInputs.mediaInputs.value[numItem].size && formInputs.mediaInputs.value[numItem].upload !==0){
                              //   console.log('=!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!=')
                              //   console.log('=4990b4=',formInputs.mediaInputs.value)
                              //   return
                              // }
                              let tmp = JSON.parse(this.response);
                              console.log("=tmp=", tmp, numItem);
                              let type = tmp.mimetype.split("/")[0];
                              let obj = {
                                aspect: aspectValue,
                                type,
                                name: tmp.name,
                              };
                              formInputs.mediaInputs.value[numItem] = obj
                              console.log('=69ce21=', obj)
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

                              console.log(

                                "=3c5fa7= ",
                                "Загружено",
                                e.loaded,
                                "из",
                                contentLength
                              );
                              selectAspect = aspectValue;
                              initReload();
                            }

                          );

                          // let type = document.querySelector('#addCropImage .c-button[data-type]').dataset.type;
                          // let btns = document.querySelectorAll('#addCropImage .c-cropper__toggles input[hidden]');

                          // btns.forEach((element) => {
                          //   element.setAttribute('disabled', 'disabled');
                          // });

                          Variable.DelModals("ModalCropImage");

                          /** clear crop */
                          if (typeof cropper !== "undefined") {
                            cropper.destroy();
                            cropper = null;
                          }

                          imageCrop.setAttribute("src", "");
                        });
                      }
                    },
                  },
                });

                // uploadMedia(
                //   this.files[0],
                //   "posts",
                //   async function () {
                //     formInputs.mediaInputs.show = true;
                //     let tmp = JSON.parse(this.response);
                //     let type = tmp.mimetype.split("/")[0];
                //     let obj = { aspect: "1", type, name: tmp.name };
                //     formInputs.mediaInputs.value.push(obj);
                //     initReload();
                //   },
                //   async function (e) {
                //     let contentLength;
                //     if (e.lengthComputable) {
                //       contentLength = e.total;
                //     } else {
                //       contentLength = parseInt(
                //         e.target.getResponseHeader(
                //           "x-decompressed-content-length"
                //         ),
                //         10
                //       );
                //     }
                //     console.log(
                //       "=3c5fa7= ",
                //       "Загружено",
                //       e.loaded,
                //       "из",
                //       contentLength
                //     );
                //   }
                // );
                formInputs.isValid = true;
              }}
              onclickVideo={function (e) {
                if (this.files.length == 0) {
                  return;
                }
                console.log('= this.files[0]=', this.files)
                let blob = new Blob([this.files], { type: 'video/mp4' });

                let url = URL.createObjectURL(blob);

                let previewObj = {
                  src: url,
                  type: "video",
                  upload: 0,
                  size: 0
                }
                console.log('=83eada=', previewObj)
                formInputs.mediaInputs.show = true;
                formInputs.mediaInputs.value.push(previewObj);
                let numItem = formInputs.mediaInputs.value.length - 1
                initReload();
                uploadMedia(
                  this.files[0],
                  "posts",
                  async function () {
                    formInputs.mediaInputs.show = true;
                    let tmp = JSON.parse(this.response);
                    let type = tmp.mimetype.split("/")[0];
                    let obj = { aspect: undefined, type, name: tmp.name };
                    formInputs.mediaInputs.value[numItem] = obj
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
                    console.log('=e.loaded=', e.loaded)
                    formInputs.mediaInputs.value[numItem].upload = e.loaded
                    formInputs.mediaInputs.value[numItem].size = contentLength;
                    console.log(
                      "=loadVideo= ",
                      "Загружено",
                      e.loaded,
                      "из",
                      contentLength
                    );
                    initReload()
                  }
                );
                formInputs.isValid = true;
              }}
            // onclickAudio={
            //     () => {
            //         console.log('=937776=', "onclickAudio")
            //     }
            // }
            // onclickMic={
            //     () => {
            //         console.log('=937776=', "onclickMic")
            //     }
            // }
            />
            <div>
              <input
                data-type="posts"
                hidden
                class="createPostImageInput"
                type="file"
                accept=".jpg,.jpeg,.png,.gif"
              />
            </div>
            <div>
              <input
                data-type="posts"
                hidden
                class="createPostVideoInput"
                type="file"
                accept=".mp4,.avi,.mov,.mkv,.avi,.flv"
              />
            </div>
            <div>
              <input
                data-type="posts"
                hidden
                class="createPostAudioInput"
                type="file"
                accept=".mp3,.wav,.aiff,.aac,.ogg,.wma"
              />
            </div>
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
                          {/* <AnswerAdditionallyToggle item={post} typeApi={"setAnswer"} type={
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
