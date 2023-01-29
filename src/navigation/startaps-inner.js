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
            <div class="crypto">
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
            <div class="startap-about">
              <h2>PROJECT OVERVIEW: 
              WHAT IS Crypto Emergency?</h2>
            </div>
          </div>
        </div>
      )
    }
  })
}
export default start;