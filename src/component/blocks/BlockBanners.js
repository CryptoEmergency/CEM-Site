import { jsx, jsxFrag, Variable } from "@betarost/cemserver/cem.js";
import images from "@assets/images/index.js";
import { Swiper } from "@component/element/index.js";
import { fn } from "@src/functions/export.js";
// Сделать запрос через Базу
const banners = [
  // {
  //     "id": "62dd2ca100978d192547427c",
  //     "image": "lbf_banner"
  // },
  // {
  //     "id": "62bab2ac962df43c3fd94755",
  //     "image": "blockchain24"
  // },
  // {
  //     "id": "62f0da1ef2b8fa66345ef411",
  //     "image": "crypto_summit"
  // },
  // {
  //     "id": "630382384dab714d6e986cd6",
  //     "image": "1200х580-(fb)"
  // },
  // {
  //     "id": "62fb66bd4dab714d6e955d80",
  //     "image": "blockchain_life"
  // },
  // {
  //     "id": "62d134221de982539a72345e",
  //     "image": "crypto_future_banner"
  // },
  // {
  //     "id": "632c4007b7cd91af0a32611c",
  //     "image": "techweek290х140"
  // },
  // {
  //     "id": "6335a4b54b35372a229983f6",
  //     "image": "chiframed290x140"
  // },
  // {
  //     "id": "633abcdcaaa547a6fbb7ae22",
  //     "image": "cryptofut"
  // },
  // {
  //     "id": "631eed7583bf605a831e4a42",
  //     "image": "banner2022-09-09"
  // },
  // {
  //   href: "https://blockchain-life.com/asia/en/#tickets-row",
  //   image: "BlockchainLife",
  //   lang: "en",
  // },
  // {
  //   href: "https://blockchain-life.com/asia/en/#tickets-row",
  //   image: "BlockchainLife",
  //   lang: "en",
  // },
  // {
  //   href: "https://metis.io/",
  //   image: "metis_banner",
  //   lang: "en",
  // },
  {
    href: "https://www.bitmart.com/trade/en-US?layout=basic&theme=dark&symbol=CEM_USDT",
    image: "bitmart_en",
    lang: "en",
  },
  // {
  //   href: "https://blockchain-life.com/asia/en/#tickets-row",
  //   image: "BlockchainLife",
  //   lang: "en",
  // },
  // {
  //   href: "https://blockchain-life.com/asia/en/#tickets-row",
  //   image: "BlockchainLife",
  //   lang: "en",
  // },
  // {
  //   href: "https://metis.io/",
  //   image: "metis_banner",
  //   lang: "ru",
  // },
  // {
  //   href: "https://blockchain-life.com/asia/en/#tickets-row",
  //   image: "BlockchainLife",
  //   lang: "ru",
  // },
  {
    href: "http://cryptosummit.ru/?event_id=2&ref_id=21",
    image: "crypto-summit2",
    lang: "ru"
  },
  {
    href: "/summer-forum",
    image: "crypto_ug",
    lang: "ru",
    fn: true
  },
  {
    href: "https://www.bitmart.com/trade/ru-RU?layout=basic&theme=dark&symbol=CEM_USDT",
    image: "bitmart",
    lang: "ru",
  },
  // {
  //   href: "https://blockchain24.pro/",
  //   image: "blockchain_banner",
  //   lang: "ru",
  // },
  // {
  //   href: "https://crypto.ru/",
  //   image: "crypto_banner",
  //   lang: "ru",
  // },
  // {
  //   href: "https://carding.pro",
  //   image: "pro_banner",
  //   lang: "ru",
  // },
  // {
  //   href: "https://ti.turovinvest.ru/moscow?utm_source=crypto+emergency+site",
  //   image: "crypto_future",
  //   lang: "ru",
  // },
];

const swiperOptions = {
  direction: "horizontal",
  loop: true,
  autoplay: {
    delay: 2000,
  },
  // navigation: {
  //     nextEl: '.swiper-button-next',
  //     prevEl: '.swiper-button-prev',
  // },
  pagination: false,
  // scrollbar: {
  //     el: '.swiper-scrollbar',
  // },
  breakpoints: {
    100: {
      slidesPerView: 1,
      spaceBetween: 0,
    },
    620: {
      //600
      slidesPerView: 2,
      spaceBetween: 10,
    },
    // 768: {
    //   slidesPerView: 2,
    //   spaceBetween: 50
    // },
    910: {
      //800
      slidesPerView: 3,
      spaceBetween: 20,
    },
    1240: {
      slidesPerView: 4,
      spaceBetween: 30,
      // navigation: {
      //     nextEl: '.swiper-button-next',
      //     prevEl: '.swiper-button-prev',
      // },
    },
  },
};

const BlockBanners = async function () {
  const records = await fn.socket.get({ method: "Banners", params: { filter: {  } } })
  // console.log('=84a49b=', records)
  const bannersRecords = records.map(function (item) {
    
    let lang = Variable.lang.code == "ru" ? "ru" : "en";
    if (item.languages.code == lang) {
      return (
        <a
          rel="nofollow noopener"
          target="_blank"
          href={item.link}
          class="swiper-slide"
          onclick={(e) => {
            if (item.modal) {
              fn.siteLink(e)
            }
          }}
        >
          <div>
            <img src={`/assets/upload/worldPress/${item.name}`} />
          </div>
        </a>
      );
    }
  });

  return (
    <div class="c-startaps">
      <Swiper
        slide={bannersRecords}
        options={swiperOptions}
        className="swiper-startups"
      // navigation={
      //     <div>
      //         <div class="swiper-button-prev">
      //             <img src={svg.swiper_arrow_left} style="height: 40%;" />
      //         </div>
      //         <div class="swiper-button-next">
      //             <img src={svg.swiper_arrow_right} style="height: 40%;" />
      //         </div>
      //     </div>
      // }
      />
    </div>
  );
};
export { BlockBanners };
// OK
