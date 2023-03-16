import { Button, Tab, Tabs, TextField } from "@mui/material";
import React, { useState } from "react";
import m1 from "../img/mountain1.jpg";
import m2 from "../img/mountain2.jpg";

function Log() {
  const [Selecetion, setSelecetion] = useState(false); //0 => login | 1 => registration
  const [Name, setName] = useState("");
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");

  const handleChange = (event, newValue) => {
    setSelecetion(newValue);
  };

  return (
    <div>
      <Tabs
        value={Selecetion}
        onChange={handleChange}
        textColor="secondary"
        indicatorColor="secondary"
        aria-label="secondary tabs example"
      >
        <Tab value={true} label="Item One" />
        <Tab value={false} label="Item Two" />
      </Tabs>
      {Selecetion ? (
        <div className="InputBox">
          <div className="input">
            <TextField
              id="standard-basic"
              value={Email}
              onChange={(e) => setEmail(e.target.value)}
              label="Email"
              variant="standard"
            />
            <TextField
              id="standard-basic"
              label="Password"
              value={Password}
              onChange={(e) => setPassword(e.target.value)}
              variant="standard"
            />
            <Button variant="contained">Invia</Button>
          </div>
          
            <img className="img" src={m1} alt="m1" />
          
        </div>
      ) : (
        <div className="InputBox">
          <div className="input">
            <TextField
              id="standard-basic"
              label="Nome"
              value={Name}
              onChange={(e) => setName(e.target.value)}
              variant="standard"
            />
            <TextField
              id="standard-basic"
              label="Email"
              value={Email}
              onChange={(e) => setEmail(e.target.value)}
              variant="standard"
            />
            <TextField
              id="standard-basic"
              label="Password"
              value={Password}
              onChange={(e) => setPassword(e.target.value)}
              variant="standard"
            />
            <Button variant="contained">Invia</Button>
          </div>
            <img className="img" src={m2} alt="m2" />
          
        </div>
      )}
    </div>
  );
}

export default Log;
