import React, { useEffect, useState } from "react";
import axios from "axios";
import { url } from "../functions/Url";
import { useNavigate } from "react-router-dom";
import { Alert, Collapse, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

function Log() {
  const [Name, setName] = useState("");
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showError, setError] = useState(false);
  const navigate = useNavigate();

  function spostaGrafica() {
    var height = document.getElementById("RegForm").clientHeight - 100.8;
    document.getElementById("loginForm").style.paddingBottom =
      height.toString() + "px";
  }

  useEffect(() => {
    if (!loading) {
      spostaGrafica();
    }
  }, [loading]);

  function log() {
    setLoading(true);
    axios
      .get(url + "SearchForUtente.php?P=" + Password + "&E=" + Email)
      .then((response) => {
        setLoading(false);
        if (response.data !== null) {
          localStorage.setItem("IDSiga",response.data["ID"]);
          navigate("/");
        }

        setError(true);
      });
  }

  function Reg() {
    setLoading(true);
    axios
      .put(url + "CreaUtente.php?P=" + Password + "&E=" + Email + "&N=" + Name)
      .then((response) => {
        
        log();

        setError(true);
      });
  }

  return (
    <div>
      <Collapse id="errorContainer" className="alert" in={showError}>
        <Alert
          severity="error"
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                setError(false);
              }}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
          sx={{ mb: 2 }}
        >
          Errore!
          <br />
          Controlla i dati, oppure Registrati!
        </Alert>
      </Collapse>
      <div className="main">
        {loading ? (
          <svg className="pl" width="240" height="240" viewBox="0 0 240 240">
            <circle
              className="pl__ring pl__ring--a"
              cx="120"
              cy="120"
              r="105"
              fill="none"
              stroke="#000"
              strokeWidth="20"
              strokeDasharray="0 660"
              strokeDashoffset="-330"
              strokeLinecap="round"
            ></circle>
            <circle
              className="pl__ring pl__ring--b"
              cx="120"
              cy="120"
              r="35"
              fill="none"
              stroke="#000"
              strokeWidth="20"
              strokeDasharray="0 220"
              strokeDashoffset="-110"
              strokeLinecap="round"
            ></circle>
            <circle
              className="pl__ring pl__ring--c"
              cx="85"
              cy="120"
              r="70"
              fill="none"
              stroke="#000"
              strokeWidth="20"
              strokeDasharray="0 440"
              strokeLinecap="round"
            ></circle>
            <circle
              className="pl__ring pl__ring--d"
              cx="155"
              cy="120"
              r="70"
              fill="none"
              stroke="#000"
              strokeWidth="20"
              strokeDasharray="0 440"
              strokeLinecap="round"
            ></circle>
          </svg>
        ) : (
          <div>
            <input type="checkbox" id="chk" aria-hidden="true" />

            <div className="login" id="loginForm">
              <form className="form">
                <label htmlFor="chk" aria-hidden="true">
                  Log in
                </label>
                <input
                  className="input"
                  type="email"
                  name="email"
                  value={Email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email"
                  required=""
                />
                <input
                  className="input"
                  type="password"
                  name="pswd"
                  value={Password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  required=""
                />
                <button onClick={() => log()}>Log in</button>
              </form>
            </div>

            <div className="register">
              <form className="form" id="RegForm">
                <label htmlFor="chk" aria-hidden="true">
                  Registrazione
                </label>
                <input
                  className="input"
                  type="text"
                  value={Name}
                  onChange={(e) => setName(e.target.value)}
                  name="txt"
                  placeholder="Username"
                  required=""
                />
                <input
                  className="input"
                  type="email"
                  value={Email}
                  onChange={(e) => setEmail(e.target.value)}
                  name="email"
                  placeholder="Email"
                  required=""
                />
                <input
                  className="input"
                  type="password"
                  name="pswd"
                  value={Password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  required=""
                />
                <button onClick={() => Reg()}>Registrati</button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Log;
