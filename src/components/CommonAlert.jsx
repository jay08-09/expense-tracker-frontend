import React from "react";
import Components from "../theme-ui/master-file";

const CommonAlert = (props) => {
  if (!props?.message) return null; // Hide alert if no message

  return (
    <Components.Alert 
      severity={props?.status} 
      onClose={props?.onClose} 
      variant="standard"
      sx={{ marginBottom: 2, width: "100%" }}
    >
      {props?.message}
    </Components.Alert>
  );
};

export default CommonAlert;
