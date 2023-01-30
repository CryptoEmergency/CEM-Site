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

const start = function (data, ID) {

  let [Static] = fn.GetParams({ data, ID })
  Variable.Static.FooterShow = false

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
                  <img class="card-img_el" src={`/assets/upload/worldPress/${Static.item.icon}`}></img>
                </div>
                <div class="card-main_info">
                  <h3>{Static.item.title}</h3>
                  <p class="main-info_desc">{Static.item.description}</p>
                </div>
              </div>

              <div class="card-media">
                <div class="card-img_wrap">
                  {
                    Static.item.cover

                      ?
                      <img class="card-img" src={`/assets/upload/worldPress/${Static.item.cover}`}></img>
                      :
                      Static.item.coverVideo
                        ?
                        <iframe id="startupVideoPlayer" width="100%" height="585px" src={Static.item.coverVideo} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                        :
                        null
                  }
                </div>

                <div class="card-info">
                  <span class="card-info_status">
                    is ended</span>
                  <div class="card-info_summ">
                    <span class="info-summ_obj">${Static.item.nowMoney && Static.item.nowMoney > 0 ? Static.item.nowMoney : 0}</span>
                    <span class="info-summ_done">of</span>
                    <span class="info-summ_done">${`${Static.item.targetMoney} (${Math.round(((Static.item.nowMoney && Static.item.nowMoney > 0 ? Static.item.nowMoney : 0) * 100) / Static.item.targetMoney)})%`}</span>
                  </div>
                  <button type="button" class="card-btn card-btn_active">
                    <a
                      style='display: block !important'
                      target="_blank"
                      rel="nofollow nooopener"
                      href={Static.item.siteLink}
                    >
                      <span class="card-btn_text">Web Site</span>
                    </a>
                  </button>
                  <button type="button" class={["card-btn", Static.item.whitePaperLink ? "card-btn_active" : null]}>
                    <span class="card-btn_text">White Paper</span>
                  </button>
                  {
                    Static.item.social.length
                      ?
                      <div class="info-social">
                        {
                          Static.item.social.map((item) => {
                            return (
                              <a href={item.url} class="info-social_link">
                                <img src={svg[`${item.channel}-icon`]}></img>
                              </a>
                            )
                          })
                        }
                      </div>
                      :
                      null
                  }
                </div>
              </div>
            </div>

            <div class="ico-details">
              <h4>Token Sale: {`${fn.getDateFormat(Static.item.startDate, "time")} - ${fn.getDateFormat(Static.item.startDate, "time")}`}</h4>
              <div class="ico-details_items">
                <p>Name: <span class="details_bold">{Static.item.name}</span></p>
                <p>Token type: <span class="details_bold">{Static.item.type}</span></p>
                <p>ICO Token Price: <span class="details_bold">1 {Static.item.name} = {Static.item.price} USD</span></p>
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