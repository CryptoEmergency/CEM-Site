import {
    jsx,
    jsxFrag,
    Variable,
    init,
    sendApi
} from "@betarost/cemjs";

import { If, Map } from '@component/helpers/All.js';
import svg from '@assets/svg/index.js';
import { Swiper } from '@component/element/index.js';

let swiperOptions = {
    effect: "cards",
    grabCursor: true,
    hashNavigation: true,
}

const start = function () {
    let awards

    Variable.HeaderShow = true
    Variable.FooterShow = true
    Variable.showUserMenu = false


    init(
        async () => {
            awards = await sendApi.send({ action: "getAwards", short: true, filter: { kindGroup: true } });


        },
        () => {
            // console.log('=76f689=', awards.kindGroup.group, Object.values(awards.kindGroup.group))
            let tmp = Object.values(awards.kindGroup.group)
            // console.log('=9dcce1=', tmp)
            // awards.kindGroup.one.push(...awards.kindGroup.one)
            return (
                <div
                    class={[
                        "awards",
                        "c-container",
                        Variable.HeaderShow ? "c-main__body" : "c-main__body--noheader",
                      ]}
                >
                    <div class="awards_block">
                        <div class="awards_body">
                            {() => {
                                let awardsItems = awards.kindGroup.one[0]
                                return (
                                    <div class="award swiper-slide">
                                        <img src={svg["badge/" + awardsItems.icon.split(".")[0]]} class="awards_small_badge" />
                                        <img src={svg["badge/" + awardsItems.icon.split(".")[0]]} class="awards_badge" />
                                        {() => {
                                            if (awardsItems.bonus == "exp") {
                                                return (
                                                    <div class="awards_exp">
                                                        <img src={svg["awards_plus"]} />{awardsItems.bonusValue} exp
                                                    </div>
                                                )
                                            } else if (awardsItems.bonus == "cemd") {
                                                return (
                                                    <div class="awards_exp">
                                                        <img src={svg["awards_plus"]} />{awardsItems.bonusValue} CEMD
                                                    </div>
                                                )
                                            } else {
                                                return (
                                                    <div>
                                                        <div class="awards_exp">
                                                            <img src={svg["awards_plus"]} />{awardsItems.extraValue} exp
                                                        </div>
                                                        <div class="awards_exp">
                                                            <img src={svg["awards_plus"]} />{awardsItems.bonusValue} CEMD
                                                        </div>
                                                    </div>
                                                )
                                            }
                                        }}
                                        <div class="award_description">
                                            <p class="awards_title">{Variable.lang.awards[awardsItems.name]}</p>
                                            <p class="awards_text">{Variable.lang.awards[awardsItems.description]}</p>
                                            {() => {
                                                if (awardsItems.have >= awardsItems.count) {
                                                    return (
                                                        <div>
                                                            <div class="progress_bar green"></div>
                                                            <p class="progress_bar_label green-grad">{Variable.lang.p.receive}</p>
                                                        </div>
                                                    )
                                                } else {
                                                    return (
                                                        <div>
                                                            <div class="progress_bar" style={`width: ${(awardsItems.have / awardsItems.count) * 100}%`}></div>
                                                            <p class="progress_bar_label">{(awardsItems.have / awardsItems.count).toFixed(2)}</p>
                                                        </div>
                                                    )
                                                }
                                            }}
                                        </div>
                                    </div>
                                )
                            }}

                            {() => {
                                let arrReturn = tmp.map((item) => {
                                    return (
                                        <Swiper
                                            slide={
                                                item.map(function (awardsItems) {
                                                    return (
                                                        <div class="award swiper-slide">
                                                            <img src={svg["badge/" + awardsItems.icon.split(".")[0]]} class="awards_small_badge" />
                                                            <img src={svg["badge/" + awardsItems.icon.split(".")[0]]} class="awards_badge" />
                                                            {() => {
                                                                if (awardsItems.bonus == "exp") {
                                                                    return (
                                                                        <div class="awards_exp">
                                                                            <img src={svg["awards_plus"]} />{awardsItems.bonusValue} exp
                                                                        </div>
                                                                    )
                                                                } else if (awardsItems.bonus == "cemd") {
                                                                    return (
                                                                        <div class="awards_exp">
                                                                            <img src={svg["awards_plus"]} />{awardsItems.bonusValue} CEMD
                                                                        </div>
                                                                    )
                                                                } else {
                                                                    return (
                                                                        <div>
                                                                            <div class="awards_exp">
                                                                                <img src={svg["awards_plus"]} />{awardsItems.extraValue} exp
                                                                            </div>
                                                                            <div class="awards_exp">
                                                                                <img src={svg["awards_plus"]} />{awardsItems.bonusValue} CEMD
                                                                            </div>
                                                                        </div>
                                                                    )
                                                                }
                                                            }}
                                                            <div class="award_description">
                                                                <p class="awards_title">{Variable.lang.awards[awardsItems.name]}</p>
                                                                <p class="awards_text">{Variable.lang.awards[awardsItems.description]}</p>
                                                                {() => {
                                                                    if (awardsItems.have >= awardsItems.count) {
                                                                        return (
                                                                            <div>
                                                                                <div class="progress_bar green"></div>
                                                                                <p class="progress_bar_label green-grad">{Variable.lang.p.receive}</p>
                                                                            </div>
                                                                        )
                                                                    } else {
                                                                        return (
                                                                            <div>
                                                                                <div class="progress_bar" style={`width: ${(awardsItems.have / awardsItems.count) * 100}%`}></div>
                                                                                <p class="progress_bar_label">{(awardsItems.have / awardsItems.count).toFixed(2)}</p>
                                                                            </div>
                                                                        )
                                                                    }
                                                                }}
                                                            </div>
                                                        </div>
                                                    )
                                                })
                                            }
                                            options={swiperOptions}
                                            className="awardsSwiper"
                                        />
                                    )
                                })
                                return arrReturn
                            }
                            }
                        </div>
                    </div>
                </div>
            )
        }
    )
}
export default start;