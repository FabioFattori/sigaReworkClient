import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { url } from "../functions/Url";
import { Drawer, IconButton } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import ReactECharts from "echarts-for-react";
import { GetDate, GetSigs, GetData } from "../functions/GetDataForChart";
import MenuIcon from '@mui/icons-material/Menu';
import Divider from '@mui/material/Divider';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import InfoIcon from '@mui/icons-material/Info';

function Home() {
  const navigate = useNavigate();
  const [nSiga, setNSiga] = useState(0);
  const [nCammelli, setCammelli] = useState(0);
  const [arrDate, setDate] = useState()
  const [arrSiga, setSigs] = useState()
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(!open);
  };
  const [Mode, setMode] = useState(false)
  const [state, setState] = React.useState({
    top: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
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

  useEffect(() => {
    var id = localStorage.getItem("IDSiga");
    if (
      id === undefined ||
      id === null
    ) {
      navigate("/Login");
    } else {
      GetData(id);
      axios
        .put(url + "GetSiga.php?I=" + id)
        .then((response) => {
          setNSiga(response.data["nSiga"]);
          setDate(GetDate())
          setSigs(GetSigs())
        });

      axios.get(url + "GetCammelli.php?I=" + id).then(response => {
        setCammelli(response.data.Cammelli)
      })
      axios.get(url + "GetMode.php?I=" + id).then(response => {
        if (response.data.ModalitàCiminiera == 0) {
          setMode(false)
        } else {
          setMode(true)
        }
      })
    }
  }, []);

  function gestioneButton(value) {
    if (value) {
      setNSiga(nSiga + 1);
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
    setMode(!Mode)
    axios.put(url + "UpdateMode.php?I=" + localStorage.getItem("IDSiga") + "&V=" + i)
  }

  return (
    <div className="AllContainer">
      <Dialog onClose={handleClose} open={open}>
        <DialogTitle>Modalità Ciminiera:<br />
          Ogni Sigaretta Fumata equivale a 1 cammello in più, quindi più fumi e più ottiene cammelli!
        </DialogTitle>
        <Divider />
        <DialogTitle>Modalità HealtCare:<br />
          Ogni Sigaretta Fumata equivale a -1 cammello, quindi più fumi e meno ottiene cammelli!
        </DialogTitle>
      </Dialog>
      <React.Fragment key={"left"}>
        <IconButton aria-label="delete" onClick={toggleDrawer("left", true)}>
          <MenuIcon className="iconMenu" />
        </IconButton>
        <Drawer
          anchor={"left"}
          open={state["left"]}
          onClose={toggleDrawer("left", false)}
        >
          <div className="Menu">
            <div className="row">
              <h1>Modalità Ciminiera:</h1>
              <IconButton aria-label="delete" onClick={() => setOpen(true)}>
                <InfoIcon className="iconMenu" />
              </IconButton></div>
            <label className="switch">
              <input type="checkbox" checked={Mode} onChange={HandleChange} />

              <span className="slider"></span>
            </label>
            <Divider />
            <div className="row">
              <h1>Modalità HealtCare:</h1>
              <IconButton aria-label="delete" onClick={() => setOpen(true)}>
                <InfoIcon className="iconMenu" />
              </IconButton></div>
            <label className="switch">
              <input type="checkbox" onChange={HandleChange} checked={!Mode} />
              <span className="slider"></span>
            </label>
          </div>
        </Drawer>
      </React.Fragment>
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

      <div className="main chart">
        <ReactECharts option={options} />
      </div>
    </div>
  );
}

export default Home;
