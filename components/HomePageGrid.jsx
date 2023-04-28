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
      .from("user")
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
        <IconContext.Provider value={{ color: "#FDFD96", size: "20" }}>
          <AiFillCrown />
        </IconContext.Provider>
      );
    }
  }

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
          ?.sort(
            (a, b) => b.user_info.profile_views - a.user_info.profile_views
          )
          .map((user) => (
            <GridItem key={user.id}>
              <Card
                maxW="sm"
                align="center"
                onClick={() => clickHandler(user.user_info.name)}
                className={"HomePageCard"}
                m={5}
              >
                <CardBody>
                  <Image
                    boxSize="150px"
                    src={user.user_info.image}
                    alt="User Profile Picture"
                    borderRadius="full"
                  />
                  <CardHeader>
                    <Heading>{user.user_info.name}</Heading>
                    <div className={"userBadges"}>
                      {isOwner(user.user_info.is_owner)}
                      {isVerified(user.user_info.is_verified)}
                      {isMod(user.user_info.is_mod)}
                    </div>
                  </CardHeader>

                  <CardFooter>
                    <Heading size={"sm"}>{user.user_info.description}</Heading>
                  </CardFooter>
                </CardBody>
              </Card>
            </GridItem>
          ))}
      </SimpleGrid>
    </div>
  );
}
