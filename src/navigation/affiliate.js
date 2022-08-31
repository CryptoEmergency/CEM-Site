import {
  jsx,
  jsxFrag,
  getVariable,
  makeDOM,
  getStorage,
  setValue
} from "@betarost/cemjs";
import svg from "@assets/svg/index.js";
import images from "@assets/images/index.js";



const affiliateView = function () {
  const lang = getVariable("languages")[getStorage("lang")];

  return (
    <div class="page-content">
      <img
        class="affiliate_program_blur"
        style="position: absolute; right: 0;"
        src={svg["icon/affiliate_blur-1"]}
      />
      <img
        class="affiliate_program_blur"
        style="position: absolute; left: 0;"
        src={svg["icon/affiliate_blur-4"]}
      />
      <div class="affiliate_program_block">
        <div class="affiliate_program_preview">
          <h3>{lang.h.affiliate}</h3>
          <p>{lang.p.dontHaveFriends}</p>
        </div>
        <div class="affiliate_program_conditions_container">
          <div class="affiliate_program_conditions">
            <div class="affiliate_program_condition">
              <div class="affiliate_program_condition_icon">
                <img src={svg["icon/affiliate_conditions_icon-1"]} />
              </div>
              <p>{lang.p.affiliateCondition1}</p>
              <p>{lang.p.affiliateConditionDescription1}</p>
            </div>
            <div class="affiliate_program_condition">
              <div class="affiliate_program_condition_icon">
                <img src={svg["icon/affiliate_conditions_icon-2"]} />
              </div>
              <p>{lang.p.affiliateCondition2}</p>
              <p>{lang.p.affiliateConditionDescription2}</p>
            </div>
            <div class="affiliate_program_condition">
              <div class="affiliate_program_condition_icon">
                <img src={svg["icon/affiliate_conditions_icon-3"]} />
              </div>
              <p>{lang.p.affiliateCondition3}</p>
              <p>{lang.p.affiliateConditionDescription3}</p>
            </div>
            <div class="affiliate_program_condition">
              <div class="affiliate_program_condition_icon">
                <img src={svg["icon/affiliate_conditions_icon-4"]} />
              </div>
              <p>{lang.p.affiliateCondition4}</p>
              <p>{lang.p.affiliateConditionDescription4}</p>
            </div>
          </div>
        </div>
        <div class="affiliate_banners">
          <div class="affiliate_banners_size">
            <div>
              <h4>{lang.h.bannerSize}</h4>
              <div class="affiliate_banners_size_list">
                <div
                  data-action="changeAffiliateBanner"
                  class="affiliate_banners_size_item affiliate_banners_size_item_active"
                >
                  <div class="affiliate_banners_size_item_inner">200x100</div>
                </div>
                <div
                  data-action="changeAffiliateBanner"
                  class="affiliate_banners_size_item"
                >
                  <div class="affiliate_banners_size_item_inner">200x200</div>
                </div>
                <div
                  data-action="changeAffiliateBanner"
                  class="affiliate_banners_size_item"
                >
                  <div class="affiliate_banners_size_item_inner">120x600</div>
                </div>
                <div
                  data-action="changeAffiliateBanner"
                  class="affiliate_banners_size_item"
                >
                  <div class="affiliate_banners_size_item_inner">300x600</div>
                </div>

                <div
                  data-action="changeAffiliateBanner"
                  class="affiliate_banners_size_item"
                >
                  <div class="affiliate_banners_size_item_inner">120x600ru</div>
                </div>
                <div
                  data-action="changeAffiliateBanner"
                  class="affiliate_banners_size_item"
                >
                  <div class="affiliate_banners_size_item_inner">140x600ru</div>
                </div>
                <div
                  data-action="changeAffiliateBanner"
                  class="affiliate_banners_size_item"
                >
                  <div class="affiliate_banners_size_item_inner">160x600ru</div>
                </div>
                <div
                  data-action="changeAffiliateBanner"
                  class="affiliate_banners_size_item"
                >
                  <div class="affiliate_banners_size_item_inner">200x200ru</div>
                </div>
                <div
                  data-action="changeAffiliateBanner"
                  class="affiliate_banners_size_item"
                >
                  <div class="affiliate_banners_size_item_inner">200x250ru</div>
                </div>
                <div
                  data-action="changeAffiliateBanner"
                  class="affiliate_banners_size_item"
                >
                  <div class="affiliate_banners_size_item_inner">240x400ru</div>
                </div>
                <div
                  data-action="changeAffiliateBanner"
                  class="affiliate_banners_size_item"
                >
                  <div class="affiliate_banners_size_item_inner">240x600ru</div>
                </div>
                <div
                  data-action="changeAffiliateBanner"
                  class="affiliate_banners_size_item"
                >
                  <div class="affiliate_banners_size_item_inner">300x600ru</div>
                </div>
                <div
                  data-action="changeAffiliateBanner"
                  class="affiliate_banners_size_item"
                >
                  <div class="affiliate_banners_size_item_inner">120x800ru</div>
                </div>
                <div
                  data-action="changeAffiliateBanner"
                  class="affiliate_banners_size_item"
                >
                  <div class="affiliate_banners_size_item_inner">250x250ru</div>
                </div>
                <div
                  data-action="changeAffiliateBanner"
                  class="affiliate_banners_size_item"
                >
                  <div class="affiliate_banners_size_item_inner">100x100ru</div>
                </div>
              </div>
              <div class="affiliate_banners_size_select">
                <select class="justselect" id="changeAffiliateBannerSelect">
                  <option selected="selected" value="200x100">
                    200x100
                  </option>
                  <option value="200x200">200x200</option>
                  <option value="120x600">120x600</option>
                  <option value="300x600">300x600</option>

                  <option value="120x600ru">120x600ru</option>
                  <option value="140x600ru">140x600ru</option>
                  <option value="160x600ru">160x600ru</option>
                  <option value="200x200ru">200x200ru</option>
                  <option value="200x250ru">200x250ru</option>
                  <option value="240x400ru">240x400ru</option>
                  <option value="240x600ru">240x600ru</option>
                  <option value="300x600ru">300x600ru</option>
                  <option value="120x800ru">120x800ru</option>
                  <option value="250x250ru">250x250ru</option>
                  <option value="100x100ru">100x100ru</option>
                </select>
              </div>
            </div>
          </div>
          <div class="affiliate_banner">
            <div style="display: none;">
              <h4>{lang.h.addMaterials}</h4>
              <div class="affiliate_banner_link">
                <div class="affiliate_banner_link_block">
                  https://crypto-emergency.com/assets/image/affiliate_banners/417x417.jpg
                </div>
                <div
                  data-action="affiliateBannerCopy"
                  class="affiliate_banner_copy"
                >
                  <img src={svg["icon/copy"]} /> <span>{lang.p.copy}</span>
                  <div class="success_copy">{lang.text.coppied}</div>
                </div>
              </div>
            </div>
            <div style="display: none;">
              <h4>{lang.h.codeToPlace}</h4>
              <div class="affiliate_banner_code">
                <div class="affiliate_banner_code_block">
                  &lt;img
                  src="https://crypto-emergency.com/assets/image/affiliate_banners/417x417.jpg"&gt;
                </div>
                <div
                  data-action="affiliateBannerCopy"
                  class="affiliate_banner_copy"
                >
                  <img src={svg["icon/copy"]} /> <span>{lang.p.copy}</span>
                  <div class="success_copy">{lang.text.coppied}</div>
                </div>
              </div>
            </div>
            <div class="affiliate_banner_preview">
              <img src={images["affiliate_banners/200x100.jpg"]} />
            </div>
          </div>
        </div>
        {/* <a {{#is auth "true"}} href="/user/affiliate/" {{else}} data-action="registrationModal" {{/is}}>
            <div class="answer_button_container">
                <div class="answer_button">
                    {{lang.button.join}}
                </div>
            </div>
        </a> */}
      </div>
    </div>
  );
};

const ID = "mainBlock";

const init = function (reload) {
  setValue("mainHeader", "show", true);
  setValue("mainFooter", "show", true);
  makeDOM(affiliateView(), ID);
};

export default init;
