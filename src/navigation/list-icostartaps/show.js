import {
  jsx,
  jsxFrag,
  load,
  initReload,
  Variable
} from "@betarost/cemserver/cem.js";
import { fn } from '@src/functions/index.js';
import svg from "@assets/svg/index.js";
import images from "@assets/images/index.js";

// const icoCard = {
//   title: "test",
//   category: { type: String, enum: ['ICO', 'IDO', 'IEO', 'IGO'], default: 'ICO' },
//   description: { type: String },
//   icon: { type: String },
//   cover: { type: String },
//   startDate: { type: Date },
//   endDate: { type: Date },
//   targetMoney: { type: Number },
//   nowMoney: { type: Number },
//   siteLink: { type: String },
//   whitePaperLink: { type: String },
//   name: { type: String },
//   type: { type: String },
//   price: { type: Number },
//   sellType: { type: String },
//   totalSupply: { type: Number },
//   forSell: { type: Number },
//   targetSell: { type: Number },
//   review: { type: String },
//   checked: { type: Boolean, default: false },
//   media: [{
//     type: { type: String },
//     name: { type: String },
//     active: { type: Boolean, default: true },
//     dateCreate: { type: Date, default: Date.now },
//     aspect: { type: Number },
//     previewName: { type: String },
//   }],
//   social: [{
//     channel: { type: String },
//     active: { type: Boolean, default: true },
//     url: { type: String },
//     dateCreate: { type: Date, default: Date.now }
//   }],
// }

const listCalendar = [
  {
    name: "Active",
  },
  {
    name: "Upcoming",
  },
  {
    name: "Ended",
  },
]

const start = function (data, ID) {

  let [Static] = fn.GetParams({ data, ID })
  Variable.Static.FooterShow = false
  // console.log('=7a39ac=', Static, Variable.dataUrl)

  load({
    ID,
    fnLoad: async () => {
      if (!Static.item) {
        Static.item = await fn.restApi.getIco({ filter: { _id: Variable.dataUrl.params }, firstRecord: true })
      }
      console.log(Static.item)
    },
    fn: () => {
      return (
        <div class="ico-container c-main__body">
          <div class="ico-wrapper">
            <div class="ico-card">
              <div class="card-head">
                <div class="card-icon">
                  <img class="card-img_el" src={images["ico/ico1"]}></img>
                </div>
                <div class="card-main_info">
                  <h3>{Static.item.title}</h3>
                  <p class="main-info_desc">{Static.item.description}</p>
                </div>
              </div>

              <div class="card-media">
                <div class="card-img_wrap">
                  <img class="card-img" src={Static.item.cover}></img>
                </div>

                <div class="card-info">
                  <span class="card-info_status">is ended</span>
                  <div class="card-info_summ">
                    <span class="info-summ_obj">${Static.item.nowMoney}</span>
                    <span class="info-summ_done">of</span>
                    <span class="info-summ_done">${`${Static.item.targetMoney} (${Math.round((Static.item.nowMoney * 100) / Static.item.targetMoney)})%`}</span>
                  </div>
                  <button type="button" class="card-btn card-btn_active">
                    <span class="card-btn_text">active</span>
                  </button>
                  <button type="button" class="card-btn">
                    <span class="card-btn_text">passive</span>
                  </button>
                  <div class="info-social">
                    <a href={"https://t.me/cryptoemergencychat"} class="info-social_link">
                      <img src={svg['telegram-icon']}></img>
                    </a>
                    <a href="https://www.youtube.com/channel/UCb9Fx-fNikzs-OZwnTXepLg/" class="info-social_link">
                      <img src={svg['youtube_icon']}></img>
                    </a>
                    <a href="https://twitter.com/cryptoemergency" class="info-social_link">
                      <img src={svg['twitter-icon']}></img>
                    </a>
                    <a href="https://discord.com/invite/Qdm7W8DjYc" class="info-social_link">
                      <img src={svg['discord-icon']}></img>
                    </a>
                    <a href="https://github.com/CryptoEmergency" class="info-social_link">
                      <img src={svg['github-icon2']}></img>
                    </a>
                    <a href="https://vm.tiktok.com/ZSefEMs2c/" class="info-social_link">
                      <img src={svg['tiktok-icon']}></img>
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div class="ico-details">
              <h4>Token Sale: {`${fn.getDateFormat(Static.item.startDate, "time")} - ${fn.getDateFormat(Static.item.startDate, "time")}`}</h4>
              <div class="ico-details_items">
                <p>Name: <span class="details_bold">AITECH</span></p>
                <p>Token type: <span class="details_bold">CEM</span></p>
                <p>ICO Token Price: <span class="details_bold">1 cem = {Static.item.price} USD</span></p>
                <p>Fundraising Goal: <span class="details_bold">{Static.item.targetSell} Token </span></p>
                <p>Total Tokens: <span class="details_bold">{Static.item.totalSupply} token</span></p>
                <p>Available for Token Sale: <span class="details_bold">{Math.round((Static.item.forSell * 100) / Static.item.totalSupply)}%</span></p>
                <p>Accepts: <span class="details_bold">{Static.item.sellType}</span></p>
              </div>

            </div>

            <div class="ico-media">
              <h4>Screenshots</h4>
              <div class="media-wrap">
                <div class="media_item">
                  <div class="media-img">
                    <img src={images["ico/ico1"]}></img>
                  </div>
                  <h5 class="media-item_title">Solidus AI Tech Info</h5>
                </div>
                <div class="media_item">
                  <div class="media-img">
                    <img src={images["ico/ico2"]}></img>
                  </div>
                  <h5 class="media-item_title">Solidus AI Tech Roadmap 1</h5>
                </div>
                <div class="media_item">
                  <div class="media-img">
                    <img src={images["ico/ico3"]}></img>
                  </div>
                  <h5 class="media-item_title">Solidus AI Tech Roadmap 2</h5>
                </div>
                <div class="media_item">
                  <div class="media-img">
                    <img src={images["ico/ico4"]}></img>
                  </div>
                  <h5 class="media-item_title">Solidus AI Tech Token Distribution</h5>
                </div>
                <div class="media_item">
                  <div class="media-img">
                    <img src={images["ico/ico5"]}></img>
                  </div>
                  <h5 class="media-item_title">Solidus AI Tech Token Sales</h5>
                </div>
                <div class="media_item">
                  <div class="media-img">
                    <img src={images["ico/ico6"]}></img>
                  </div>
                  <h5 class="media-item_title">Solidus AI Tech Team 1</h5>
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