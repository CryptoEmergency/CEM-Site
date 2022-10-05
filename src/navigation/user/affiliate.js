import { jsx, jsxFrag, init, initReload, Variable, sendApi } from '@betarost/cemjs';
import svg from '@assets/svg/index.js';
import images from '@assets/images/index.js';
import { If } from '@component/helpers/All.js';
import { getDateFormat } from "@src/functions.js";
import { BlockAffiliateBanners } from "@src/component/blocks/BlockAffiliateBanners.js";

const start = function () {

    Variable.HeaderShow = false
    Variable.FooterShow = false
    Variable.showUserMenu = true

    //TODO
    const list_records = [
        {
            status: {
                team: false,
                banned: false,
                role: false,
                active: true,
                delete: false
            },
            statistic: {
                level: 0,
                exp: 10,
                expTotal: 10,
                expNext: 100,
                rating: 0,
                view: 0,
                post: 0,
                question: 0,
                answer: 0,
                bestAnswer: 0,
                comment: 0,
                follower: 0,
                subscribe: 0,
                referral: 0,
                referralReg: 0,
                referralPay: 0,
                timeOnline: 0,
                evaluationminus: 0,
                evaluationplus: 0,
                complaint: 0,
                complaintDo: 0
            },
            _id: "62ea305e54e68a2402cb7e16",
            online: true,
            notifyAwards: [
                {
                    notify: {
                        name: "reciveAwards",
                        description: "registration",
                        icon: "badge2.svg"
                    }
                }
            ],
            notifyQuestions: [
                {
                    notify: {
                        name: "newQuestion",
                        description: "askQuestion",
                        icon: "open_question.svg"
                    }
                }
            ],
            notifySystem: [],
            nickname: "Igor",
            showDate: "2022-08-03T08:24:14.205Z",
            subscribe: false
        }
    ]

    init(

        async () => {
        },

        () => {
            console.log('=7606a4=', list_records)
            return (
                <div class="page-content">
                    <img class="affiliate_program_blur" style="position: absolute; right: 0;" src={svg["icon/affiliate_blur-1"]} />
                    <img class="affiliate_program_blur" style="position: absolute; left: 0;" src={svg["icon/affiliate_blur-4"]} />

                    <div class="affiliate_program_block user_affiliate">
                        <div class="affiliate_program_preview">
                            <div class="affiliate_program_link_block">
                                <h4>{Variable.lang.h.thanksFromFriends}</h4>
                                <p>{Variable.lang.p.socialLink}</p>
                                <div class="partner_link">
                                    <b>{Variable.lang.p.referal}</b>
                                    <div class="affiliate_program_link">
                                        <input type="text" value={`https://crypto-emergency.com/user/${Variable.myInfo.nickname}`} readonly />
                                        <div class="affiliate_buttons">
                                            <div data-action="copyText" class="copy_link">
                                                <div class="copy_link_block">
                                                    <img src={svg.copy} />
                                                </div>
                                            </div>
                                            <div data-action="shareLink" class="copy_link">
                                                <div class="copy_link_block">
                                                    <img src={svg.share} />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="affiliate_program_preview_baner-1">
                                <div>
                                    <b>{Variable.myInfo.statistic.referralReg}</b>
                                    <span>{Variable.lang.span.clientCount}</span>
                                </div>
                            </div>

                            <div class="affiliate_program_preview_baner-2">
                                <div>
                                    <b>{(Number(Variable.myInfo.statistic.referralPay) * 0.5)} CEMD</b>
                                    <span>{Variable.lang.span.clientMoney}</span>
                                </div>
                            </div>

                        </div>

                        <div class="my_partners_block">
                            <p>{Variable.lang.p.myPartners}</p>
                            <div class="affiliate_partner_list">
                                {
                                    list_records.map(function (item) {
                                        return (
                                            <div class="affiliate_partner_item">
                                                <div class="affiliate_partner_avatar">
                                                    {/* {{>avatar}} */}
                                                    <span>{item.nickname}</span>
                                                </div>
                                                <div>
                                                    {getDateFormat(item.showDate)}
                                                </div>
                                                <div>
                                                    {/* {{#IfMoreThen statistic.level 3}}0.5{{else}}0{{/IfMoreThen}} CEM */}
                                                </div>
                                                <div>
                                                    {/* {{#IfMoreThen statistic.level 3}}<img src="/assets/icon/transaction_success.svg">{{else}}<img src="/assets/icon/transaction_in_time.svg">{{/IfMoreThen}} */}
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                                < If
                                    data={list_records.length}
                                    dataIf={
                                        <div></div>
                                    }
                                    dataElse={
                                        <div class="my_partners_empty_list">
                                            <img src={svg["partner-list_icon"]} />
                                            <p>{Variable.lang.p.dontHavePartners}</p>
                                        </div>
                                    }
                                />

                            </div>
                        </div>

                        <BlockAffiliateBanners/>
                    </div>


                </div>
            )
        }
    )
};

export default start;