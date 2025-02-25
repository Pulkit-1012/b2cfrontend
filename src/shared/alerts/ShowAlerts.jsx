import React, { useEffect, useState } from "react";
import { Alert, Slide } from "@mui/material";

const ShowAlerts = (message, severity, duration=3000, onClose) => {

    const [open, setOpen] = useState(true);

    useEffect(() => {
        const timer = setTimeout(()=> {
            setOpen(false);
            if(onClose) onClose();
        }, duration);

        return () => clearTimeout(timer);
    }, [duration, onClose]);

  return (
    <Slide direction="down" in={open} mountOnEnter unmountOnExit>
      <Alert
        variant="filled"
        severity={severity}
        sx={{
          mb: 2,
          fontSize: "1rem",
          fontWeight: "bold",
          borderRadius: "12px",
          boxShadow: "0px 4px 12px rgba(0,0,0,0.2)",
        }}
      >
        {message}
      </Alert>
    </Slide>
  )
}

export default ShowAlerts