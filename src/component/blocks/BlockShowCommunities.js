import {
  jsx,
  jsxFrag,
  Variable,
  initOne,
  initReload,
  Static,
  init
} from '@betarost/cemjs';
import { fn } from '@src/functions/index.js';
import svg from "@assets/svg/index.js";
import images from '@assets/images/index.js';
import { Input, Select, ItemsMenu } from '@component/element/index.js';

const Tags = function ({ Static, classActive, text, type }) {
  return (
    <div class={["tag_button", classActive]}
      onclick={async () => {
        if (Static.activeCategory == type) {
          return;
        }
        Static.activeCategory = type;
        Static.apiFilter = makeFilter(Static)
        await fn.restApi.getCommunity({ name: Static.nameRecords, filter: Static.apiFilter })
      }}>
      <span>{text}</span>
    </div>
  )
}

const BlockShowCommunities = async function ({ Static }) {


  await initOne(
    async () => {
      console.log('=80e69b=', Static)
      console.log('=feaa84=', Variable)

      Static.filters.country.onclick = async () => {
        fn.modals.ModalSelectCountry({
          onclick: async (countryCode, countryName) => {
            Static.filters.country.name = countryName;
            Static.filters.country.code = countryCode;
            Static.filters.country.value = countryName;
            Static.apiFilter = makeFilter(Static)
            await fn.restApi.getCommunity({ name: Static.nameRecords, filter: Static.apiFilter })
          }
        }, true)
      }

      Static.filters.language.onclick = async () => {
        fn.modals.ModalChangeLanguage({
          onclick: async (langCode, langName, langOrig) => {
            Static.filters.language.name = langName + ` (${langOrig})`;
            Static.filters.language.code = langCode;
            Static.filters.language.value = langName + ` (${langOrig})`;
            Static.apiFilter = makeFilter(Static)
            await fn.restApi.getCommunity({ name: Static.nameRecords, filter: Static.apiFilter })
          }
        }, true)
      }
    }
  )

  return (
    <div class="c-communities__container c-container">
      <h2>{Variable.lang.h.community}</h2>
      <div class="c-communities__header c-searchpage">
        <div class="c-searchpage__mainblock">
          <div class="c-searchpage__filter">
            <Input className="c-searchpage__field" Static={Static.search} />
            <div
              class="c-searchpage__toggler"
              onClick={() => {
                if (Static.elFilters.dataset.active === "true") {
                  Static.elFilters.dataset.active = false
                  Static.elFilters.style = "height: 0px"
                  Static.elFilters.classList.value = "c-searchpage__additional";
                  console.log('=893082=', Static.elFilters.classList)
                } else {
                  Static.elFilters.dataset.active = true
                  Static.elFilters.style = "";
                  let h = Static.elFilters.offsetHeight;
                  Static.elFilters.style = `height: ${h}px; margin-bottom: 20px;`
                  Static.elFilters.classList.value = "c-searchpage__additional c-searchpage__additional--visible";
                  console.log('=893082=', Static.elFilters.classList)
                }
              }}>
              <img src={svg.filter} />
              <span>{Variable.lang.span.filter}</span>
            </div>
          </div>
          <div class="c-searchpage__hint questions_search" style="display: none;">
            <div class="c-searchpage__empty question_search_half_empty">
              {Variable.lang.text.contInput}
            </div>
            <div class="c-searchpage__help question_search_help" style="display: none;"></div>
          </div>
        </div>

        <div
          class="c-searchpage__additional"
          data-active={false}
          style={"height: 0px"}
          Element={($el) => {
            Static.elFilters = $el
          }}
        >

          <div class="c-searchpage__wrapper">
            <Input classDiv="language_select_wrapper" className="c-searchpage__select" Static={Static.filters.country} />
            <img style="display: none;" class="refresh_country" src={svg.refresh_filter} />
          </div>

          <div class="c-searchpage__wrapper">
            <Input classDiv="" className="c-searchpage__select" Static={Static.filters.cities} />
            <img style="display: none;" class="refresh_country" src={svg.refresh_filter} />
          </div>

          <div class="c-searchpage__wrapper">
            <Input classDiv="language_select_wrapper" className="c-searchpage__select" Static={Static.filters.interests} />
            <img style="display: none;" class="refresh_country" src={svg.refresh_filter} />
          </div>

          <div
            data-show={false}
            class="c-searchpage__sort"
            Element={($el) => {
              Static.elShowFilter = $el
            }}
          >
            <Select
              options={Static.optionsSelect.sortCommunity}
              callback={
                async (active, nameOptions) => {
                  Static.filters[nameOptions].value = active
                  Static.apiFilter = makeFilter(Static)
                  Static.apiFilterSort = makeFilterSort(Static)
                  // await fn.restApi.getQuestions({ name: Static.nameRecords, filter: Static.apiFilter, sort: Static.apiFilterSort, limit })
                }
              }
            />
          </div>

          {
            Static.filters.group
              ?
              <div class="c-friends__checkboxes">
                <div class="checkbox">
                  <input
                    checked={Static.filters.group.offline ? true : false}
                    class="checkbox__input"
                    type="checkbox"
                    id="offline"
                    required="required"
                    onChange={async () => {
                      Static.filters.group.offline = !Static.filters.group.offline
                      Static.apiFilter = makeFilter(Static)
                      // await fn.restApi.getUsers({ name: Static.nameRecords, filter: Static.apiFilter })
                      await fn.restApi.getCommunity({ name: Static.nameRecords, filter: Static.apiFilter })
                    }}
                  />
                  <label class="checkbox__label" for="offline">{Variable.lang.h.offline}</label>
                </div>
              </div>
              :
              null
          }
        </div>

        <div
          class="c-searchpage__lang"
          onclick={() => {
            Variable.SetModals({
              name: "ModalChangeLanguage",
              data: {
                onclick: async (langCode, langOrig) => {
                  let lang = Variable.listsLang.filter((item) => {
                    return item.code == langCode;
                  });
                  let searchLang = lang[0].code

                  // let resp = await fn.restApi.getUserRoom({ name: "ListSystemsRooms", filter: { system: true, "languages.code": searchLang }, limit: 10 })
                  // if (resp.totalFound > 0) {

                  //   Static.lang.name = langOrig;
                  //   Static.lang.code = langCode;
                  //   Static.Tag = resp

                  //   let systemroom = Static.Tag.list_records.filter((item) => {
                  //     return item.settingsroom.category == Static.defaultUserRoom;
                  //   });

                  //   if (Static.Rooms.system) {
                  //     document.getElementById("spinner").hidden = false
                  //     ChangeRooms(Static, systemroom[0]._id, true)
                  //   }
                  //   // 
                  // } else {
                  //   alert("Нет такой системной комнаты")
                  // }
                },
              },
            });
          }}
        >{Static.lang.name}</div>

        <div class="c-communities__tags tags">
          <Tags
            Static={Static}
            text={Variable.lang.categoryName.all}
            classActive={Static.activeCategory == "All" ? "tag_button_active" : ""}
            type="All"
          />
          {() => {
            if (Variable[Static.nameRecords + "Category"]) {
              let arrReturn = Variable[Static.nameRecords + "Category"].list_records.filter((item) => item.name !== null).map((item) => {
                return (
                  <Tags
                    Static={Static}
                    text={Variable.lang.categoryName[item.name]}
                    classActive={Static.activeCategory == item.name ? "tag_button_active" : ""}
                    type={item.name}
                  />
                )
              })
              return arrReturn
            }
          }}
        </div>
      </div>
      <ul class="c-communities__list">
        <li class="c-communitycard">
          <header class="c-communitycard__header">
            <div class="c-communitycard__logo">
              <img class="" src={images["community/cryptoclubnvrsk"]} width="40" height="" />
            </div>
            <h6 class="c-communitycard__name" title="CryptoClub NVRSK">CryptoClub NVRSK</h6>
            {/* Три точки меню */}
            <ItemsMenu author={Variable.myInfo} items={fn.itemsMenu.community(Static, {})} />
          </header>
          <figure class="c-communitycard__body">
            <img class="c-communitycard__cover" src={images["community/community1"]} width="" height="" />
            <figcaption class="c-communitycard__description">
              <ul class="c-communitycard__tags">
                <li class="tag_button tag_button_active"><span>Крипта</span></li>
                <li class="tag_button tag_button_active"><span>Блокчейн</span></li>
                {/* <li class="tag_button tag_button_active"><span>Технологии</span></li>
                <li class="tag_button tag_button_active"><span>Майнинг</span></li>
                <li class="tag_button tag_button_active"><span>Трейдинг</span></li>
                <li class="tag_button tag_button_active"><span>Финансовая грамотность</span></li>
                <li class="tag_button tag_button_active"><span>Цифровая гигиена</span></li>
                <li class="tag_button tag_button_active"><span>NFT</span></li>
                <li class="tag_button tag_button_active"><span>DeFi</span></li> */}
              </ul>
              <p class="c-communitycard__short">Сообщество по интересам, связным с криптой и блокчейн технологиями.</p>
              <a
                class="c-button c-button--outline2"
                href="/communities/community/1"
                onclick={(e) => {
                  fn.siteLinkModal(e, {
                    title: 'Страница сообщества',
                    community: {
                      src: "cryptoclubnvrsk",
                      name: "CryptoClub NVRSK",
                      description: "Сообщество криптоинтузиастов для встреч и общения. На встречах обсуждаем - майнинг, трейдинг, дефай, нфт, различные блокчейн проекты и делимся своим мнением в целом о крипте. Планируются встречи с экспертами из разных направлений и мастермаинды.",
                      short: "Сообщество по интересам, связанным с криптой и блокчейн технологиями.",
                      categories: [
                        "NFT", "Безопасность", "Defi", "token", "altcoin", "Mining", "Trading", "ICO", "GameFi", "Move2Earn", "Блокчейн"
                      ],
                      creator: {
                        title: "Сэм",
                        href: "#"
                      },
                      member: 9,
                      language: "Русский",
                      country: "Россия",
                      city: "Новороссийск",
                      contacts: {
                        phone: "",
                        web: "",
                      },
                      social: {
                        telegram: "https://t.me/+vmw6S8KTzGMxZWYy",
                        twitter: "",
                        discord: "",
                        instagram: "",
                      },
                      galary: [
                        {
                          path: "",
                          image: "community1",
                        },
                        {
                          path: "",
                          image: "community2",
                        }
                      ],
                      events: [
                        {
                          title: "Встреча каждую субботу",
                          date: "16-00",
                          place: "кафе/бар (по согласованию)"
                        },
                      ]
                    }
                  })
                }}
              >
                <div class="c-button__wrapper">
                  {Variable.lang.a.moreDetails}
                </div>
              </a>
            </figcaption>
          </figure>
          <footer class="c-communitycard__footer">
            <span class="c-communitycard__count">9 участников</span>
            <date class="c-communitycard__date" datetime="">19.12.2022</date>
          </footer>
        </li>
        <li class="c-communitycard">
          <header class="c-communitycard__header">
            <div class="c-communitycard__logo">
              <img class="" src={images["community/anon_nft"]} width="40" height="" />
            </div>
            <h6 class="c-communitycard__name" title="Anonymous NFT TON">Anonymous NFT TON</h6>
            {/* Три точки меню */}
            <ItemsMenu author={Variable.myInfo} items={fn.itemsMenu.community(Static, {})} />
          </header>
          <figure class="c-communitycard__body">
            <img class="c-communitycard__cover" src={images["community/community2"]} width="" height="" />
            <figcaption class="c-communitycard__description">
              <ul class="c-communitycard__tags">
                <li class="tag_button tag_button_active"><span>NFT</span></li>
              </ul>
              <p class="c-communitycard__short">Децентрализованное сообщество людей, объединённых великой целью - стать лучшей версией себя.</p>
              <a
                class="c-button c-button--outline2"
                href="/communities/community/1"
                onclick={(e) => {
                  fn.siteLinkModal(e, {
                    // title: 'Страница сообщества',
                    custom: 'anonymus',
                    community: {
                      src: "cryptoclubnvrsk",
                      name: "DAO Anonymous",
                      heroes: [
                        {
                          path: "anonymous",
                          image: "hero1",
                          name: "Ghost"
                        },
                        {
                          path: "anonymous",
                          image: "hero2",
                          name: "Technican"
                        },
                        {
                          path: "anonymous",
                          image: "hero3",
                          name: "Samurai"
                        },
                        {
                          path: "anonymous",
                          image: "hero4",
                          name: "Reaper"
                        },
                        {
                          path: "anonymous",
                          image: "hero5",
                          name: "Synthetic"
                        },
                      ],
                      actions: [
                        {
                          link: "",
                          title: "Купить NFT"
                        },
                        {
                          link: "",
                          title: "Чат-бот"
                        },
                        {
                          link: "",
                          title: "Описание"
                        },
                        {
                          link: "",
                          title: "Merch"
                        },
                        {
                          link: "",
                          title: "Вакансии"
                        },
                        {
                          link: "",
                          title: "Ссылки"
                        },
                      ],
                      description: "Сообщество криптоинтузиастов для встреч и общения. На встречах обсуждаем - майнинг, трейдинг, дефай, нфт, различные блокчейн проекты и делимся своим мнением в целом о крипте. Планируются встречи с экспертами из разных направлений и мастермаинды.",
                      short: "Сообщество по интересам, связанным с криптой и блокчейн технологиями.",
                      categories: [
                        "NFT", "Безопасность", "Defi", "token", "altcoin", "Mining", "Trading", "ICO", "GameFi", "Move2Earn", "Блокчейн"
                      ],
                      creator: {
                        title: "Сэм",
                        href: "#"
                      },
                      member: 9,
                      language: "Русский",
                      country: "Россия",
                      city: "Новороссийск",
                      contacts: {
                        phone: "",
                        web: "",
                      },
                      social: {
                        telegram: "https://t.me/+vmw6S8KTzGMxZWYy",
                        twitter: "",
                        discord: "",
                        instagram: "",
                      },
                      galary: [
                        {
                          path: "",
                          image: "community1",
                        },
                        {
                          path: "",
                          image: "community2",
                        }
                      ],
                      events: [
                        {
                          title: "Встреча каждую субботу",
                          date: "16-00",
                          place: "кафе/бар (по согласованию)"
                        },
                      ]
                    }
                  })
                }}
              >
                <div class="c-button__wrapper">
                  {Variable.lang.a.moreDetails}
                </div>
              </a>
            </figcaption>
          </figure>
          <footer class="c-communitycard__footer">
            <span class="c-communitycard__count">1362 участников</span>
            <date class="c-communitycard__date" datetime="">31.12.2022</date>
          </footer>
        </li>
        <li class="c-communitycard">
          <header class="c-communitycard__header">
            <div class="c-communitycard__logo">
              <img class="" src={images["community/anon_nft"]} width="40" height="" />
            </div>
            <h6 class="c-communitycard__name" title="Anonymous NFT TON">Anonymous NFT TON</h6>
            {/* Три точки меню (API нужно) */}
            <ItemsMenu author={Variable.myInfo} items={fn.itemsMenu.community(Static, {})} />
          </header>
          <figure class="c-communitycard__body">
            <img class="c-communitycard__cover" src={images["community/community3"]} width="" height="" />
            <figcaption class="c-communitycard__description">
              <ul class="c-communitycard__tags">
                <li class="tag_button tag_button_active"><span>NFT</span></li>
                <li class="tag_button tag_button_active"><span>Творчество</span></li>
              </ul>
              <p class="c-communitycard__short">Децентрализованное сообщество людей, объединённых великой целью - стать лучшей версией себя.</p>
              <a
                class="c-button c-button--outline2"
                href="/communities/community/1"
                onclick={(e) => {
                  fn.siteLinkModal(e, {
                    title: 'Страница сообщества',
                  })
                }}
              >
                <div class="c-button__wrapper">
                  {Variable.lang.a.moreDetails}
                </div>
              </a>
            </figcaption>
          </figure>
          <footer class="c-communitycard__footer">
            <span class="c-communitycard__count">1362 участников</span>
            <date class="c-communitycard__date" datetime="">31.12.2022</date>
          </footer>
        </li>
        <li class="c-communitycard">
          <header class="c-communitycard__header">
            <div class="c-communitycard__logo">
              <img class="" src={images["community/anon_nft"]} width="40" height="" />
            </div>
            <h6 class="c-communitycard__name" title="Anonymous NFT TON">Anonymous NFT TON</h6>
            {/* Три точки меню (API нужно) */}
            <ItemsMenu author={Variable.myInfo} items={fn.itemsMenu.community(Static, {})} />
          </header>
          <figure class="c-communitycard__body">
            <img class="c-communitycard__cover" src={images["community/community4"]} width="" height="" />
            <figcaption class="c-communitycard__description">
              <ul class="c-communitycard__tags">
                <li class="tag_button tag_button_active"><span>NFT</span></li>
                <li class="tag_button tag_button_active"><span>Творчество</span></li>
              </ul>
              <p class="c-communitycard__short">Децентрализованное сообщество людей, объединённых великой целью - стать лучшей версией себя.</p>
              <a
                class="c-button c-button--outline2"
                href="/communities/community/1"
                onclick={(e) => {
                  fn.siteLinkModal(e, {
                    title: 'Страница сообщества',
                  })
                }}
              >
                <div class="c-button__wrapper">
                  {Variable.lang.a.moreDetails}
                </div>
              </a>
            </figcaption>
          </figure>
          <footer class="c-communitycard__footer">
            <span class="c-communitycard__count">1362 участников</span>
            <date class="c-communitycard__date" datetime="">31.12.2022</date>
          </footer>
        </li>
      </ul>
    </div>
  )


}

export { BlockShowCommunities }