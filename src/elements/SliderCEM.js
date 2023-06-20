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

const { images, svg, fn } = CEM


let isDragging = false;
let startX, startScrollLeft, timeoutId;


const dragStart = (e) => {
    isDragging = true;
    // Data.sliderCarousel.classList.add("dragging");
    startX = e.pageX;
    startScrollLeft = Data.sliderCarousel.scrollLeft;
}
const dragging = (e) => {
    if(!isDragging) return; // if isDragging is false return from here
    e.preventDefault();
    // Updates the scroll position of the carousel based on the cursor movement
    Data.sliderCarousel.scrollLeft = startScrollLeft - (e.pageX - startX);
}
const dragStop = (e) => {
    isDragging = false;
    // Data.sliderCarousel.classList.remove("dragging");
}

const autoPLay = (speed) => {
    if(!timeoutId){
        timeoutId = setInterval(() => {
            Data.sliderCarousel.scrollLeft += Data.widthSlide;
        }, speed)
    }
}

const infinityScroll = () => {
    if(Data.sliderCarousel.scrollLeft === 0){
        Data.sliderCarousel.classList.add("no-transition");
        // изначальный вариант написания
        // Data.sliderCarousel.scrollLeft = Data.sliderCarousel.scrollWidth - (2 * Data.widthSliderCarousel);
        Data.sliderCarousel.scrollLeft = Data.widthSliderCarousel + Data.widthSlide;
        Data.sliderCarousel.classList.remove("no-transition");
        initReload()
    }else if(Math.ceil(Data.sliderCarousel.scrollLeft) === Data.sliderCarousel.scrollWidth - Data.widthSliderCarousel){
        Data.sliderCarousel.classList.add("no-transition");
        // изначальный вариант написания
        // Data.sliderCarousel.scrollLeft = Data.widthSliderCarousel;
        Data.sliderCarousel.scrollLeft = Data.widthSliderCarousel + Data.widthSlide;
        Data.sliderCarousel.classList.remove("no-transition");
        console.log('=Data.sliderCarousel.scrollLeft=', Data.sliderCarousel.scrollLeft)
        initReload()
    }
}

const forExport = function ({ speed, arrow, records }) {
let slides = [...records];

let sliderPerView = Math.round(Data.widthSliderCarousel / Data.widthSlide);
records.slice(-sliderPerView).reverse().forEach(slide => {
    slides.unshift(slide)
})
records.slice(0, sliderPerView).forEach(slide => {
    slides.push(slide)
})
// console.log('=slides=', slides)
// if (!timeoutId){
//     autoPLay(speed)
// }
return (
    <div 
        class="slider-wrap"
        After={($el)=>{
            Data.sliderWrap = $el
        }}
        // onmouseenter={(e)=>{
        //     if (timeoutId){
        //         clearTimeout(timeoutId);
        //         timeoutId=null
        //     }
        // }}
        // onmouseleave={()=>{
        //     autoPLay(speed)
        // }}
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
            onkeydown={(e)=>{
                if(e.code == 'ArrowLeft'){
                    console.log('=45cf14=', "нажата 'левая стрелка'")
                }else if(e.code == 'ArrowRight'){
                    console.log('=45cf14=', "нажата 'правая стрелка'")
                }
            }}
        >
        {
            slides.map((item, index)=>{
            return(
                // <img 
                //     class="slider-slide" 
                //     src={item.src} 
                //     alt={item.alt} 
                //     draggable="false"
                //     After={($el)=>{
                //         Data.widthSlide = $el.offsetWidth;
                //     }}
                // >
                // </img>
                <img 
                    class="slider-slide" 
                    src={`/assets/upload/worldPress/${item.name}`} 
                    // alt={item.alt} 
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
            }}
        >
            <img src={svg.swiper_arrow_left}></img>
        </div>
    </div>
        
                
)
}

export default forExport