import { jsx, jsxFrag, Variable, initReload, timersStart, timersStop, init } from "@betarost/cemjs";

const ModalContextMenu = function (data, ID) {
	init(
		null,
		()=>{
			return (
				<div class="c-modal c-modal--open" id="ModalContextMenu">
					<section class="c-modal__dialog">
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