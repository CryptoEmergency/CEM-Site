import {
    jsx,
    jsxFrag,
    init,
    Variable
} from '@betarost/cemserver/cem.js';
import { fn } from '@src/functions/index.js';
import svg from '@assets/svg/index.js';
import images from '@assets/images/index.js';
import { Avatar, ButtonShowMore } from '@component/element/index.js';
import { BlockAffiliateBanners } from '@component/blocks/index.js';

const start = function (data, ID) {
    let [Static] = fn.GetParams({ data, ID })
    init(
        async () => {
            Static.nameRecords = "PageUserAffilate"
            Static.apiFilter = { "referral.user": Variable.myInfo._id }
            await fn.restApi.getUsers({ cache: true, name: Static.nameRecords, filter: Static.apiFilter })
        },
        () => {
            return (
                <div class="page-content c-main__body">
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
                                            <div class="copy_link">
                                                <div class="copy_link_block"
                                                    onclick={() => {
                                                        navigator.clipboard.writeText(`https://crypto-emergency.com/user/${Variable.myInfo.nickname}`);
                                                        Static.copyWindow.hidden = false
                                                        setTimeout(() => { Static.copyWindow.hidden = true }, 1000)
                                                    }}
                                                >
                                                    <img src={svg.copy} />
                                                    <div
                                                        class="success_copy"
                                                        hidden={true}
                                                        Element={($el) => {
                                                            Static.copyWindow = $el
                                                        }}>
                                                        {Variable.lang.text.coppied}
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="copy_link"
                                                onclick={async () => {
                                                    let shareData = {
                                                        url: `https://crypto-emergency.com/user/${Variable.myInfo.nickname}`
                                                    }
                                                    if (navigator.share) {
                                                        await navigator.share(shareData)
                                                    }
                                                }}>
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
                                    <b>{(Variable.myInfo.statistic.referralPay * 0.5)} CEMD</b>
                                    <span>{Variable.lang.span.clientMoney}</span>
                                </div>
                            </div>
                        </div>
                        <div class="my_partners_block">
                            <p>{Variable.lang.p.myPartners}</p>
                            <div class="affiliate_partner_list">
                                {
                                    Variable.PageUserAffilate.list_records.length
                                        ?
                                        Variable.PageUserAffilate.list_records.map(function (item) {
                                            return (
                                                <div class="affiliate_partner_item">
                                                    <div class="affiliate_partner_avatar">
                                                        <Avatar author={item} />
                                                        <span>{item.nickname}</span>
                                                    </div>
                                                    <div>
                                                        {fn.getDateFormat(item.showDate)}
                                                    </div>
                                                    <div> {item.statistic.level >= 3 ? "0.5 CEM" : "0 CEM"}     </div>
                                                    <div> {item.statistic.level >= 3 ? <img src={images["icon/transaction_success"]} /> : <img src={images["icon/transaction_in_time"]} />} </div>
                                                </div>
                                            )
                                        })
                                        :
                                        <div class="my_partners_empty_list">
                                            <img src={svg["partner-list_icon"]} />
                                            <p>{Variable.lang.p.dontHavePartners}</p>
                                        </div>
                                }
                            </div>
                            <ButtonShowMore Static={Static} action="getUsers" />
                        </div>
                        <BlockAffiliateBanners />
                    </div>
                </div>
            )
        }, ID
    )
};
export default start;
// OK