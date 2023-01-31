import {
    jsx,
    jsxFrag,
    load,
    Variable,
    initReload
} from "@betarost/cemserver/cem.js";

import { fn } from '@src/functions/index.js';
import svg from "@assets/svg/index.js";
import images from "@assets/images/index.js";


//
const checkForm = async function (Static, ID) {
    if (!Static.forms.category || !Static.forms.category.name) {
        fn.modals.ModalAlarm({ icon: "alarm_icon", text: "Выбери категорию!!!" })
        return
    }
    let data = {
        value: {
            category: Static.forms.category,
        }
    }


    // console.log(data)
    if (!Static.item) {
        await fn.restApi.setNews.create(data)
    } else {
        data._id = Static.item._id
        await fn.restApi.setNews.update(data)
    }
    fn.siteLink("/DimaPage/")

}

const start = function (data, ID) {

    let [Static] = fn.GetParams({ data, ID })

    load({
        ID,
        fnLoad: async () => {

            if (!Static.item) {
                Static.forms = {}
                Static.forms.category = {}
                Static.forms.image = null
                Static.forms.title = null
                Static.forms.preview = null
                Static.forms.text = null
                Static.forms.source = null
                Static.forms.showDate = null
                Static.forms.languages = {}
            } else {
                Static.forms = Object.assign({}, Static.item)
            }
        },
        fn: () => {
            // if (!Variable.auth || !Variable.myInfo || !Variable.myInfo.status || !Variable.myInfo.role){
            if (!Variable.auth || !Variable.myInfo || !Variable.myInfo.status) {
                fn.siteLink("/")
                return
            }

            return (
                <div class="c-main__body">
                    <div class="contacts_form">

                        <div
                            class="button-container-preview"
                            onclick={() => {
                                checkForm(Static, ID)
                            }}
                        >
                            <span class="btn-news-preview">
                                <span >
                                    {
                                        Static.item
                                            ?
                                            "Редактировать"
                                            :
                                            "Добавить"
                                    }

                                </span>
                            </span>
                        </div>

                        {
                            Static.item
                                ?
                                <div
                                    class="button-container-preview"
                                    onclick={async () => {
                                        data = {
                                            _id: Static.item._id,
                                            value: {
                                                active: false
                                            }
                                        }
                                        await fn.restApi.setIco.update(data)
                                        fn.siteLink("/DimaPage/")
                                    }}
                                >
                                    <span class="btn-news-preview">
                                        <span >
                                            Удалить
                                        </span>
                                    </span>
                                </div>
                                :
                                null
                        }
                    </div>
                </div>
            )
        }
    })

}


export default start;