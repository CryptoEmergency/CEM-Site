import {
  jsx,
  jsxFrag,
  load,
  initReload
} from "@betarost/cemserver/cem.js";

import { fn } from '@src/functions/index.js';
import svg from "@assets/svg/index.js";
import images from "@assets/images/index.js";
const start = function (data, ID) {


  load({
    ID,

    fn: () => {
      return (
        <div class="startap c-main__body">
          <div class="startap-inner">
            <div class="crypto appearience">
              <div class="social">
                <div class="social-img">
                  <img src={images["startaps-inner/main"]}></img>
                </div>
                <div class="social-icons">
                  <div class="icons-item">
                    <div class="icons-img">
                      <img src={svg["startaps-inner/site"]}></img>
                    </div>
                    <a href="#" class="icons-link">Web Site</a>
                  </div>
                  <div class="icons-item">
                    <div class="icons-img">
                      <img src={svg["startaps-inner/telegram"]}></img>
                    </div>
                    <a href="#" class="icons-link">Telegram</a>
                  </div>
                  <div class="icons-item">
                    <div class="icons-img">
                      <img src={svg["startaps-inner/twitter"]}></img>
                    </div>
                    <a href="#" class="icons-link">Twitter</a>
                  </div>
                  <div class="icons-item">
                    <div class="icons-img">
                      <img src={svg["startaps-inner/instagram"]}></img>
                    </div>
                    <a href="#" class="icons-link">Instagram</a>
                  </div>
                </div>
                <p class="social-desc">A new information platform based on smart blockchain to share experiences and help newcomers.</p>
                <div class="social-btns">
                  <button class="btn-item">
                    <div>White paper</div>
                  </button>
                  <button class="btn-item">
                    <div>Shop paper</div>
                  </button>
                </div>
              </div>

              <div class="info">
                <h2 class="info-title">Crypto Emergency</h2>
                <span class="info-subtitle">Key indicators</span>
                <ul class="info-list">
                  <li class="info-list_item">
                    <span>Ticker</span>
                    <span class="info-list_item-bold">CEM</span>
                  </li>
                  <li class="info-list_item">
                    <span>Blockchain Network</span>
                    <span class="info-list_item-bold">Binance Smart Chain</span>
                  </li>
                  <li class="info-list_item">
                    <span>Total tokens issued</span>
                    <span class="info-list_item-bold">187,000,000</span>
                  </li>
                  <li class="info-list_item">
                    <span>Initial evaluation of the project</span>
                    <span class="info-list_item-bold">$37,400,000</span>
                  </li>
                  <li class="info-list_item">
                    <span>Initial market capitalization</span>
                    <span class="info-list_item-bold">$500,000</span>
                  </li>
                  <li class="info-list_item">
                    <span>IDO sale</span>
                    <span class="info-list_item-bold">$100,000</span>
                  </li>
                  <li class="info-list_item">
                    <span>Price</span>
                    <span class="info-list_item-bold">$0,2</span>
                  </li>
                  <li class="info-list_item">
                    <span>Allocation</span>
                    <span class="info-list_item-bold">$200 (500 allocations)</span>
                  </li>
                </ul>
              </div>
            </div>

            <img class="startap-img" src={svg['startaps-inner/figure']}></img>

            <div class="startap-about appearience">
              <div class="startap-about_text">
                <h2 class="startap-about_title">PROJECT OVERVIEW:
                  <br></br>
                  WHAT IS Crypto Emergency?</h2>
                <p>The Crypto Emergency project is a new startup whose goal is to create
                  an international platform for crypto enthusiasts to communicate.</p>
                <p>The platform is a social network, but with many additional sections that are
                  so necessary for the crypto community. In fact, this platform will be useful to
                  all people who are genuinely interested in the cryptocurrency industry.</p>
                <p>In addition, for Crypto Emergency, it does not matter whether you are a beginner
                  in this field or an experienced trader or investor who has been familiar with cryptocurrencies for a long time.</p>
                <p>Although the platform is still under development, it will include a number
                  of key products such as:</p>
                <ul class="startap-about_list">
                  <li class="startap-about_list-item">
                    <span>
                      a tokenized question and answer platform for beginners and professionals
                      in the fintech industry;
                    </span>
                  </li>
                  <li class="startap-about_list-item">
                    <span>a crypto university integrated with government training programs to train
                      in-demand personnel in the economic sector;</span>
                  </li>
                  <li class="startap-about_list-item">
                    <span>startup support programs;</span>
                  </li>
                  <li class="startap-about_list-item">
                    <span>light-exchange and light-wallet for solving everyday tasks of a wide range
                      of users;</span>
                  </li>
                  <li class="startap-about_list-item">
                    <span>a news detector that analyzes with the help of artificial intelligence
                      the reliability of materials and their real impact on the cryptocurrency markets;</span>
                  </li>
                  <li class="startap-about_list-item">
                    <span>NFT market;</span>
                  </li>
                  <li class="startap-about_list-item">
                    <span>cross-platform tools for advertising and traffic generation.</span>
                  </li>
                </ul>
              </div>
            </div>

            <div class="roadmap appearience">
              <h2 class="startap-title">Road Map</h2>
              <div class="roadmap-inner">
                <div class="roadmap-item">
                  <div class="roadmap-item_year"><span>2</span>022</div>
                  <p class="roadmap-item_text">All cash balances are covered by FDIC insurance, up to a maximum of $250,000.</p>
                </div>
                <div class="roadmap-item">
                  <div class="roadmap-item_year"><span>2</span>023</div>
                  <p class="roadmap-item_text">All cash balances are covered by FDIC insurance, up to a maximum of $250,000.</p>
                </div>
                <div class="roadmap-item">
                  <div class="roadmap-item_year"><span>2</span>024</div>
                  <p class="roadmap-item_text">All cash balances are covered by FDIC insurance, up to a maximum of $250,000.</p>
                </div>
                <div class="roadmap-item">
                  <div class="roadmap-item_year"><span>2</span>025</div>
                  <p class="roadmap-item_text">All cash balances are covered by FDIC insurance, up to a maximum of $250,000.</p>
                </div>
                <div class="roadmap-item">
                  <div class="roadmap-item_year"><span>2</span>026</div>
                  <p class="roadmap-item_text">All cash balances are covered by FDIC insurance, up to a maximum of $250,000.</p>
                </div>
                <div class="roadmap-item">
                  <div class="roadmap-item_year"><span>2</span>026</div>
                  <p class="roadmap-item_text">All cash balances are covered by FDIC insurance, up to a maximum of $250,000.</p>
                </div>
              </div>
            </div>

            <div class="team">
              <h2 class="startap-title">Our team</h2>
              <div class="team-wrap">
                <div class="team-item">
                  <div>
                    <img src={images['startaps-inner/team1']}></img>
                  </div>
                  <h5>Ян Кривоносов</h5>
                  <span>Основатель проекта
                    «Сrypto Emergency»</span>
                </div>
                <div class="team-item">
                  <div>
                    <img src={images['startaps-inner/team2']}></img>
                  </div>
                  <h5>Ян Кривоносов</h5>
                  <span>Основатель проекта
                    «Сrypto Emergency»</span>
                </div>
                <div class="team-item">
                  <div>
                    <img src={images['startaps-inner/team3']}></img>
                  </div>
                  <h5>Ян Кривоносов</h5>
                  <span>Основатель проекта
                    «Сrypto Emergency»</span>
                </div>
                <div class="team-item">
                  <div>
                    <img src={images['startaps-inner/team4']}></img>
                  </div>
                  <h5>Ян Кривоносов</h5>
                  <span>Основатель проекта
                    «Сrypto Emergency»</span>
                </div>
                <div class="team-item">
                  <div>
                    <img src={images['startaps-inner/team5']}></img>
                  </div>
                  <h5>Ян Кривоносов</h5>
                  <span>Основатель проекта
                    «Сrypto Emergency»</span>
                </div>
                <div class="team-item">
                  <div>
                    <img src={images['startaps-inner/team6']}></img>
                  </div>
                  <h5>Ян Кривоносов</h5>
                  <span>Основатель проекта
                    «Сrypto Emergency»</span>
                </div>
                <div class="team-item">
                  <div>
                    <img src={images['startaps-inner/team7']}></img>
                  </div>
                  <h5>Ян Кривоносов</h5>
                  <span>Основатель проекта
                    «Сrypto Emergency»</span>
                </div>
                <div class="team-item">
                  <div>
                    <img src={images['startap-inner/team8']}></img>
                  </div>
                  <h5>Ян Кривоносов</h5>
                  <span>Основатель проекта
                    «Сrypto Emergency»</span>
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