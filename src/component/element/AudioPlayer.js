import {
  jsx,
  jsxFrag,
  Variable
} from "@betarost/cemjs";
import { checkAnswerApi } from "@src/functions.js";

import svg from "@assets/svg/index.js";


var controlPlaypause = function (e) {
  togglePlayback(e.target.offsetParent.offsetParent.firstChild)
}

let togglePlayback = function (player) {
  (player.paused) ? player.play() : player.pause()
}

let playerPlay = function (e) {
  let element = e.target.nextElementSibling.childNodes[0];
  element.src = svg["player_pause"];
  element.classList.toggle("paused");
}
let playerEnded = function (e) {
  e.target.pause();
  let element = e.target.nextElementSibling.childNodes[0];
  element.src = svg["player_play"];
  element.classList.toggle("paused");
}

let playerPause = function (e, target) {
  let element = e.target.nextElementSibling.childNodes[0];
  element.src = svg["player_play"];
  element.classList.toggle("paused");
}

let controlDynamicClick = function (e) {
  let element = e.target
  if (element.classList.length > 1) {
    element.classList.remove("off");
    element.src = svg["player_dynamic_on"];
  } else {
    element.classList.add("off");
    element.src = svg["player_dynamic_off"];
  }
  element.offsetParent.offsetParent.firstChild.muted = !element.offsetParent.offsetParent.firstChild.muted
}

let playerCanplay = function (e) {
  console.log('=playerCanplay=', e)
  // let element = e.target;
  // if (element.duration === Infinity) {
  //     element.currentTime = 1e101;
  //     element.ontimeupdate = function() {
  //     this.ontimeupdate = () => {
  //       return;
  //     }
  //     $(element).parent().find('.duration').text(formatTime(element.duration)) 
  //     element.currentTime = 0;
  //     element.addEventListener('timeupdate', function(){
  //       playerTimeupdate(e, target)
  //     })
  //   }
  // }else{
  //   $(element).parent().find('.duration').text(formatTime(target.duration))  
  // }    
}
let playerTimeupdate = function (e, target) {
  e.target.nextElementSibling.childNodes[2].childNodes[0].innerText = formatTime(e.target.currentTime)
  let progress = Math.floor(e.target.currentTime) / Math.floor(e.target.duration);
  e.target.nextElementSibling.childNodes[1].childNodes[0].childNodes[0].style.width = progress * 100 + '%'
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

let controlTotalClick = function (e, target) {
  console.log('=controlTotalClick=', e)
  let parentsOffset = 0
  let nextParent = e.target.offsetParent
  while (nextParent != null) {
    parentsOffset = parentsOffset + nextParent.offsetLeft
    nextParent = nextParent.offsetParent
  }
  let x = (e.pageX - (e.target.offsetLeft + parentsOffset)) / e.target.offsetWidth
  console.log("parent66s", e.target.offsetParent.offsetParent.childNodes[0].currentTime)
  // e.target.offsetParent.offsetParent.childNodes[0].currentTime = x * 
  // $(target).parent().parent().prev()[0].currentTime = x * $(target).parent().parent().prev()[0].duration
  // $(target).parent().parent().find('.currenttime').text(formatTime($(target).parent().parent().prev()[0].currentTime))
}
const AudioPlayer = function ({item, type = "posts"} ) {
//временно проверить посты
let audioObj
console.log('=item=',item)
console.log('=type=',type)
if (type !== "posts"){
   audioObj = item[0];
}else{
   audioObj = item.item;
}
 
  return (
    
    <div data-type={audioObj.type} data-name={audioObj.name} id={audioObj._id} data-id={audioObj._id} class="audio_container">
      {/* <audio preload="none" onended="playerEnded(event, this)" onplay="playerPlay(event, this)" onpause="playerPause(event, this)" oncanplay="playerCanplay(event, this)" ontimeupdate="playerTimeupdate(event, this)" src="{{path}}{{src}}"></audio> */}
      <audio preload="none" onended={(e) => playerEnded(e)} onplay={(e) => playerPlay(e)} onpause={(e) => playerPause(e)}
        oncanplay={(e) => playerCanplay(e)} ontimeupdate={(e) => playerTimeupdate(e)} src={`/assets/upload/${type}/${audioObj.name}`} >
      </audio>
      <div class="controls">
        <img src={svg["player_play"]} class="playpause paused"
          onclick={(e) => controlPlaypause(e)}
        />
        <span class="progress_player">
          <span class="total_player"
            onclick={(e) => controlTotalClick(e)}
          >
            <span class="current">​</span>
          </span>
        </span>
        <span class="time">
          <span class="currentTime">00:00:00</span> /
          <span class="duration">00:00:00</span>
        </span>
        <span class="volume">
          <img src={svg["player_dynamic_on"]} class="dynamic"
            onclick={(e) => controlDynamicClick(e)}
          />
        </span>
      </div>
    </div>
  )
}





export { AudioPlayer }