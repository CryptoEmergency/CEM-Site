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
        icon: "menu",
        link: "",

    },
    {
        title: "Лента пользователей",
        icon: "preview_line_lenta",
        link: "lenta-users",
    },
    {
        title: "Вопросы и ответы",
        icon: "preview_line_questions",
        link: "question",
    },
    {
        title: "ICO рейтинг",
        icon: "star1",
        link: "list-icostartaps",
    },
    {
        title: "Стартапы",
        icon: "list-startups",
        link: "list-startaps",
    },
    {
        title: "Новости",
        icon: "preview_line_news",
        link: "news",
    },
    {
        title: "Обменники",
        icon: "exchanges",
        link: "list-exchange",
    },
    {
        title: "Пользователи",
        icon: "preview_line_users",
        link: "users",
    },
    {
        title: "Крипто университет",
        icon: "mortarboard",
        link: "crypto-university",
    },
    {
        title: "Эксперты",
        icon: "preview_line_experts",
        link: "experts",
    },
    {
        title: "Создатели контента",
        icon: "contentmaker",
        link: "content-creator",
    },
    {
        title: "Карьера",
        icon: "careers_icon2",
        link: "career-whith-us",
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
                                        href={`/${item.link}/`}
                                    >
                                        <div class="slider-item_inner">
                                            <div class="slider-item_img">
                                                <img src={svg[item.icon]} alt={item.title}></img>
                                            </div>
                                            <p>{item.title}</p>
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