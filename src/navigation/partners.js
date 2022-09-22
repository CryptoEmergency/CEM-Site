import {
    jsx,
    jsxFrag,
    Variable,
    init,
    initGo,
    initReload
  } from "@betarost/cemjs";

  import { BlockInfoPartners } from '@component/blocks/BlockInfoPartners.js';
  import {
    getNewsItem,
    getNewsCategory,
    getDateFormat
  } from "@src/functions.js";
  
  
  const start = function () {
    let partners
    Variable.HeaderShow = true
    Variable.FooterShow = true
    init(
      async () => {
        partners = [
            {
                "link": "https://sberunity.ru/main/startups/879d88aa-4729-4788-a541-20cc8cc3cb14",
                "image": "sber_unity"
            },
            {
                "link": "https://sk.ru",
                "image": "skolkovo"
            },
            {
                "link": "https://cryptosummit.ru",
                "image": "crypto_summit"
            },
            {
                "link": "https://plus-forum.co",
                "image": "plus_forum"
            },
            {
                "link": "https://blockchain-life.com/europe/ru/",
                "image": "blockchain_life"
            },
            {
                "link": "https://rbw.moscow/?utm_source=infopartner&utm_medium=cryptoemergency&utm_campaign=pressreliz",
                "image": "b4_week"
            },
            {
                "link": "https://ru.beincrypto.com",
                "image": "be_in_crypto"
            },
            {
                "link": "https://mining-cryptocurrency.ru",
                "image": "crypto_mining"
            },
            {
                "link": "https://cryptomania.moscow",
                "image": "cryptomania"
            },
            {
                "link": "https://techweek.moscow",
                "image": "tech_week"
            }
        ];
      },
      () => {
        return (
          <div class={`${Variable.HeaderShow ? "c-main__body" : "c-main__body--noheader"}`}>
            <BlockInfoPartners lang={Variable.lang} partners={partners} />
          </div>
        )
      }
    )
  }
  
  export default start;