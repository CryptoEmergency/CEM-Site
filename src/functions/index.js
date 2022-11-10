import { modals } from "./modals.js"

const fn = {}
fn.modals = modals



fn.test = function () {
    console.log('=f83cf3 FN=', this)
    return true

}

fn.CreateMenuItems = function (data){

    let menues = []
    let text = "";
    let type = "";
    let color = "";
    let onlyAuth = "";
    let onclick = "";
    
    if(data && typeof data !== undefined )
    {
    let Checklength = []
    for(let a in data)
    {
      Checklength.push(data[a].length)
    }
    
    let CheckSumm = Checklength.filter((item, index) => {
      return Checklength.indexOf(item) === index
    });
    
    if(CheckSumm.length <= 1)
    {
    for(let i=0; i<CheckSumm[0]; i++)
    {
      if(data.text[i])
      {
        text=data.text[i]
      }
      if(data.type[i])
      {
        type = data.type[i]
      }
      if(data.color[i])
      {
        color = data.color[i]
      }
      if(data.auth[i])
      {
        onlyAuth = data.auth[i]
      }
      if(data.onclick[i])
      {
        onclick = data.onclick[i]
      }
      menues.push({text,type,onlyAuth,color,onclick})
      text = ""
      type = ""
      color = ""
      onlyAuth = ""
      onclick = ""
    }
       return menues
      }
      else
      {
        console.log("Ошибка в количестве элементов "+ Checklength)
      }
    }
    }

export { fn }