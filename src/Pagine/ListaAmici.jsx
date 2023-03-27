import axios from "axios";
import React, { useEffect, useState } from "react";
import { url } from "../functions/Url";
import { getKey } from "../functions/Key";
import TabellaUser from "../Components/TabellaUser";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { IconButton } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { QrCodeReader } from "../Components/QRCodeReader";
import QRCodeGenerator from "../Components/QRCodeGenerator";

function ListaAmici() {
  const navigation = useNavigate();
  const [Amici, setAmici] = useState([]);
  var volte = 0;

  useEffect(() => {
    if (volte === 0) {
      axios
        .get(url + "GetAmicizie.php?I=" + localStorage.getItem("IDSiga"))
        .then((response) => {
          response.data.forEach((SingleID) => {
            axios
              .get(
                url +
                  "GetUserViaID.php.php?I=" +
                  SingleID["ID_Amico"] +
                  "&aacc=" +
                  getKey()
              )
              .then((response) => {
                setAmici((current) => [...current, response.data]);
              });
          });
        });
      volte--;
    }
  }, []);

  return (
    <div className="AllContainer">
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: "20px",
        }}
      >
        <IconButton
          aria-label="delete"
          onClick={() => navigation("/")}
          size="large"
        >
          <ArrowBackIcon className="iconMenu" />
        </IconButton>
      </div>
      <form className="form" id="RegForm">
        <label htmlFor="chk" aria-hidden="true">
          Classifica tra te ed i tuoi amici!
        </label>
      </form>
      <div className="rowOfContent">
        <div className="main" style={{ color: "#fff" }}>
          <h1 style={{ display: "flex", justifyContent: "center" }}>
            Modalità Ciminiera
          </h1>
          <TabellaUser
            Friends={Amici}
            Mode="Ciminiera"
            style={{ backgroundColor: "black" }}
          />
        </div>
        <div className="main" style={{ color: "#fff" }}>
          <h1 style={{ display: "flex", justifyContent: "center" }}>
            Modalità HealtCare
          </h1>
          <TabellaUser Friends={Amici} Mode="HealtCare" />
        </div>
      </div>
      <form className="form" id="RegForm">
        <label htmlFor="chk" aria-hidden="true">
          Aggiungi i tuoi amici oppure fatti aggiungere:
        </label>
      </form>
      <div className="rowOfContent qr">
        <QrCodeReader />
        <QRCodeGenerator />
      </div>
    </div>
  );
}

export default ListaAmici;
