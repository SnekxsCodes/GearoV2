import { useEffect, useState } from "react";
import { supabase } from "./helpers/supabase";
import {
  Card,
  CardBody,
  Grid,
  Heading,
  Image,
  Stack,
  Text,
  SimpleGrid,
  Code,
  GridItem,
  Flex,
  HStack,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { MdVerified } from "react-icons/md";
import { BiCrown } from "react-icons/bi";
import { IconContext } from "react-icons";
import { AiFillCrown } from "react-icons/ai";
import { BsFillShieldFill } from "react-icons/bs";

export default function HomePageGrid() {
  const [data, setData] = useState();
  const router = useRouter();

  useEffect(() => {
    supabase
      .from("users")
      .select("*")
      .then((response) => {
        setData(response.data);
        console.log(response.data);
      });
  }, []);

  function clickHandler(name) {
    router.push(`/user/${name}`);
  }

  function isVerified(verified) {
    if (verified) {
      return (
        <IconContext.Provider value={{ color: "#AEC6CF", size: "20" }}>
          <MdVerified />
        </IconContext.Provider>
      );
    }
  }

  function isOwner(owner) {
    if (owner) {
      return (
        <IconContext.Provider value={{ color: "#AEC6CF", size: "20" }}>
          <AiFillCrown />
        </IconContext.Provider>
      );
    }
  }

  function isMod(mod) {
    if (mod) {
      return (
        <IconContext.Provider value={{ color: "#AEC6CF", size: "20" }}>
          <BsFillShieldFill />
        </IconContext.Provider>
      );
    }
  }

  return (
    <div>
      <Grid templateColumns="repeat(5, 1fr)" gap={10} p={"5"}>
        {data?.map((user) => (
          <GridItem>
            <Card
              maxW="sm"
              onClick={() => clickHandler(user.name)}
              className={"HomePageCard"}
            >
              <CardBody>
                <Image
                  src={user.image_url}
                  alt="User Profile Picture"
                  borderRadius="full"
                />
                <Stack mt="6" spacing="3">
                  <HStack>
                    <Heading>{user.name}</Heading>
                    {isVerified(user.is_verified)}
                    {isOwner(user.is_owner)}
                    {isMod(user.is_mod)}
                  </HStack>

                  <Heading size={"sm"}>{user.description}</Heading>
                </Stack>
              </CardBody>
            </Card>
          </GridItem>
        ))}
      </Grid>
    </div>
  );
}
