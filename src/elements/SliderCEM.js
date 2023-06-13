import {
jsx,
jsxFrag,
Variable,
load,
initAfter,
initReload,
Data,
initOne,
CEM
} from '@betarost/cemserver/cem.js';

//   import { fn } from "@src/functions/export.js";
//   import svg from "@assets/svg/index.js";
//   import images from "@assets/images/index.js";
const { images, svg, fn } = CEM

const banners = [
    {
        // alt: "Crypto Emergency",
        alt: "1",
        src: images['slider/1']
    },
    {
        // alt: "Cem Assistant",
        alt: "2",
        src: images['slider/2']
    },
    {
        // alt: "CEM Wallet",
        alt: "3",
        src: images['slider/3']
    },
    {
        // alt: "CEMD",
        alt: "4",
        src: images['slider/4']
    },
    {
        // alt: "DUMA",
        alt: "5",
        src: images['slider/5']
    },
    {
        // alt: "CEM",
        alt: "6",
        src: images['slider/6']
    },
]
// const bannersReverse = banners.reverse();
let isDragging = false;
let startX, startScrollLeft, timeoutId;

let slides = [...banners];

let currentSlide = 0;

const dragStart = (e) => {
// Records the initial cursor and scroll position of the carousel
    isDragging = true;
    Data.sliderCarousel.classList.add("dragging");
    startX = e.pageX;
    startScrollLeft = Data.sliderCarousel.scrollLeft;
}
const dragging = (e) => {
    if(!isDragging) return; // if isDragging is false return from here
    // Updates the scroll position of the carousel based on the cursor movement
    Data.sliderCarousel.scrollLeft = startScrollLeft - (e.pageX - startX);
}
const dragStop = (e) => {
    isDragging = false;
    Data.sliderCarousel.classList.remove("dragging");
}

const autoPLay = (speed) => {
    if(!timeoutId){
        timeoutId = setInterval(() => {
            Data.sliderCarousel.scrollLeft += Data.widthSlide;
            console.log('=3bffd6=', timeoutId)
        }, speed)
    }
    
}

let sliderPerView = Math.round(Data.widthSliderCarousel / Data.widthSlide);

banners.slice(-sliderPerView).reverse().forEach(slide => {
    slides.unshift(slide)
})
banners.slice(0, sliderPerView).forEach(slide => {
    slides.push(slide)
})

const infinityScroll = () => {
    if(Data.sliderCarousel.scrollLeft === 0){
        console.log('=6a004e=', "begin")
        Data.sliderCarousel.classList.add("no-transition");
        Data.sliderCarousel.scrollLeft = Data.sliderCarousel.scrollWidth - (2 * Data.widthSliderCarousel);
        Data.sliderCarousel.classList.remove("no-transition");
        initReload()
    }else if(Math.ceil(Data.sliderCarousel.scrollLeft) === Data.sliderCarousel.scrollWidth - Data.widthSliderCarousel){
        console.log('=eccfbf=', "end")
        Data.sliderCarousel.classList.add("no-transition");
        Data.sliderCarousel.scrollLeft = Data.widthSliderCarousel;
        Data.sliderCarousel.classList.remove("no-transition");
        initReload()
    }
    // if(Data.sliderWrap.matches(":hover")){
    //     clearTimeout(timeoutId)
    //     console.log("matches");
    // }
}



const forExport = function ({ Static, speed }) {
    if (!timeoutId){
        autoPLay(speed)
    }
    console.log('=4beeb7=', timeoutId)
return (
    <div 
        class="slider-wrap"
        After={($el)=>{
            Data.sliderWrap = $el
        }}
        onmouseenter={(e)=>{
            console.log('=234fa4=',123)
            if (timeoutId){
            clearTimeout(timeoutId);
             timeoutId=null
            }
        }}
        onmouseleave={()=>{
            autoPLay(speed)
            console.log('=c8a406=', "leave mouse")
        }}
    >
        <div 
            class="slider-button slider-button_prev"
            role="button"
            aria-label="Previos slide"
            onclick={()=>{
                Data.sliderCarousel.scrollLeft += Data.widthSlide;
            }}
        
        >
            <img src={svg.swiper_arrow_right}></img>
        </div>
        <div
            onmousedown={(e)=>{
                dragStart(e)
            }} 
            onmousemove={(e)=>{
                dragging(e)
            }}
            onmouseup={(e)=>{
                dragStop(e)
            }}
            onscroll={()=>{
                infinityScroll()
            }}
            class="slider-carousel" 
            After={($el) =>{
                Data.sliderCarousel = $el;
                Data.widthSliderCarousel = $el.offsetWidth;
                
            }}
        
        >
        {

            slides.map((item, index)=>{

            return(
                <img 
                    class="slider-slide" 
                    src={item.src} 
                    alt={item.alt} 
                    draggable="false"
                    After={($el)=>{
                        Data.widthSlide = $el.offsetWidth;
                    }}
                >
                </img>
            )
            })
        }
        </div>
        <div 
            class="slider-button slider-button_next"
            role="button"
            aria-label="Next slide"
            onclick={()=>{
                Data.sliderCarousel.scrollLeft += -Data.widthSlide;
                // infinityScroll()
            }}
            >
            <img src={svg.swiper_arrow_left}></img>
        </div>
    </div>
        
                
)
}

export default forExport