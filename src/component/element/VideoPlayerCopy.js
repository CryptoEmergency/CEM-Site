import { jsx, jsxFrag, Variable, initOne } from "@betarost/cemjs";

import svg from "@assets/svg/index.js";
import images from "@assets/images/index.js";

let controlPlaypause = function (e, mainElement) {
  e.stopPropagation();
  mainElement().paused ? mainElement().play() : mainElement().pause();
};

const  openFullscreen = (e) => {
    if (e.target.requestFullscreen) {
      e.target.requestFullscreen()
    } else if (e.target.webkitRequestFullscreen) {
      e.target.webkitRequestFullscreen()
    } else if (e.target.msRequestFullscreen) { 
      e.target.msRequestFullscreen()
    }
}
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
  }
  let playerPause = function (e) {
    let element = e.target.nextElementSibling.childNodes[0];
    element.src = svg["player_play"];
    element.classList.toggle("paused");
  } 
  
  let playerEnded = function (e) {
    e.target.pause();
    let element = e.target.nextElementSibling.childNodes[0];
    element.src = svg["player_play"];
    element.classList.toggle("paused");
  }

  let playerCanplay = function (e,mainElement,fullTime) {
    fullTime().innerText = formatTime(mainElement().duration)
  }

  let playerTimeupdate = function (e,currentTime,progressLine) {
    currentTime().innerText = formatTime(e.target.currentTime)
    let progress = Math.floor(e.target.currentTime) / Math.floor(e.target.duration);
    progressLine().style.width = progress * 100 + '%'
  }
  let formatTime = function (time) {
    let h = Math.floor(time / 3600)
    time = time - h * 3600
    let m = Math.floor(time / 60)
    let s = Math.floor(time % 60)
    return h.lead0(2) + ":" + m.lead0(2) + ":" + s.lead0(2)
  }
  Number.prototype.lead0 = function (n) {
    var nz = "" + this
    while (nz.length < n) {
      nz = "0" + nz
    }
    return nz
  }
  
  let controlTotalClick = function (e, progressLine,currentTime,mainElement) {
    e.stopPropagation()
    let elem
    if(e.target.className === "current"){
      elem = e.target.parentElement
    }else {
      elem = e.target
    }
    let progress = Math.floor(e.offsetX) / Math.floor(elem.clientWidth);
    let tmp = mainElement().duration *progress
    progressLine().style.width = progress * 100 + '%'
    mainElement().currentTime = tmp
  }

const VideoPlayerCopy = function ({ item, numIndex, index, path, elem }) {
  initOne(() => {
    // video = Variable.setRef()
  });
  let mainElement = elem[numIndex][index];
  let fullTime = Variable.setRef()
  let currentTime = Variable.setRef()
  let progressLine = Variable.setRef()
  return (
    <div
      class="video_container"
      onclick={(e) => {
          controlPlaypause(e,mainElement)
         }}
    >
      {/* <video playsinline poster={images["video_background"]} preload="metadata" onended="playerEnded(event, this)" onplay="playerPlay(event, this)" onpause="playerPause(event, this)" oncanplay="playerCanplay(event, this)" ontimeupdate="playerTimeupdate(event, this)" onclick="controlPlayerClick(event, this)" ondblclick="openFullscreenThis(event, this)" src={path + item.name}></video> */}
      <video
        playsinline
        poster={images["video_background"]}
        preload="metadata"
        src={path + item.name}
        ref={elem[numIndex][index]}
        onended={(e) => playerEnded(e)}
        onplay={(e) => playerPlay(e)}
        onpause={(e) => playerPause(e)}
        oncanplay={(e) => playerCanplay(e,mainElement,fullTime)}
        ontimeupdate={(e) => playerTimeupdate(e,currentTime,progressLine)}
        ondblclick={openFullscreen}
      ></video>

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
          
            onclick={(e) => controlTotalClick(e,progressLine,currentTime,mainElement)}
          >
            <span 
              ref = {progressLine}
            class="current">​</span>
          </span>
        </span>
        <span class="time">
          <span
          ref = {currentTime}
          class="currentTime">00:00:00</span> /
          <span
          ref = {fullTime}
           class="duration">00:00:00</span>
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
        {/* <span class="player_fullsize" style="display: none;">
          <img
            src={svg["player_fullsize_on"]}
            dblclick={openFullscreen}
          />
        </span> */}
      </div>
    </div>
  );
};

export { VideoPlayerCopy };
