import {
    jsx,
    jsxFrag,
    init,
    Variable,
    initReload,
} from "@betarost/cemjs";
import svg from "@assets/svg/index.js";
import images from "@assets/images/index.js";
//await sendApi.create("getPress", data)
const start = function () {
    return null
    let pressList, count, sortBy, sortType

    Variable.HeaderShow = true
    Variable.FooterShow = true

    const worldPressList = function () {
        // console.log("pressList", pressList)
        const pressListItems = pressList.list_records.map(function (key) {
            return (
                <a href="{{link}}" class="world_publications_list_grid world_publications_list_item">
                    <div><img src="/assets/upload/worldPress/{{icons}}" />{key.name}</div>
                    <div>{key.readers}</div>
                    <div>{key.score}</div>
                </a>
            )
        })
        return (
            <div class="world_publications_list_items">
                <div>
                    {pressListItems}
                </div>
                <a style={pressList.list_records.length === pressList.totalFound ? "display: none" : 'display: flex'} class="btn-view-all-a">
                    <div class="btn-view-all" onclick={loadNewPress} data-type="world_publications" data-total="">
                        <div>{Variable.lang.button.show_all}</div>
                    </div>
                </a>
            </div>
        )

    }

    const loadNewPress = async function () {
        count++
        let tmp = await getWorldPress(count, sortBy, sortType)
        pressList.list_records.push(...tmp.list_records)
        initReload();
    }

    const sortWorldPress = async function () {
        count = 0
        sortBy = this.dataset.type
        this.dataset.filter = -Number(this.dataset.filter)
        sortType = Number(this.dataset.filter)
        let tmp = await getWorldPress(count, sortBy, sortType)
        pressList.list_records = tmp.list_records
        initReload();
    }

    init(
        async () => {
            count = 0
            sortBy = 'score'
            sortType = -1
            pressList = await getWorldPress()
        },
        () => {

            return (
                <div class={`${Variable.HeaderShow ? "c-main__body" : "c-main__body--noheader"}`}>
                    <div class="page-content">
                        <div class="world_publications_block">
                            <div class="world_publications_header">
                                <h3>{Variable.lang.h.list_world_publications}</h3>
                                <div>
                                    <div data-language={Variable.lang.lang} data-language_code={Variable.lang.code} class="alt_language_change" data-action="worldPublicationsFilterLanguage">
                                        {Variable.lang.lang_orig}
                                    </div>
                                </div>
                            </div>
                            <div data-role="1" class="world_publications_list">
                                <div class="world_publications_list_grid world_publications_list_title">
                                    <div><span onclick={sortWorldPress} data-filter="1" data-type="name" class="clacable_stat_toggle">{Variable.lang.text.publication_title} <img src={svg['sort_toggle_arrows']} /></span></div>
                                    <div style="text-align: center;"><span onclick={sortWorldPress} data-filter="1" data-type="readers" class="clacable_stat_toggle">{Variable.lang.text.viewers} <img src={svg['sort_toggle_arrows']} /></span></div>
                                    <div style="text-align: center;"><span onclick={sortWorldPress} data-filter="1" data-type="score" class="clacable_stat_toggle">{Variable.lang.tableTitle.rank} <img src={svg['sort_toggle_arrows']} /></span></div>
                                </div>
                                {worldPressList()}
                            </div>
                        </div>
                    </div>
                </div>
            )
        }
    )
};


export default start;