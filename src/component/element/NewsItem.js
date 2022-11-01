import {
    jsx,
    jsxFrag,
    Variable,
    Helpers
} from "@betarost/cemjs";

import svg from "@assets/svg/index.js";

const NewsItem = function ({ item, type }) {

    return (
        <div class="blog_news_item"
        // onClick={async () => {
        //     Variable.SetModals({
        //         name: "ModalFullSize",
        //         data: { item: item, type: type },
        //     });
        // }}
        >
            <a
                href={`/${type}/show/${item._id}`}
                onclick={(e) => { Helpers.siteLinkModal(e, { title: Variable.lang.a.blog }) }} >
                <img src={"/assets/upload/news/" + item.image} />
                <p class="blog_new_title">{item.title}</p>
                <span class="blog_new_text">{Helpers.sliceString(item.preview, 215)}</span>
                <div
                    style="display: flex!important;"
                    class="blog_post_stat"
                >
                    <span>
                        <img src={svg["question_views"]} />
                        {item.statistic.view}
                    </span>
                    <span>
                        <img src={svg["question_answers"]} />
                        {item.statistic.comments}
                    </span>
                    <span>{Helpers.getDateFormat(item.showDate)}</span>
                </div>
            </a>
        </div>
    )
}

export { NewsItem }