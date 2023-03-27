import { Alert, Button, Collapse, IconButton } from "@mui/material";
import React, { Component } from "react";
import QrReader from "modern-react-qr-reader";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import axios from "axios";
import { url } from "../functions/Url";
import CloseIcon from "@mui/icons-material/Close";

class QrCodeReader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      typeOfAllert: "error",
      messaggeOfAllert: "",
      showAllert: false,
      id: 0,
      show: false,
      errore: false,
      delay: 100,
      result: "No result",
    };

    this.handleScan = this.handleScan.bind(this);
    this.handleError = this.handleError.bind(this);
  }

  Request(data) {
    axios
      .put(
        url +
          "CreaAmicizia.php?I1=" +
          localStorage.getItem("IDSiga") +
          "&I2=" +
          JSON.parse(data)["ID"]
      )
      .then((response) => {
        if (response.data === "error") {
          this.setState({
            typeOfAllert: "error",
            messaggeOfAllert: "ERRORE: id inesistente!",
          });
        } else if (response.data === "not new") {
          this.setState({
            typeOfAllert: "error",
            messaggeOfAllert: "ERRORE: Siete già amici!",
          });
        } else {
          this.setState({
            typeOfAllert: "success",
            messaggeOfAllert: "Nuovo amico aggiunto!",
          });
        }

        this.setState({
          showAllert: true,
        });
      });
  }

  handleScan(data) {
    this.setState({
      showAllert: true,
      typeOfAllert: "error",
      messaggeOfAllert: {data},
    });
    this.Request(data);
  }
  handleError(err) {
    this.setState({
      errore: true,
      result: err,
    });
  }
  render() {
    const previewStyle = {
      height: 240,
      width: 320,
    };

    return (
      <div className="column">
        <Collapse in={this.state.showAllert}>
          <Alert
            style={{ backgroundColor: "var(--purple)", color: "var(--white)" }}
            severity={this.state.typeOfAllert}
            action={
              <IconButton
                aria-label="close"
                color="inherit"
                size="small"
                onClick={() => {
                  this.setState({
                    showAllert: false,
                  });
                }}
              >
                <CloseIcon fontSize="inherit" />
              </IconButton>
            }
            sx={{ mb: 2 }}
          >
            {this.state.messaggeOfAllert}
          </Alert>
        </Collapse>
        <Button
          style={{ backgroundColor: "var(--purple)" }}
          variant="contained"
          endIcon={<CameraAltIcon />}
          onClick={() => this.setState({ show: !this.state.show })}
        >
          Apri Lettore QR Code
        </Button>
        {this.state.show ? (
          this.state.errore ? (
            <div>
              <h1 style={{ color: "var(--white)" }}>
                Fotocamera non disponibile
              </h1>
              <div className="form__group field">
                <input
                  required=""
                  placeholder="ID dell'account dell'amico"
                  className="form__field"
                  type="input"
                  value={this.state.id}
                  onChange={(e) => this.setState({ id: e.target.value })}
                />
                <label className="form__label" htmlFor="name">
                  ID dell'account dell'amico
                </label>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  marginTop: "20px",
                }}
              >
                <Button
                  style={{ backgroundColor: "var(--purple)" }}
                  variant="contained"
                  onClick={() =>
                    this.Request(JSON.stringify({ ID: this.state.id }))
                  }
                >
                  invia
                </Button>
              </div>
            </div>
          ) : (
            <div>
              <QrReader
                delay={this.state.delay}
                style={previewStyle}
                onError={this.handleError}
                onScan={this.handleScan}
                facingMode={"environment"}
              />
              <p>{this.state.result}</p>
            </div>
          )
        ) : null}
      </div>
    );
  }
}

export { QrCodeReader };
