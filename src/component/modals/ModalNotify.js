import { jsx, jsxFrag, Variable, initReload, timersStart, timersStop } from "@betarost/cemjs";

const ModalNotify = function (data, reload) {

	// timersStart("needAuth", () => {
	// Variable.DelModals("ModalNotify");
	// Variable.SetModals({ name: "ModalAuth", data: {} });
	// timersStop("needAuth");
	// }, 1500, "timeout")
	return (
		<div class="c-modal c-modal--open" id="ModalNotify">
			<section class="c-modal__dialog">
				<header class="c-modal__header">
					<h4>Уведомления</h4>
					<button
						type="button"
						class="c-modal__close"
						onclick={() => {
							Variable.DelModals("ModalNotify")
						}}
					></button>
				</header>
				<div class="c-modal__body">
					<div style={`${Variable.notifyWindowShow ? "" : "display: none;"}`} class="user_notifications_block auth_notifications" id="notifications_block">
						<img class="notify_close" src={svg.close} onClick={toggleVisibleNotify} />
						<div class="notifications_title">
							<div class="notifications_titles_line">
								{Variable.lang.text.yourNotification}
								<a data-action="link" href="/user/notify/">{Variable.lang.button.show_all}</a>
							</div>
							<div class="notifications_toggle_block">
								<div data-type='question' onclick={changeCategory} class={currentNotify.question ? 'notifications_toggle_item notifications_toggle_item_active' : 'notifications_toggle_item'}>
									{Variable.lang.text.questions}
								</div>
								<div data-type='awards' onclick={changeCategory} class={currentNotify.awards ? 'notifications_toggle_item notifications_toggle_item_active' : 'notifications_toggle_item'}>
									{Variable.lang.text.awards}
								</div>
								<div data-type='system' onclick={changeCategory} class={currentNotify.system ? 'notifications_toggle_item notifications_toggle_item_active' : 'notifications_toggle_item'}>
									{Variable.lang.text.system}
								</div>
							</div>
						</div>
						<div class="notifications_list">
							<div class="notifications_list_inner">
								<div class="notifications_list_part part_questions">
									{/* <NotifyItem
                                                                    data={notify}
                                                                /> */}
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>
		</div>
	);
};

export default ModalNotify;