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

let isDrag = false;
let startX, startScrollLeft;

const dragStart = (e) => {
    isDrag = true;
    Data.categoryCarousel.classList.add("dragging");
    startX = e.pageX;
    startScrollLeft = Data.categoryCarousel.scrollLeft
}

const dragging = (e) => {
    if(!isDrag) return;
    e.preventDefault();
    Data.categoryCarousel.scrollLeft = startScrollLeft - (e.pageX - startX);
}

const dragStop = (e) => {
    isDrag = false;
    Data.categoryCarousel.classList.remove("dragging");

}

const infiniteScroll = () => {
    if(Data.categoryCarousel.scrollLeft === 0){
        Data.categoryCarousel.classList.remove("category-wrap_shadow-left");
    }else if(Data.categoryCarousel.scrollLeft === Data.categoryCarousel.scrollWidth - Data.categoryCarousel.offsetWidth){
        Data.categoryCarousel.classList.remove("category-wrap_shadow-right");
    }
}

const mouseWheel = (e) => {
    if(e.deltaY < 0){
        Data.categoryCarousel.scrollLeft += Data.categoryEl.offsetWidth;
    } else if(e.deltaY > 0){
        Data.categoryCarousel.scrollLeft -= Data.categoryEl.offsetWidth;
    }
}

const forExport = function ({ records, active }) {
    let activeCategory = active;
console.log('=10e11e=', records)
return (
    <div 
        class="category-wrap category-wrap_shadow-right category-wrap_shadow-left"
    >
        <ul 
            class="category-carousel"
            Element={($el)=>{
                Data.categoryCarousel = $el;
            }}
            onmousedown={(e)=>{
                dragStart(e)
            }}
            onmousemove={(e)=>{
                dragging(e);
            }}
            onmouseup={(e)=>{
                dragStop(e)
            }}
            onscroll={()=>{
                infiniteScroll();
            }}
            onwheel={(e)=>{
                mouseWheel(e)
            }}
        >
            <li 
                class={["category-item", activeCategory == Variable.lang.categoryName.all.toLowerCase() ? "category-item_active" : null]}
                draggable="false"
            >
                <span>{Variable.lang.categoryName.all}</span>
            </li>
            {
                records.map((item, index)=>{
                    return(
                        <li 
                            class={["category-item", activeCategory == item.name ? "category-item_active" : null]}
                            // class={["category-item"]}
                            draggable = "false"
                            Element={($el)=>{
                                Data.categoryEl = $el;
                            }}
                        >
                            <span>{item.name}</span>
                        </li>
                    )
                })
            }
        </ul>
        
    </div>
        
                
)
}

export default forExport