import { LockIcon } from "@chakra-ui/icons";
import { Button } from "@chakra-ui/react";
import { useState } from "react";

export default function Login() {
  const [mode, setMode] = useState("icon");

  const handleClick = () => {
    setMode(mode === "icon" ? "text" : "icon");
  };

  return (
    <Button variant="ghost" size="lg" onClick={handleClick}>
      {mode === "icon" ? <LockIcon id="LockIcon" /> : "Snekxs"}
    </Button>
  );
}
