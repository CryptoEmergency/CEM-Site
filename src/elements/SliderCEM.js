import {
    jsx,
    jsxFrag,
    Variable,
    Helpers,
    Data,
    initOne,
    CEM
} from '@betarost/cemserver/cem.js';

const { images, svg, fn } = CEM

let projects = [
    {
        title: "Показать все",
        icon: "1",
        link: "",

    },
    {
        title: "Лента пользователей",
        icon: "2",
        link: "lenta-users",
    },
    {
        title: "Вопросы и ответы",
        icon: "3",
        link: "question",
    },
    {
        title: "Показать все",
        icon: "4",
        link: "",

    },
    {
        title: "Лента пользователей",
        icon: "5",
        link: "lenta-users",
    },
    {
        title: "Вопросы и ответы",
        icon: "6",
        link: "question",
    },
]

let isDragStart = false;
let prevPageX, prevScrollLeft;

const dragStart = (e) => {
    // updating global variables value on mouse down event
    isDragStart = true;
    prevPageX = e.pageX;
    prevScrollLeft  = Data.Static.sliderContainer.scrollLeft;
};

const dragging = (e) => {
    // scrolling image/carousel to left according to mouse pointer
    if(!isDragStart) return;
    e.preventDefault();
    let positionDiff = e.pageX - prevPageX;
    Data.Static.sliderContainer.scrollLeft = prevScrollLeft - positionDiff;
};

const dragStop = () => {
    isDragStart = false;
}

const slideNext = () => {
    
}

const slidePrev = () => {

}


const forExport = function ({}) {
    return (
        <div class="sliderMenu-wrap">
            <div 
                class="slider-button slider-button_prev" 
                role="button"
                aria-label="Previous slide"
                Element={($el)=>{
                    Data.Static.arrowPrev = $el;
                }}
                onclick={()=>{
                    slidePrev();
                }}
            >
                <img src={svg.swiper_arrow_left}></img>
            </div>
            <div 
                class="slider-container"
                Element={($el)=>{
                    Data.Static.sliderContainer = $el;
                }}
                onmousedown={(e)=>{
                    dragStart(e);
                }}
                onmousemove={(e)=>{
                    dragging(e);
                }}
                onmouseup={(e)=>{
                    dragStop(e);
                }}
            >
                {
                    projects.map((item, index)=>{
                        return(
                            
                            <img
                                src={images[`slider/${item.icon}`]} 
                                alt={item.title}
                                Element={($el)=>{
                                    Data.Static[`img${index}`] = $el;
                                    Data.Static
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
                Element={($el)=>{
                    Data.Static.arrowNext = $el;
                }}
                onclick={()=>{
                    slideNext();
                }}
            >
                <img src={svg.swiper_arrow_right}></img>
            </div>
        </div>
         
                 
    )
}

export default forExport