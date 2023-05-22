import {
  jsx,
  jsxFrag,
  init,
  initReload,
  Variable,
  Helpers,
  initGo,
  sendApi,
  CEM
} from "@betarost/cemserver/cem.js";
// import { fn } from '@src/functions/index.js';

import {
  MediaButton,
  Avatar,
  MediaPreview
} from "@elements/element/index.js";

import { BlockLentaUsers } from '@elements/blocks/index.js';
import { NotFound } from "@elements/element/index.js";
import Cropper from 'cropperjs';
import 'cropperjs/dist/cropper.css';

let Static, selectAspect;

const { fn } = CEM

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

    Static.edittext = ""
    Static.elEditText.innerText = ""
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





const start = function (data, ID) {
  Variable.HeaderShow = true
  Variable.FooterShow = true
  Variable.showUserMenu = false

  let authorPosts;

  const sendPhotoOne = async function (Static, crooper, originalImage) {
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
      originalImage,
      src: canvas.toDataURL(),
      type: "image",
      upload: 0,
      size: 0
    };
    console.log('=c83d58= previewObj =', previewObj)
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
            originalImage,
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
    const originalImage = Static.mediaInputs.value[index].originalImage
    let previewObj = {
      originalImage,
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
            originalImage,
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


  const sendAuthorization = async function (e) {
    e.preventDefault();
    if (!Static.isValid) {
      return false;
    }
  };




  let setT
  async function textLengthCheck(str, e) {

    clearTimeout(setT);
    setT = setTimeout(async function () {
      if (str.trim().length > 0 || Static.mediaInputs.value.length > 0) {
        Static.isValid = true;
      }
      else {

        Static.isValid = false;
        Static.textInputs.show = false
      }

      initReload()

    }, 500)




  };



  const whatIsAspect = function (selectAspect, width, height) {

    //console.log('=f0f70e=',selectAspect,width,height)

    if (selectAspect) {
      return selectAspect
    }


    //прямоугольник c шириной
    if (width > height) {
      return 1.7777777777777777
    }
    //прямоугольник c высотой
    if (height > width) {
      return 0.8
    }
    return 1


  }


  const loadPhoto = async function (file, type, xhr, selectAspect = false, key) {
    // console.log('=ebf8e1=', selectAspect)


    let imageUrlTmp = URL.createObjectURL(file);
    const originalImageTmp = new Image();
    originalImageTmp.src = imageUrlTmp;



    let dataURL;

    let imageUrl


    const newImg = new Image();

    async function cropImage(imagePath, type, xhr) {
      let fileImg;
      let sx, sy, sw, sh, dx, dy, dw, dh

      const originalImage = new Image();
      originalImage.src = imagePath;


      const canvas = document.getElementById('canvas');
      const ctx = canvas.getContext('2d');


      originalImage.addEventListener('load', async function () {

        let height = originalImage.height;
        let width = originalImage.width;

        //если есть выбранный размер фото
        if (selectAspect && selectAspect != 1) {
          //aspect == 0.8
          if (selectAspect == 0.8 && width > height) {
            sx = (width - 0.8 * height) / 2
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
            sy = (height - width / 0.8) / 2
            sw = width
            sh = width / 0.8
            dx = 0
            dy = 0
            dw = width
            dh = width / 0.8
          }
          if (selectAspect == 0.8 && height == width) {
            sx = 1
            sy = (height - width) / 2
            sw = width
            sh = width / 0.8
            dx = 0
            dy = 0
            dw = width
            dh = width / 0.8
          }
          if (selectAspect == 1.7777777777777777 && width > height) {
            sx = 1
            sy = (height - width / 1.7777777777777777) / 2
            sw = width
            sh = width / 1.7777777777777777
            dx = 0
            dy = 0
            dw = width
            dh = width / 1.7777777777777777
          }
          if (selectAspect == 1.7777777777777777 && height > width) {
            sx = 1
            sy = (height - width / 1.7777777777777777) / 2
            sw = width
            sh = width / 1.7777777777777777
            dx = 0
            dy = 0
            dw = width
            dh = width / 1.7777777777777777
          }

          if (selectAspect == 1.7777777777777777 && height == width) {
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

        // console.log('=e1d7e3=', height, width)
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
          originalImage: originalImageTmp,
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
          if (numItem == 0) {
            Static.mediaInputs.value[numItem] = {
              originalImage: originalImageTmp,
              aspect: Static.mediaInputs.selectAspect,
              type: response.mimetype.split("/")[0],
              name: response.name,
              width: dw,
              height: dh
            }
          }
          else {
            Static.mediaInputs.value[numItem] = {
              originalImage: originalImageTmp,
              aspect: Static.mediaInputs.selectAspect,
              type: response.mimetype.split("/")[0],
              name: response.name,
              width: "",
              height: ""
            }
          }

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
          /*
                   if (Static.mediaInputs.value[numItem].upload === Static.mediaInputs.value[numItem].size && Static.mediaInputs.value[numItem].upload !== 0) {
                     Static.mediaInputs.value.splice(numItem, 1);
                     initReload()
                     return
                   }
            */
          Static.mediaInputs.value[numItem].upload = e.loaded
          Static.mediaInputs.value[numItem].size = contentLength;

          initReload();


        }


        await xhr.send(formData)

      });




    }

    imageUrl = URL.createObjectURL(file);


    cropImage(imageUrl, type, xhr)

    Static.isValid = true
  };

  let el = [];

  let [Static] = fn.GetParams({ data, ID })
  Static.originalImage = [];
  Static.loadedPhoto = []
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

  Static.activeView = "tile";

  init(
    async () => {


      Static.sendPhoto = true
      fn.initData.posts(Static)

      if (Variable.dataUrl.params) {


        const data = await fn.restApi.getPost({ filter: { _id: Variable.dataUrl.params, "languages.code": "all" }, limit: 1 })
        if (data.list_records.length) {

          Static.checked = false

          Static.editphoto = true
          let postForEdit = data.list_records[0];
          Static.edittext = postForEdit.text
          //    console.log('=b37faa=', postForEdit)
          let imageVideoFiles = postForEdit.media.filter((file) => file.type != 'audio');
          let audioFiles = postForEdit.media.filter((file) => file.type == 'audio');

          Static.idEditPost = postForEdit._id;

          if (postForEdit.text.length > 0) {


            Static.textInputs = {
              show: true,
              value: Static.edittext
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
          else {
            Static.mediaInputs = {
              value: [],
              show: false,
            }
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


      if (!Static.mediaInputs.value || Static.mediaInputs.value.length == 0) {
        Static.mediaInputs.selectAspect = null
        Static.originalImage = [];
      }

      // console.log("Static.edittext", Static.edittext)
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
                  fn.modals.ModalChangeLanguage({
                    onclick: async (langCode, langName, langOrig) => {
                      Static.lang.name = langOrig;
                      Static.lang.code = langCode;
                      Static.posts = await fn.restApi.getPost({ short: true, cache: false, name: "PageUserProfileMyLenta", filter: { author: Static.userInfo._id, "languages.code": Static.lang.code }, select: { author: 1, forFriends: 1, languages: 1, media: 1, showDate: 1, statistic: 1, status: 1, text: 1, title: 1, updateTime: 1 }, limit: 12 })
                      // console.log('=5e37b8= ModalChangeLanguage',Static.posts)
                      initReload()
                    }
                  })
                }}
              >{Static.lang.name}</div>
            </div>
            <div data-type="posts" class="c-userpostcreate__container create_post_container">



              <div
                class={[Static.mediaInputs.show ? "create_post_chapter createPostImage" : "c-hidden"]}>
                {

                  Static.mediaInputs.value.map((item, index) => {

                    // console.log('=2e07f3=', item)
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
              <div

                class={[Static.audioInputs.show ? "create_post_chapter createPostAudio" : "c-hidden"]}>
                {() => {
                  if (Static.audioInputs.value.length > 0) {
                    Static.audioInputs.value.map((item, index) => {
                      // console.log('=82305a= el = ',el)
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
                }}
              </div>
              <div
                Element={($el) => {
                  Static.elEditText = $el
                }}

                class={[Static.textInputs.show ? "create_post_chapter create_post_main_text" : "c-hidden"]}
                // contenteditable="true" 
                contenteditable="plaintext-only"

                oninput={function (e) {

                  textLengthCheck(this.innerText.trim(), this)

                  Static.textInputs.value = this.innerText.trim()


                }
                }
              >
                {/* {Static.edittext} */}
                {fn.editText(Static.edittext, { paragraph: true, clear: true, html: true, noLink: true })}
              </div>

            </div>

            <MediaButton


              onclickText={async function () {
                if (Static.textInputs.show === true) {
                  return;
                } else {
                  Static.textInputs.show = true;
                  Static.textInputs.value = ""
                  initReload();
                }
              }}

              multiple={true}
              onclickPhoto={async function (e) {
                if (this.files.length == 0) {
                  // console.log(this.files.type)
                  return;
                }


                Static.files = Object.assign({}, this.files)
                // console.log('=09ca68=', Static.files)

                Static.originalImage = [];

                Array.from(this.files).forEach((item, index) => {
                  //для каждой картинки сохраняем оригинал
                  let imageUrl = URL.createObjectURL(item);
                  const originalImage = new Image();
                  originalImage.src = imageUrl;
                  Static.originalImage.push(originalImage);
                })

                // let imageUrl = URL.createObjectURL(this.files[0]);
                // const originalImage = new Image();
                // originalImage.src = imageUrl;
                // Static.originalImage = originalImage;
                // console.log('=b876c8=', originalImage)
                // console.log('=b876c8=', Static.originalImage[0])

                // Static.originalImage.forEach((item) => {
                //   console.log('=posts Static.originalImage=', '!!!')
                // })

                // Static.originalImage[0].addEventListener('load', async function () {
                //   console.log('=posts Static.originalImage[0]=', Static.originalImage[0])

                if (!Static.mediaInputs.selectAspect) {
                  Static.mediaInputs.selectAspect = whatIsAspect(Static.mediaInputs.selectAspect, Static.originalImage[0].width, Static.originalImage[0].height)
                }

                // console.log('=f1ee74=', Static.files, Object.keys(Static.files).length)
                if (Object.keys(Static.files).length == 1) {
                  // alert("Один выбираю")
                  if (Static.files[0].type.match("image.*")) {
                    fn.modals.ModalCropImage({
                      originalImage: null,
                      file: Static.files[0],
                      typeUpload: 'posts',
                      arrMedia: Static.mediaInputs.value,
                      aspectSelect: Static.mediaInputs.selectAspect,
                      uploadCropImage: async function (cropper, aspectActive) {
                        Static.mediaInputs.selectAspect = aspectActive

                        let imageUrl = URL.createObjectURL(Static.files[0]);
                        const originalImage = new Image();
                        originalImage.src = imageUrl;

                        sendPhotoOne(Static, cropper, originalImage)

                        // console.log('=2e552a=',cropper,aspectActive,Static.files)

                        //                        document.getElementById("spinner").hidden = false
                        // for (let key in Static.files){
                        // if (Static.files[key]){
                        // Static.mediaInputs.selectAspect ? await loadPhoto(Static.files[key], "posts", null, Static.mediaInputs.selectAspect) : await loadPhoto(Static.files[key], "posts")
                        // } 

                        // }
                        return;
                      }
                    }, ID)
                  }
                  
                } else {
                  // alert("Много выбираю")
                  fn.modals.ModalCropImage({
                    file: Static.files[0],
                    typeUpload: 'posts',
                    arrMedia: Static.mediaInputs.value,
                    aspectSelect: Static.mediaInputs.selectAspect,
                    uploadCropImage: async function (cropper, aspectActive) {
                      Static.mediaInputs.selectAspect = aspectActive

                      let imageUrl = URL.createObjectURL(Static.files[0]);
                      const originalImage = new Image();
                      originalImage.src = imageUrl;

                      sendPhotoOne(Static, cropper, originalImage)

                      // console.log('=2e552a=',cropper,aspectActive,Static.files)

                      const sX = cropper.getData();
                      // console.log('=770465=', ' x = ', sX.x, ', y = ', sX.y)

                      document.getElementById("spinner").hidden = false
                      for (let key in Static.files) {
                        if (Static.files[key] && key != 0) {
                          Static.mediaInputs.selectAspect ? await loadPhoto(Static.files[key], "posts", null, Static.mediaInputs.selectAspect, sX) : await loadPhoto(Static.files[key], "posts")
                        }

                      }
                      return;
                    }
                  }, ID)
                }

                // if (!Static.mediaInputs.value || Static.mediaInputs.value.length == 0) {

                //   fn.modals.ModalCropImage({
                //     file: Static.files[0],
                //     typeUpload: 'posts',
                //     arrMedia: Static.mediaInputs.value,
                //     aspectSelect: Static.mediaInputs.selectAspect,
                //     uploadCropImage: async function (cropper, aspectActive) {
                //       Static.mediaInputs.selectAspect = aspectActive
                //       sendPhotoOne(Static, cropper)

                //       // console.log('=2e552a=',cropper,aspectActive,Static.files)

                //       //                        document.getElementById("spinner").hidden = false
                //       // for (let key in Static.files){
                //       // if (Static.files[key]){
                //       // Static.mediaInputs.selectAspect ? await loadPhoto(Static.files[key], "posts", null, Static.mediaInputs.selectAspect) : await loadPhoto(Static.files[key], "posts")
                //       // } 

                //       // }
                //       return;
                //     }
                //   }, ID)
                // }
                // else {
                //   document.getElementById("spinner").hidden = false
                //   for (let key in Static.files) {
                //     if (Static.files[key]) {
                //       Static.mediaInputs.selectAspect ? await loadPhoto(Static.files[key], "posts", null, Static.mediaInputs.selectAspect) : await loadPhoto(Static.files[key], "posts")
                //     }

                //   }
                // }


                // })

                //   for (let i = 0; i < this.files.length; i++) {
                //     if(i == 0)
                //     {
                //     fn.modals.ModalCropImage({
                //       file: this.files[0],
                //       typeUpload: 'posts',
                //       arrMedia: Static.mediaInputs.value,
                //       aspectSelect: Static.mediaInputs.selectAspect,
                //       uploadCropImage: async function (cropper) {
                //         await sendPhotoOne(Static, cropper)
                //         return;
                //       }
                //     }, ID)
                //   }
                // }
                //  document.getElementById("spinner").hidden = false
                //      Static.mediaInputs.selectAspect ? await loadPhoto(this.files[i], "posts", null, Static.mediaInputs.selectAspect) : await loadPhoto(this.files[i], "posts")




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
                    // Static.elEditText.innerText = ""
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
            {/*<div class="c-userpostcreate__forfriends">
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
            
                </div>*/}
            <div class={[Static.checked ? "c-hidden" : "c-userpostcreate__forfriends"]}>
              <div class="checkbox">

                <label class="" for="">
                  формат фото
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

                disabled={!Static.isValid}
                onclick={(e) => {
                  ym(88768376, 'reachGoal', 'post_sent')
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
                    previewPost.media.push({ name: item.name, type: item.type, previewName: item.previewName ? item.previewName : null })
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
                style="margin-right: 30px"
                class={[

                  Variable.dataUrl.params ? "c-button c-button--gradient2" : "c-hidden",
                ]}
                type="button"

                onClick={(e) => { document.getElementsByClassName('c-userpanel__icon--active')[0].click() }}
              >
                <span class="c-button__text">
                  Отменить
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

            {/* <div class="c-userpostcreate__myposts my_posts">
              {Variable.lang.h.posts_my} */}
            {/* {{> userPost}} */}
            {
              !Static.posts || !Static.posts.list_records.length
                ?
                <div
                  class={[
                    "user_news_block",
                    Static.activeView == "tile" ? "user_news_block--tiles" : null
                  ]}
                >
                  <NotFound />
                </div>
                :
                <div
                  class={[
                    "user_news_block",
                    Static.activeView == "tile" ? "user_news_block--tiles" : null
                  ]}
                  style="margin-bottom: 70px"
                >
                  <div class="user_news_header">
                    <h2 style="align-self: flex-start; font-size: 20px; margin-bottom: 0;">{Variable.lang.h.posts_my}</h2>
                    <ul class="user_news_togglersview">
                      <li
                        onclick={function (e) {
                          e.stopPropagation();
                          Static.activeView = "list"
                          initReload();
                        }}
                      >
                        <a
                          href=""
                          class={[
                            "user_news_toggler",
                            "user_news_toggler--list",
                            Static.activeView == "list" ? "user_news_toggler--active" : null
                          ]}
                        >Список</a>
                      </li>
                      <li
                        onclick={function (e) {
                          e.stopPropagation();
                          Static.activeView = "tile"
                          initReload();
                        }}
                      >
                        <a
                          href=""
                          class={[
                            "user_news_toggler",
                            "user_news_toggler--tile",
                            Static.activeView == "tile" ? "user_news_toggler--active" : null
                          ]}
                        >Плитка</a>
                      </li>
                    </ul>
                  </div>
                  <div
                    style="width: 100%"
                    class={[
                      Static.activeView == "tile" ? "c-tiles" : null
                    ]}
                  >
                    {
                      Static.posts.list_records.map((item, index) => {
                        return (
                          // <BlockLentaUsers
                          //   Static={Static}
                          //   item={item}
                          //   index={index}
                          //   ElemVisible={() => {
                          //     fn.recordsView(item._id, "setPost")
                          //   }}
                          // />
                          <BlockLentaUsers
                            Static={Static}
                            item={item}
                            ElemVisible={
                              // () => {
                              //     fn.recordsView(item._id, "setPost")
                              // }
                              Static.posts.list_records.length < Static.posts.totalFound && index == (Static.posts.list_records.length - 5) ?
                                async () => {

                                  console.log('=0c6882=', "Load more")
                                  fn.recordsView(item._id, "setPost")
                                  Static.apiFilter = makeFilter(Static)
                                  let response = await await fn.restApi.getPost({ filter: Static.apiFilter, limit: 15, offset: Static.activeItems.list_records.length })
                                  Static.posts.list_records.push(...response.list_records)
                                  initReload()
                                }
                                :
                                () => {
                                  fn.recordsView(item._id, "setPost")
                                }
                            }
                          />
                        )
                      })
                    }
                  </div>
                </div>
            }
            {/* </div> */}
          </form>
        </div>
      );
    }, ID
  );
};

export default start;
