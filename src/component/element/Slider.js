import {
  jsx,
  jsxFrag,
  Variable,
  setValue,
  getValue,
  sendApi,
} from "@betarost/cemjs";
import svg from "@assets/svg/index.js";
import images from "@assets/images/index.js";

let items = [
];



let slideWidth = 742;
let slideIndex = 0;
let posInit = 0;
let posX1 = 0;
let posX2 = 0;
let posFinal = 0;
let posThreshold = slideWidth * 0.35;
let trfRegExp = /[-0-9.]+(?=px)/;
const ID = "mainBlock";

let styles = {
"slider-track": {
  transition: "transform .5s",
  transform: `translate3d(0px, 0px, 0px)`,
},
};

const getEvent = function (e) {
return e.type.search("touch") !== -1 ? e.touches[0] : e;
};

const slide = function () {
setValue(ID, "teststyles", {
  transition: "transform .5s",
  transform: `translate3d(-0px, 0px, 0px)`,
});

console.log('=slideIndex=',slideIndex)
console.log('=slideWidth=',slideWidth)
setValue(ID, "teststyles", {
transition: "transform .5s",
transform: `translate3d(-0px, 0px, 0px)`,
});


styles["slider-track"] = {
  transition: "transform .5s",
  transform: `translate3d(${slideIndex * slideWidth*-1}px, 0px, 0px)`,
}

setValue(ID, "teststyles", {
  transition: "transform .5s",
  transform: `translate3d(${slideIndex * slideWidth*-1}px, 0px, 0px)`,
});console.log('=styles["slider-track"]=',styles["slider-track"])
styles["slider-track"] = getValue(ID,"teststyles")

};

const swipeStart = (e) => {

let evt = getEvent(e);
posInit = posX1 = evt.clientX;
styles["slider-track"] = getValue(ID, "teststyles");
window.addEventListener('mousemove', swipeAction);
window.addEventListener('mouseout', swipeEnd);
};

const swipeAction = function (e) {
// console.log('=swipeAction=',e)
let evt = getEvent(e);
let style = styles["slider-track"].transform;
let transform = +style.match(trfRegExp)[0];
posX2 = posX1 - evt.clientX;
posX1 = evt.clientX;
styles["slider-track"].transform = `translate3d(${
  transform - posX2
}px, 0px, 0px)`;
setValue(ID, "teststyles", {
  transform: `translate3d(${transform - posX2}px, 0px, 0px)`,
});
styles["slider-track"] = getValue(ID, "teststyles");
};

const swipeEnd = function (e) {
window.removeEventListener('mousemove', swipeAction);
window.removeEventListener('mouseout', swipeEnd);
posFinal = posInit - posX1;
if (Math.abs(posFinal) > posThreshold) {
  if (posInit < posX1) {

    slideIndex = slideIndex - 1;
    if(slideIndex<0){
      slideIndex = 0
    }
  } else if (posInit > posX1) {
    slideIndex = slideIndex + 1;
    if(slideIndex > items.length -1){
      slideIndex = items.length -1
    }
  }
}
if (posInit !== posX1) {
  slide();
}
};


const Slider = function ({item}) {

  items = item.media;
  return (
    <div class="sliderContainer">
      <div
        class="slider"
        onTouchStart={swipeStart}
        onMouseDown={swipeStart}
        onTouchMove={swipeAction}
        onTouchEnd={swipeEnd}
        onMouseUp={swipeEnd}
      >
        <div class="slider-list">
          <div class="slider-track" style={styles["slider-track"]}>
            {
           items.map((slide) => {
              return <img src={`/assets/upload/posts/${slide.name}`}class="slide" />;
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export { Slider };

