import {
    jsx,
    jsxFrag,
    Variable,
    initReload,
    initOne,
    sendApi,
    Static,
    CEM
} from '@betarost/cemserver/cem.js';

import { MediaButton, Input } from '@elements/element/index.js';

const { images, svg, fn } = CEM


function roadMapStep(Static) {

    let stage = 1
    if (Static.step == 2) {
        stage = 4
    }

    if (Static.step == 3) {
        stage = 2
    }

    if (Static.step == 4) {
        stage = 5
    }

    if (Static.step == 5) {
        stage = 3
    }

    if (Static.step == 6) {
        stage = 6
    }

    Static.RoadStep["s" + stage].date = Static.roadDate.value
    Static.RoadStep["s" + stage].desc = Static.roadDesc.value
    Static.RoadStep["s" + stage].stat = Static.roadStatus.value

    Static.roadDate.value = ""
    Static.roadDate.el.value = ""
    Static.roadDesc.value = ""
    Static.roadDesc.el.value = ""
    Static.roadStatus.value = ""
    Static.roadStatus.el.value = ""
    if (Static.step <= 5) {
        Static.step++
    }


    initReload()


}

function addSocialNetworkDiv(elem) {
    let div = '<div style="background:none" class="startup_page_table_row settings_list_item_active"><div>Add social network:</div><p class="settings_list_title" onClick="this.closest(\'div\').remove()"></p><div contenteditable="true" style="margin-top:5px;" data-placeholder="enter social network" class="pl soc"></div></div>'


    elem.insertAdjacentHTML('afterend', div);

}




const BlockUserStartupPage = function ({ Static, settingsPage }) {

    let action = ''
    let socials
    let hide

    if (settingsPage == "createstartUP" || settingsPage == "editstartUP") {
        action = true
        hide = 'hidden'
    }

    if (Static.StartUPData.Title) {
        Static.Title = Static.StartUPData.Title
    }
    else {
        Static.Title = {}
    }

    if (Static.StartUPData.Ticker) {
        Static.Ticker = Static.StartUPData.Ticker
    }
    else {
        Static.Ticker = {}
    }

    if (Static.StartUPData.BlNetwork) {
        Static.StartUPData.BlNetwork = Static.StartUPData.BlNetwork
    }
    else {
        Static.BlNetwork = {}
    }

    if (Static.StartUPData.TotalTOken) {
        Static.TotalTOken = Static.StartUPData.TotalTOken
    }
    else {
        Static.TotalTOken = {}
    }

    if (Static.StartUPData.Evaluation) {
        Static.Evaluation = Static.StartUPData.Evaluation
    }
    else {
        Static.Evaluation = {}
    }

    if (Static.StartUPData.MarketCap) {
        Static.MarketCap = Static.StartUPData.MarketCap
    }
    else {
        Static.MarketCap = {}
    }

    if (Static.StartUPData.Ido) {
        Static.Ido = Static.StartUPData.Ido
    }
    else {
        Static.Ido = {}
    }

    if (Static.StartUPData.Price) {
        Static.Price = Static.StartUPData.Price
    }
    else {
        Static.Price = {}
    }

    if (Static.StartUPData.Allocation) {
        Static.Allocation = Static.StartUPData.Allocation
    }
    else {
        Static.Allocation = {}
    }

    if (Static.StartUPData.Logo) {
        Static.Logo = Static.StartUPData.Logo
    }
    else {
        Static.Logo = images["banners/ecosystem"]
    }

    if (Static.StartUPData.WebSite.length > 0) {

        Static.WebSite = Static.StartUPData.WebSite

    }
    else {
        Static.WebSite = {}
    }

    if (Static.StartUPData.Socials.network.length > 0) {
        Static.Socials = Static.StartUPData.Socials

        socials = Static.Socials.network.map(function (network, i) {
            return (



                <a href="" class="startup_page_contact_container">
                    <div class="startup_page_contact_icon">
                        <img src="/assets/img/web_icon.svg" />
                    </div>
                    <p class="startup_page_contact_name">{network}</p>
                </a>)
        })
    }
    else {
        Static.Socials = {}

    }

    if (Static.StartUPData.ShortDesc) {
        Static.ShortDesc = Static.StartUPData.ShortDesc
    }
    else {
        Static.ShortDesc = {}
    }

    if (Static.StartUPData.Desc) {
        Static.Desc = Static.StartUPData.Desc
    }
    else {
        Static.Desc = {}
    }

    if (Static.StartUPData.RoadMap) {
        Static.RoadMap = Static.StartUPData.RoadMap
    }
    else {
        Static.RoadMap = {}
    }

    if (Static.StartUPData.Video) {
        Static.Video = Static.StartUPData.Video
    }
    else {
        Static.Video = {}
    }

    if (Static.StartUPData.Video) {
        Static.Video = Static.StartUPData.Video
    }
    else {
        Static.Video = {}
    }

    if (Static.StartUPData.Team) {
        Static.Team = Static.StartUPData.Team
    }
    else {
        Static.Team = {}
    }





    if (!Static && (settingsPage != "startUP" || settingsPage != "createstartUP" || settingsPage != "editstartUP")) {
        return (<></>)
    }




    initOne(
        () => {

            Static.step = 1

            Static.RoadStep = {
                s1: { date: "", desc: "", stat: "" },
                s2: { date: "", desc: "", stat: "" },
                s3: { date: "", desc: "", stat: "" },
                s4: { date: "", desc: "", stat: "" },
                s5: { date: "", desc: "", stat: "" },
                s6: { date: "", desc: "", stat: "" }
            }
            Static.roadDate = {}
            Static.roadDesc = {}
            Static.roadStatus = {}
        }
    )

    return (
        <div class="settings_body_item">
            <div class="settings_body_item_chapter">
                {<div class="startup_page_container">
                    <div class="startup_page">
                        <div class="startup_page_block-1">
                            <div class="startup_page_preview">
                                <img style="border:1px solid #9844b7;border-radius: 10px" height="200px" width="400px" src={Static.Logo} />

                                <MediaButton
                                    onclickPhoto={function () {
                                        if (this.files.length == 0) {
                                            return;
                                        }

                                        Variable.SetModals({
                                            name: "ModalCropImage",
                                            data: {
                                                file: this.files[0],
                                                typeUpload: 'answers',
                                                arrMedia: formInputs.mediaInputs.value,
                                                aspectSelect: formInputs.mediaInputs.selectAspect,
                                                uploadCropImage: async function (cropper) {
                                                    await sendPhoto(cropper)
                                                    return;
                                                }
                                            },
                                        }, true);
                                        this.value = '';
                                    }}

                                />
                                <br />
                                <div class="startup_page_table_row">
                                    <div>
                                        Website:
                                    </div>
                                    <div contenteditable={action} data-placeholder="enter website" class="pl" oninput={function () {
                                        Static.WebSite = this.textContent

                                    }}>
                                        {Static.WebSite}
                                    </div>
                                </div>
                                <div hidden={hide}>
                                    <div class="startup_page_table_row">
                                        <div >
                                            Add social network:
                                        </div>

                                        <p class="settings_list_title" onClick={function () { addSocialNetworkDiv(Static.social) }}></p>

                                        <div contenteditable={action} style="margin-top:5px;" data-placeholder="enter social network" class="pl soc">
                                        </div>

                                    </div>
                                </div>
                                <div Element={($el) => { Static.social = $el }} class="social">

                                </div>
                                <div class="startup_page_contacts">
                                    {socials}
                                </div>
                                <p class="startup_page_short_description">
                                    Короткое описание:

                                </p>

                                <div style="width:400px" contenteditable={action} data-placeholder="enter text" class="pl" oninput={function () {
                                    Static.ShortDesc = this.textContent

                                }}>
                                    {Static.ShortDesc}
                                </div>
                            </div>
                            <div class="startup_page_table">
                                <label>Название</label>
                                <div contenteditable={action} data-placeholder="enter text" class="pl startup_page_startup_title" oninput={function () {
                                    Static.Title = this.textContent

                                }}>
                                    {Static.Title}


                                </div>
                                <div class="startup_page_table_title">Key indicators</div>
                                <div class="startup_page_table_row">
                                    <div>
                                        Ticker:
                                    </div>
                                    <div contenteditable={action} data-placeholder="enter text" class="pl" oninput={function () {
                                        Static.Ticker = this.textContent

                                    }}>
                                        {Static.Ticker}
                                    </div>
                                </div>
                                <div class="startup_page_table_row">
                                    <div>
                                        Blockchain Network:
                                    </div>
                                    <div contenteditable={action} data-placeholder="enter text" class="pl" oninput={function () {
                                        Static.BlNetwork = this.textContent

                                    }}>
                                        {Static.BlNetwork}
                                    </div>
                                </div>
                                <div class="startup_page_table_row">
                                    <div>
                                        Total tokens issued:
                                    </div>
                                    <div contenteditable={action} data-placeholder="enter text" class="pl" oninput={function () {
                                        Static.TotalTOken = this.textContent

                                    }}>
                                        {Static.TotalTOken}
                                    </div>
                                </div>
                                <div class="startup_page_table_row">
                                    <div>
                                        Initial evaluation of the project
                                    </div>
                                    <div contenteditable={action} data-placeholder="enter text" class="pl" oninput={function () {
                                        Static.Evaluation = this.textContent

                                    }}>
                                        {Static.Evaluation}

                                    </div>
                                </div>
                                <div class="startup_page_table_row">
                                    <div>
                                        Initial market Capitalization
                                    </div>
                                    <div contenteditable={action} data-placeholder="enter text" class="pl" oninput={function () {
                                        Static.MarketCap = this.textContent

                                    }}>
                                        {Static.MarketCap}

                                    </div>
                                </div>
                                <div class="startup_page_table_row">
                                    <div>
                                        IDO sale
                                    </div>
                                    <div contenteditable={action} data-placeholder="enter text" class="pl" oninput={function () {
                                        Static.Ido = this.textContent

                                    }}>
                                        {Static.Ido}
                                    </div>
                                </div>
                                <div class="startup_page_table_row">
                                    <div>
                                        Price
                                    </div>
                                    <div contenteditable={action} data-placeholder="enter text" class="pl" oninput={function () {
                                        Static.Price = this.textContent

                                    }}>
                                        {Static.Price}

                                    </div>
                                </div>
                                <div class="startup_page_table_row">
                                    <div>
                                        Allocation
                                    </div>
                                    <div contenteditable={action} data-placeholder="enter text" class="pl" oninput={function () {
                                        Static.Allocation = this.textContent

                                    }}>
                                        {Static.Allocation}


                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="startup_page_block-2">

                            <p class="project_overview_title">PROJECT OVERVIEW: <br /></p>
                            <p>

                                <div class="startup_page_table_row">
                                    <div>
                                        Description
                                    </div>
                                    <div contenteditable={action} data-placeholder="enter text" class="pl" oninput={function () {
                                        Static.Desc = this.textContent

                                    }}>
                                        {Static.Desc}

                                    </div>
                                </div>
                            </p>
                        </div>
                        <div class="startup_page_block-3">
                            <label>Step {Static.step}</label>
                            <div class="container-input">
                                <div style="width:400px" class="complain_modal">
                                    <label>Дата старта</label>
                                    <input
                                        type="text"
                                        class="input-div"
                                        value={Static.roadDate.value}
                                        oninput={function () { Static.roadDate.value = this.value }}
                                        Element={($el) => { Static.roadDate.el = $el }}
                                    />
                                    <label>Описание</label>
                                    <input
                                        type="text"
                                        class="input-div"
                                        value={Static.roadDesc.value}
                                        oninput={function () { Static.roadDesc.value = this.value }}
                                        Element={($el) => { Static.roadDesc.el = $el }}
                                    />
                                    <label>Статус</label>
                                    <input
                                        type="text"
                                        class="input-div"
                                        value={Static.roadStatus.value}
                                        oninput={function () { Static.roadStatus.value = this.value }}
                                        Element={($el) => { Static.roadStatus.el = $el }}
                                        placeholder="В работе"
                                    />
                                    <div class={["registration-btn"]}>
                                        <a class="btn-gr-reg" onclick={() => {

                                            roadMapStep(Static)


                                        }}

                                        >
                                            <span>Создать</span>
                                        </a>
                                    </div>
                                </div>
                            </div>
                            <div class="c-aboutus__roadmap">
                                <h2>{Variable.lang.h.road_map}</h2>
                                <div class="c-aboutus__wrapper">
                                    <div class="c-aboutus__toppart">
                                        <div class="c-aboutus__dateitem c-aboutus__dateitem--1">
                                            <p contenteditable={action} oninput={function () { Static.RoadStep.s1.date = this.textContent }}>{Static.RoadStep.s1.date}</p>
                                            <span contenteditable={action} oninput={function () { Static.RoadStep.s1.desc = this.textContent }}>{Static.RoadStep.s1.desc}</span>
                                            <span contenteditable={action} oninput={function () { Static.RoadStep.s1.stat = this.textContent }}>{Static.RoadStep.s1.stat}</span>
                                        </div>
                                        <div class="c-aboutus__dateitem c-aboutus__dateitem--2">
                                            <p contenteditable={action} oninput={function () { Static.RoadStep.s2.date = this.textContent }}>{Static.RoadStep.s2.date}</p>
                                            <span contenteditable={action} oninput={function () { Static.RoadStep.s2.desc = this.textContent }}>{Static.RoadStep.s2.desc}</span>
                                            <span contenteditable={action} oninput={function () { Static.RoadStep.s2.stat = this.textContent }}>{Static.RoadStep.s2.stat}</span>
                                        </div>
                                        <div class="c-aboutus__dateitem c-aboutus__dateitem--3">
                                            <p contenteditable={action} oninput={function () { Static.RoadStep.s3.date = this.textContent }}>{Static.RoadStep.s3.date}</p>
                                            <span contenteditable={action} oninput={function () { Static.RoadStep.s3.desc = this.textContent }}>{Static.RoadStep.s3.desc}</span>
                                            <span contenteditable={action} oninput={function () { Static.RoadStep.s3.stat = this.textContent }}>{Static.RoadStep.s3.stat}</span>
                                        </div>
                                    </div>
                                    <img class="c-aboutus__axis" src={images["road_map"]} />
                                    <div class="c-aboutus__bottompart">
                                        <div class="c-aboutus__dateitem c-aboutus__dateitem--4">
                                            <p contenteditable={action} oninput={function () { Static.RoadStep.s4.date = this.textContent }}>{Static.RoadStep.s4.date}</p>
                                            <span contenteditable={action} oninput={function () { Static.RoadStep.s4.desc = this.textContent }}>{Static.RoadStep.s4.desc}</span>
                                            <span contenteditable={action} oninput={function () { Static.RoadStep.s4.stat = this.textContent }}>{Static.RoadStep.s4.stat}</span>
                                        </div>
                                        <div class="c-aboutus__dateitem c-aboutus__dateitem--5">
                                            <p contenteditable={action} oninput={function () { Static.RoadStep.s5.date = this.textContent }}>{Static.RoadStep.s5.date}</p>
                                            <span contenteditable={action} oninput={function () { Static.RoadStep.s5.desc = this.textContent }}>{Static.RoadStep.s5.desc}</span>
                                            <span contenteditable={action} oninput={function () { Static.RoadStep.s5.stat = this.textContent }}>{Static.RoadStep.s5.stat}</span>
                                        </div>
                                        <div class="c-aboutus__dateitem c-aboutus__dateitem--6">
                                            <p contenteditable={action} oninput={function () { Static.RoadStep.s6.date = this.textContent }}>{Static.RoadStep.s6.date}</p>
                                            <span contenteditable={action} oninput={function () { Static.RoadStep.s6.desc = this.textContent }}>{Static.RoadStep.s6.desc}</span>
                                            <span contenteditable={action} oninput={function () { Static.RoadStep.s6.stat = this.textContent }}>{Static.RoadStep.s6.stat}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <h2>Promo video</h2>
                        <div class="startup_page_block-4">
                            <div class="startup_page_table_row">
                                <div>
                                    Promo video
                                </div>
                                <div contenteditable="true" data-placeholder="enter youtube href" class="pl" oninput={function () {
                                    Static.Video = this.textContent

                                }}>
                                    {Static.Video}

                                </div>
                            </div>
                            <iframe id="startupVideoPlayer" width="100%" height="585px" src="https://www.youtube.com/embed/ANjAvbRkTes" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                        </div>
                        <div class="startup_page_block-5">
                            <h2>Tokenomics</h2>
                            <div class="startup_charts_block">
                                <div class="startup_first_chart_block">
                                    <div class="startup_gradient_border">
                                        <div class="startup_chart_container">
                                            <p>Fund distribution <img src="/assets/img/alert_icon.svg" /></p>
                                            <div class="startup_chart_block">
                                                <div id="startupChartContainer">
                                                    <canvas id="startupChart">

                                                    </canvas>
                                                </div>
                                                <div id="startup_chart_info">
                                                    <div class="startup_chart_info_color" style="background: rgb(86, 156, 255);"></div><p><b>120</b><br /> million Tokens</p><br />
                                                    <div class="startup_chart_info_color" style="background: rgb(239, 56, 255);"></div><p><b>-</b><br /> Token sale</p><br />
                                                    <div class="startup_chart_info_color" style="background: rgb(244, 174, 69);"></div><p><b>$2,940,000</b><br /> Soft Cap</p><br />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="startup_gradient_border">
                                    <div class="startup_chart_container">
                                        <p>Token distribution <img src="/assets/img/alert_icon.svg" /></p>
                                        <div class="startup_chart_wrapper">
                                            <div class="startup_chart_inner">
                                                <div style="left: 0%;" class="startup_chart_percent">
                                                    0%
                                                </div>
                                                <div style="left: 10%;" class="startup_chart_percent">
                                                    10%
                                                </div>
                                                <div style="left: 40%;" class="startup_chart_percent">
                                                    40%
                                                </div>
                                                <div style="left: 75%;" class="startup_chart_percent">
                                                    75%
                                                </div>
                                                <div style="left: 100%;" class="startup_chart_percent">
                                                    100%
                                                </div>
                                            </div>
                                        </div>
                                        <div class="startup_chart_inner_chart">
                                            <div style="left: 0%;" class="startup_chart_line"> </div>
                                            <div style="left: 10%;" class="startup_chart_line"> </div>
                                            <div style="left: 40%;" class="startup_chart_line"> </div>
                                            <div style="left: 75%;" class="startup_chart_line"> </div>
                                            <div style="left: 100%;" class="startup_chart_line"> </div>
                                            <div style="background: #B558F6;" class="startup_chart_item">
                                                <div class="startup_chart_item_percent" data-title="Marketing">5%</div>
                                            </div>
                                            <div style="background: #29CB97;" class="startup_chart_item">
                                                <div class="startup_chart_item_percent" data-title="Ecosystem Incentives">30%</div>
                                            </div>
                                            <div style="background: #DADADA;" class="startup_chart_item">
                                                <div class="startup_chart_item_percent" data-title="Seed Round">10%</div>
                                            </div>
                                            <div style="background: #F4AE45;" class="startup_chart_item">
                                                <div class="startup_chart_item_percent" data-title="Private Sale">15%</div>
                                            </div>
                                            <div style="background: #EF38FF;" class="startup_chart_item">
                                                <div class="startup_chart_item_percent" data-title="Initial Liquidity and Liquidity Incentives">15%</div>
                                            </div>
                                            <div style="background: #4072EE;" class="startup_chart_item">
                                                <div class="startup_chart_item_percent" data-title="Team & Development">19%</div>
                                            </div>
                                            <div style="background: #e62f2f;" class="startup_chart_item">
                                                <div class="startup_chart_item_percent" data-title="Partner & Advisors">6%</div>
                                            </div>
                                        </div>
                                        <div class="startup_chart_inner_chart_legend">

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="our_team">
                            <h2>Our team</h2>
                            <div class="our_team_block">
                                <MediaButton
                                    onclickPhoto={function () {
                                        if (this.files.length == 0) {
                                            return;
                                        }

                                        Variable.SetModals({
                                            name: "ModalCropImage",
                                            data: {
                                                file: this.files[0],
                                                typeUpload: 'answers',
                                                arrMedia: formInputs.mediaInputs.value,
                                                aspectSelect: formInputs.mediaInputs.selectAspect,
                                                uploadCropImage: async function (cropper) {
                                                    await sendPhoto(cropper)
                                                    return;
                                                }
                                            },
                                        }, true);
                                        this.value = '';
                                    }}

                                />
                            </div>

                            <div class="our_team_watch_all_container" onClick={function () {

                                let y = document.getElementsByClassName('soc');
                                let sNetwork = []
                                for (let i = 0; i < y.length; i++) {
                                    sNetwork.push(y[i].textContent)
                                }
                                Static.Socials = sNetwork

                                Static.StartUPData = {}
                                Static.StartUPData.Title = Static.Title
                                Static.StartUPData.Ticker = Static.Ticker
                                Static.StartUPData.BlNetwork = Static.BlNetwork
                                Static.StartUPData.TotalTOken = Static.TotalTOken
                                Static.StartUPData.Evaluation = Static.Evaluation
                                Static.StartUPData.MarketCap = Static.MarketCap
                                Static.StartUPData.Ido = Static.Ido
                                Static.StartUPData.Price = Static.Price
                                Static.StartUPData.Allocation = Static.Allocation
                                Static.StartUPData.Logo = Static.Logo
                                Static.StartUPData.WebSite = Static.WebSite
                                Static.StartUPData.Socials = { network: Static.Socials }
                                Static.StartUPData.ShortDesc = Static.ShortDesc
                                Static.StartUPData.Desc = Static.Desc
                                Static.StartUPData.RoadMap = Static.RoadStep
                                Static.StartUPData.Team = Static.Team

                                Static.StartUPData
                                //  console.log(Static.StartUPData)

                            }}>
                                <div class="our_team_watch_all">
                                    <span class="c-button__text">
                                        отправить заявку
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>}

            </div>
        </div>
    )
}
export { BlockUserStartupPage }

