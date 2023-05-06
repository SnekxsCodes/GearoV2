import { useEffect, useState } from "react";
import { supabase } from "./helpers/supabase";
import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  GridItem,
  Heading,
  Image,
  SimpleGrid,
  Tooltip,
  Avatar,
  AvatarBadge,
  Box,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { MdVerified } from "react-icons/md";
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
        console.log(response.data);
        setData(response.data);
      });
  }, []);

  function clickHandler(name) {
    console.log(name);
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
        <IconContext.Provider value={{ color: "#FDFD96", size: "20" }}>
          <AiFillCrown />
        </IconContext.Provider>
      );
    }
  }

  const OnlineBadge = () => {
    return (
      <Box
        w="30px"
        h="30px"
        bg="#77DD77"
        borderRadius="full"
        position="absolute"
        right="15px"
        bottom="5px"
        zIndex="1"
      />
    );
  };

  function isMod(mod) {
    if (mod) {
      return (
        <IconContext.Provider value={{ color: "#77DD77", size: "20" }}>
          <BsFillShieldFill />
        </IconContext.Provider>
      );
    }
  }

  return (
    <div>
      <SimpleGrid columns={5} spacing={1}>
        {data
          ?.sort((a, b) => b.profile_views - a.profile_views)
          .map((user) => (
            <>
              {user.is_private ? null : (
                <GridItem key={user.id}>
                  <Card
                    maxW="sm"
                    align="center"
                    onClick={() => clickHandler(user.name)}
                    className={"HomePageCard"}
                    m={5}
                  >
                    <CardBody
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                      }}
                    >
                      <div style={{ position: "relative" }}>
                        <Image
                          boxSize="150px"
                          src={user.user_image}
                          alt="User Profile Picture"
                          borderRadius="full"
                          position="relative"
                        />
                        {user.online && <OnlineBadge />}
                      </div>

                      <CardHeader>
                        <Heading>{user.name}</Heading>
                        <div className={"userBadges"}>
                          {isOwner(user.is_owner)}
                          {isVerified(user.is_verified)}
                          {isMod(user.is_mod)}
                        </div>
                      </CardHeader>
                      <CardFooter>
                        <Heading size={"sm"}>{user.user_description}</Heading>
                      </CardFooter>
                    </CardBody>
                  </Card>
                </GridItem>
              )}
            </>
          ))}
      </SimpleGrid>
    </div>
  );
}
