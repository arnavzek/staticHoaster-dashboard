import React, { useState, useEffect } from "react";

import styled from "styled-components";
import theme from "../theme.js";
import LoadingSVG from "../media/loading.svg";
let Div = styled.div``;

let ConsoleDiv = styled.div`
  background: #2d2c2c;
  color: #ffffff87;
  margin-bottom: 1vw;
  padding: 24px;
  border-radius: 5px;
`;

let Button = styled.button`
  padding: 10px 20px;
  border-radius: 5px;
  border: 2px solid #222;
  background: transparent;
  float: right;
`;

let LogDiv = styled.div`
  margin-bottom: 25px;
`;

function Console(props) {
  const [logs, setLogs] = useState([]);
  let U = props.U;

  useEffect(() => {
    refresh();
  }, []);
  if (logs) if (logs.length == 0) logs.push({ log: "Log is empty" });

  let logDivs = logs.map((item) => {
    return <LogDiv>{item.log}</LogDiv>;
  });

  return (
    <Div>
      <h1>Console</h1>
      {logs ? <ConsoleDiv>{logDivs}</ConsoleDiv> : "Loading..."}
      <Button onClick={refresh}>Refresh</Button>
    </Div>
  );

  function refresh() {
    if (!U) return;

    U.query({ $readLogs: 10 }, true)
      .then((data) => {
        setLogs(data);
      })
      .catch((error) => {
        console.log(error);
        setLogs([{ log: error.message }]);
      });
  }
}

export default Console;
