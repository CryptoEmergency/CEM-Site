import {
    jsx,
    jsxFrag,
    init,
    load,
    Variable,
    initReload
} from "@betarost/cemserver/cem.js";

import { fn } from '@src/functions/index.js';
import svg from "@assets/svg/index.js";
import images from "@assets/images/index.js";

const bookList = [
    {
        id: 1,
        name: "Книга Dangerous",
        price: 15,
        image: "book/book1",
        active: false,
        type: "memory"
    },
    {
        id: 2,
        name: "Книга Роберт",
        price: 17,
        image: "book/book2",
        type: "novels"
    },
    {
        id: 3,
        name: "Книга Питер Линч",
        price: 11,
        image: "book/book3",
        type: "story"
    },
    {
        id: 4,
        name: "Технология Блокчейн и NFT",
        price: 10,
        image: "book/book4",
        type: "story memory"
    },
    {
        id: 5,
        name: "Книга о Криптовалюте",
        price: 14,
        image: "book/book5",
        type: "novels story"
    }
]


const showBook = function (Static) {
    if (Static.activeFilter == "All") {

        return bookList.filter((item, index) => {
            if (Static.filterCategories.length == 0) {
                return true
            } else {
                let haveCat = false
                for (let tmp of Static.filterCategories) {
                    if (item.type.includes(tmp)) {
                        haveCat = true
                    }
                }
                if (haveCat) {
                    return true
                }
            }
        }).map((item) => {

            return (
                <div
                    class={["list-item", Static.activeBook == item.id ? "active" : null]}
                    onclick={() => {
                        Static.activeBook = item.id
                        initReload()
                    }}>

                    <img src={images[item.image]} class="list-item_image"></img>

                    <h3 class="list-subtitle">{item.name}</h3>
                    <div class="buy-box">
                        <div class="buy-btn">
                            <span class="buy-text">buy</span>
                            <div class="buy-icon">
                                <img src={svg["book/cart"]}></img>
                            </div>
                        </div>
                        <span class="buy-price">{item.price}$</span>
                    </div>
                </div>
            )

        })
    } else {
        if (!Static.bookSort) {
            Static.bookSort = bookList.slice(0).sort(function (a, b) {
                return a.price - b.price
            })
        }

        return Static.bookSort.filter((item, index) => {
            if (Static.filterCategories.length == 0) {
                return true
            } else {
                let haveCat = false
                for (let tmp of Static.filterCategories) {
                    if (item.type.includes(tmp)) {
                        haveCat = true
                    }
                }
                if (haveCat) {
                    return true
                }
            }
        }).map((item) => {
            return (
                <div
                    class={["list-item", Static.activeBook == item.id ? "active" : null]}
                    onclick={() => {
                        Static.activeBook = item.id
                        initReload()
                    }}>
                    <img src={images[item.image]} class="list-item_image"></img>
                    <h3 class="list-subtitle">{item.name}</h3>
                    <div class="buy-box">
                        <div class="buy-btn">
                            <span class="buy-text">buy</span>
                            <div class="buy-icon">
                                <img src={svg["book/cart"]}></img>
                            </div>
                        </div>
                        <span class="buy-price">{item.price}$</span>
                    </div>
                </div>
            )

        })


    }

}


const start = function (data, ID) {

    let [Static] = fn.GetParams({ data, ID })
    Static.activeBook = null
    Static.activeFilter = "All"
    Static.filterCategories = []

    load({
        ID,
        fnLoad: async () => {
        },
        fn: () => {
            return (
                <div class="book book_container c-main__body">
                    <div class="book-inner">
                        <h1 class="book-title">Book store</h1>
                        <div class="book-content">
                            <div class="book-filter_main">
                                <div class="filter-inner">
                                    <form class="filter-search">
                                        <img src={svg["book/search"]} class="filter-search_icon"></img>
                                        <input type="search" class="search" placeholder="Search book"></input>

                                    </form>
                                    <div class="filter-dropdowns">
                                        <div>
                                            <h5 class="filter-subtitle">Popular Categories</h5>
                                            <div
                                            // onclick={()=>{
                                            //     Static.bookist = b
                                            // }}
                                            >
                                                <input type="checkbox" class="custom-checkbox" id="memory" name="memory"></input>
                                                <label
                                                    for="memory"
                                                    class="filter-item"
                                                    onclick={() => {
                                                        if (Static.filterCategories.includes("memory")) {
                                                            Static.filterCategories.splice(Static.filterCategories.indexOf("memory"), 1)
                                                        } else {
                                                            Static.filterCategories.push("memory");
                                                        }
                                                        console.log(Static.filterCategories)
                                                        initReload()
                                                    }}
                                                >
                                                    Memory books</label>
                                            </div>
                                            <div>
                                                <input type="checkbox" class="custom-checkbox" id="novels" name="novels"></input>
                                                <label
                                                    for="novels"
                                                    class="filter-item"
                                                    onclick={() => {
                                                        if (Static.filterCategories.includes("novels")) {
                                                            Static.filterCategories.splice(Static.filterCategories.indexOf("novels"), 1)
                                                        } else {
                                                            Static.filterCategories.push("novels");
                                                        }
                                                        console.log(Static.filterCategories)
                                                        initReload()
                                                    }}
                                                >
                                                    Novels</label>
                                            </div>
                                            <div>
                                                <input type="checkbox" class="custom-checkbox" id="story" name="story"></input>
                                                <label
                                                    for="story"
                                                    class="filter-item"
                                                    onclick={() => {
                                                        if (Static.filterCategories.includes("story")) {
                                                            Static.filterCategories.splice(Static.filterCategories.indexOf("story"), 1)
                                                        } else {
                                                            Static.filterCategories.push("story");
                                                        }
                                                        console.log(Static.filterCategories)
                                                        initReload()
                                                    }}
                                                >
                                                    Story books</label>
                                            </div>
                                        </div>
                                    </div>
                                    <button
                                        class="filter-btn"
                                        onclick={() => {
                                            Static.filterCategories.length = 0
                                            initReload()
                                            console.log(Static.filterCategories)
                                        }}
                                    >
                                        <div>Clear the filter</div>
                                    </button>
                                </div>
                            </div>
                            <div class="book-list">
                                <div class="list-top">
                                    <h2 class="list-title">Business Books</h2>

                                    <div class="list-filter">
                                        <span
                                            class={["filter-item", Static.activeFilter == "All" ? "active" : null]}
                                            onclick={() => {
                                                Static.activeFilter = "All"
                                                initReload()
                                            }}
                                        >All</span>
                                        <span
                                            class={["filter-item", Static.activeFilter == "Price" ? "active" : null]}
                                            onclick={() => {
                                                Static.activeFilter = "Price"
                                                initReload()
                                            }}
                                        >Price</span>
                                    </div>
                                </div>

                                <div class="list-books">
                                    {showBook(Static)}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )
        }
    })
}

export default start;
