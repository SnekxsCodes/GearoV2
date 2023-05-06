import { Flex, Heading, Button } from "@chakra-ui/react";
import { motion } from "framer-motion";
export default function SplashScreen({ onClose }) {
  return (
    <Flex
      height="100vh"
      justifyContent="center"
      alignItems="center"
      flexDir="column"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          duration: 0.3,
          ease: [0, 0.71, 0.2, 1.01],
          scale: {
            type: "spring",
            damping: 5,
            stiffness: 100,
            restDelta: 0.001,
          },
        }}
      >
        <Heading size="3xl" pb="10">
          Welcome to Gearo!
        </Heading>
      </motion.div>

      <Button mt={4} onClick={onClose}>
        Continue
      </Button>
    </Flex>
  );
}
