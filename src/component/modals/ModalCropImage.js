import {
    jsx, jsxFrag, Variable,
    initReload,
    initAfter
} from "@betarost/cemjs";
import svg from "@assets/svg/index.js";
import { If } from "@component/helpers/All.js";
import { uploadMedia } from "@src/functions.js";

import Cropper from 'cropperjs';
import 'cropperjs/dist/cropper.css';

let elem = Variable.setRef()
const URL = window.URL || window.webkitURL;
let cropper;

// const uploadCropImage = async function (e) {
//     if (e.currentTarget.disabled === true) {
//         return false;
//     }
//     var canvas;

//     const imageCrop = document.querySelector('#addCropImage .c-cropper__cropimage');  //$('#addCropImage .cropImage');
//     //   const fileCropBtn = $('#addCropImage .c-button__container');
//     const aspectValue = document.querySelector('#addCropImage [name="aspectRatio"]:checked').value;  //$('#addCropImage [name="aspectRatio"]:checked').val();
//     //   console.log(aspectValue);

//     if (cropper) {
//         canvas = cropper.getCroppedCanvas({
//             // width: 166,
//             // height: 166,
//         });
//         var previewSrc = canvas.toDataURL();

//         await canvas.toBlob(function (blob) {
//             let uniqueID = Date.now();
//             var formData = new FormData();
//             formData.append('media', blob, 'post.jpg');
//             formData.append('media_id', uniqueID);

//             uploadMedia(
//                 formData,
//                 "posts",
//                 async function () {
//                 //   let tmp = JSON.parse(this.response);
//                 //   let type = tmp.mimetype.split("/")[0];
//                 //   let obj = { aspect: "1", type, name: tmp.name };
//                 //   initReload();
//                 },
//                 async function (e) {
//                   let contentLength;
//                   if (e.lengthComputable) {
//                     contentLength = e.total;
//                   } else {
//                     contentLength = parseInt(
//                       e.target.getResponseHeader(
//                         "x-decompressed-content-length"
//                       ),
//                       10
//                     );
//                   }
//                   console.log(
//                     "=3c5fa7= ",
//                     "Загружено",
//                     e.loaded,
//                     "из",
//                     contentLength
//                   );
//                 }
//               );

//             let type = document.querySelector('#addCropImage .c-button[data-type]').dataset.type;
//             let btns = document.querySelectorAll('#addCropImage .c-cropper__toggles input[hidden]');

//             btns.forEach((element) => {
//                 element.setAttribute('disabled', 'disabled');
//             });

//             Variable.DelModals("ModalCropImage");

//             if (document.querySelector('.createPostImage[data-type=' + type + ']') == null) {
//                 const createPostImageEl = document.createElement('div');
//                 createPostImageEl.setAttribute("data-type", type);
//                 createPostImageEl.classList.add("create_post_chapter")
//                 createPostImageEl.classList.add("createPostImage");
//                 createPostImageEl.innerHTML = '';

//                 if (document.querySelector('.create_post_main_text[data-type=posts]') != null) {
//                     document.querySelector('.create_post_main_text[data-type=' + type + ']')
//                         .after('<div data-type="' + type + '" class="create_post_chapter createPostImage"></div>')
//                 } else if (document.querySelector('.create_post_title[data-type=' + type + ']') != null) {
//                     document.querySelector('.create_post_title[data-type=' + type + ']')
//                         .after('<div data-type="' + type + '" class="create_post_chapter createPostImage"></div>')
//                 } else {
//                     document.querySelector('.create_post_container[data-type=' + type + ']')
//                         .append(createPostImageEl)
//                 }
//             }

//             //   xhr.push(new XMLHttpRequest())
//             const createPostPhotoPreviewEl = document.createElement('div');
//             createPostPhotoPreviewEl.classList.add("create_post_photo_preview")
//             createPostPhotoPreviewEl.classList.add("create_post_photo_loading");
//             createPostPhotoPreviewEl.innerHTML = `
//                 <img id="${uniqueID}" class="fullsize media" src="${previewSrc}" data-aspect="${aspectValue}" data-type="${blob.type}">
//                 <div class="circle-wrap">
//                     <div class="circle">
//                         <div class="mask full">
//                             <div class="fill"></div>
//                         </div>
//                         <div class="mask half">
//                             <div class="fill"></div>
//                         </div>
//                     </div>
//                 </div>
//                 <div class="stop_loading" data-action="stopLoading" data-type="${type}" data-arraypos=' + xhr.length + ' data-id="${uniqueID}"></div>
//                 <div data-type="${type}" class="delete_post_media" data-action="deletePostMedia" data-id="${uniqueID}">
//                     <img src="${svg['delete_icon']}">
//                 </div>
//         `;

//             document.querySelector('.createPostImage[data-type=' + type + ']')
//                 .append(createPostPhotoPreviewEl)
//             //   xhr[xhr.length - 1].open('POST', '/upload/' + type + '/')
//             //   xhr[xhr.length - 1].onload = function () {
//             // ONLOAD

//             // $('#' + uniqueID).attr('data-type', JSON.parse(this.response).mimetype)
//             // $('#' + uniqueID).attr('data-name', JSON.parse(this.response).name)

//             // const aspect = $('#addCropImage .crop-container').find('[name="aspectRatio"]:checked').val();
//             // $('#' + uniqueID).attr('data-aspect', aspect);

//             // $('#' + uniqueID).parent().removeClass('create_post_photo_loading')
//             // $('#' + uniqueID).parent().find('.circle-wrap').remove()
//             // $('#' + uniqueID).parent().find('.stop_loading').remove()
//             // $('#' + uniqueID).parent().find('.delete_post_media').css('display', 'block')
//             // if (this.responseURL.split('/')[this.responseURL.split('/').length - 2] == 'question') {
//             //   if ($('.create_post_title[data-type=' + this.responseURL.split('/')[this.responseURL.split('/').length - 2] + ']').text().trim().length != 0) {
//             //     $('.button-container-preview[data-type=' + this.responseURL.split('/')[this.responseURL.split('/').length - 2] + ']').removeClass('inactive_form_button')
//             //     $('.button-container-preview[data-type=' + this.responseURL.split('/')[this.responseURL.split('/').length - 2] + ']').attr('data-active', '1')
//             //   }
//             // } else {
//             //   $('.button-container-preview[data-type=' + this.responseURL.split('/')[this.responseURL.split('/').length - 2] + ']').removeClass('inactive_form_button')
//             //   $('.button-container-preview[data-type=' + this.responseURL.split('/')[this.responseURL.split('/').length - 2] + ']').attr('data-active', '1')
//             // }
//             //   }
//             //   xhr[xhr.length - 1].upload.onprogress = function (event) {
//             // ONPROGRESS

//             // var contentLength;
//             // if (event.lengthComputable) {
//             //   contentLength = event.total
//             // } else {
//             //   contentLength = parseInt(event.target.getResponseHeader('x-decompressed-content-length'), 10)
//             // }
//             // $('#' + uniqueID).parent().find('.full').css('transform', 'rotate(' + ((360 / 200) * Number(String(((event.loaded / contentLength) * 100)).split('.')[0])) + 'deg)')
//             // $('#' + uniqueID).parent().find('.fill').css('transform', 'rotate(' + ((360 / 200) * Number(String(((event.loaded / contentLength) * 100)).split('.')[0])) + 'deg)')
//             //   };

//             /** clear crop */
//             if (typeof cropper !== "undefined") {
//                 console.log('cropper.destroy');
//                 cropper.destroy();
//                 cropper = null;
//             }

//             imageCrop.setAttribute('src', '');
//             //   fileCropBtn.attr('style', 'background: none;');
//             //   xhr[xhr.length - 1].send(formData)
//         });
//     }
// };

const changeRatioCropImage = function (e) {
    if (e.currentTarget.disabled === true) {
        return false;
    }
    console.log('=91c40e=', '= changeRatioCropImage =')

    const aspectPreview = document.querySelector('.create_post_photo_preview img[data-aspect]');
    var image = document.querySelector(`#addCropImage .c-cropper__cropimage`);
    if (aspectPreview != null) {
        var aspect = +aspectPreview.dataset.aspect;
    } else {
        aspect = 1;
    }
    const options = {
        aspectRatio: aspect,
        viewMode: 2,
        cropBoxResizable: true,
        autoCropArea: 1,
        strict: false,
        guides: false,
        highlight: true,
        dragCrop: false,

        crop: function (e) {
            var data = e.detail;
        },
    };

    var isRadio;

    if (!cropper) {
        return;
    }

    options[e.currentTarget.name] = e.currentTarget.value;

    console.log(options[e.currentTarget.name]);
    // Restart
    cropper.destroy();
    cropper = new Cropper(image, options);

    console.log(e.currentTarget)
    e.currentTarget.setAttribute("checked", true)
    e.currentTarget.setAttribute("data-aspect", e.currentTarget.value);
};

const ModalCropImage = function ({ file, typeUpload, uploadCropImage }, reload) {

    console.log('=70c86c=', file, typeUpload)

    if (!reload) {
        console.log('=594449=', "initAfter")
        setTimeout(() => {
            const aspectPreview = document.querySelector('.create_post_photo_preview img[data-aspect]');

            if (aspectPreview != null) {
                var aspect = +aspectPreview.dataset.aspect;
            } else {
                aspect = document.getElementById('aspectRatio1').value;
            }
            cropper = new Cropper(elem(), {
                aspectRatio: aspect,
                viewMode: 2,
                cropBoxResizable: true,
                autoCropArea: 1,
                strict: false,
                guides: false,
                highlight: true,
                dragCrop: false,
                crop: function (e) {
                    var data = e.detail;
                }
            });
            const checkedToggler = document.querySelector('[name="aspectRatio"][value="' + aspect + '"]');
            checkedToggler.setAttribute("checked", true);
            const btns = checkedToggler.parentElement.childNodes;
            btns.forEach((item) => {
                if(item.hasAttribute('type')) {
                    item.setAttribute("daisabled", "disabled");
                }
                item.classList.remove('c-button--active')
            });
            checkedToggler.nextElementSibling.classList.add('c-button--active');
        }, 500);
    }

    initAfter(
        () => {

        }
    )

    return (
        <div class="c-modal c-modal--open" id="addCropImage">
            <section class="c-modal__dialog c-modal__dialog--lg">
                <header class="c-modal__header">
                    <h2 class="c-modal__title">{Variable.lang.h.modal_cropImage}</h2>
                    <button
                        type="button"
                        class="c-modal__close"
                        onclick={() => {
                            Variable.DelModals("ModalCropImage");
                        }}
                    ></button>
                </header>
                <div class="c-modal__body">
                    <div class="c-cropper container crop-container" style="addCropImage">
                        <div class="c-cropper__row row">
                            <div class="c-cropper__wrapimage img-container">
                                <img ref={elem} width="300" height="300" class="c-cropper__cropimage cropImage" id="cropImage" src={URL.createObjectURL(file)} />
                            </div>
                        </div>
                        <If
                            data={typeUpload == "post"}
                            dataIf={
                                <div class="c-cropper__toggles col-12 docs-toggles">
                                    <div class="c-groupbtn c-groupbtn--lg btn-group btn-group-lg" role="group" style="width: 100%;">
                                        <input type="radio" class="" hidden name="aspectRatio" id="aspectRatio1" value="1.7777777777777777" onChange={changeRatioCropImage} />
                                        <label class="c-button c-button--outline c-button--active" for="aspectRatio1" title="">16:9</label>

                                        <input type="radio" class="" hidden name="aspectRatio" id="aspectRatio2" value="0.8" onChange={changeRatioCropImage} />
                                        <label class="c-button c-button--outline" for="aspectRatio2" title="">4:5</label>

                                        <input type="radio" class="" hidden name="aspectRatio" id="aspectRatio3" value="1" onChange={changeRatioCropImage} />
                                        <label class="c-button c-button--outline" for="aspectRatio3" title="">1:1</label>
                                    </div>
                                </div>
                            }
                        />

                        <If
                            data={typeUpload == "avatar"}
                            dataIf={
                                <div class="c-cropper__toggles col-12 docs-toggles" style="display: none;">
                                    <div class="c-groupbtn c-groupbtn--lg btn-group btn-group-lg" role="group" style="width: 100%;">
                                        <input type="radio" class="" hidden name="aspectRatio" id="aspectRatio1" value="1" />
                                        <label class="c-button c-button--outline" for="aspectRatio1" title="">1:1</label>
                                    </div>
                                </div>
                            }
                        />

                        <If
                            data={typeUpload == "bg"}
                            dataIf={
                                <div class="c-cropper__toggles col-12 docs-toggles" style="display: none;">
                                    <div class="c-groupbtn c-groupbtn--lg btn-group btn-group-lg" role="group" style="width: 100%;">
                                        <input type="radio" class="" hidden name="aspectRatio" id="aspectRatio1" value="4" />
                                        <label class="c-button c-button--outline" for="aspectRatio1" title="">4:1</label>
                                    </div>
                                </div>
                            }
                        />

                        <div class="c-cropper__footer">
                            <button type="button" class="c-button c-button--primary2" data-type={typeUpload == "post" ? "posts" : ""} onClick={(e) => uploadCropImage(e, cropper)}>
                                <span class="c-button__wrapper">{Variable.lang.button.upload}</span>
                            </button>
                            <button type="button" class="c-button c-button--outline c-button--secondary">
                                <div class="c-button__wrapper">
                                    <span>{Variable.lang.button.resetCrop}</span>
                                </div>
                            </button>
                        </div>

                    </div>
                </div>
            </section >
        </div >
    );
};

export default ModalCropImage;



{/* <div class="modal fade" id="addCropImage" tabindex="-1" aria-labelledby="" aria-hidden="true">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-header">
                <div class="modal-title">
                    <h5>{{lang.h.modal_cropImage}}</h5>
                </div>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>

            <div class="modal-body">
                {{>cropImage parent="addCropImage"}}
            </div>
            
            <div class="modal-footer">
                <div class="container">
                    <div class="row">
                        <div class="col-6">
                            <button type="button" disabled="" class="c-button c-button--outline add_post_button_container" data-type="posts" data-action="sendCropImage">
                                <div class="c-button__wrapper add_avatar_button">
                                    <span>Загрузить</span>
                                </div>
                            </button>
                        </div>
                        <div class="col-6">
                            <button type="button" class="c-button c-button--outline c-button--secondary" data-action="clearCropImage">
                                <div class="c-button__wrapper">
                                    <span>Отменить</span>
                                </div>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div> */}