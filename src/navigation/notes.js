import {
    jsx,
    jsxFrag,
    init
} from "@betarost/cemjs";

const notiesList = [
    {title: "Купить биткоин", date: "20:45"},
    {title: "Посмотреть новости", date: "21:10"}
]

const start = function (data, ID) {

    init(
    async () => {
    
    },
        () => {
            return (
                <div class="blog_page_container c-main__body">
                    <div class="notes">
                        <h2>Notes</h2>
                        <div class="notes_container">
                            <div class="notes-content">
                                <div class="notes-list">
                                    <button class="notes-button">
                                        <span>Новая заметка</span>
                                    </button>
                                    {notiesList.map(function (item) {
                                        return (
                                            <div class="notes-item">
                                                <h3>{item.title}</h3>
                                                <span>{item.date}</span>
                                            </div>
                                        )
                                    })}
                                </div>
                                <div class="notes-content-wrapper">
                                    <input class="notes-input-text" type="text" maxlength="100" autocomplete="off" placeholder="Название" />
                                    <div class="notes-description" contenteditable="true">текст</div>
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
