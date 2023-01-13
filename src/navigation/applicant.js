import {
    jsx,
    jsxFrag,
    init
} from "@betarost/cemjs";
import images from "@assets/images/index.js";

const booksCatalog = [
    {img: images["books/books_catalog-1"], name: "Dangerous games with derivatives", cost: 20},
    {img: images["books/books_catalog-2"], name: "Hoolinomics", cost: 16},
    {img: images["books/books_catalog-3"], name: "Rich Dad, Poor Dad", cost: 24},
    {img: images["books/books_catalog-4"], name: "Cryptomatics", cost: 15},
    {img: images["books/books_catalog-5"], name: "The Peter Lynch Method", cost: 28},
    {img: images["books/books_catalog-6"], name: "Blockchain and NFT Technology", cost: 18},
    {img: images["books/books_catalog-7"], name: "The Book about Cryptocurrency № 1", cost: 20},
    {img: images["books/books_catalog-8"], name: "Blockchain. Principles and fundamentals", cost: 16},
    {img: images["books/books_catalog-9"], name: "Rich Dad, Poor Dad", cost: 24},
    {img: images["books/books_catalog-10"], name: "Inputs and outputs", cost: 22},
    {img: images["books/books_catalog-11"], name: "Options: Volatility and valuation", cost: 18},
    {img: images["books/books_catalog-12"], name: "Financial planning", cost: 16}
]

const categoryPopular = [
    {category: "Memory books", id: "memory-popular", checked: false},
    {category: "Novels", id: "novels-popular", checked: false},
    {category: "Story books", id: "story-popular", checked: false},
    {category: "Business Books", id:"businnes-popular", checked: true},
    {category: "Poetry books", id: "poetry-popular", checked: false},
    {category: "Biography books", id: "biography-popular", checked: false},
    {category: "Religious books", id: "religious-popular", checked: false},
    {category: "Knowledge books", id: "knowledge-popular", checked: false},
    {category: "Children's books", id: "children-popular's", checked: false}
]

const categoryNew = [
    {category: "Memory books", id: "memory-new", checked: false},
    {category: "Novels", id: "novels-new", checked: false},
    {category: "Story books", id: "story-new", checked: false},
    {category: "Business Books", id:"businnes-new", checked: true},
    {category: "Poetry books", id: "poetry-new", checked: false},
    {category: "Biography books", id: "biography-new", checked: false},
    {category: "Religious books", id: "religious-new", checked: false},
    {category: "Knowledge books", id: "knowledge-new", checked: false},
    {category: "Children's books", id: "children's-new", checked: false}
]

const start = function (data, ID) {

    const selected = categoryPopular.map(function (item) {
        if (item.checked === true) {
            return item.category;
        }
    })

    init(
    async () => {
    
    },
        () => {
            return (
                <div class="blog_page_container c-main__body">
                    <div class="books">
                        <h2>Book store</h2>
                        <div class="books_container">
                            <div class="books-filter">
                                <input class="books-filter-search" placeholder="Search book" type="text" />
                                <div class="books-filter-container">
                                    <div class="books-filter-subtitle books-filter-popular">
                                        <span>popular categories</span>
                                        <div class="books-filter-select">
                                            <div class="books-filter-select-title">{selected}</div>
                                            <div class="books-filter-list">
                                                {categoryPopular.map(function (item) {
                                                    return (
                                                        <div class="books_checkbox">
                                                            <input class="checkbox_input" type="checkbox" id={item.id} checked={item.checked} />
                                                            <label class="checkbox_label" for={item.id}>
                                                                {item.category}
                                                            </label>
                                                        </div>
                                                    )
                                                })}
                                            </div>
                                        </div>
                                    </div>
                                    <div class="books-filter-subtitle books-filter-new">
                                        <span>new books categories</span>
                                        <div class="books-filter-select">
                                            <div class="books-filter-select-title">{selected}</div>
                                            <div class="books-filter-list">
                                                {categoryNew.map(function (item) {
                                                    return (
                                                        <div class="books_checkbox">
                                                            <input class="checkbox_input" type="checkbox" id={item.id} checked={item.checked} />
                                                            <label class="checkbox_label" for={item.id}>
                                                                {item.category}
                                                            </label>
                                                        </div>
                                                    )
                                                })}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <button class="books-filter-button">
                                    <span>Clear the filter</span>
                                </button>
                            </div>
                            <div class="books-catalog">
                                <div class="books-catalog-sorting">
                                    <h3>Business Books</h3>
                                    <div class="books-sorting">
                                        <div class="books-sorting-popular books-sorting-active">Popular</div>
                                        <div class="books-sorting-new">New</div>
                                    </div>
                                </div>
                                <div class="books-catalog-list">
                                    {booksCatalog.map(function (item) {
                                        return (
                                            <div class="books-catalog-item">
                                                <img src={item.img} />
                                                <div class="books-description">
                                                    <p class="books-title">{item.name}</p>
                                                    <div class="books-price">
                                                        <div class="books-buy">
                                                            <span>buy</span>
                                                        </div>
                                                        <span class="books-cost">{item.cost}$</span>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )
        }, ID
    );
};
export default start;
