import { jsx, jsxFrag, init, initReload, Variable, sendApi } from '@betarost/cemjs';
import svg from '@assets/svg/index.js';
import images from '@assets/images/index.js';

const start = function () {

    Variable.HeaderShow = false
    Variable.FooterShow = false
    Variable.showUserMenu = true

    init(

        async () => {

        },

        () => {
            return (
                <div class="page-content">
                    <img class="affiliate_program_blur" style="position: absolute; right: 0;" src={svg["affiliate_blur-1"]} />
                    <img class="affiliate_program_blur" style="position: absolute; left: 0;" src={svg["affiliate_blur-4"]} />

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

                                <div class="my_partners_empty_list">
                                    <img src={svg["partner-list_icon"]} />
                                    <span>{Variable.lang.span.clientMoney}</span>
                                    <p>{Variable.lang.p.dontHavePartners}</p>
                                </div>

                            </div>
                        </div>

                        <div class="affiliate_banners">

                        </div>
                    </div>


                </div>
            )
        }
    )
};

export default start;