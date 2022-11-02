import {
  jsx,
  jsxFrag,
  init,
  Variable,
} from "@betarost/cemjs";
// poydet
import svg from "@assets/svg/index.js";
import { BlockAffiliateBanners } from '@component/blocks/index.js';

const start = function (data, ID = "mainBlock") {
  init(
    null,
    () => {
      return (
        <div class='c-main__body'>
          <img
            class="affiliate_program_blur"
            style="position: absolute; right: 0;"
            src={svg["affiliate_blur-1"]}
          />
          <img
            class="affiliate_program_blur"
            style="position: absolute; left: 0;"
            src={svg["affiliate_blur-4"]}
          />
          <div class="affiliate_program_block">
            <div class="affiliate_program_preview">
              <h3>{Variable.lang.h.affiliate}</h3>
              <p>{Variable.lang.p.dontHaveFriends}</p>
            </div>
            <div class="affiliate_program_conditions_container">
              <div class="affiliate_program_conditions">
                <div class="affiliate_program_condition">
                  <div class="affiliate_program_condition_icon">
                    <img src={svg["icon/affiliate_conditions_icon-1"]} />
                  </div>
                  <p>{Variable.lang.p.affiliateCondition1}</p>
                  <p>{Variable.lang.p.affiliateConditionDescription1}</p>
                </div>
                <div class="affiliate_program_condition">
                  <div class="affiliate_program_condition_icon">
                    <img src={svg["icon/affiliate_conditions_icon-2"]} />
                  </div>
                  <p>{Variable.lang.p.affiliateCondition2}</p>
                  <p>{Variable.lang.p.affiliateConditionDescription2}</p>
                </div>
                <div class="affiliate_program_condition">
                  <div class="affiliate_program_condition_icon">
                    <img src={svg["icon/affiliate_conditions_icon-3"]} />
                  </div>
                  <p>{Variable.lang.p.affiliateCondition3}</p>
                  <p>{Variable.lang.p.affiliateConditionDescription3}</p>
                </div>
                <div class="affiliate_program_condition">
                  <div class="affiliate_program_condition_icon">
                    <img src={svg["icon/affiliate_conditions_icon-4"]} />
                  </div>
                  <p>{Variable.lang.p.affiliateCondition4}</p>
                  <p>{Variable.lang.p.affiliateConditionDescription4}</p>
                </div>
              </div>
            </div>
            <BlockAffiliateBanners />
          </div>
        </div>
      );
    }, ID
  );
};
export default start;