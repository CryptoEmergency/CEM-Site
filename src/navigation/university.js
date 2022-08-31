import {
  jsx,
  jsxFrag,
  getVariable,
  makeDOM,
  getStorage,
  setValue
} from "@betarost/cemjs";


import svg from "@assets/svg/index.js";
import images from "@assets/images/index.js";

const arrLogo = [
  {
    title: "Crypto Emergency",
    description:
      "At vero eos et accusamus et iusto odio dignissimos ducimus, blanditiis praesentium voluptatum deleniti atque corrupti, quos doloreset quas molestias excepturi sint, obcaecati cupiditate non provident,similique sunt in culpa, qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expeditan distinctio!",
    type: "profession",
    img: svg["logo"],
  },
  {
    title: "Crypto Summit",
    description:
      "At vero eos et accusamus et iusto odio dignissimos ducimus, blanditiis praesentium voluptatum deleniti atque corrupti, quos doloreset quas molestias excepturi sint, obcaecati cupiditate non provident,",
    type: "language",
    img: images["banners/crypto_summit"],
  },
  {
    title: "Blockchain24.pro",
    description:
      "Ведущий информационный портал о ккриптовалютах и технологиях blockchain",
    type: "profession",
    img: images["banners/blockchain24"],
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
        {arrLogo.map((item, i) => {
          return (
            <div key = {i} style={styles.item}>
              <div style={styles.logoContainer}>
                <img style={styles.logo} src={item.img}></img>
              </div>
              <div style={styles.info}>
                <p style={styles.itemTitle}>{item.title}</p>
                <p style={styles.itemDescription}>
                  {item.description}
                </p>
                <button style={styles.itemButton}>Подробнее</button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};


const ID = "mainBlock";

const init = function (dataUrl) {
  setValue("mainHeader", "show", true);
  setValue("mainFooter", "show", true);
  makeDOM(universityView(dataUrl), ID);
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
  logoContainer: {
    height: "250px",
  },
  logo: {
    height: "100%",
    width:"100%"
  },
  info: {
    "flex-basis": "70%",
    display: "flex",
    "margin-left": "20px",
    "flex-direction": "column",
    "align-items": "center",
    "justify-content":"space-between",
  },
  itemButton: {
    width: "150px",
    padding: "10px",
    "border-radius": "10px",
  },
  itemDescription: {},
  itemTitle: {
    "font-size": "30px",
    margin: "10px 0",
  },
};
