import { jsx, jsxFrag, init, initReload, Variable, sendApi } from '@betarost/cemjs';
import svg from '@assets/svg/index.js';
import images from '@assets/images/index.js';
import { NotifyItem } from '@component/element/NotifyItem.js';


const start = function () {

    let notify, currentNotify

    Variable.HeaderShow = true
    Variable.FooterShow = true
    Variable.showUserMenu = false


    const findUnread = function (arr, title = false) {
        let unread = false
        if (!arr || !arr.length) { return false }
        if (title) {
            arr.forEach(element => {
                if (!element.read) { unread = title }
            })
        } else {
            arr.forEach(element => {
                if (!element.read) { unread = true }
            })
        }
        return unread
    };

    const changeCategory = async function () {
        if (currentNotify[this.dataset.type]) {
            return
        }
        switch (this.dataset.type) {
            case 'question':
                currentNotify = {
                    question: true,
                    awards: false,
                    system: false
                }
                notify = Variable.myInfo.notifyQuestions
                break;
            case 'awards':
                currentNotify = {
                    question: false,
                    awards: true,
                    system: false
                }
                notify = Variable.myInfo.notifyAwards
                break;
            case 'system':
                currentNotify = {
                    question: false,
                    awards: false,
                    system: true
                }
                notify = Variable.myInfo.notifySystem
                break;
        }
        initReload()
    }

    init(
        async () => {
            notify = Variable.myInfo.notifyQuestions
            //notify = Variable.myInfo.notifyAwards
            //notify = Variable.myInfo.notifySystem
            currentNotify = {
                question: true,
                awards: false,
                system: false
            }
        },

        () => {
            return (
                <div class={[
                    "uc_container",
                    Variable.HeaderShow ? "c-main__body" : "c-main__body--noheader",
                ]}
                >
                    <div class="notifications_title">
                        {Variable.lang.text.yourNotification}
                        <div class="notifications_toggle_block">
                            <div
                                data-type='question'
                                onclick={changeCategory}
                                style={findUnread(Variable.myInfo.notifyQuestions) ? "color: #2ECB74" : null}
                                class={currentNotify.question ? 'notifications_toggle_item notifications_toggle_item_active' : 'notifications_toggle_item'}
                            >
                                {Variable.lang.text.questions}
                            </div>
                            <div
                                data-type='awards'
                                onclick={changeCategory}
                                style={findUnread(Variable.myInfo.notifyAwards) ? "color: #2ECB74" : null}
                                class={currentNotify.awards ? 'notifications_toggle_item notifications_toggle_item_active' : 'notifications_toggle_item'}
                            >
                                {Variable.lang.text.awards}
                            </div>
                            <div
                                data-type='system'
                                onclick={changeCategory}
                                style={findUnread(Variable.myInfo.notifySystem) ? "color: #2ECB74" : null}
                                class={currentNotify.system ? 'notifications_toggle_item notifications_toggle_item_active' : 'notifications_toggle_item'}
                            >
                                {Variable.lang.text.system}
                            </div>
                        </div>
                    </div>


                    <div class="notifications_list">
                        <div class="notifications_list_inner">
                            <div class="notifications_list_part part_questions">


                                <NotifyItem
                                    data={notify}
                                />



                            </div>
                        </div>
                    </div>


                </div>
            )
        }
    )
};

export default start;