import {
    jsx,
    jsxFrag,
    Variable,
    initReload,
    initOne,
    sendApi,
    init
} from '@betarost/cemserver/cem.js';
import svg from "@assets/svg/index.js";
import images from '@assets/images/index.js';
import { fn } from '@src/functions/index.js';
import { Input, VideoPlayer } from '@component/element/index.js';

const ModalPreviewVideo = function ({ preview = false, uploadPreviewImage = false }, ID) {
    let [Static] = fn.GetParams({ preview, uploadPreviewImage, ID })
    let close = true
    let mediaInputs

    const sendPhotoOne = async function (Static, crooper, originalImage) {
        if (!crooper) {
            return
        }
        let canvas;

        mediaInputs.selectAspect = crooper.options.aspectRatio;

        canvas = crooper.getCroppedCanvas();
        let previewObj = {
            src: canvas.toDataURL(),
            type: "image",
            upload: 0,
            size: 0
        };
        mediaInputs.show = true;
        mediaInputs.value.push(previewObj);
        let numItem = mediaInputs.value.length - 1

        await canvas.toBlob(function (blob) {
            fn.uploadMedia(
                blob,
                "posts",
                async function () {
                    mediaInputs.show = true;
                    if (!this.response) {
                        return
                    }
                    let response = JSON.parse(this.response);

                    if (mediaInputs.value[numItem].upload === mediaInputs.value[numItem].size && mediaInputs.value[numItem].upload !== 0) {
                        mediaInputs.value[numItem].name = response.name;
                        initReload()
                    }
                    Static.preview = mediaInputs.value[numItem]
                    Static.isValid = true
                    // console.log('=debd71=Static.preview=', Static.preview)
                    // console.log('=debd71= mediaInputs.value =', mediaInputs.value)
                    initReload()
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
                    if (mediaInputs.value[numItem].upload === mediaInputs.value[numItem].size && mediaInputs.value[numItem].upload !== 0) {
                        mediaInputs.value.splice(numItem, 1);
                        initReload()
                    }

                    mediaInputs.value[numItem].upload = e.loaded
                    mediaInputs.value[numItem].size = contentLength;
                    initReload();
                }
            );
            initReload();
        });
        return
    }


    init(
        () => {
            if (preview) {
                mediaInputs = {
                    value: [
                        preview
                    ],
                    show: false,
                    selectAspect: null
                }
                Static.isValid = true
                Static.preview = preview
            } else {
                mediaInputs = {
                    value: [],
                    show: false,
                    selectAspect: null
                }
                Static.isValid = false
                Static.preview = null
            }
            Static.elSelectedPreview = []
            // console.log('=0bd58b= Static modal', Static, uploadPreviewImage)
            // console.log('=cd84a1= mediaInputs ', mediaInputs)
        },
        () => {
            return (
                <div class="c-modal c-modal--open" id="ModalPreviewVideo">
                    <section class="c-modal__dialog c-modal__dialog--lg1">
                        <header class="c-modal__header">
                            <h2 class="c-modal__title">{Variable.lang.h.modal_previewVideo}</h2>
                            <button
                                type="button"
                                class="c-modal__close"
                                onclick={function (e) {
                                    if (close) {
                                        fn.modals.close(ID)
                                    }
                                }}
                            ></button>
                        </header>
                        <div class="c-modal__body">
                            <div class="c-tiles c-tiles--preview">
                                <label
                                    class="c-tiles__item c-tiles__item--add"
                                >
                                    <figure class="c-tiles__card">
                                        <input
                                            type="file"
                                            hidden
                                            accept="image/*"
                                            onchange={async function (e) {
                                                e.stopPropagation();
                                                Static.files = Object.assign({}, this.files)
                                                fn.modals.ModalCropImage({
                                                    file: this.files[0],
                                                    typeUpload: 'preview',
                                                    arrMedia: mediaInputs.value,
                                                    uploadCropImage: async function (cropper, aspectActive) {
                                                        mediaInputs.selectAspect = aspectActive
                                                        let imageUrl = URL.createObjectURL(Static.files[0]);
                                                        const originalImage = new Image();
                                                        originalImage.src = imageUrl;

                                                        sendPhotoOne(Static, cropper, originalImage)

                                                        return false;
                                                    }
                                                }, true)
                                            }}
                                        />
                                    </figure>
                                </label>
                                {
                                    mediaInputs.value.length ?
                                        mediaInputs.value.map((imgFile, index) => {
                                            return (
                                                <div
                                                    class={[
                                                        "c-tiles__item",
                                                        index == mediaInputs.value.length - 1 ? "c-tiles__item--selected" : null
                                                    ]}
                                                    Element={($el) => {
                                                        Static.elSelectedPreview[index] = $el
                                                    }}
                                                    onclick={(e) => {
                                                        e.preventDefault();
                                                        e.stopPropagation();
                                                        Static.elSelectedPreview.forEach((preview, i) => {
                                                            Static.elSelectedPreview[i].classList.remove("c-tiles__item--selected")
                                                        })
                                                        Static.elSelectedPreview[index].classList.add("c-tiles__item--selected")
                                                        Static.preview = imgFile
                                                        Static.isValid = true
                                                        initReload()
                                                    }}
                                                >
                                                    <figure class="c-tiles__card">
                                                        <img class="c-tiles__image" src={`/assets/upload/posts/${imgFile.previewName ? imgFile.previewName : imgFile.name}`} width="100" height="100" />
                                                        {
                                                            imgFile.size === undefined
                                                                ?
                                                                <div
                                                                    class="messages_settings"
                                                                    title={Variable.lang.text.settings}
                                                                    onclick={(e) => {
                                                                        let author = Variable.myInfo
                                                                        let items = [
                                                                            {
                                                                                text: Variable.lang.select.delete,
                                                                                type: "delete",
                                                                                color: "red",
                                                                                onclick: function (e) {
                                                                                    e.stopPropagation();
                                                                                    e.preventDefault();
                                                                                    mediaInputs.value.splice(index, 1);
                                                                                    // Static.originalImage.splice(index, 1);
                                                                                    if (mediaInputs.value.length == 0) {
                                                                                        //     Static.mediaInputs.selectAspect = null;
                                                                                        mediaInputs.show = false
                                                                                        //     if (Static.textInputs && Static.textInputs.value.length == 0 && Static.audioInputs && Static.audioInputs.value.length == 0) {
                                                                                        Static.isValid = false;
                                                                                        Static.preview.name = null
                                                                                    }
                                                                                    debugger
                                                                                    // }
                                                                                    initReload();
                                                                                }
                                                                            },
                                                                        ]
                                                                        e.stopPropagation();
                                                                        e.preventDefault();
                                                                        Variable.SetModals({ name: "ModalItemsMenu", data: { items, author } }, true);
                                                                    }}
                                                                >
                                                                    <img class="" src={svg.settings_icon} width="32" height="32" />
                                                                </div>
                                                                : null
                                                        }
                                                    </figure>
                                                </div>
                                            )
                                        })
                                        : null
                                }
                            </div>
                        </div>
                        <footer class="c-modal__footer">
                            {
                                Static.isValid && Static.preview ?
                                    <button
                                        class={[
                                            "c-button c-button--gradient2",
                                            !Static.isValid ? "c-button--inactive" : "",
                                        ]}
                                        type="button"
                                        onClick={(e) => {
                                            uploadPreviewImage(Static.preview)
                                            fn.modals.close(ID)
                                        }}
                                    >
                                        <span class="c-button__text">{Variable.lang.button.attach}</span>
                                    </button>
                                    :
                                    <button
                                        class={[
                                            "c-button c-button--gradient2",
                                            Static.isValid ? "c-button--inactive" : "",
                                        ]}
                                        type="button"
                                        onClick={(e) => {
                                            uploadPreviewImage({ name: null })
                                            fn.modals.close(ID)
                                        }}
                                    >
                                        <span class="c-button__text">{Variable.lang.button.close}</span>
                                    </button>
                            }
                        </footer>
                    </section>
                </div>
            )
        }, ID
    )
}

export default ModalPreviewVideo;