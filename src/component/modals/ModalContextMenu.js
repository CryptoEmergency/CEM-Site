import { jsx, jsxFrag, Variable, initReload, timersStart, timersStop, init } from "@betarost/cemserver/cem.js";

const ModalContextMenu = function (data, ID) {
	let close = true
	init(
		null,
		()=>{
			return (
				<div class="c-modal c-modal--open" id="ModalContextMenu" onclick={function(e){ if(close){ 
  
					fn.modals.close(ID)
				  }}}>
					<section class="c-modal__dialog" onmouseover={function(){
           
           close = false
    
         }}
           onmouseleave={function(){
           
           close = true
      
           }}>
						{/* <header class="c-modal__header">
				  <h4></h4>
				</header> */}
						<div class="c-modal__body">
							<ul class="c-actions">
								<li class="c-actions__item">
									<span class="c-text--error">{Variable.lang.select.complain}</span>
								</li>
								<li class="c-actions__item">
									<span class="c-text--error">{Variable.lang.select.complain}</span>
								</li>
								<li class="c-actions__item">
									{Variable.lang.button.subscribe}
								</li>
								<li class="c-actions__item">
									{Variable.lang.select.share}
								</li>
							</ul>
						</div>
						<div class="c-modal__footer">
							<button
								class="c-button c-button--inverse"
								onclick={() => {
									Variable.DelModals("ModalContextMenu");
								}}
							>
								<span class="c-button__wrapper">{Variable.lang.button.reset}</span>
							</button>
						</div>
					</section>
				</div>
			);
		}, ID
	)
};

export default ModalContextMenu;