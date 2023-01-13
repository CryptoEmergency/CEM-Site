import {
  jsx,
  jsxFrag,
  init,
  initReload,
  Variable,
  Helpers,
  initGo,
  sendApi,
} from "@betarost/cemjs";
import { fn } from '@src/functions/index.js';

import {
  MediaButton,
  Avatar,
  MediaPreview
} from "@component/element/index.js";

import { BlockLentaUsers } from '@component/blocks/index.js';
import { NotFound } from "@component/element/index.js";
import Cropper from 'cropperjs';
import 'cropperjs/dist/cropper.css';

let Static, selectAspect;



const sendPost = async (e, Static) => {
  e.preventDefault();
  if (!Static.isValid) {
    return false;
  }

  let tmpRes;
  if (Variable.dataUrl.params) {
    tmpRes = await fn.restApi.setPost.update({ id: Static.idEditPost, text: Static.textInputs.value, forFriends: Static.forFriends, languages: Static.lang.code, media: [...Static.mediaInputs.value, ...Static.audioInputs.value] });
  } else {
    tmpRes = await fn.restApi.setPost.create({ text: Static.textInputs.value, forFriends: Static.forFriends, languages: Static.lang.code, media: [...Static.mediaInputs.value, ...Static.audioInputs.value] });
  }
  // console.log('=270fb8=', tmpRes)

  if (tmpRes.status === "ok") {
    if (Variable.dataUrl.params) {
      Static.posts.list_records.splice(Static.posts.list_records.findIndex(el => el._id == Static.idEditPost), 1, tmpRes.list_records[0]);
    } else {
      Static.posts.list_records.unshift(tmpRes.list_records[0])
    }

    fn.initData.posts(Static)
    initReload()
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
  Static.mediaInputs.value.splice(index, 1);
  if (Static.mediaInputs.value.length == 0) {
    selectAspect = null;
  }
};

const start = function (data, ID) {
  Variable.HeaderShow = true
  Variable.FooterShow = true
  Variable.showUserMenu = false

  let authorPosts;

  const sendPhotoOne = async function (Static, crooper) {
    if (!crooper) {
      return
    }
    let canvas;
    Static.mediaInputs.selectAspect = crooper.options.aspectRatio;
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
    Static.mediaInputs.show = true;
    Static.mediaInputs.value.push(previewObj);
    let numItem = Static.mediaInputs.value.length - 1
    initReload();
    await canvas.toBlob(function (blob) {
      fn.uploadMedia(
        blob,
        "posts",
        async function () {
          Static.mediaInputs.show = true;
          if (!this.response) {
            return
          }
          let response = JSON.parse(this.response);
          Static.mediaInputs.value[numItem] = {
            aspect: Static.mediaInputs.selectAspect,
            type: response.mimetype.split("/")[0],
            name: response.name
          }
          Static.isValid = true;
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

          if (Static.mediaInputs.value[numItem].upload === Static.mediaInputs.value[numItem].size && Static.mediaInputs.value[numItem].upload !== 0) {
            Static.mediaInputs.value.splice(numItem, 1);
            initReload()
            return
          }
          Static.mediaInputs.value[numItem].upload = e.loaded
          Static.mediaInputs.value[numItem].size = contentLength;
          initReload();
        }
      );
      initReload();
      Variable.DelModals("ModalCropImage");
    });
    return
  }


  const sendPhoto = async function (crooper, index) {
    if (!crooper) {
      return
    }
    let canvas;
    canvas = crooper.getCroppedCanvas({});
    let previewObj = {
      src: canvas.toDataURL(),
      type: "image",
      upload: 0,
      size: 0
    };


    Static.mediaInputs.show = true;
    Static.mediaInputs.value[index] = previewObj;
    initReload();

    await canvas.toBlob(function (blob) {
      fn.uploadMedia(
        blob,
        "posts",
        async function () {
          Static.mediaInputs.show = true;
          if (!this.response) {
            return
          }
          let response = JSON.parse(this.response);
        
          Static.mediaInputs.value[index] = {
            aspect: Static.mediaInputs.selectAspect,
            type: response.mimetype.split("/")[0],
            name: response.name
          }
          Static.isValid = true;
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

          if (Static.mediaInputs.value[index].upload === Static.mediaInputs.value[index].size && Static.mediaInputs.value[index].upload !== 0) {
            Static.mediaInputs.value.splice(index, 1);
            initReload()
            return
          }
          Static.mediaInputs.value[index].upload = e.loaded
          Static.mediaInputs.value[index].size = contentLength;
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
    Static.mediaInputs.show = true;
    Static.mediaInputs.value.push(previewObj);
    let numItem = Static.mediaInputs.value.length - 1
    initReload();

    fn.uploadMedia(
      files[0],
      "posts",
      async function () {
        Static.mediaInputs.show = true;


        // Static.mediaInputs.value.push(obj);
        let response = JSON.parse(this.response);
        Static.mediaInputs.value[numItem] = {
          aspect: undefined,
          type: response.mimetype.split("/")[0],
          name: response.name
        }

        Static.isValid = true;
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
        Static.mediaInputs.value[numItem].upload = e.loaded
        Static.mediaInputs.value[numItem].size = contentLength;
        initReload()
      }
    );
    return
  }
  //Добавил SendAudio
  const sendAudio = async function (files) {
    let blob = new Blob([files], { type: 'audio/ogg' });
    let previewObj = {
      src: URL.createObjectURL(blob),
      type: "audio",
      upload: 0,
      size: 0
    }
    Static.audioInputs.show = true;
    Static.audioInputs.value.push(previewObj);
    let numItem = Static.audioInputs.value.length - 1

    initReload();

    fn.uploadMedia(
      files[0],
      "posts",
      async function () {
        Static.mediaInputs.show = true;


        // Static.mediaInputs.value.push(obj);

        let response = JSON.parse(this.response);
        Static.audioInputs.value[numItem] = {
          aspect: undefined,
          type: response.mimetype.split("/")[0],
          name: response.name
        }
        Static.isValid = true;
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
        Static.audioInputs.value[numItem].upload = e.loaded
        Static.audioInputs.value[numItem].size = contentLength;
        // console.log(
        //   "=3c5fa7= ",
        //   "Загружено",
        //   e.loaded,
        //   "из",
        //   contentLength
        // );
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
    if (!Static.isValid) {
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


  const loadPhoto = async function (file, type, xhr, selectAspect = false) {

    // console.log('=ebf8e1=', selectAspect)
    let dataURL;

    let imageUrl
   

    const newImg = new Image();

    async function cropImage(imagePath, type, xhr) {
      let fileImg;
      let sx, sy, sw, sh, dx, dy, dw, dh

      const originalImage = new Image();
      originalImage.src = imagePath;

console.log(originalImage.src)
      const canvas = document.getElementById('canvas');
      const ctx = canvas.getContext('2d');


      originalImage.addEventListener('load', async function () {

        let height = originalImage.height;
        let width = originalImage.width;

        //если есть выбранный размер фото
        if (selectAspect && selectAspect != 1) {
          //aspect == 0.8
          if (selectAspect == 0.8 && width > height) {
            sx = (width - height) / 2
            sy = 1
            sw = 0.8 * height
            sh = height
            dx = 0
            dy = 0
            dw = 0.8 * height
            dh = height
          }
          if (selectAspect == 0.8 && height > width) {
            sx = 1
            sy = (height - width) / 2
            sw = width
            sh = width / 0.8
            dx = 0
            dy = 0
            dw = width
            dh = width / 0.8
          }
          //aspect == 1.7777777777777777
          if (selectAspect == 1.7777777777777777 && width > height) {
            if (1.7777777777777777 * height > width) {
              sx = 1
              sy = (width - height) / 2
              sw = width
              sh = width / 1.7777777777777777
              dx = 0
              dy = 0
              dw = width
              dh = width / 1.7777777777777777
            } else {
              sx = (width - height) / 2
              sy = 1
              sw = 1.7777777777777777 * height
              sh = height
              dx = 0
              dy = 0
              dw = 1.7777777777777777 * height
              dh = height
            }
          }
          if (selectAspect == 1.7777777777777777 && height > width) {
            sx = 1
            sy = (height - width) / 2
            sw = width
            sh = width / 1.7777777777777777
            dx = 0
            dy = 0
            dw = width
            dh = width / 1.7777777777777777
          }
          //aspect  == 1 || aspect == undefined
        } else {
          //прямоугольник c шириной
          if (width > height) {
            sx = (width - height) / 2
            sy = 1
            sw = height
            sh = height
            dx = 0
            dy = 0
            dw = height
            dh = height

          }
          //прямоугольник c высотой
          if (height > width) {
            sx = 1
            sy = (height - width) / 2
            sw = width
            sh = width
            dx = 0
            dy = 0
            dw = width
            dh = width
          }

            //ровный квадрат
            if (height == width) {
              sx = 1
              sy = 1
              sw = width
              sh = width
              dx = 0
              dy = 0
              dw = width
              dh = width
            }

        }

        canvas.width = dw;
        canvas.height = dh;


        await ctx.drawImage(originalImage, sx, sy, sw, sh, dx, dy, dw, dh);


        newImg.src = canvas.toDataURL();



        await fetch(newImg.src)
          .then(res => res.blob())
          .then(blob => {
            const file = new File([blob], 'dot.png', blob)
            fileImg = file
          })



        const reader = new FileReader();
        reader.addEventListener("load", () => {
          // convert image file to base64 string
          dataURL = reader.result;
        }, false);

        if (fileImg) {
          reader.readAsDataURL(fileImg);
        }

        let previewObj = {
          src: dataURL,
          type: "image",
          upload: 0,
          size: 0
        };


        Static.mediaInputs.show = true;
        Static.mediaInputs.value.push(previewObj);
        let numItem = Static.mediaInputs.value.length - 1;

        let nameFile = "file.png"
        if (fileImg.name) {
          nameFile = fileImg.name
        }

        const formData = new FormData()
   
        formData.append('media', fileImg, nameFile);

        xhr = new XMLHttpRequest()
        xhr.open('POST', `/upload/${type}/`)
        xhr.onload = async function () {
          Static.mediaInputs.show = true;
          if (!this.response) {
            return
          }
          
          let response = JSON.parse(this.response);
    
          Static.mediaInputs.value[numItem] = {
            aspect: Static.mediaInputs.selectAspect,
            type: response.mimetype.split("/")[0],
            name: response.name
          }

          Static.isValid = true;
          initReload();

        }

        xhr.upload.onprogress = function (e) {
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

          if (Static.mediaInputs.value[numItem].upload === Static.mediaInputs.value[numItem].size && Static.mediaInputs.value[numItem].upload !== 0) {
            Static.mediaInputs.value.splice(numItem, 1);
            initReload()
            return
          }
          Static.mediaInputs.value[numItem].upload = e.loaded
          Static.mediaInputs.value[numItem].size = contentLength;
          initReload();
        }
        await xhr.send(formData)
      });




    }

    imageUrl = URL.createObjectURL(file);
  
    //image = document.createElement("img");
   // image.src = imageUrl;


    await cropImage(imageUrl, type, xhr);



  };

  let el = [];

  let [Static] = fn.GetParams({ data, ID })
  Static.posts = []
  Static.userInfo = Variable.myInfo;
  Static.elShowTextShort = {}
  Static.elShowTextFull = {}
  Static.elMedia = {}
  Static.elNumberSwiper = {}
  Static.idEditPost
  Static.startEditText = false

  Static.mediaInputs = {
    value: [],
    show: false,
  }
  Static.photo = true
  Static.edittext = ""
  Static.checked = true

  init(
    async () => {
      Static.sendPhoto = true
      fn.initData.posts(Static)

      if (Variable.dataUrl.params) {


        const data = await fn.restApi.getPost({ filter: { _id: Variable.dataUrl.params, "languages.code": "all" }, limit: 1 })
        if (data.list_records.length) {

          Static.checked = Static.editphoto = true
          let postForEdit = data.list_records[0];
          Static.edittext = postForEdit.text
          //    console.log('=b37faa=', postForEdit)
          let imageVideoFiles = postForEdit.media.filter((file) => file.type != 'audio');
          let audioFiles = postForEdit.media.filter((file) => file.type == 'audio');

          Static.idEditPost = postForEdit._id;

          if (postForEdit.text.length > 0) {


            Static.textInputs = {
              show: true,
            }
            //      console.log('=c9259f= textInputs =', Static.textInputs)
          }
          if (postForEdit.media.length > 0 && imageVideoFiles.length > 0) {
            Static.mediaInputs = {
              value: [],
              show: true,
            }
            imageVideoFiles.forEach((file) => {
              Static.mediaInputs.value.push(file);
            })
          }

          if (postForEdit.media.length > 0 && audioFiles.length > 0) {
            Static.audioInputs = {
              value: [],
              show: true,
            }
            audioFiles.forEach((audio) => {
              Static.audioInputs.value.push(audio);
            })
          }

          Static.lang = {
            code: postForEdit.languages.code,
            name: postForEdit.languages.orig_name
          }

          Static.forFriends = postForEdit.forFriends;
          Static.photo = postForEdit.photo;
          Static.isValid = Static.edittext.length > 0 || Static.mediaInputs.value.length > 0 ? true : false
        }
      }
      else {
        Static.edittext = Static.textInputs.value
      }

      // console.log('=cb696d=', Static)
      // console.log('=0bb638=', Variable)

      if (Static.userInfo._id == Variable.myInfo._id) {
        Static.posts = await fn.restApi.getPost({ short: true, cache: true, name: "PageUserProfileMyLenta", filter: { author: Static.userInfo._id, "languages.code": "all" }, select: { author: 1, forFriends: 1, languages: 1, media: 1, showDate: 1, statistic: 1, status: 1, text: 1, title: 1, updateTime: 1 }, limit: 12 })
      }

      // console.log('=50f15c=', Static.posts)

      selectAspect = null;

      // authorPosts = await fn.restApi.getPost({ cache: true, name: "MainPosts", filter: { author: Variable.myInfo._id }, sort: { showDate: -1, } })

      // Static.startEditText = true
    },

    () => {
      let multiple
      if (Static.checked) {
        multiple = false
      }
      else {
        multiple = true
      }

      return (

        <div class={[
          "c-userpostcreate",
          Variable.HeaderShow ? "c-main__body" : "c-main__body--noheader",
        ]}>
          <canvas hidden id="canvas"></canvas>

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
                        Static.lang.name = langOrig;
                        Static.lang.code = langCode;
                        initReload()
                      },
                    },
                  });
                }}
              >{Static.lang.name}</div>
            </div>
            <div data-type="posts" class="c-userpostcreate__container create_post_container">


              {
                Static.mediaInputs.show && Static.mediaInputs.value.length
                  ?
                  <div class="create_post_chapter createPostImage">
                    {
                      Static.mediaInputs.value.map((item, index) => {
                        if (item.type != "audio") {


                          return (
                            <MediaPreview
                              item={item}
                              index={index}
                              type="posts"
                              Static={Static}
                              sendPhotoChat={(cropper) => sendPhoto(cropper, index)}
                            />
                          );


                        }
                      })
                    }
                  </div>
                  :
                  null
              }
              {/* Добавил еще один иф для айдио */}
              {
                Static.audioInputs.show && Static.audioInputs.value.length
                  ?
                  <div class="create_post_chapter createPostAudio">
                    {
                      Static.audioInputs.value.map((item, index) => {

                        return (
                          <MediaPreview
                            item={item}
                            index={index}
                            type="posts"
                            Static={Static}
                            el={el}
                          />
                        );
                      })
                    }
                  </div>
                  :
                  null
              }
              {
                Static.textInputs.show
                  ?
                  <div
                    class="create_post_chapter create_post_main_text"
                    contenteditable="true"
                    oninput={function (e) {
                      Static.textInputs.value = this.textContent.trim()
                      if (this.textContent.trim() || Static.mediaInputs.value.length > 0) {
                        Static.isValid = true;
                      } else {
                        Static.isValid = false;
                      }

                    }
                    }
                  >{Static.edittext}
                    {/* {
                        Variable.dataUrl.params && !Static.startEditText
                          ?
                          Static.textInputs.value
                          :
                          null
                      } */}
                  </div>
                  :
                  null
              }
            </div>

            <MediaButton


              onclickText={function () {
                if (Static.textInputs.show === true) {
                  return;
                } else {
                  Static.textInputs.show = true;
                  Static.textInputs.value = ""
                  initReload();
                }
              }}

              multiple={multiple}
              onclickPhoto={async function (e) {
                if (this.files.length == 0) {
                  return;
                }
                if (Static.checked) {
                  if (Static.mediaInputs.show && Static.mediaInputs.value.length && !Static.mediaInputs.selectAspect) {
                    Static.mediaInputs.selectAspect = 1
                    // console.log('=d491dd=', Static.mediaInputs.selectAspect)
                  }
                  fn.modals.ModalCropImage({
                    file: this.files[0],
                    typeUpload: 'posts',
                    arrMedia: Static.mediaInputs.value,
                    aspectSelect: Static.mediaInputs.selectAspect,
                    uploadCropImage: async function (cropper) {
                      await sendPhotoOne(Static, cropper)
                      return;
                    }
                  }, ID)
                }
                else {
                  for (let i = 0; i < this.files.length; i++) {
                    document.getElementById("spinner").hidden = false
                    Static.mediaInputs.selectAspect ? await loadPhoto(this.files[i], "posts", null, Static.mediaInputs.selectAspect) : await loadPhoto(this.files[i], "posts");
                  }
                }
                this.value = '';
              }
              }

              onclickVideo={function () {
                if (this.files.length == 0) {
                  return;
                }
                sendVideo(this.files)
                this.value = '';
                return;
              }}
              // Добавил функ для Аудио
              onclickAudio={function () {
                if (this.files.length == 0) {
                  return;
                }
                sendAudio(this.files)
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
                    Static.forFriends = e.target.checked;
                    initReload()
                  }}
                  type="checkbox"
                />
                <label class="checkbox__label" for="forfrends">
                  {Variable.lang.span.forFriends}
                  <span class="cont_a-link"></span>
                </label>
              </div>
            </div>
            <div class="c-userpostcreate__forfriends">
              <div class="checkbox">
                <input
                  id="forphoto"
                  data-complain="abusive"
                  class="checkbox__input complain_checkbox"
                  onchange={(e) => {

                    Static.checked = e.target.checked;
                    if (Static.checked) {
                      Static.sendPhoto = true
                    }
                    else {
                      Static.sendPhoto = false
                    }

                    initReload();
                  }}
                  type="checkbox"
                  checked={Static.checked}
                />
                <label class="checkbox__label" for="forphoto">
                  Загружать фотографии по 1
                  <span class="cont_a-link"></span>
                </label>
              </div>
            </div>
            <div style={"display:flex; justify-content: space-between; width: 100%; max-width: 500px; margin: 20px auto"}>
              <button
                class={[
                  "c-button c-button--gradient2",
                  !Static.isValid ? "c-button--inactive" : "",
                ]}
                style="margin-right: 30px"
                type="button"
                //   onClick={sendQuestion}
                data-href={"/lenta-users/show/123456789"}
                disabled={!Static.isValid}
                onclick={(e) => {
                  //   console.log('=cf4a37=', Static)
                  let previewPost = {}
                  previewPost.author = {
                    avatar: Variable.myInfo.avatar,
                    frame: Variable.myInfo.frame,
                    nickname: Variable.myInfo.nickname,
                    online: Variable.myInfo.online,
                    statistic: {
                      level: Variable.myInfo.level
                    },
                    status: Variable.myInfo.status,
                    subscribed: Variable.myInfo.subscribed,
                    _id: Variable.myInfo._id
                  }
                  previewPost.statistic = {
                    view: 0,
                    rating: 0,
                    comments: 0
                  }
                  previewPost.text = Static.textInputs.value
                  previewPost.media = []
                  Static.mediaInputs.value.forEach(function (item) {
                    previewPost.media.push({ name: item.name, type: item.type })
                  })
                  Static.audioInputs.value.forEach(function (audio) {
                    previewPost.media.push({ name: audio.name, type: audio.type })
                  })
                  previewPost.showDate = new Date().toISOString()
                  previewPost.forFriends = Static.forFriends
                  // console.log('=0d0932=', previewPost)
                  // fn.siteLinkModal(e, { title: "Просмотр создаваемого поста", previewPost, items: fn.itemsMenu.lenta_users(Static, previewPost) })
                  fn.modals.ModalPostPreview(previewPost)
                }}
              >
                <span class="c-button__text">
                  {Variable.lang.button.pre_view}
                </span>
              </button>
              <button
                class={[
                  "c-button c-button--gradient2",
                  !Static.isValid ? "c-button--inactive" : "",
                ]}
                type="button"
                disabled={!Static.isValid}
                onClick={(e) => sendPost(e, Static)}
              >
                <span class="c-button__text">
                  {Variable.dataUrl.params ? Variable.lang.button.save : Variable.lang.button.create}
                </span>
              </button>
            </div>

            <div class="c-userpostcreate__myposts my_posts">
              {Variable.lang.h.posts_my}
              {/* {{> userPost}} */}
              {
                !Static.posts || !Static.posts.list_records.length
                  ?
                  <div class="user_news_block">
                    <NotFound />
                  </div>
                  :
                  <div class="user_news_block">
                    {
                      Static.posts.list_records.map((item, index) => {
                        return (
                          <BlockLentaUsers
                            Static={Static}
                            item={item}
                            index={index}
                            ElemVisible={() => {
                              fn.recordsView(item._id, "setPost")
                            }}
                          />
                        )
                      })
                    }
                  </div>
              }
            </div>
          </form>
        </div>
      );
    }, ID
  );
};

export default start;
