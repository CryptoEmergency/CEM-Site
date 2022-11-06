Static = {
    isValid: false,
    messageSent: false
  }
 
 

  Static.name = {
    value:"",
    valid: false,
    error: false,
    label: Variable.myInfo.nickname,
    placeholder: Variable.lang.placeholder.name,
    errorText: Variable.lang.error_div.nicknameErr,
    condition:(value) => {
      return validator.matches(value, /[a-zA-Zа-яА-Яё\d]{2,500}/i);
    },
    afterValid:() => {
        
      checkValid(Static,["name","email","text"])
    
   }
    }
    
 

  Static.email = {
    value: "",
    valid: false,
    error: false,
    label: Variable.lang.label.email,
    placeholder: Variable.lang.placeholder.email,
    errorText: Variable.lang.error_div.wrong_email,
    type: "text",
    condition: (value) => {
        return validator.isEmail(value);
    },
    afterValid:() => {
        
      checkValid(Static,["name","email","text"])
    
   }
}


  Static.text = {
    value: "",
    valid: false,
    error: false,
  }

  if (Variable.myInfo.nickname) {
    Static.name.value = Variable.myInfo.nickname
    Static.name.valid = true
  }

  if (Variable.myInfo.email) {
    Static.email.value = Variable.myInfo.email
    Static.email.valid = true
  }