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

const startDrag = (e) => {
    console.log('=a5348d=', e)
    let clickX = e.pageX;
    let clickY = e.pageY;
    console.log('=63a30b=', clickX, clickY)
}

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
]
let size = projects.length;
let currentSlide = 0;
let coords;

// const function

const forExport = function ({}) {
    return (
        <div class="sliderMenu-wrap">
            <div 
                class="sliderContainer"
                After={($el) => {
                    Data.Static.widthContainer = $el.offsetWidth;
                    console.log('=c3d90f=', Data.Static.widthContainer)
                }}    
                // onresize={()=>{
                //     Data.Static.widthContainer = $el.offsetWidth;
                //     console.log('=3e5038=', "hfg")
                // }}
            >

                <div 
                    class="slider"
                    After={($el) => {
                        Data.Static.widthLine = size * Data.Static.widthContainer;
                        $el.style.width = `${Data.Static.widthLine}px`
                        console.log('=c3d90f=', $el.style.width)
                    }} 
                    onpointerdown={(e)=>{
                        Data.Static.clientX = e.pageX;
                        Data.Static.clientY = e.pageY;
                        console.log('=bb75c8=', Data.Static.clientX, Data.Static.clientY)
                    }}
                    onmousemove={(e)=>{
                        console.log('=7cc167=', e )
                    }}
                >
                    {
                        projects.map((item, index)=>{
                            return(
                                <div 
                                    class="slider-item"
                                    After={($el) => {
                                        Data.Static[`slide${index}`] = $el;
                                        Data.Static[`slide${index}`].style.width = `${Data.Static.widthContainer}px`
                                        console.log(`${Data.Static[`slide${index}`]}`, Data.Static[`slide${index}`].style.width)
                                    }}
                                    // Elements={($el)=>{
                                    //     Data.Static[`slide${index}`] = $el;
                                    //     console.log('=7db30c=', Data.Static[`slide${index}`])
                                    // }}
                                >
                                    <a
                                        href={`#`}
                                    >
                                        <div class="slider-item_img">
                                            <img src={images[`slider/${item.icon}`]} alt={item.title}></img>
                                        </div>
                                    </a>
                                </div>
                            )
                        })
                    }
                    
                </div>
                {/* <div 
                    class="slider-button slider-button_prev" 
                    role="button"
                    aria-label="Previous slide"
                >
                    <img src={svg.swiper_arrow_left}></img>
                </div>
                <div 
                    class="slider-button slider-button_next" 
                    role="button"
                    aria-label="Next slide"
                >
                    <img src={svg.swiper_arrow_right}></img>
                </div> */}
            </div>
        </div>
    )
}

export default forExport