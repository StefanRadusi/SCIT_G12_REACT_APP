// we need to import 'react' library when we use in the file the 'jsx'
// we can find 'jsx' syntax at line 9 where '<App />' is called
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

import "./index.css";

ReactDOM.render(<App />, document.getElementById("root"));
