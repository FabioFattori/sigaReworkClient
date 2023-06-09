import axios from "axios";
import { url } from "./Url";

var arrDate = [];
var arrSiga = [];

function GetData(ID) {
  arrDate = [];
  arrSiga = [];
  axios.get(url + "GetAllnSigaOfUser.php?I=" + ID).then((response) => {
    response.data.forEach((element) => {
      arrDate.push(element["Giorno"]);
      arrSiga.push(element["nSiga"]);
    });
  });
}

function GetDate() {
  return arrDate;
}

function GetSigs() {
  return arrSiga;
}

export { GetDate, GetSigs, GetData };
