import { jsx, jsxFrag, Variable } from "@betarost/cemjs";
import { checkAnswerApi } from "@src/functions.js";

import svg from "@assets/svg/index.js";

let controlPlaypause = function (e, mainElement) {
  e.stopPropagation();
  mainElement().paused ? mainElement().play() : mainElement().pause();
};

let controlDynamicClick = function (e, mainElement) {
  e.stopPropagation();
  let el = e.target;
  if (el.classList.length > 1) {
    el.classList.remove("off");
    el.src = svg["player_dynamic_on"];
  } else {
    el.classList.add("off");
    el.src = svg["player_dynamic_off"];
  }
  mainElement().muted = !mainElement().muted;
};

let playerPlay = function (e) {
  let element = e.target.nextElementSibling.childNodes[0];
  element.src = svg["player_pause"];
  element.classList.toggle("paused");
};
let playerPause = function (e) {
  let element = e.target.nextElementSibling.childNodes[0];
  element.src = svg["player_play"];
  element.classList.toggle("paused");
};

let playerEnded = function (e) {
  e.target.pause();
  let element = e.target.nextElementSibling.childNodes[0];
  element.src = svg["player_play"];
  element.classList.toggle("paused");
};

let playerCanplay = function (e, mainElement, fullTime) {
 if (mainElement().duration === Infinity){
   mainElement().currentTime = 1e101;
   mainElement().ontimeupdate = function() {
        this.ontimeupdate = () => {
          return;
        }
        mainElement().currentTime = 0;
 }}else{
  fullTime().innerText = formatTime(mainElement().duration);
 }
};

let playerTimeupdate = function (e, currentTime, progressLine) {
  currentTime().innerText = formatTime(e.target.currentTime);
  let progress =
    Math.floor(e.target.currentTime) / Math.floor(e.target.duration);
  progressLine().style.width = progress * 100 + "%";
};
let formatTime = function (time) {
  let h = Math.floor(time / 3600);
  time = time - h * 3600;
  let m = Math.floor(time / 60);
  let s = Math.floor(time % 60);
  return h.lead0(2) + ":" + m.lead0(2) + ":" + s.lead0(2);
};
Number.prototype.lead0 = function (n) {
  var nz = "" + this;
  while (nz.length < n) {
    nz = "0" + nz;
  }
  return nz;
};

let controlTotalClick = function (e, progressLine, currentTime, mainElement) {
  e.stopPropagation();
  let elem;
  if (e.target.className === "current") {
    elem = e.target.parentElement;
  } else {
    elem = e.target;
  }
  let progress = Math.floor(e.offsetX) / Math.floor(elem.clientWidth);
  let tmp = mainElement().duration * progress;
  progressLine().style.width = progress * 100 + "%";
  mainElement().currentTime = tmp;
};

const AudioPlayerCopy = function ({ item, numIndex, index, path, elem,el }) {
  let mainElement =elem ? elem[numIndex][index] : el[index];
  let fullTime = Variable.setRef();
  let currentTime = Variable.setRef();
  let progressLine = Variable.setRef();
  return (
    <div id={item._id || ""} class="audio_container">
      {/* <audio preload="none" onended="playerEnded(event, this)" onplay="playerPlay(event, this)" onpause="playerPause(event, this)" oncanplay="playerCanplay(event, this)" ontimeupdate="playerTimeupdate(event, this)" src="{{path}}{{src}}"></audio> */}
      <audio
        preload="metadata"
        ref={elem? elem[numIndex][index] :  el[index]}
        onended={(e) => playerEnded(e)}
        onplay={(e) => playerPlay(e)}
        onpause={(e) => playerPause(e)}
        oncanplay={(e) => playerCanplay(e, mainElement, fullTime)}
        ontimeupdate={(e) => playerTimeupdate(e, currentTime, progressLine)}
        src={path + item.name}
      ></audio>
      <div class="controls">
        <img
          src={svg["player_play"]}
          class="playpause paused"
          onclick={(e) => {
            controlPlaypause(e, mainElement);
          }}
        />
        <span class="progress_player">
          <span
            class="total_player"
            onclick={(e) =>
              controlTotalClick(e, progressLine, currentTime, mainElement)
            }
          >
            <span ref={progressLine} class="current">
              ​
            </span>
          </span>
        </span>
        <span class="time">
          <span ref={currentTime} class="currentTime">
            00:00:00
          </span>{" "}
          /
          <span ref={fullTime} class="duration">
            00:00:00
          </span>
        </span>
        <span class="volume">
          <img
            src={svg["player_dynamic_on"]}
            class="dynamic"
            onclick={(e) => {
              controlDynamicClick(e, mainElement);
            }}
          />
        </span>
      </div>
    </div>
  );
};

export { AudioPlayerCopy };
