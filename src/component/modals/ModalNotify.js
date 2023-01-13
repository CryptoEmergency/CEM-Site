import {
	jsx,
	jsxFrag,
	Variable,
	initReload,
	initOne,
	sendApi,
	Helpers,
	init
} from "@betarost/cemjs";
import svg from "@assets/svg/index.js";
import { NotifyItem } from '@component/element/NotifyItem.js';
import { fn } from "@src/functions/index.js";

let notify, currentNotify;



const ModalNotify = async function (data, ID) {

	const changeCategory = async function () {
		if (currentNotify[this.dataset.type]) {
			return
		}
		switch (this.dataset.type) {
			case 'question':
				currentNotify = {
					question: true,
					awards: false,
					system: false
				}
				notify = Variable.myInfo.notifyQuestions
				break;
			case 'awards':
				currentNotify = {
					question: false,
					awards: true,
					system: false
				}
				notify = Variable.myInfo.notifyAwards
				break;
			case 'system':
				currentNotify = {
					question: false,
					awards: false,
					system: true
				}
				notify = Variable.myInfo.notifySystem
				break;
		}
		// console.log('=d68221=', currentNotify)
		initReload()
	}
	let close = true
	init(
		() => {
			notify = Variable.myInfo.notifyQuestions;

			currentNotify = {
				question: true,
				awards: false,
				system: false
			};
			
		},
		() => {
	
			// console.log(notify)
			return (
				<div class="c-modal c-modal--open" id="ModalNotify" onclick={function(e){	
					 if(close){ 
 
					fn.modals.close(ID)
				  }}}>
					<section class="c-modal__dialog" onmouseover={function(){
        
		   close = false
	

		 }}
		   onmouseleave={function(){
			
			close = true

		   }}>
						{/* <header class="c-modal__header">
							<h4>Уведомления</h4>
							<button
								type="button"
								class="c-modal__close"
								onclick={() => {
									Variable.DelModals("ModalNotify")
								}}
							></button>
						</header>
						<div class="c-modal__body"> */}
						<img
							class="notify_close"
							src={svg.close}
							onclick={() => {
								fn.modals.close(ID)
								// Variable.DelModals("ModalNotify")
							}}
						/>
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
									<NotifyItem
										data={notify}
									/>
								</div>
							</div>
						</div>
						{/* </div> */}
					</section>
				</div>
			);
		}, ID
	)


};

export default ModalNotify;