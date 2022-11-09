import {
	jsx,
	jsxFrag,
	Variable,
} from "@betarost/cemjs";

const arrMyAction = ["share","copyurl", "edit", "delete"]
const arrVisitorAction = ["addanswer","share","copyurl", "subscription", "complainItem", "complainUser", "blackList"]
const arrRoleAction = ["deleteRole"]

const ModalItemsMenu = function ({ items, author }) {
	return (
		<div class="c-modal c-modal--open" id="ModalContextMenu">
			<section class="c-modal__dialog">
				<div class="c-modal__body">
					<ul class="c-actions">
						{() => {
							if (items && items.length) {
								const arrReturn = items.map((item) => {
									if (Variable.auth && Variable.myInfo && author && Variable.myInfo._id == author._id) {
										if (arrMyAction.includes(item.type)) {
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
										}

									} else if (arrVisitorAction.includes(item.type) && (!item.onlyAuth || Variable.auth)) {
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
										if (Variable.auth && Variable.myInfo && Variable.myInfo.status && Variable.myInfo.status.role && arrRoleAction.includes(item.type)) {
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
										}
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