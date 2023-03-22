import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { url } from "../functions/Url";
import { Drawer, IconButton } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import ReactECharts from "echarts-for-react";
import { GetDate, GetSigs, GetData } from "../functions/GetDataForChart";
import MenuIcon from "@mui/icons-material/Settings";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import InfoIcon from "@mui/icons-material/Info";
import { GetUser } from "../functions/User";
import { Check } from "../functions/CheckYesterday";

function Home() {
  const navigate = useNavigate();
  const [nSiga, setNSiga] = useState(0);
  const [nCammelli, setCammelli] = useState(0);
  const [arrDate, setDate] = useState();
  const [arrSiga, setSigs] = useState();
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(!open);
  };
  const [Mode, setMode] = useState(false);
  const [state, setState] = React.useState({
    top: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  var options = {
    grid: { top: 8, right: 8, bottom: 24, left: 36 },
    xAxis: {
      type: "category",
      data: arrDate,
    },
    yAxis: {
      type: "value",
    },
    series: [
      {
        data: arrSiga,
        type: "line",
        smooth: true,
      },
    ],
    tooltip: {
      trigger: "axis",
    },
  };

  var volte = 0;

  useEffect(() => {
    if (volte === 0) {
      var id = localStorage.getItem("IDSiga");
      if (id === undefined || id === null) {
        navigate("/Login");
      } else {
        GetData(id);
        axios.put(url + "GetSiga.php?I=" + id).then((response) => {
          setNSiga(response.data["nSiga"]);
          setDate(GetDate());
          setSigs(GetSigs());
          Check();
        });

        axios.get(url + "GetMode.php?I=" + id).then((response) => {
          if (response.data.ModalitàCiminiera == 0) {
            setMode(false);
            axios
              .get(url + "GetCammelliHealtCare.php?I=" + id)
              .then((response) => {
                setCammelli(response.data.CammelliHealtCare);
              });
          } else {
            setMode(true);
            axios
              .get(url + "GetCammelliCiminiera.php?I=" + id)
              .then((response) => {
                setCammelli(response.data.CammelliCiminiera);
              });
          }
        });
      }

      volte++;
    }
  }, []);

  //add or remove cammelli
  function EditCammelli(addOrDelete, typeOfEdit) {
    var i = nCammelli;
    if (Mode === true) {
      if (addOrDelete === "add") {
        if (typeOfEdit === "siga") {
          i = nCammelli + 5;
          setCammelli(nCammelli + 5);
          axios.put(
            url +
              "UpdateCammelliCiminiera.php?I=" +
              localStorage.getItem("IDSiga") +
              "&N=" +
              i
          );
        }
      } else {
        if (typeOfEdit === "siga") {
          i -= 5;
          setCammelli(nCammelli - 5);
          axios.put(
            url +
              "UpdateCammelliCiminiera.php?I=" +
              localStorage.getItem("IDSiga") +
              "&N=" +
              i
          );
        }
      }
    }
    //HealtCare
    else {
      if (addOrDelete === "add") {
        if (typeOfEdit === "siga") {
          i -= 5;
          setCammelli(nCammelli - 5);
          axios.put(
            url +
              "UpdateCammelliHealt.php?I=" +
              localStorage.getItem("IDSiga") +
              "&N=" +
              i
          );
        }
      } else {
        if (typeOfEdit === "siga") {
          i += 5;
          setCammelli(nCammelli + 5);
          axios.put(
            url +
              "UpdateCammelliHealt.php?I=" +
              localStorage.getItem("IDSiga") +
              "&N=" +
              i
          );
        }
      }
    }
  }

  //add or remove siga

  function gestioneButton(value) {
    if (value) {
      setNSiga(nSiga + 1);
      EditCammelli("add", "siga");
      axios.put(
        url +
          "UpdateSiga.php?I=" +
          localStorage.getItem("IDSiga") +
          "&N=" +
          (nSiga + 1)
      );
    } else {
      if (nSiga >= 1) {
        setNSiga(nSiga - 1);
        EditCammelli("remove", "siga");
        axios.put(
          url +
            "UpdateSiga.php?I=" +
            localStorage.getItem("IDSiga") +
            "&N=" +
            (nSiga - 1)
        );
      }
    }
  }

  const HandleChange = (e) => {
    var i = 0;
    if (!Mode) {
      i = 1;
    }
    setMode(!Mode);
    axios.put(
      url + "UpdateMode.php?I=" + localStorage.getItem("IDSiga") + "&V=" + i
    );

    // eslint-disable-next-line default-case
    switch (i) {
      case 0:
        axios
          .get(
            url + "GetCammelliHealtCare.php?I=" + localStorage.getItem("IDSiga")
          )
          .then((response) => {
            setCammelli(response.data.CammelliHealtCare);
          });
        break;

      case 1:
        axios
          .get(
            url + "GetCammelliCiminiera.php?I=" + localStorage.getItem("IDSiga")
          )
          .then((response) => {
            setCammelli(response.data.CammelliCiminiera);
          });
        break;
    }
  };

  return (
    <div className="AllContainer">
      <Dialog onClose={handleClose} open={open}>
        <DialogTitle>
          Modalità Ciminiera:
          <br />
          Ogni Sigaretta Fumata equivale a 5 cammello in più, quindi più fumi e
          più ottiene cammelli!
        </DialogTitle>
        <DialogTitle>
          Modalità HealtCare:
          <br />
          Ogni Sigaretta Fumata equivale a -5 cammello, quindi più fumi e meno
          ottiene cammelli!
        </DialogTitle>
      </Dialog>
      <React.Fragment key={"left"}>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "20px",
          }}
        >
          <IconButton aria-label="delete" onClick={toggleDrawer("left", true)}>
            <MenuIcon className="iconMenu" />
          </IconButton>
        </div>
        <Drawer
          anchor={"left"}
          open={state["left"]}
          onClose={toggleDrawer("left", false)}
        >
          <div className="Menu">
            <h1>{GetUser()}</h1>
            <div className="row">
              <h1>Modalità Ciminiera:</h1>
              <IconButton aria-label="delete" onClick={() => setOpen(true)}>
                <InfoIcon className="iconMenu" />
              </IconButton>
            </div>
            <label className="switch">
              <input type="checkbox" checked={Mode} onChange={HandleChange} />

              <span className="slider"></span>
            </label>
            <div className="row">
              <h1>Modalità HealtCare:</h1>
              <IconButton aria-label="delete" onClick={() => setOpen(true)}>
                <InfoIcon className="iconMenu" />
              </IconButton>
            </div>
            <label className="switch">
              <input type="checkbox" onChange={HandleChange} checked={!Mode} />
              <span className="slider"></span>
            </label>
          </div>
        </Drawer>
      </React.Fragment>

      <div className="rowOfContent">
        <div className="main">
          <form className="form" id="RegForm">
            <label htmlFor="chk" aria-hidden="true">
              Sigarette Fumate:
            </label>
          </form>
          <div className="row">
            <IconButton
              onClick={() => gestioneButton(false)}
              aria-label="delete"
              size="large"
            >
              <RemoveCircleIcon fontSize="inherit" />
            </IconButton>
            <label>{nSiga}</label>
            <IconButton
              onClick={() => gestioneButton(true)}
              aria-label="delete"
              size="large"
            >
              <AddCircleIcon fontSize="inherit" />
            </IconButton>
          </div>
        </div>

        <div className="main">
          <form className="form" id="RegForm">
            <label htmlFor="chk" aria-hidden="true">
              Cammelli Ottenuti:
            </label>
          </form>
          <div className="row">
            <label>{nCammelli}</label>
          </div>
        </div>
      </div>

      <div className="main chart">
        <ReactECharts option={options} />
      </div>
    </div>
  );
}

export default Home;
