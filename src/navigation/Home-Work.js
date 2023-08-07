import {
  jsx,
  jsxFrag,
  init,
  Variable,
  initReload,
  load,
  CEM
} from "@betarost/cemserver/cem.js";
const { images, svg, fn } = CEM


let my_favoite_songs = 'Waste a Moment, Staying\' Alive, A Sorta Fairytale, Startt Me Up, New Salvation'
let string = my_favoite_songs.split(" ")
const start = function (data, ID) {
  load({
    ID,
    fn: () => {
      console.log('=3b30b5=', my_favoite_songs,my_favoite_songs.length )
      console.log('=3b30234=', string[0],string[1],string[2])
      console.log('=3b30b5=',my_favoite_songs.slice(65,78))
      console.log('=3b30b5=',my_favoite_songs.slice(15,30))
      console.log('=3b30b5=',my_favoite_songs.slice(51,63,))
      return (
        <div class='c-main__body'>
          

        </div>
      );
    },
  });
};

export default start;
