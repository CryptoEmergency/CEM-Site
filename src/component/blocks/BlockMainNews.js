import {
    jsx,
    jsxFrag,
    Helpers,
    Variable,
    sendApi
} from '@betarost/cemjs';

import svg from '@assets/svg/index.js';

const BlockMainNews = function () {

    return (
        <div class="news_block_container">
            <div class="news_block">
                <div class="home_page_news">
                    <a class="crypto_news_link" href="/news/" onclick={(e) => { Helpers.siteLinkModal(e, { title: Variable.lang.a.news }) }}>Crypto News</a>
                    <div class="gradient_line"></div>
                </div>
                <div class="main_page_news_block">
                    {
                        Variable.MainNews.list_records.map(function (newsItem) {
                            return (
                                <a
                                    class="blog_news_item"
                                    onclick={(e) => { Helpers.siteLinkModal(e, { title: Variable.lang.a.news, item: newsItem }) }}
                                    // onclick={Helpers.siteLink}
                                    href={`/news/show/${newsItem._id}`}
                                // onClick={() => {
                                //     // let news = await sendApi.send({ action: "getNews", short: true, filter: { _id: newsItem._id } });
                                //     // let news = await getNewsItemInShow(newsItem._id);
                                //     // news = news.list_records[0];
                                //     // Variable.SetModals({
                                //     //     name: "ModalFullNews",
                                //     //     data: { news },
                                //     // });
                                //     // let item = news.list_records[0];
                                //         Variable.SetModals({
                                //              name: "ModalFullSize",
                                //              data: { item: newsItem, type: "news" },
                                //          });

                                // }}
                                >
                                    <img
                                        style="margin-bottom: 20px"
                                        src={`/assets/upload/news/${newsItem.image}`}
                                    />
                                    <p style="margin-bottom: 20px" class="blog_new_title ">
                                        {newsItem.title}
                                    </p>
                                    <div style="display: flex!important;" class="blog_post_stat">
                                        <span>
                                            <img src={svg.question_views} />
                                            <span class="">{newsItem.statistic.view}</span>
                                        </span>
                                        <span>
                                            <img src={svg.question_answers} />
                                            <span class="">{newsItem.statistic.comments}</span>
                                        </span>
                                        <span class="">{Helpers.getDateFormat(newsItem.showDate)}</span>
                                    </div>
                                </a>
                            )
                        })
                    }
                </div>
            </div>
            <div class="button-container-preview">
                <a class="btn-news-preview" href="/news/" onclick={(e) => { Helpers.siteLinkModal(e, { title: Variable.lang.a.news }) }}>
                    <span>
                        {Variable.lang.button.allNews}
                    </span>
                </a>
            </div>
        </div>
    )
}
//I check
export { BlockMainNews }