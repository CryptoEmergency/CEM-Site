import {
    jsx,
    jsxFrag,
    Helpers,
    Variable,
    initOne
} from '@betarost/cemjs';
// poydet
import { api } from '@src/apiFunctions.js'
import svg from '@assets/svg/index.js';

const BlockMainNews = async function () {
    await initOne(
        async () => {
            await api({ type: "get", action: "getNews", short: true, cache: true, name: "MainNews", })
        }
    )
    return (
        <div class="news_block_container">
            <div class="news_block">
                <div class="home_page_news">
                    <a class="crypto_news_link" href="/news/" onclick={(e) => { Helpers.siteLinkModal(e, { title: Variable.lang.a.news }) }}>Crypto News</a>
                    <div class="gradient_line"></div>
                </div>
                <div class="main_page_news_block">
                    {() => {
                        if (Variable.MainNews && Variable.MainNews.list_records && Variable.MainNews.list_records.length) {
                            const arrReturn = Variable.MainNews.list_records.map(function (item, i) {
                                return (
                                    <a
                                        class="blog_news_item"
                                        onclick={(e) => { Helpers.siteLinkModal(e, { title: Variable.lang.a.news, item: item }) }}
                                        href={`/news/show/${item._id}`}
                                    >
                                        <img
                                            style="margin-bottom: 20px"
                                            src={`/assets/upload/news/${item.image}`}
                                        />
                                        <p style="margin-bottom: 20px" class="blog_new_title ">
                                            {item.title}
                                        </p>
                                        <div style="display: flex!important;" class="blog_post_stat">
                                            <span>
                                                <img src={svg.question_views} />
                                                <span class="">{item.statistic.view}</span>
                                            </span>
                                            <span>
                                                <img src={svg.question_answers} />
                                                <span class="">{item.statistic.comments}</span>
                                            </span>
                                            <span class="">{Helpers.getDateFormat(item.showDate)}</span>
                                        </div>
                                    </a>
                                )
                            })
                            return arrReturn
                        }
                    }}
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
export { BlockMainNews }