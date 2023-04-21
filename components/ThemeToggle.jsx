import { useColorMode } from "@chakra-ui/react";
import { Button, ButtonGroup } from "@chakra-ui/react";
import { SunIcon, MoonIcon } from "@chakra-ui/icons";

export default function ThemeToggle() {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <Button onClick={toggleColorMode} variant="ghost" size="lg">
      {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
    </Button>
  );
}
