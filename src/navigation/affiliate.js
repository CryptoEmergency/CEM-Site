import { jsx, jsxFrag, init, Variable, load } from "@betarost/cemserver/cem.js";

import svg from "@assets/svg/index.js";
import { fn } from "@src/functions/index.js";

import { BlockAffiliateBanners } from "@component/blocks/index.js";

import Elements from "@src/elements/export.js";

const start = function (data, ID) {
  let [Static] = fn.GetParams({ data, ID });

  load({
    ID,
    fn: () => {
      return (
        <Elements.page.MainContainer
          title={!Static.openModals ? Variable.lang.h.affiliate : null}
        >
          <Elements.text.Main
            text={Variable.lang.p.dontHaveFriends}
            class="el-c el-size--20 el-color--grey el-w--500"
          />
          <Elements.page.Container class="affiliate_program_conditions">
            <Elements.cards.Standart
              image={svg["icon/affiliate_conditions_icon-1"]}
              title={Variable.lang.p.affiliateCondition1}
              description={Variable.lang.p.affiliateConditionDescription1}
            />
            <Elements.cards.Standart
              image={svg["icon/affiliate_conditions_icon-2"]}
              title={Variable.lang.p.affiliateCondition2}
              description={Variable.lang.p.affiliateConditionDescription2}
            />
            <Elements.cards.Standart
              image={svg["icon/affiliate_conditions_icon-3"]}
              title={Variable.lang.p.affiliateCondition3}
              description={Variable.lang.p.affiliateConditionDescription3}
            />
            <Elements.cards.Standart
              image={svg["icon/affiliate_conditions_icon-4"]}
              title={Variable.lang.p.affiliateCondition4}
              description={Variable.lang.p.affiliateConditionDescription4}
            />
          </Elements.page.Container>
        </Elements.page.MainContainer>
      );
    },
  });
  return;
  init(
    null,
    () => {
      return (
        <div class="affiliate c-main__body">
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
    },
    ID
  );
};
export default start;
// OK
