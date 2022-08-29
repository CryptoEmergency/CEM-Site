import {jsx,jsxFrag,getVariable,setValue,getValue} from '@betarost/cemjs'
import logo from '@assets/image/logo.svg'
import {siteLink} from '@src/router/index.js'

const ID = "mainHeader"

const LanguagesList = function(){
    const languages = getVariable("languages");    
    const listLang = Object.keys(languages).map(function (key){
       return (
        <div>
            <a class="change_language_link" href={"/"+key+"/"} onclick={siteLink}><span>{languages[key].lang_orig}</span></a>
        </div>
        )
    })   
   
    return (
        <div class="change_language_list">
            {listLang}
        </div>   
    )

}

const forExport = function({lang}){
    const langListShow = getValue(ID,"langListShow")
    return(
        <div style={styles.test} class="header-container">
            <div class="header_inner">
                <div class="auth_header_part">
                    <div class="language" onclick={(e) => {
                        e.stopPropagation()
                        setValue(ID,"langListShow",!getValue(ID,"langListShow"))
                         
                        }}>
                        <div class="selectlink">
                            <div class="selectlink-control">{lang.lang_orig}</div>
                        </div>
                    </div>
                    <div 
                        class={`change_language_block ${langListShow ? '' : 'dn'}`} 
                        id="listLanguage"
                        onclick={(e) => {
                            e.stopPropagation()
                            }}>
                        <div class="change_language_title">
                            <h4>{lang.h.modal_listLanguage}</h4>
                        </div>
                        {LanguagesList()}               
                    </div>
                    <a class="log-in link" data-action="loginModal">{lang.button.login}</a>
                    <button type="button" class="button-container sign-up btn" id="registration" data-action="registrationModal">
                         <a href="#" class="btn-gr">
                            <span>{lang.button.registration}</span>
                        </a>
                    </button>
                </div>     
                <div class="header_list">
                    <a href="/" onclick={siteLink}> <img class="logo" src={logo}/></a>
                    <a class="link" href="/contacts/" onclick={siteLink}>{lang.a.contacts}</a>
                    <a class="link" href="/about/" onclick={siteLink}>{lang.a.about}</a>
                    <a class="link" href="/blog/" onclick={siteLink}>{lang.a.blog}</a>
                </div>
            </div>        
        </div>
    )  
}

export default forExport


const styles = {
    header:{
    background: 'red',
    whidth:'100%',
    height:'30px'
    },
    test:{

    }
}