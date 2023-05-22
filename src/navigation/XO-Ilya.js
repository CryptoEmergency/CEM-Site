import {
    initReload,
    jsx,
    jsxFrag,
    load,
    CEM,
  } from "@betarost/cemserver/cem.js";
  let rows = 3; 
  let cols = 3; 
  let arrGame = [-1, -1, -1, -1, -1, -1, -1, -1, -1] 
  let whoWay = 1 
  const { images, svg, fn } = CEM 
  const start = function (data, ID) { 
      function getRandomInt(max) { 
          return Math.floor(Math.random() * max); 
      } 
      function autoWay() { 
          if (whoWay == 1) { 
              alert('Не твой ход') 
              return; 
          } 
          // console.log(getRandomInt(9)) 
   
          let rn = getRandomInt(9) 
          if (arrGame[rn] == -1) { 
              arrGame[rn] = 0 
              whoWay = 1 
              initReload() 
          } 
          else { 
              autoWay() 
          } 
   
      } 
      let [Static] = fn.GetParams({ data, ID }); 
      load({ 
          ID, 
          fn: () => { 
            function initializeGame() {
                cells.forEach(cell => {
                    cell.addEventListener("click", clickCell);
                });
                restartButton.addEventListener("click", restartGame);
            }
          
              return ( 
                  <div class='c-main__body'> 
                  
                      <div id="game-container">
                  
                
                      <div class="start__pr"> 
                              Практическая работа в Crypto Emergency 
                          </div> 
                          <div class="start__game"> 
                              Крестики-нолики 
                          </div> 
                          <div class="stats_main"> 
                              <div class="stats_1"> 
                                  Статистика: 
                                  <div class="stats_2"> 
                                      <div>пор:{ } </div> 
                                      <div>поб:{ } </div> 
                                      <div>ничья:{ } </div> 
   
                                  </div> 
                                  <div></div> 
                                  <div class="stats_view_pr"> 
                                      <div class="stats_view"> число </div> 
                                      <div class="stats_view"> число </div> 
                                      <div class="stats_view"> число </div> 
                                  </div> 
                              </div> 
                              <button class="see-rest"> Показать ряд </button> 
                          </div> 
        <h1 id="winner"></h1>

        <div id="cells-container">
            <div class="cell" data-cell-index="0"></div>
            <div class="cell" data-cell-index="1"></div>
            <div class="cell" data-cell-index="2"></div>
            <div class="cell" data-cell-index="3"></div>
            <div class="cell" data-cell-index="4"></div>
            <div class="cell" data-cell-index="5"></div>
            <div class="cell" data-cell-index="6"></div>
            <div class="cell" data-cell-index="7"></div>
            <div class="cell" data-cell-index="8"></div>
        </div>

        <p id="turn-info"></p>
        <button id="restart-button">Restart</button>
    </div>
    
                       
                  
   <div class="wi_lo"> 
       <div>Выйграл-{ }</div> 
       <div>Проиграл-{ }</div> 
   </div> 
   
  </div>   
  
  ); 
  }, 
  }); 
  };
  export default start;
  