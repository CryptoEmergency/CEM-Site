import { jsx, jsxFrag, Variable, initReload, initGo, init, sendApi } from "@betarost/cemjs";
import { Input, CheckBox, Select, TextArea, MediaButton,MediaPreview } from '@component/element/index.js';
import { fn } from '@src/functions/index.js';
import {

} from '@component/blocks/index.js';






const ModalEditRoom = function (data, ID) {


  let [Static] = fn.GetParams({ data, ID })

  const loadPhoto = async function (file, type, xhr) {
    
    let dataURL;
    let fileImg = file[0];
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
        // console.log('=af134a=', response)
    }
    xhr.upload.onprogress = async function (e) {
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

    xhr.send(formData)
};

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
            "chat",
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



  let valid

  if(data.userrooms.settingsroom.title)
  {
    valid = true
  }
  else{
    valid = false
  }

  Static.mediaInputs = {
    value: [],
    show: false,
}

  //инпут название
  Static.label = {
    value: data.userrooms.settingsroom.title,
    valid: valid,
    error: false,
    type: "text",
    label: "Назвние",
    placeholder: "Фускоф =)",
    errorText: "больше 5 симаволов",
    condition: async (value) => {
      

      if (value.length < 5) {
   
        return false
      }
      else {
        return true
      }
    
    },
    afterValid: () => {
      if (Static.label.valid) {
        initReload()
      }
      else {
        initReload()
      }
    }
  }


  //инпут описание
  Static.Title = {
    label: "Описание",
    value: data.userrooms.settingsroom.description,
    
  }
  
  //инпут язык
  Static.Lang = {
    value: data.userrooms.country.code + ` (${data.userrooms.country.orig_name})`,
    label: "Выбирете язык",
    code: data.userrooms.country.code,
    onclick: () => {
      fn.modals.ModalChangeLanguage({
        onclick: async (langCode, langName, langOrig) => {

          Static.Lang.value = langName + ` (${langOrig})`
          Static.Lang.code = langCode

        }
      }, ID)
    },
    readonly: "readonly",

  }
  //инпут страна
  Static.Country = {
    value: data.userrooms.country.eng_name + ` (${data.userrooms.country.orig_name})`,
    label: "Выбирите страну",
    code: data.userrooms.country.code,

    onclick: () => {
      Variable.SetModals({
        name: "ModalSelectCountry", data: {
          onclick: (code, name) => {
            Static.Country.value = name
            Static.Country.code = code
          }
        }
      }, true);
    },
    readonly: "readonly",
  }

  //приват
  Static.Private = {
    checked: data.userrooms.settingsroom.status,
  }
  //видимость
  Static.Visible = {
    checked: data.userrooms.settingsroom.visible,

  }


  //кодовое слово
  Static.Confirm = {
    label: "придумайте кодовое слово",
    value: "",
    valid: false,
    error: false,
    type: "text",
    placeholder: "Gfhdsk",
    errorText: "больше 1 символов",
    condition: async (value) => {
      if (value.length < 1) {
        return false
      }
      else {
        return true
      }
    },
    afterValid: () => {
      if (Static.Confirm.valid) {
        initReload()
      }
      else {
        initReload()
      }
    }
  }

let close = true
  init(async function () {


    Static.optionsSelect = {
      Category: {
        active:data.userrooms.settingsroom.category,
        items:[
          {text:"NFT",value:"NFT"},
          {text:"Crypto вселененная",value:"Crypto"},
          {text:"Altcoin",value:"Altcoin"},
          {text:"Bitcoin",value:"Bitcoin"},
          {text:"Finances",value:"Finances"},
          {text:"Trading",value:"Trading"}
        ],
      nameOptions:"Category",
      open:false,
      title:"Выбрать"
      }};


  }, () => {





    let active
    if (Static.label.valid) {

      active = null
      if (Static.Private.checked) {
        active = "inactive_form_button"

        if (Static.Confirm.valid) {
          active = null
        }
        else {
          active = "inactive_form_button"
        }
      }
      else {
        active = null
      }
    }

    else {
      active = "inactive_form_button"
    }




    return (
      <div class="c-modal c-modal--open" id="ModalComplainComment" onclick={function(e){ if(close){ 
  
        fn.modals.close(ID)
        }}}>
        <section class="c-modal__dialog" onmouseover={function(){
           
           close = false
    
         }}
           onmouseleave={function(){
           
           close = true
      
           }}>
          <header class="c-modal__header">
            <div class="complain_modal">
              <h4>Редактировать комнату</h4>
              <button
                class="c-modal__close"
                onclick={() => {
                  fn.modals.close(ID)
                }}
              ></button>
              <div class="complain_error">{Variable.lang.error_div.complain}</div>
              <div class="container-input">


                <Input
                  classDiv="input-div"
                  Static={Static.label}

                />
              </div>
              <div class="c-comments__field">

                <TextArea
                  className="text1 create_post_chapter"
                  Static={Static.Title}
               
                />
              </div>
              <br />
              <div class="c-comments__field">
                <label>Категории</label>
              <Select
            options={Static.optionsSelect.Category}
      
            callback={
              async (active, nameOptions) => {
              
                Static.Category = active

              }
            }
          />
                
          
              </div>
              <br />
              <div class="container-input">


                <Input
                  classDiv="input-div"
                  Static={Static.Lang}
                />
              </div>
              <div class="container-input">


                <Input
                  classDiv="input-div"
                  Static={Static.Country}
                />
              </div>

              <div class="container-checkbox">
                <div class="checkbox">
                  <input

                    class="checkbox__input complain_checkbox"

                    onChange={function (e) {
                      Static.Private.checked = this.checked

                      initReload()
                    }}
                    type="checkbox"
                    checked={Static.Private.checked ? true : false }

                  />
                  <label class="checkbox__label">
                    Приватная комната
                    <span class="cont_a-link"></span>
                  </label>
                </div>
              </div>
              <div
                style={

                  Static.Private.checked ?
                    "display: block"
                    : "display: none"
                }>
                <div class="container-input">


                  <Input
                    classDiv="input-div"
                    Static={Static.Confirm}
                  />
                </div>
              </div>
              <div class="container-checkbox">
                <div class="checkbox">
                  <input
                    class="checkbox__input complain_checkbox"
                    onChange={function (e) {
                      Static.Visible.checked = this.checked
                      initReload()
                    }}
                    type="checkbox"
                    checked={Static.Visible.checked ? true : false }

                  />
                  <label class="checkbox__label">
                    Только для друзей
                    <span class="cont_a-link"></span>
                  </label>
                </div>
              </div>
            
              <div class="userMainBlock">
                        {() => {
                            //return BlockUserProfilePage[profilePage](Static, { profilePage, items: activeItems, userInfo })
                        }}
                    </div>
                    <MediaButton
                                                onclickPhoto={function () {
                                                    if (this.files.length == 0) {
                                                        return;
                                                    }

                                                    loadPhoto(this.files, "chat");

                                                }}
                                          
                                                iconPhoto={"message_camera"}
                                            />
                                            {  Static.mediaInputs.show && Static.mediaInputs.value.length
                                                ?
                                                <div class="create_post_chapter createPostImage">
                                                    {
                                                        Static.mediaInputs.value.map((item, index) => {
                                                            if (item.type != "audio") {
                                                                return (
                                                                    <MediaPreview
                                                                        item={item}
                                                                        index={index}
                                                                        type="chat"
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


              <div class={["registration-btn", active]}>
                <a class="btn-gr-reg" onclick={
                  async () => {
                    let status = Static.Private.checked
                    let visible = Static.Visible.checked
                    let confirmuser = Static.Confirm.value
                    let title = Static.label.value
                    let description = Static.Title.value
                    let category = Static.Category
                    let images = Static.mediaInputs.value[0].name
                    let languages = Static.Lang.code
                    let country = Static.Country.code
                    let _id = data.userrooms._id
   
                    // let system = false
                    let request = {_id, status, visible, confirmuser, title, description, images, languages, country,category }
 
                    let requier = await fn.restApi.setUserRoom.edit(request)
                    
                    if (requier.status == "ok") {
                    Static.callback(requier)
                      fn.modals.close(ID)
                   
                    }
                  }
                }
                >
                  <span>Отправить</span>
                </a>
              </div>
            </div>
          </header>
        </section>
      </div>

    );
  }, ID
  )
};

export default ModalEditRoom;
