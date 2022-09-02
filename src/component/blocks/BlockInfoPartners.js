import {
    jsx,
    jsxFrag,
    setAction,
    setValue,
    makeDOM,
    getVariable,
    getStorage,
    getValue
} from '@betarost/cemjs';
import svg from "@assets/svg/index.js";
import images from "@assets/images/index.js";
console.log(svg)
const BlockInfoPartners = function ({lang}) {

    return (
        <div class="top_professionals">
                            <h2>{lang.h.partners}</h2>
                            <div data-mainpage="true" class="partners_container"> 
                                <a target="_blank" rel="nofollow nooopener" href="https://sberunity.ru/main/startups/879d88aa-4729-4788-a541-20cc8cc3cb14" class="partner_item">
                                    <img src={images["partners/sber_unity"]}/>
                                </a>
                                <a target="_blank" rel="nofollow nooopener" href="https://sk.ru" class="partner_item">
                                    <img src={images["partners/skolkovo"]}/>
                                </a>
                                <a target="_blank" rel="nofollow nooopener" href="https://cryptosummit.ru" class="partner_item">
                                    <img src={images["partners/crypto_summit"]}/>
                                </a>
                                <a target="_blank" rel="nofollow nooopener" href="https://plus-forum.com" class="partner_item">
                                    <img src={images["partners/plus_forum"]}/>
                                </a>
                                <a target="_blank" rel="nofollow nooopener" href="https://blockchain-life.com/europe/ru/" class="partner_item">
                                    <img src={images["partners/blockchain_life"]}/>
                                </a>
                                <a target="_blank" rel="nofollow nooopener" href="https://rbw.moscow/?utm_source=infopartner&utm_medium=cryptoemergency&utm_campaign=pressreliz" class="partner_item">
                                    <img src={images["partners/b4_week"]}/>
                                </a>
                                <a target="_blank" rel="nofollow nooopener" href="https://ru.beincrypto.com" class="partner_item">
                                    <img src={images["partners/be_in_crypto"]}/>
                                </a>
                                <a target="_blank" rel="nofollow nooopener" href="https://mining-cryptocurrency.ru" class="partner_item">
                                    <img src={images["partners/crypto_mining"]}/>
                                </a>
                                <a target="_blank" rel="nofollow nooopener" href="https://cryptomania.moscow" class="partner_item">
                                    <img src={images["partners/cryptomania"]}/>
                                </a>
                                <a target="_blank" rel="nofollow nooopener" href="https://techweek.moscow" class="partner_item">
                                    <img src={images["partners/tech_week"]}/>
                                </a>
                            </div>  
                            <a href="{{lang.url}}partners/" class="btn-view-all-a" data-action="link">
                                <div class="btn-view-all more_partners">
                                    <div>{lang.button.allPartners}</div>
                                </div>
                            </a>
                        </div>
    )
}

export { BlockInfoPartners }