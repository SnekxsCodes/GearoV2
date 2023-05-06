import ThemeToggle from "./ThemeToggle";
import Login from "./Login";
import { useRouter } from "next/router";
import {
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
  StatGroup,
  Tooltip,
} from "@chakra-ui/react";
import { useState } from "react";
import { Heading } from "@chakra-ui/react";
import { supabase } from "./helpers/supabase";

export default function Header() {
  const router = useRouter();
  const [onlineUsers, setOnlineUsers] = useState(0);

  function clickHandler() {
    router.push("/");
  }

  return (
    <>
      <header className={"header"}>
        <Heading p={"2"} onClick={clickHandler} className={"logo"}>
          Gearo
          <span className={"version"}>Alpha</span>
        </Heading>

        <div className="actions">
          <Login />
          <ThemeToggle />
        </div>
      </header>
    </>
  );
}
