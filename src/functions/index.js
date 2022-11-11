import { Variable } from "@betarost/cemjs";
import { modals } from "./modals.js"

const fn = {}
fn.modals = modals



fn.test = function () {
  console.log('=f83cf3 FN=', this)
  return true

}

fn.CreateMenuItems = function (data) {

  let menues = []
  let text = "";
  let type = "";
  let color = "";
  let onlyAuth = "";
  let onclick = "";

  if (data && typeof data !== undefined) {
    let Checklength = []
    for (let a in data) {
      Checklength.push(data[a].length)
    }

    let CheckSumm = Checklength.filter((item, index) => {
      return Checklength.indexOf(item) === index
    });

    if (CheckSumm.length <= 1) {
      for (let i = 0; i < CheckSumm[0]; i++) {
        if (data.text[i]) {
          text = data.text[i]
        }
        if (data.type[i]) {
          type = data.type[i]
        }
        if (data.color[i]) {
          color = data.color[i]
        }
        if (data.auth[i]) {
          onlyAuth = data.auth[i]
        }
        if (data.onclick[i]) {
          onclick = data.onclick[i]
        }
        menues.push({ text, type, onlyAuth, color, onclick })
        text = ""
        type = ""
        color = ""
        onlyAuth = ""
        onclick = ""
      }
      return menues
    }
    else {
      console.log("Ошибка в количестве элементов " + Checklength)
    }
  }
}
console.log('=af83ea=', "fn.Staticfn.Staticfn.Staticfn.Staticfn.Staticfn.Staticfn.Staticfn.Static")
fn.Static = {}
fn.Static.mainBlock = {}
fn.Static[8] = { j: 1 }
fn.GetParams = function ({ data, reload = false, ID = "mainBlock", actual = false }) {
  console.log('=0d1e0d=', "fn.GetParams", this.Static[8])
  return [this.Static[8]]
  // if (data) {
  //   console.log('=cbb618=', data.Static)
  //   if (!data.Static) { data.Static = {} }

  //   return [data.Static]
  // }

  // console.log('=131fc9=', Static)

  if (actual) { return [this.Static[ID]] }
  console.log('=303532=actual', actual)
  if (!reload || !this.Static[ID]) {
    console.log('=f1189c===================================', this.Static[ID])
    this.Static[ID] = {};
  }
  console.log('=303532=reload', reload)

  if (!ID) {
    if (!reload) {
      this.Static[ID] = {};
      return [this.Static[ID]];
    } else {
      return [this.Static[ID]];
    }
  }

  return [this.Static[ID]]
}

// fn.GetParams = function ({ data, reload, ID = "mainBlock", actual = false }) {
//   console.log('=131fc9=', this.Static)
//   console.log('=0d1e0d=', "fn.GetParams", data, reload, ID)
//   if (actual) { return this.Static[ID] }
//   if (!reload) { this.Static[ID] = {}; }


//   if (!ID) {
//     if (!reload) {
//       this.Static[ID] = {};
//       return this.Static[ID];
//     } else {
//       return this.Static[ID];
//     }
//   }

//   return this.Static[ID]
// }

export { fn }