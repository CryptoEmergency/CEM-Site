import {
  jsx,
  jsxFrag,
  Variable,
  init
} from "@betarost/cemjs";

const start = function (data, ID = "mainBlock") {
  Variable.HeaderShow = true
  Variable.FooterShow = true

  init(
    null,
    () => {
      if (Variable.lang.lang === "Russian") {
        return (
          <div class={[Variable.HeaderShow ? 'c-main__body' : 'c-main__body--noheader']}>
            <div class="c-terms">
              <div class="c-terms__container c-container">
                <h1 class="c-terms__title">Политика Cookies</h1>
                <p class="c-terms__date">Редакция от 2021-12-16</p>
                <h2 class="c-terms__subtitle">ЧТО ТАКОЕ ФАЙЛЫ COOKIE?</h2>
                <div class="c-terms__content">
                  <p>Файлы cookie — это текстовые файлы
                    небольшого объема, сохраняемые на вашем компьютере, планшете или
                    мобильном телефоне. Они НЕ вредят компьютеру или системе безопасности и,
                    вопреки ошибочному мнению, не имеют ничего общего с такими вирусами, как
                    троянские программы. При посещении сайта файлы cookie позволяют сайту
                    «запоминать» вас и ваши предпочтения для повышения качества
                    взаимодействия с сайтом. Более подробную информацию о файлах cookie
                    можно найти в Интернете.</p>

                  <h3>Как я могу контролировать настройки,
                    позволяющие использование cookie?</h3>
                  <p>Если вы не хотите получать файлы cookie,
                    вы можете изменить настройки браузера так, чтобы он уведомлял вас о
                    получении этих файлов, или же полностью отказаться от них. Вы также
                    можете удалить уже сохраненные файлы cookie.</p>
                  <h3>Как мы используем файлы cookie ?</h3>
                  <p>Мы используем Google Analytics, сервис для
                    веб-аналитики, предоставляемый Google Inc. (Google). Этот сервис
                    использует файлы cookie для анализа взаимодействия с сайтом в целях
                    повышения качества обслуживания. Наш сайт использует так называемый
                    идентификатор пользователя, который служит для идентификации клиентов в
                    Google Analytics. На основе вашего поведения Google создает профиль для
                    вашего идентификатора пользователя. Google Analytics отслеживает
                    действия анонимизированных пользователей на разных устройствах
                    (планшеты, ПК, смартфоны и т. д.).<br /><br />
                    Информация об использовании веб-сайтов, собранная с помощью файлов
                    cookie (включая IP-адрес), передается Google и хранится на серверах,
                    размещенных на территории США. Google использует собранные сведения для
                    анализа взаимодействия пользователей с веб-сайтом, составления отчетов о
                    посещаемости веб-сайта для нас, а также для оказания других услуг,
                    связанных с использованием веб-сайта и сети Интернет. Google может
                    передавать эти сведения третьим лицам, если это требуется по закону или
                    для их обработки от лица Google. Ваш IP-адрес не связан с другими
                    данными, собранными Google.<br />
                    В распоряжение Google предоставляется только идентификатор пользователя,
                    но не информация, содержащаяся в упомянутом выше профиле, или другие
                    персональные данные.
                    <br /><br />
                    Нам доступны сводные данные созданного профиля. Мы не добавляем данные,
                    которые можно использовать для установления личности, в профиль,
                    связанный с идентификатором пользователя.
                    <br /><br />Вы можете отказаться от отслеживания по идентификатору
                    пользователя, отправив письмо по адресу&ensp;
                    <a
                      href="mailto:support@crypto-emergency.com"
                    >support@crypto-emergency.com.</a>
                    <br /><br />Вы также можете отказаться от использования файлов cookie,
                    установив соответствующие настройки в браузере. Обратите внимание на то,
                    что в этом случае некоторые функции сайта могут быть недоступны.
                    Пользуясь этим сайтом, вы даете свое согласие на обработку своих данных
                    компанией Google описанным выше образом в целях, перечисленных в этих
                    правилах. Более подробную информацию о файлах cookie можно найти на
                    сайте&ensp;
                    <noindex><a
                      href="http://www.aboutcookies.org"
                      target="_blank"
                    >http://www.aboutcookies.org.</a></noindex>
                    <br /><br /><h3 class="full_news_subtitle">ДОГОВОР ПОЛЬЗОВАНИЯ</h3><br
                    />
                    Продолжая пользоваться нашим сайтом, вы соглашаетесь на размещение
                    файлов cookie на вашем устройстве. Если вы решили отказаться от наших
                    файлов cookie, мы не можем гарантировать, что ваше посещение сайта будет
                    таким же успешным, как при получении файлов cookie.</p>
                </div>
                <div class="c-terms__action">
                  <a
                    href="/assets/docs/cookieRU.pdf"
                    class="c-button c-button--gradient"
                    target="_blank"
                  >
                    <span class="c-button__text">Скачать</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        );
      } else {
        return (
          <div class={[Variable.HeaderShow ? 'c-main__body' : 'c-main__body--noheader']}>
            <div class="c-terms">
              <div class="c-terms__container c-container">

                <h1 class="full_news_name">Politics Cookies</h1>
                <br />
                <h2 class="full_news_title mrb10">What are cookie files?</h2>
                <p class="full_news_text mrb40">
                  Cookie files are light-sized text files, which are saved on your
                  computer, tablet or mobile phone. They don\'t harm a computer or a
                  security system, and contrary to the public opinion, don\'t have
                  anything common with such viruses as Trojan Horse programs. Whilst
                  visiting a website, cookie files allow it to "remember" you and your
                  preferences to improve the quality of interaction with a website. More
                  detailed information about cookie files you can find on the Internet.</p>

                <h3 class="full_news_subtitle mrb10">How can I manage the settings letting
                  to use cookies?</h3>
                <p class="full_news_text mrb40">If you don\'t want to receive cookies, you
                  can change browser settings so that it notifies you about the receiving
                  of these files, or discard them completely. You can also delete already
                  saved cookies.</p>
                <h3 class="full_news_subtitle mr30">How we use cookies?</h3>
                <p class="full_news_text mrb10">We use Google Analytics, web-analysis
                  service provided by Google Inc. (Google). This service uses cookies to
                  analyse interaction with the website in order to impove the quality of
                  service. Our website uses so called user identificator, which serves to
                  identify clients in Google Analytics. On the basis of your activity
                  Google creates a profile for your user identificator. Google Analytics
                  controls actions of unidentified users on different devices (tablets,
                  PC, smartphones, etc.). The information about web-sites\' exploitation
                  which is collected with the help og cookies (including IP address), is
                  transferred to Google and is kept on servers located in the USA. Google
                  uses collected data to analyse the interaction of users with the
                  web-site, to make reports on web-site traffic for us, and also to render
                  other services connected with the web-site and the Internet usage.
                  Google can give these data to third persons, if it\'s required by the
                  law or for processing on behalf of Google. Your IP-address is not
                  connected with other data collected by Google.
                  <br /><br />Only a user identificator is provided at the Google
                  disposal, but not the information contained in the mantioned above
                  profile or other personal data. We have access to aggregate data of a
                  created profile. We don\'t add data which can be used to identify the
                  personality in a profile connected with a user identificator.
                  <br /><br />You can refuse from tracing by user identificator by sending
                  us a letter at the address
                  <a
                    href="mailto:support@crypto-emergency.com"
                  >support@crypto-emergency.com.</a>
                  <br /><br />You also can refuse from using cookies specifying the
                  correspondent settings in a browser. Pay your attention that in this
                  case some web-site settings may be unavailable. Using the web-site, you
                  give your permission for processing your data by Google in the way
                  described above for the purposes listed in these rules. More detailed
                  information about using cookies you can find on the web-site
                  <noindex><a
                    href="http://www.aboutcookies.org"
                    target="_blank"
                  >http://www.aboutcookies.org.</a></noindex>.

                  <br /><br /><h3 class="full_news_subtitle">Terms of users agreement</h3><br
                  />
                  Continuing to use our web-site, you agree to place cookies on your
                  device. If you decided to refuse from our cookie files, we can\'t
                  guarantee that your visiting the web-site will be as successful as with
                  receiving cookie files.</p>
                {/* <div class="btn-download_container">
                  <button type="button" class="button-container sign-up btn">
                    <a
                      href="/assets/docs/cookieEN.pdf"
                      class="btn-gr"
                      target="_blank"
                    ><span>Download</span></a>
                  </button>
                </div> */}
                <div class="c-terms__action">
                  <a
                    href="/assets/docs/cookieEN.pdf"
                    class="c-button c-button--gradient"
                    target="_blank"
                  >
                    <span class="c-button__text">Download</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        );
      }
    }, ID)
};
//I check
export default start;