import ThemeToggle from "./ThemeToggle";
import Login from "./Login";
import { useRouter } from "next/router";

import { Heading } from "@chakra-ui/react";

export default function Header() {
  const router = useRouter();

  function clickHandler() {
    router.push("/");
  }
  return (
    <>
      <header className={"header"}>
        <Heading p={"2"} onClick={clickHandler} className={"logo"}>
          Gearo<span className={"version"}>Alpha</span>
        </Heading>
        <div className="actions">
          <Login />
          <ThemeToggle />
        </div>
      </header>
    </>
  );
}
