import { jsx, jsxFrag, init, initReload, Variable, sendApi } from '@betarost/cemjs';
import svg from '@assets/svg/index.js';
import images from '@assets/images/index.js';
import { NotifyItem } from '@component/element/NotifyItem.js';


const start = function () {

    let notify

    Variable.HeaderShow = false
    Variable.FooterShow = false

    init(
        async () => {
            notify = Variable.myInfo.notifyQuestions
            //notify = Variable.myInfo.notifyAwards
            //notify = Variable.myInfo.notifySystem
        },

        () => {
            return (
                <div class="uc_container">
                    <div class="notifications_title">
                        {Variable.lang.text.yourNotification}
                        <div class="notifications_toggle_block">
                            <div class="notifications_toggle_item notifications_toggle_item_active">
                                {Variable.lang.text.questions}
                            </div>
                            <div class="notifications_toggle_item">
                                {Variable.lang.text.awards}
                            </div>
                            <div class="notifications_toggle_item">
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