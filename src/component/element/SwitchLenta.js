import {
    jsx,
    jsxFrag,
    Variable,
    sendApi,
    Helpers,
    initReload
} from '@betarost/cemjs';
import images from "@assets/images/index.js";
import svg from "@assets/svg/index.js";

const SwitchLenta = function () {

    return (
        <div class="users_news_categories">
            <div
                class={['users_news_category']}
                hidden={Variable.Static.lentaPage == "all"}
                onClick={async () => {
                    if (Variable.Static.lentaPage == "all") {
                        return
                    }
                    Variable.Static.lentaPage = "all"
                    Variable.PageLentaall = await sendApi.send({
                        action: "getPost", short: true, cache: true, name: "PageLentaall", limit: 15, filter: Helpers.getFilterLenta(Variable.Static.lentaFilters, "all")
                    });
                    initReload()
                }}
            >
                <img src={svg['sections/news_all_inactive']} />
            </div>

            <div
                class={['users_news_category', 'users_news_category_active']}
                hidden={Variable.Static.lentaPage != "all"}
            >
                <img src={svg['sections/news_all']} />
            </div>


            <div
                data-type="photo"
                class={['users_news_category']}
                hidden={Variable.Static.lentaPage == "photo"}
                onClick={async () => {
                    if (Variable.Static.lentaPage == "photo") {
                        return
                    }
                    Variable.Static.lentaPage = "photo"
                    Variable.PageLentaphoto = await sendApi.send({
                        action: "getPost", short: true, cache: true, name: "PageLentaphoto", limit: 15,
                        filter: Helpers.getFilterLenta(Variable.Static.lentaFilters, "photo")
                    });
                    initReload()
                }}
            >
                <img src={svg['sections/news_photo_inactive']} />
            </div>

            <div
                class={['users_news_category', 'users_news_category_active']}
                hidden={Variable.Static.lentaPage != "photo"}
            >
                <img src={svg['sections/news_photo']} />
            </div>



            <div
                data-type="video"
                class={['users_news_category']}
                hidden={Variable.Static.lentaPage == "video"}
                onClick={async () => {
                    if (Variable.Static.lentaPage == "video") {
                        return
                    }
                    Variable.Static.lentaPage = "video"
                    Variable.PageLentavideo = await sendApi.send({
                        action: "getPost", short: true, cache: true, name: "PageLentavideo", limit: 15,
                        filter: Helpers.getFilterLenta(Variable.Static.lentaFilters, "video")
                    });
                    initReload()
                }}
            >
                <img src={svg['sections/news_video_inactive']} />
            </div>

            <div
                class={['users_news_category', 'users_news_category_active']}
                hidden={Variable.Static.lentaPage != "video"}
            >
                <img src={svg['sections/news_video']} />
            </div>


            <div
                data-type="audio"
                class={['users_news_category']}
                hidden={Variable.Static.lentaPage == "audio"}
                onClick={async () => {
                    if (Variable.Static.lentaPage == "audio") {
                        return
                    }
                    Variable.Static.lentaPage = "audio"
                    Variable.PageLentaaudio = await sendApi.send({
                        action: "getPost", short: true, cache: true, name: "PageLentaaudio", limit: 15,
                        filter: Helpers.getFilterLenta(Variable.Static.lentaFilters, "audio")
                    });
                    initReload()
                }}
            >
                <img src={svg['sections/news_audio_inactive']} />
            </div>

            <div
                class={['users_news_category', 'users_news_category_active']}
                hidden={Variable.Static.lentaPage != "audio"}
            >
                <img src={svg['sections/news_audio']} />
            </div>


            <div
                data-type="text"
                class={['users_news_category']}
                hidden={Variable.Static.lentaPage == "text"}
                onClick={async () => {
                    if (Variable.Static.lentaPage == "text") {
                        return
                    }
                    Variable.Static.lentaPage = "text"
                    Variable.PageLentatext = await sendApi.send({
                        action: "getPost", short: true, cache: true, name: "PageLentatext", limit: 15,
                        filter: Helpers.getFilterLenta(Variable.Static.lentaFilters, "text")
                    });
                    initReload()
                }}
            >
                <img src={svg['sections/news_text_inactive']} />
            </div>

            <div
                class={['users_news_category', 'users_news_category_active']}
                hidden={Variable.Static.lentaPage != "text"}
            >
                <img src={svg['sections/news_text']} />
            </div>



        </div>
    )
}

export { SwitchLenta }