import { jsx, jsxFrag, Variable, initReload, timersStart, timersStop } from "@betarost/cemjs";

const ModalContextMenuCopy = function (data, reload) {
   let obj = {
	type:1,
	red:2,
	ret:3
   }
	return (
		<div class="c-modal c-modal--open" id="ModalContextMenu">
			<section class="c-modal__dialog">
				{/* <header class="c-modal__header">
          <h4></h4>
        </header> */}
				<div class="c-modal__body">
					<ul class="c-actions">
						
						{
							

							//    Object.keys(obj).map((key) => {
							// 		return (<li  class="c-actions__item">{obj[key]}</li>)
							// 	})
							() => {
								
								if(
									// item.author._id === Variable.myInfo._id
									true
									){
										let tmp =  Object.keys(obj).map((key) => {
											console.log('=896365=',obj[key])
													return (<li  class="c-actions__item">{obj[key]}</li>)
												})
										console.log('=677e2c=',tmp)
										return tmp
										return <p style ={"color:black"}>sadsadasd</p>


								}else{

									return <p>asdasdasdasd</p>


								}
							
						}}












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
							Variable.DelModals("ModalContextMenuCopy");
						}}
					>
						<span class="c-button__wrapper">{Variable.lang.button.reset}</span>
					</button>
				</div>
			</section>
		</div>
	);
};

export default ModalContextMenuCopy;