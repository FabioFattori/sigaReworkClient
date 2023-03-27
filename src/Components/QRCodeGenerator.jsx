import { Button } from "@mui/material";
import React, { useState } from "react";
import QRCode from "react-qr-code";
import QrCodeIcon from "@mui/icons-material/QrCode";

function QRCodeGenerator() {
  const [show, setState] = useState(false);
  return (
    <div className="column">
      <Button
        style={{ backgroundColor: "var(--purple)" }}
        variant="contained"
        endIcon={<QrCodeIcon />}
        onClick={() => {
          setState(!show);
        }}
      >
        Genera il QR Code
      </Button>
      {show ? (
        <div
          className="main"
          style={{
            marginTop: "20px",
            padding: "10px",
            backgroundColor: "var(--white)",
          }}
        >
          <QRCode
            value={JSON.stringify({ ID: localStorage.getItem("IDSiga") })}
          />

          <div style={{display:"flex",justifyContent: "center"}}>
            <h1>il tuo ID è {localStorage.getItem("IDSiga")}</h1>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default QRCodeGenerator;
