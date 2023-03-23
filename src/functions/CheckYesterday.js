import { GetDate, GetSigs } from "./GetDataForChart";

function Check() {
  if (GetSigs()[GetSigs().length - 1] === 0) {
    return false;
  } else {
    if (GetDate().length <= 2) {
      return false;
    } else {
      if (GetSigs()[GetSigs().length - 3] > GetSigs()[GetSigs().length - 2]) {
        return true;
      } else {
        return false;
      }
    }
  }
}

export { Check };
