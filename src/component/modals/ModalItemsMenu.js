import {
	jsx,
	jsxFrag,
	Variable,
} from "@betarost/cemjs";

const ModalItemsMenu = function ({ items }) {
	return (
		<div class="c-modal c-modal--open" id="ModalContextMenu">
			<section class="c-modal__dialog">
				<div class="c-modal__body">
					<ul class="c-actions">
						{() => {
							if (items && items.length) {
								const arrReturn = items.map((item) => {
									if (item.color) {
										return (
											<li
												class="c-actions__item"
												onclick={function () {
													Variable.DelModals("ModalItemsMenu");
													item.onclick()
												}
												}>
												<span class={item.color == "red" ? "c-text--error" : item.color == "green" ? "c-text--green" : null}>{item.text}</span>
											</li>
										)
									} else {
										return (
											<li
												class="c-actions__item"
												onclick={function () {
													Variable.DelModals("ModalItemsMenu");
													item.onclick()
												}}>
												{item.text}
											</li>
										)
									}
								})
								return arrReturn
							}
						}}
					</ul>
				</div>
				<div class="c-modal__footer">
					<button
						class="c-button c-button--inverse"
						onclick={() => {
							Variable.DelModals("ModalItemsMenu");
						}}					>
						<span class="c-button__wrapper">{Variable.lang.button.reset}</span>
					</button>
				</div>
			</section>
		</div>
	);
};
export default ModalItemsMenu;