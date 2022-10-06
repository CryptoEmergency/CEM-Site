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
  
//   let item
  
  const ViewImageOrVideo = function ({item}) {
  
    console.log('=item1=',item)
    return (
      <div class="sliderContainer">
        <div
          class="slider"
        >
          <div class="slider-list">
            <div class="slider-track">
              {
             item.map((slide) => {
                return <img src={`/assets/upload/question/${slide.name}`}class="slide" />;
              })}
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  export { ViewImageOrVideo };
  
  