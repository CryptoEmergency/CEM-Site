import { jsx, jsxFrag, Variable, initReload, initOne } from "@betarost/cemjs";

import svg from "@assets/svg/index.js";
import images from "@assets/images/index.js";

let activeBanner, userLang, banner;
let successImg = Variable.setRef();
let successCode = Variable.setRef();

let banners = {
  en: [
    {
      url: images["affiliate_banners/200x100"],
      type: "200x100",
    },
    {
      url: images["affiliate_banners/200x200"],
      type: "200x200",
    },
    {
      url: images["affiliate_banners/120x600"],
      type: "120x600",
    },
    {
      url: images["affiliate_banners/300x600"],
      type: "300x600",
    },
  ],
  ru: [
    {
      url: images["affiliate_banners/120x600ru"],
      type: "120x600",
    },
    {
      url: images["affiliate_banners/140x600ru"],
      type: "140x600",
    },
    {
      url: images["affiliate_banners/160x600ru"],
      type: "160x600",
    },
    {
      url: images["affiliate_banners/200x200ru"],
      type: "200x200",
    },
    {
      url: images["affiliate_banners/200x250ru"],
      type: "200x250",
    },
    {
      url: images["affiliate_banners/240x400ru"],
      type: "240x400",
    },
    {
      url: images["affiliate_banners/240x600ru"],
      type: "240x600",
    },
    {
      url: images["affiliate_banners/300x600ru"],
      type: "300x600",
    },
    {
      url: images["affiliate_banners/120x800ru"],
      type: "120x800",
    },
    {
      url: images["affiliate_banners/250x250ru"],
      type: "250x250",
    },
    {
      url: images["affiliate_banners/100x100ru"],
      type: "100x100",
    },
  ],
};

const BlockAffiliateBanners = function () {
  initOne(() => {
    userLang = Variable.lang.code === "ru" ? "ru" : "en";
    activeBanner = banners[userLang][0].type;
  });

  banner = banners[userLang].filter((item) => item.type === activeBanner);

  return (
    <div class="affiliate_banners">
      <div class="affiliate_banners_size">
        <div>
          <h4>{Variable.lang.h.bannerSize}</h4>
          <div>
            <div
              class={[
                "tag_button",
                userLang == "en" ? "tag_button_active" : null,
              ]}
              onclick={() => {
                userLang = "en";
                activeBanner = banners[userLang][0].type;
                initReload();
              }}
            >
              <span>English</span>
            </div>
            <div
              class={[
                "tag_button",
                userLang == "ru" ? "tag_button_active" : null,
              ]}
              onclick={() => {
                userLang = "ru";
                activeBanner = banners[userLang][0].type;
                initReload();
              }}
            >
              <span>Русский</span>
            </div>
          </div>
          <div class="affiliate_banners_size_list">
            {banners[userLang].map((item, index) => {
              return (
                <div
                  onclick={() => {


                    activeBanner = item.type;
                    initReload()
                  }}
                  class={["affiliate_banners_size_item", activeBanner == item.type ? "affiliate_banners_size_item_active" : null]}
                >
                  <div class="affiliate_banners_size_item_inner">
                    {item.type}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
      <div class="affiliate_banner">
        <div>
          <h4>{Variable.lang.h.addMaterials}</h4>
          <div class="affiliate_banner_link">
            <div class="affiliate_banner_link_block">{banner[0].url}</div>
            <div
              class="affiliate_banner_copy"
              onclick={() => {
                navigator.clipboard.writeText(banner[0].url);
                successImg().hidden = false;
                setTimeout(() => {
                  successImg().hidden = true;
                }, 1000);
                return;
              }}
            >
              <img src={svg.copy} />
              <span>{Variable.lang.p.copy}</span>
              <div class="success_copy" hidden={true} ref={successImg}>
                {Variable.lang.text.coppied}
              </div>
            </div>
          </div>
        </div>
        <div>
          <h4>{Variable.lang.h.codeToPlace}</h4>
          <div class="affiliate_banner_code">
            <div class="affiliate_banner_code_block">{`<a href="https://crypto-emergency.com"><img src=${banner[0].url}></a>`}</div>
            <div
              class="affiliate_banner_copy"
              data-type="code"
              onclick={() => {
                navigator.clipboard.writeText(
                  `<a href="https://crypto-emergency.com"><img src=${banner[0].url}></a>`
                );
                successCode().hidden = false;
                setTimeout(() => {
                  successCode().hidden = true;
                }, 1000);
                return;
              }}
            >
              <img src={svg.copy} />
              <span>{Variable.lang.p.copy}</span>
              <div class="success_copy" hidden={true} ref={successCode}>
                {Variable.lang.text.coppied}
              </div>
            </div>
          </div>
        </div>
        <div class="affiliate_banner_preview">
          <img src={banner[0].url} />
        </div>
      </div>
    </div>
  );
};
//I check
export { BlockAffiliateBanners };
