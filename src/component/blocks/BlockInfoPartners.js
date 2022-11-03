import {
    jsx,
    jsxFrag,
    Variable,
    Helpers
} from '@betarost/cemjs';
// poydet
import images from "@assets/images/index.js";

const partners = [
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
    },
    {
        "link": "https://digitalitmed.ru/",
        "image": "cifromed"
    },
    {
        "link": "https://crypto.ru/",
        "image": "cryptoru"
    }
];

const BlockInfoPartners = function (data) {

    let arrData = partners
    if (data && data.limit) {
        arrData = partners.filter((item, index) => index < data.limit)
    }

    return (
        <div class="top_professionals c-infopartners">
            <h2 class="c-infopartners__title">{Variable.lang.h.partners}</h2>
            <div data-mainpage="true" class="c-infopartners__list partners_container">
                {
                    arrData.map((partner) => {
                        return (
                            <a
                                style='display: block !important'
                                target="_blank"
                                rel="nofollow nooopener"
                                href={partner.link}
                                class="c-infopartners__item"
                            >
                                <img src={images["partners/" + partner.image]} />
                            </a>
                        )
                    })
                }
            </div>

            {() => {
                if (data && data.limit && partners.length > data.limit) {
                    return (
                        <div class="crypto_exchanges_footer">
                            <a class="c-button c-button--gray" href="/partners/" onclick={(e) => { Helpers.siteLinkModal(e, { title: Variable.lang.button.allPartners }) }}>
                                <span class="c-button__wrapper">{Variable.lang.button.allPartners}</span>
                            </a>
                        </div>
                    )
                }
            }}
        </div>
    )
}
export { BlockInfoPartners }