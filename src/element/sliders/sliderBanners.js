import { jsx, jsxFrag, Variable, CEM } from "@betarost/cemserver/cem.js";

import { Swiper } from "@elements/element/index.js";
const { images, svg, fn } = CEM

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
      spaceBetween: 12,
    },
    620: {
      //600
      slidesPerView: 2,
      spaceBetween: 12,
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

const makeFilter = () => {
  let filter = {}

  filter["$and"] = [];
  filter["$and"].push({ startDate: { $lte: new Date() } });
  filter["$and"].push({ endDate: { $gte: new Date() } });

  return filter
}

function shuffleArray(array) {
  for (var i = array.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  return array
}

const BlockBanners = async function () {
  const records = await fn.socket.get({ method: "Banners", params: { filter: makeFilter() } })
  let lang = Variable.lang.code == "ru" ? "ru" : "en";
  let recordsFilter = shuffleArray(records.filter(item => item.languages.code == lang))


  const bannersRecords = recordsFilter.map(function (item) {

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
export default BlockBanners
