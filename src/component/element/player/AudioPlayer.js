import { jsx, jsxFrag, Variable } from "@betarost/cemserver/cem.js";

import svg from "@assets/svg/index.js";

const lead0 = function (val, n) {
  var nz = "" + val
  while (nz.length < n) {
      nz = "0" + nz
  }
  return nz
}

const formatTime = function (time) {
  let h = Math.floor(time / 3600)
  time = time - h * 3600
  let m = Math.floor(time / 60)
  let s = Math.floor(time % 60)
  return lead0(h, 2) + ":" + lead0(m, 2) + ":" + lead0(s, 2)
}

const AudioPlayer = function ({ Static, item, path }) {
  console.log(Static, item, path)
  if (!Static.elMedia[item._id]) {
    Static.elMedia[item._id] = {}
  }
  let elMedia = Static.elMedia[item._id]
  return (
    <div class="audio_container">
      <audio
        preload="metadata"
        Element={($el) => { elMedia.el = $el; }}
        src={path + item.name}
        onplay={function (e) {
          Object.values(Static.elMedia).forEach((audio)=>{
            if(audio.play && audio != elMedia){
              audio.el.pause()
            }
          })
          elMedia.play = true
          elMedia.controlsPause.src = svg["player_pause"]
          elMedia.controlsPause.classList.remove("paused");
        }}
        onpause={function (e) {
            elMedia.play = false
            elMedia.controlsPause.src = svg["player_play"]
            elMedia.controlsPause.classList.add("paused");
        }}
        onended={function (e) {
          elMedia.play = false
          elMedia.controlsPause.src = svg["player_play"]
          elMedia.controlsPause.classList.add("paused");
        }}
        oncanplay={function (e) {
          if (this.duration === Infinity){
            this.currentTime = 1e101;
            this.ontimeupdate = function() {
                 this.ontimeupdate = () => {
                   return;
                 }
                 this.currentTime = 0;
          }}else{
            elMedia.controlsDuration.innerText = formatTime(this.duration)
          }
        }}
        ontimeupdate={function (e) {
          elMedia.controlsCurrentTime.innerText = formatTime(this.currentTime)
          let progress = Math.floor(this.currentTime) / Math.floor(this.duration);
          elMedia.controlsProgressLine.style.width = progress * 100 + '%'
        }}
      ></audio>
      <div class="controls">
        <img
          src={svg["player_play"]}
          class="playpause paused"
          Element={($el) => { elMedia.controlsPause = $el; }}
          onclick={function (e) {
            e.stopPropagation();
            elMedia.el.paused ? elMedia.el.play() : elMedia.el.pause();
          }}
        />
        <span class="progress_player">
          <span
            class="total_player"
            onclick={function (e) {
              e.stopPropagation()
              let elem
              if (e.target.className === "current") {
                  elem = e.target.parentElement
              } else {
                  elem = e.target
              }
              let progress = Math.floor(e.offsetX) / Math.floor(elem.clientWidth);
              elMedia.controlsProgressLine.style.width = progress * 100 + '%'
              elMedia.el.currentTime = elMedia.el.duration * progress
            }}
          >
            <span Element={($el) => { elMedia.controlsProgressLine = $el; }} class="current">
              ​
            </span>
          </span>
        </span>
        <span class="time">
          <span Element={($el) => { elMedia.controlsCurrentTime = $el; }} class="currentTime">
            00:00:00
          </span>{" "}
          /
          <span Element={($el) => { elMedia.controlsDuration = $el; }} class="duration">
            00:00:00
          </span>
        </span>
        <span class="volume">
          <img
            src={svg["player_dynamic_on"]}
            class="dynamic"
            onclick={function (e) {
              e.stopPropagation();
              elMedia.el.muted = !elMedia.el.muted
              if (elMedia.el.muted) {
                  this.src = svg["player_dynamic_off"];
                  this.classList.add("off");
              } else {
                  this.src = svg["player_dynamic_on"];
                  this.classList.remove("off");
              }
            }}
          />
        </span>
      </div>
    </div>
  );
};

export { AudioPlayer };
