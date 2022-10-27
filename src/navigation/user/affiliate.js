import {
    jsx,
    jsxFrag,
    init,
    initReload,
    Variable,
    sendApi,
    Helpers
} from '@betarost/cemjs';

import svg from '@assets/svg/index.js';
import images from '@assets/images/index.js';

import { If } from '@component/helpers/All.js';
import { Avatar } from '@component/element/Avatar.js';
import { BlockAffiliateBanners } from "@src/component/blocks/BlockAffiliateBanners.js";
import { ButtonShowMore } from '@component/element/ButtonShowMore.js';

const start = function () {

    let copyWindow = Variable.setRef()
    Variable.HeaderShow = true
    Variable.FooterShow = true
    Variable.showUserMenu = false

    init(
        async () => {
            Variable.PageUserAffilate = await sendApi.send({ action: "getUsers", short: true, cache: true, name: "PageUserAffilate", limit: 1, filter: { "referral.user": Variable.myInfo._id } });
        },
        () => {
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
                                            <div class="copy_link">
                                                <div class="copy_link_block"
                                                    onclick={() => {
                                                        navigator.clipboard.writeText(`https://crypto-emergency.com/user/${Variable.myInfo.nickname}`);
                                                        copyWindow().hidden = false
                                                        setTimeout(() => {
                                                            copyWindow().hidden = true
                                                        }, 1000)
                                                    }}
                                                >
                                                    <img src={svg.copy} />
                                                    <div
                                                        class="success_copy"
                                                        hidden={true}
                                                        ref={copyWindow}
                                                    >
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
                                                }}
                                            >
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
                                < If
                                    data={Variable.PageUserAffilate.list_records.length != 0}
                                    dataIf={
                                        Variable.PageUserAffilate.list_records.map(function (item) {
                                            return (
                                                <div class="affiliate_partner_item">
                                                    <div class="affiliate_partner_avatar">
                                                        <Avatar author={item} />
                                                        <span>{item.nickname}</span>
                                                    </div>
                                                    <div>
                                                        {Helpers.getDateFormat(item.showDate)}
                                                    </div>
                                                    <div>
                                                        <If
                                                            data={item.statistic.level >= 3}
                                                            dataIf={"0.5 CEM"}
                                                            dataElse={"0 CEM"}
                                                        />
                                                    </div>
                                                    <div>
                                                        <If
                                                            data={item.statistic.level >= 3}
                                                            dataIf={<img src={images["icon/transaction_success"]} />}
                                                            dataElse={<img src={images["icon/transaction_in_time"]} />}
                                                        />
                                                    </div>
                                                </div>
                                            )
                                        })
                                    }
                                    dataElse={
                                        <div class="my_partners_empty_list">
                                            <img src={svg["partner-list_icon"]} />
                                            <p>{Variable.lang.p.dontHavePartners}</p>
                                        </div>
                                    }
                                />
                            </div>
                            <If
                                data={Variable.PageUserAffilate.list_records.length < Variable.PageUserAffilate.totalFound}
                                dataIf={
                                    <ButtonShowMore
                                        onclick={async () => {
                                            let tmp = await sendApi.send({ action: "getUsers", short: true, limit: 20, offset: Variable.PageUserAffilate.list_records.length, filter: { "referral.user": Variable.myInfo._id } })
                                            Variable.PageUserAffilate.list_records.push(...tmp.list_records)
                                            initReload()
                                        }}
                                    />
                                }
                            />
                        </div>
                        <BlockAffiliateBanners />
                    </div>
                </div>
            )
        }
    )
};
//I check
export default start;