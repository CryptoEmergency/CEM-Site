import {
    jsx,
    jsxFrag,
    init,
    Variable,
    sendApi
} from "@betarost/cemjs";
import { siteLink, checkAnswerApi } from '@src/functions.js'
import svg from "@assets/svg/index.js";
import { WalletCard } from '@component/element/user/WalletCard.js';


const start = function () {

    let course

    Variable.HeaderShow = false
    Variable.FooterShow = false

    init(
        async () => {
            course = checkAnswerApi(await sendApi.getCourse()).list_records[0];
        },
        () => {
            console.log("myInfo", Variable.myInfo);
            return (
                <div class="page-content">
                    <div class="wallet_page_container">
                        <div class="wallet_container">
                            <div class="wallet_left_part">
                                <WalletCard
                                    logo={true}
                                    balance={Variable.myInfo.balance.cemd}
                                    course={1}
                                    coin={"CEMD"}
                                />
                                <WalletCard
                                    logo={true}
                                    balance={Variable.myInfo.balance.cem}
                                    course={course.cem.usdt}
                                    coin={"CEM"}
                                />
                            </div>
                        </div>




                    </div>
                </div>
            )
        })
};

export default start;