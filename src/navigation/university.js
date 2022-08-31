import {
  jsx,
  jsxFrag,
  setVariable,
  getVariable,
  setAction,
  makeDOM,
  getStorage,
} from "@betarost/cemjs";
import { init as mainHeader } from "@navigation/header/index.js";
import { init as mainFooter } from "@navigation/footer/index.js";

import svg from "@assets/svg/index.js";
import images from "@assets/images/index.js";
// import summit from "@assets/image/banners/crypto_summit.jpg"
// import blockchain from "assets/image/banners/blockchain24.jpg"

const ID = "mainBlock";
setVariable({ header: true });
setVariable({ footer: true });

const arr = [
  {
    title: "Crypto Emergency",
    description:
      "At vero eos et accusamus et iusto odio dignissimos ducimus, blanditiis praesentium voluptatum deleniti atque corrupti, quos doloreset quas molestias excepturi sint, obcaecati cupiditate non provident,similique sunt in culpa, qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expeditan distinctio!",
    type: "profession",
    img: svg["logo.svg"],
  },
  {
    title: "Crypto Summit",
    description:
      "At vero eos et accusamus et iusto odio dignissimos ducimus, blanditiis praesentium voluptatum deleniti atque corrupti, quos doloreset quas molestias excepturi sint, obcaecati cupiditate non provident,",
    type: "language",
    // img: summit,
  },
  {
    title: "Blockchain24.pro",
    description:
      "Ведущий информационный портал о ккриптовалютах и технологиях blockchain",
    type: "profession",
    // img: blockchain,
  },
];

const universityView = function () {
  const lang = getVariable("languages")[getStorage("lang")];

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Крипто университет</h1>
      <h3 style={styles.description}>
        At vero eos et accusamus et iusto odio dignissimos ducimus, qui
        blanditiis praesentium voluptatum deleniti atque corrupti, quos dolores
        et quas molestias excepturi sint, obcaecati cupiditate non provident,
        similique sunt in culpa, qui officia deserunt mollitia animi, id est
        laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita
        distinctio!
      </h3>
      <div style={styles.buttonContainer}>
        <button style={styles.filterButton}>Всё</button>
        <button style={styles.filterButton}>Профессии</button>
        <button style={styles.filterButton}>Иностранные языки</button>
      </div>
      <div style={styles.itemContainer}>
        <div style={styles.item}>
          <div  style={styles.logo}>
            <img src={arr[0].img}></img>
          </div>
          <div style={styles.info}>
            <p style={styles.itemTitle}>{arr[0].title}</p>
            <p style={styles.itemDescription}>
              {" "}
              At vero eos et accusamus et iusto odio dignissimos ducimus, qui
              blanditiis praesentium voluptatum deleniti atque corrupti, quos
              dolores et quas molestias excepturi sint, obcaecati cupiditate non
              provident, similique sunt in culpa, qui officia deserunt mollitia
              animi, id est laborum et dolorum fuga. Et harum quidem rerum
              facilis est et expedita distinctio!{" "}
            </p>
            <button style={styles.itemButton}>Подробнее</button>
          </div>
        </div>
        <div style={styles.item}>
          <div style={styles.logo}></div>
          <div style={styles.info}>
            <p style={styles.itemTitle}>Crypto Emergency!</p>
            <p style={styles.itemDescription}>
              {" "}
              At vero eos et accusamus et iusto odio dignissimos ducimus, qui
              blanditiis praesentium voluptatum deleniti atque corrupti, quos
              dolores et quas molestias excepturi sint, obcaecati cupiditate non
              provident, similique sunt in culpa, qui officia deserunt mollitia
              animi, id est laborum et dolorum fuga. Et harum quidem rerum
              facilis est et expedita distinctio!{" "}
            </p>
            <button style={styles.itemButton}>Подробнее</button>
          </div>
        </div>
        <div style={styles.item}>
          <div style={styles.logo}></div>
          <div style={styles.info}>
            <p style={styles.itemTitle}>Crypto Emergency</p>
            <p style={styles.itemDescription}>
              {" "}
              At vero eos et accusamus et iusto odio dignissimos ducimus, qui
              blanditiis praesentium voluptatum deleniti atque corrupti, quos
              dolores et quas molestias excepturi sint, obcaecati cupiditate non
              provident, similique sunt in culpa, qui officia deserunt mollitia
              animi, id est laborum et dolorum fuga. Et harum quidem rerum
              facilis est et expedita distinctio!{" "}
            </p>
            <button style={styles.itemButton}>Подробнее</button>
          </div>
        </div>
      </div>
    </div>
  );
};

const befor = function (dataUrl) {
  mainHeader(dataUrl);
  mainFooter(dataUrl);
};

const start = function (dataUrl) {
  console.log("start contact");
  makeDOM(universityView(), ID);
};

const after = function (dataUrl) {};

setAction(ID, "befor", befor);
setAction(ID, "start", start);
setAction(ID, "after", after);

const init = function (dataUrl) {
  befor(dataUrl);
  start(dataUrl);
  after(dataUrl);
};

export default init;

const styles = {
  container: {
    margin: "0 auto",
    width: "1240px",
  },
  title: {
    width: "600px",
    margin: "50px auto",
    "font-size": "40px",
    "text-align": "center",
  },
  description: {},
  filterButton: {
    width: "150px",
    padding: "10px",
    "border-radius": "10px",
  },
  buttonContainer: {
    display: "flex",
    "justify-content": "space-around",
    margin: "30px 0",
  },
  itemContainer: {
    display: "flex",
    "flex-direction": "column",
  },

  item: {
    "border-radius": "30px",
    display: "flex",
    padding: "20px",
  },
  logo: {
    // background:
    //   " no-repeat url(http://127.0.0.1/assets/icon/8c0e50f9153768e73fed.svg)",
    "min-width": "400px",
    height: "250px",
  },
  info: {
    display: "flex",
    "margin-left": "20px",
    "flex-direction": "column",
    "align-items": "center",
  },
  itemButton: {
    width: "150px",
    padding: "10px",
    "border-radius": "10px",
  },
  itemDescription: {},
  itemTitle: {
    "font-size": "24px",
    margin: "10px 0",
  },
};
