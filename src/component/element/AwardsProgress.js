import { jsx, jsxFrag, Variable } from '@betarost/cemjs';

import { If, Map } from '@component/helpers/All.js';
import svg from '@assets/svg/index.js';

const AwardsProgress = function ({ item }) {

    return (
        <div class="award swiper-slide">
            <img src={svg["badge/" + item.icon.split(".")[0]]} class="awards_small_badge" />
            <img src={svg["badge/" + item.icon.split(".")[0]]} class="awards_badge" />
            <If
                data={item.bonus == "exp"}
                dataIf={
                    <div class="awards_exp">
                        <img src={svg["awards_plus"]} />{item.bonusValue} exp
                    </div>
                }
                dataElse={
                    <If
                        data={item.bonus == "cemd"}
                        dataIf={
                            <div class="awards_exp">
                                <img src={svg["awards_plus"]} />{item.bonusValue} CEMD
                            </div>
                        }
                        dataElse={
                            <div>
                                <div class="awards_exp">
                                    <img src={svg["awards_plus"]} />{item.extraValue} exp
                                </div>
                                <div class="awards_exp">
                                    <img src={svg["awards_plus"]} />{item.bonusValue} CEMD
                                </div>
                            </div>
                        }
                    />

                }
            />
            <div class="award_description">
                <p class="awards_title">{Variable.lang.awards[item.name]}</p>
                <p class="awards_text">{Variable.lang.awards[item.description]}</p>

                <If
                    data={item.have >= item.count}
                    dataIf={
                        <div>
                            <div class="progress_bar green"></div>
                            <p class="progress_bar_label green-grad">{Variable.lang.p.receive}</p>
                        </div>

                    }
                    dataElse={
                        <div>
                            <div class="progress_bar" style={`width: ${(item.have / item.count) * 100}%`}></div>
                            <p class="progress_bar_label">{(item.have/item.count).toFixed(2)}</p>
                        </div>
                    }
                />
            </div>
        </div>
    )
}

export { AwardsProgress };