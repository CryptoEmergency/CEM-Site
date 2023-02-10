import {
  jsx,
  jsxFrag,
  load,
  initReload,
  Variable
} from "@betarost/cemserver/cem.js";
import { fn } from '@src/functions/index.js';
import svg from "@assets/svg/index.js";

const showDate = function (start, end) {
  let currentDate = Math.round(new Date() / 1000)
  let startDate = Math.round(new Date(start) / 1000)
  let endDate = Math.round(new Date(end) / 1000)
  let statusDate = ""

  if (currentDate >= startDate && currentDate <= endDate) {
    // statusDate = "Активный"
    statusDate = Variable.lang.select.active
  } else if (currentDate <= startDate) {
    // statusDate = "Текущий"
    statusDate = Variable.lang.select.upcoming
  } else if (currentDate >= endDate) {
    // statusDate = "Завершённый"
    statusDate = Variable.lang.select.ended
  }
  console.log('=56c485=', statusDate)
  return statusDate
}

const start = function (data, ID) {

  let [Static] = fn.GetParams({ data, ID })
  Variable.Static.FooterShow = false

  load({
    ID,
    fnLoad: async () => {
      if (!Static.item) {
        Static.item = await fn.restApi.getIco({ filter: { _id: Variable.dataUrl.params }, firstRecord: true })
      }
      console.log("Static.item", Static.item)
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
                  <span class="card-info_status">{showDate(Static.item.startDate, Static.item.endDate)}</span>

                  <div class="card-info_summ">
                    <span class="info-summ_obj">${Static.item.nowMoney && Static.item.nowMoney > 0 ? Static.item.nowMoney : 0}</span>
                    <span class="info-summ_done">of</span>
                    <span class="info-summ_done">${`${Static.item.targetMoney} (${Math.round(((Static.item.nowMoney && Static.item.nowMoney > 0 ? Static.item.nowMoney : 0) * 100) / Static.item.targetMoney)})%`}</span>
                  </div>

                  <a
                    class={["card-btn", Static.item.siteLink ? "card-btn_active" : null]}
                    target="_blank"
                    href={Static.item.siteLink}
                    rel="nofollow nooopener">
                    <span class="card-btn_text">Web Site</span>
                  </a>

                  <a
                    class={["card-btn", Static.item.whitePaperLink ? "card-btn_active" : null]}
                  >
                    <span class="card-btn_text">White Paper</span>

                  </a>
                  {
                    Static.item.social.length
                      ?
                      <div class="info-social">
                        {
                          Static.item.social.map((item) => {
                            return (
                              <a href={item.url} class="info-social_link">
                                <img src={svg[`${item.channel}-icon`]} alt={`${item.channel}`} />
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
              <h4>Token Sale: {`${fn.getDateFormat(Static.item.startDate, "time")} - ${fn.getDateFormat(Static.item.endDate, "time")}`}</h4>
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
              {Static.item.media.length ? <h4>Screenshots</h4> : null}
              {
                Static.item.media.length
                  ?
                  <div class="media-wrap">
                    {
                      Static.item.media.map((item) => {
                        return (
                          <div class="media-item">
                            <div class="media-img">
                              <img
                                src={`/assets/upload/worldPress/${item.name}`}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  e.preventDefault();
                                  fn.modals.ModalViewPhoto({
                                    path: item.name,
                                  });
                                }}
                              ></img>
                            </div>
                          </div>
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
      )
    }
  })

}
export default start;