import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { url } from "../functions/Url";
import { IconButton } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import ReactECharts from "echarts-for-react";
import { GetDate, GetSigs, GetData } from "../functions/GetDataForChart";

function Home() {
  const navigate = useNavigate();
  const [nSiga, setNSiga] = useState(0);
  const [arrDate,setDate]=useState()
  const [arrSiga,setSigs]=useState()

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
    if (
      localStorage.getItem("IDSiga") === undefined ||
      localStorage.getItem("IDSiga") === null
    ) {
      navigate("/Login");
    } else {
      GetData(localStorage.getItem("IDSiga"));
      axios
        .put(url + "GetSiga.php?I=" + localStorage.getItem("IDSiga"))
        .then((response) => {
          setNSiga(response.data["nSiga"]);
          setDate(GetDate())
          setSigs(GetSigs())
        });
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

  return (
    <div className="AllContainer">
      <div className="main">
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

      <div className="main chart">
        <ReactECharts option={options} />
      </div>
    </div>
  );
}

export default Home;
