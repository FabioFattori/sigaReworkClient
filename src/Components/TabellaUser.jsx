import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import {GetUser} from "../functions/User"

const columns = [
  { field: "Nome", headerName: "Nome", width: 100 },
  { field: "nCammelli", headerName: "Numero di Camelli", width: 170 },
];

function TabellaUser({ Friends, Mode }) {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    setRows([])

    Friends.forEach((amico, key) => {
      var c = {
        id: key,
        Nome: "",
        nCammelli: "",
      };

      c.Nome = amico["Nome"];

      if(amico["Nome"]===GetUser()){
        c.Nome += " (Tu)";
      }

      if (Mode === "Ciminiera") {
        c.nCammelli = amico["CammelliCiminiera"];
      } else {
        c.nCammelli = amico["CammelliHealtCare"];
      }

      setRows((current) => [...current, c]);
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [Friends]);

  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        density="comfortable"
        rowsPerPageOptions={[5]}
        checkboxSelection
      />
    </div>
  );
}

export default TabellaUser;
