import {
    jsx,
    jsxFrag,
    Variable,
    setValue,
    getValue,
    sendApi,
    initOne,
    initAfter
  } from "@betarost/cemjs";

  import svg from "@assets/svg/index.js";
  import images from "@assets/images/index.js";
  import Swiper from 'swiper/bundle';
  import 'swiper/css/bundle';

let items, swiperitem;

  
  const ViewImagesOrVideos = function ({item}) {
    initOne(
        () => {
            items =item;
            swiperitem = null
        }
    )

    initAfter(
        () => {
            if (!swiperitem) {
                swiperitem = new Swiper('#swiper-viewImg', {
                    direction: 'horizontal',
                    navigation: {
                        nextEl: '#next-icons',
                        prevEl: '#prev-icons',
                    }, 
                    pagination: false,
                    // pagination: {
                    //     el: '#swiper-pagination-startup',
                    // },
                    scrollbar: {
                        el: '.swiper-scrollbar-startup',
                    },
                    breakpoints: {
                        // 20: {
                        //     slidesPerView: 1,
                        //     spaceBetween: 0
                        // },
                        // 320: {
                        //     slidesPerView: 1,
                        //     spaceBetween: 0
                        // },
                        // 425: {
                        //     slidesPerView: 1,
                        //     spaceBetween: 0
                        // },
                        // 480: {
                        //     slidesPerView: 1,
                        //     spaceBetween: 0
                        // },
                        // 768: {
                        //     slidesPerView: 1,
                        //     spaceBetween: 0
                        // },
                        // 1024: {
                        //     slidesPerView: 1,
                        //     spaceBetween: 0
                        // },
                        1240: {
                            slidesPerView: 1,
                            spaceBetween: 0,
                        },
                    },
                });
            }
        }
    )


    return (
    //   <div class="sliderContainer">
    //     <div
    //       class="slider"
    //     >
    //       <div class="slider-list">
    //         <div class="slider-track">
    //           {/* {
    //          items.map((slide) => {
    //             return <img src={`/assets/upload/posts/${slide.name}`}class="slide" />;
    //           })} */}
    //         </div>
    //       </div>
    //     </div>
    //   </div>
        <div class="c-images">
        <div class="swiper-container">
            <div class="swiper swiper-viewImg" id="swiper-viewImg">
                <div class="swiper-wrapper">
                    {
                        items.map(function (media) {
                            return (
                                <div class="swiper-slide">
                                    <div data-id={media._id}>
                                        <img src={`/assets/upload/question/${media.name}`}/>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
                <div class="swiper-pagination" id="swiper-pagination-startup"></div>
                <div class="swiper-scrollbar-startup"></div>
            </div>
            <div class="swiper-button-prev" id="prev-icons">
                <img src={svg.swiper_arrow_left} style="height: 40%;" />
            </div>
            <div class="swiper-button-next" id="next-icons">
                <img src={svg.swiper_arrow_right} style="height: 40%;" />
            </div>
        </div>
    </div>
      
    );
  };
  
  export { ViewImagesOrVideos };