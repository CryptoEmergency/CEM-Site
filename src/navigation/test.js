import {
  jsx,
  jsxFrag,
  getVariable,
  getStorage,
  makeDOM,
  timersStart,
  setValue,
  getValue,
  sendApi,
} from "@betarost/cemjs";
import { checkAnswerApi } from "@src/functions.js";
import images from "@assets/images/index.js";


const testSlider = function () {
  const lang = getVariable("languages")[getStorage("lang")];
  const show = getValue("mainHeader", "show");

  let items = [
    { url: images["about_us_banner1"] },
    { url: images["about_us_banner2"] },
    { url: images["about_us_banner3"] },
    { url: images["about_us_banner4"] },
    { url: images["about_us_banner5"] },
    { url: images["about_us_banner6"] },
    { url: images["about_us_banner7"] },
    { url: images["about_us_banner8"] },
    { url: images["about_us_banner8"] },
    { url: images["project_cover-1"] },
    { url: images["project_cover-2"] },
    { url: images["project_cover-1"] },
    { url: images["project_cover-2"] },
  ];


  // const Slider = function ({ width, height, autoPlay, autoPlayTime }) {
// const [items, setItems] = useState([]);
// const [slide, setSlide] = useState(0);
// const [touchPosition, setTouchPosition] = useState(null);

// setValue(ID, "testSliderTouchPos", null);
// setValue(ID, "testSliderSlide", 0);
let tmp ="right";
  const handleTouchStart = (e) => {
    const touchDown = e.touches[0].clientX;
    setValue(ID, "testSliderTouchPos", touchDown);
    // setTouchPosition(touchDown);
  };

  
  const handleTouchMove = (e) => {
    let touchPosition = getValue(ID, "testSliderTouchPos")
    if (touchPosition === null) {
      return;
    }
    const currentPosition = e.touches[0].clientX;
    const direction = touchPosition - currentPosition;
    if (direction > 10) {
      tmp = "right"
      changeSlide(1);
    }

    if (direction < -10) {
      tmp = "left"
      changeSlide(-1);
      
    }
    
    setValue(ID, "testSliderTouchPos", null);
  };

 
  const changeSlide = (direction = 1) => {
    let slideNumber = 0;
    let slide = getValue(ID, "testSliderSlide")
    if (slide + direction < 0) {
      slideNumber = items.length - 1;
    } else {

      slideNumber = (slide + direction) % items.length;
      
    }
    console.log('=tmp=',tmp)
    console.log(tmp === "left")
    setValue(ID, "testSliderSlide", slideNumber);
  };

  const goToSlide = (number) => {
    console.log("=goToSlide=", goToSlide);
    // setSlide(number % items.length);
  };
 

  let styles = {
    slider: {
      overflow: "hidden",
      position: "relative", 
      width: "742px",
    height: "412px",
    },
    "slider .slide-list": {
      display: "flex",
      height: "100%",
      transition: "transform 0.5s ease-in-out",
      width: "100%",
    },
    "slider .slide-list1": {
      display: "flex",
      height: "100%",
      transition: "transform 0.5s ease-in-out",
      
      width: "100%",
      
        /* animation: R 2.5s linear; */
  /* animation: L 2.5s linear; */
      // transform: `   translateX(-${getValue(ID, "testSliderSlide") * 100}%)` ,
      // transform: ` ${tmp ?  `translateX(${getValue(ID, "testSliderSlide") * 100}%)` :`translateX(-${getValue(ID, "testSliderSlide") * 100}%)` }  ` ,
    },
    "slider .slide": {
      flex: "1 0 100%",
      position: "relative",
    },
    "slider .slide-image": {
      display: "flex",
      margin: "0 auto",
      "max-height": "300px",
      width: "100%",
      "object-fit": "contain",
      "animation": tmp === "left" ? " L 2.5s linear;" : " R 2.5s linear;",
      "animation-direction": normal,
    },

    "slider .slide-title": {
      "text-align": "center",
      " margin-top": "10px",
    },

    
  };

;
  return (<div>
    <div
      style={styles.slider}
      className="slider"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
    >
      {/* <SliderContext.Provider
      value={{
        goToSlide,
        changeSlide,
        slidesCount: items.length,
        slideNumber: slide,
        items,
      }}
    > */}
      {/* <Arrows /> */}
      <div
      className="slide-list"
      style={styles["slider .slide-list"]}
      // style={{ transform: `translateX(-${slideNumber * 100}%)` }}
    >
      {/* {items.map((slide) => (
        <div className="slide"
        style={styles["slider .slide"]}>
        <img src={slide.url}
        style={styles["slider .slide-image"]} className="slide-image" />;
      </div>
      ))} */}
      
        <div className="slide"
        style={styles["slider .slide"]}>
        <img src={items[getValue(ID, "testSliderSlide")].url}
        style={styles["slider .slide-image"]}
         className="slide-image" />;
      </div>
      
    </div>
      {/* <Dots /> */}
    {/* </SliderContext.Provider> */}
    </div>
    <div
      style={styles.slider}
      className="slider"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
    >
      {/* <SliderContext.Provider
      value={{
        goToSlide,
        changeSlide,
        slidesCount: items.length,
        slideNumber: slide,
        items,
      }}
    > */}
      {/* <Arrows /> */}
      <div
      // className="slide-list"
      style={styles["slider .slide-list1"]}
      // class="test"
      // style={{ transform: `translateX(-${slideNumber * 100}%)` }}
    >
      {/* {items.map((slide) => (
        <div className="slide"
        style={styles["slider .slide"]}>
        <img src={slide.url}
        style={styles["slider .slide-image"]} className="slide-image" />;
      </div>
      ))} */}
      
        <div className="slide"
        style={styles["slider .slide"]}>
        <img src={items[getValue(ID, "testSliderSlide")].url}
          class = "test"
        style={styles["slider .slide-image"]}
         className="slide-image" />;
      </div>
      
    </div>
      {/* <Dots /> */}
    {/* </SliderContext.Provider> */}
    </div>
    

    
    
    </div>
  );
};

const ID = "mainBlock";

const defaultInit = async function () {
  setValue("mainHeader", "show", true);
  setValue("mainFooter", "show", true);
};

const afterInit = async function () {};

const init = async function (reload) {
  if (!reload) {
    await defaultInit();
    if (!getValue(ID, "testSliderTouchPos")) {
      setValue(ID, "testSliderTouchPos", null);
    }
    if (!getValue(ID, "testSliderSlide")) {
      setValue(ID, "testSliderSlide", 0);
    }
  }
  await makeDOM(await testSlider(), ID);
  if (!reload) {
    await afterInit();
  }
};

export default init;

