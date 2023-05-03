import {
	jsx,
	jsxFrag,
	Variable,
	init,
	load,
	CEM
} from "@betarost/cemserver/cem.js";
// import { fn } from "@src/functions/index.js";

const fn = CEM.fn

const arrMyAction = ["share", "copyurl", "edit", "delete", "closequestion", "bestquestion"]
const arrVisitorAction = ["addanswer", "share", "copyurl", "subscription", "complainItem", "complainUser", "blackList"]
const arrRoleAction = ["deleteRole"]

const ModalItemsMenu = function ({ items, author }, ID) {
	let close = true
	load({
		ID,
		fn: () => {
			return (
				<div class="c-modal c-modal--open" id="ModalContextMenu" onclick={function (e) {
					if (close) {

						fn.modals.close(ID)
					}
				}}>
					<section class="c-modal__dialog" onmouseover={function () {

						close = false

					}}
						onmouseleave={function () {

							close = true

						}}>
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
															onclick={function (e) {
																Variable.DelModals("ModalItemsMenu");
																item.onclick(e)
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
								{/* <li
									class="c-actions__item"
									onclick={function () {
										Variable.DelModals("ModalItemsMenu");
									}
									}>
									<span class="c-button__wrapper">{Variable.lang.button.reset}</span>
								</li> */}
							</ul>
						</div>
						<div class="c-modal__footer">
							<button
								class="c-button c-button--inverse"
								onclick={() => {
									fn.modals.close(ID)
									// Variable.DelModals("ModalItemsMenu");
								}}					>
								<span class="c-button__wrapper">{Variable.lang.button.reset}</span>
							</button>
						</div>
					</section>
				</div>
			);
		}
	})
};
export default ModalItemsMenu;