import {
    jsx,
    jsxFrag,
    Variable,
    init,
    sendApi
} from "@betarost/cemjs";

import { If, Map } from '@component/helpers/All.js';
import svg from '@assets/svg/index.js';
import { AwardsProgress, Swiper } from '@component/element/index.js';

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
            console.log('=76f689=', awards.kindGroup.group, Object.values(awards.kindGroup.group))
            let tmp = Object.values(awards.kindGroup.group)
            console.log('=9dcce1=', tmp)
            // awards.kindGroup.one.push(...awards.kindGroup.one)
            return (
                <div class="uc_container">
                    <div class="awards_block">
                        <div class="awards_body">

                            {/* <Map
                                data={awards.kindGroup.one}
                                dataIf={(item, index) => {
                                    return (
                                        <AwardsProgress
                                            item={item}
                                        />
                                    )

                                }}
                            /> */}

                            <AwardsProgress
                                item={awards.kindGroup.one[0]}
                            />
                            {tmp.map((item) => {
                                return (
                                    <Swiper
                                        slide={
                                            item.map(function (item) {
                                                return (
                                                    <AwardsProgress
                                                        item={item}
                                                    />
                                                )
                                            })
                                        }
                                        options={swiperOptions}
                                        className="awardsSwiper"
                                    />
                                )

                            })}


                            {/* {
                                tmp.map((item) => {
                                    let tmp
                                    for (let awar of item) {

                                        console.log('=a58168=', awar)
                                    }
                                    // return (
                                    //     <AwardsProgress
                                    //         item={item}
                                    //     />
                                    // )
                                })

                            } */}





                            test
                        </div>
                    </div>
                </div>
            )
        }
    )



}

export default start;