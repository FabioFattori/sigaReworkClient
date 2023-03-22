import { GetDate, GetSigs } from "./GetDataForChart";

function Check() {
    console.log(GetDate())
  if (GetDate().length <= 2) {
    return;
  } else {
    if(GetSigs()[2]>GetSigs()[1]){
          //TODO
    }else{
        console.log("coglion")
    }
  }
}

export {Check}