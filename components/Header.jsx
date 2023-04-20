import ThemeToggle from "./ThemeToggle";
import Login from "./Login";

export default function Header() {
  return (
    <>
      <header className={"header"}>
        <h1 className={"logo"}>
          Gearo<span className={"version"}>Alpha</span>
        </h1>
        <div className="actions">
          <Login />
          <ThemeToggle />
        </div>
      </header>
    </>
  );
}
