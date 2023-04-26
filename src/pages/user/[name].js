import { useEffect, useState } from "react";
import { supabase } from "../../../components/helpers/supabase";
import Header from "../../../components/Header";
import Rating from "../../../components/Rating";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Heading,
  Image,
  Stack,
} from "@chakra-ui/react";

export default function UserPage(name) {
  const [data, setData] = useState();

  useEffect(() => {
    async function fetchData() {
      await supabase
        .from("user")
        .select("*")
        .eq("user_info->>name", name.name)
        .then((response) => {
          setData(response.data);
          console.log(response.data);
        });
    }
    fetchData();
  }, []);

  function daysAgo(dateString) {
    const today = new Date();
    const date = new Date(dateString);
    const oneDay = 24 * 60 * 60 * 1000;
    const diffDays = Math.round(Math.abs((today - date) / oneDay));

    if (diffDays === 0) {
      return "today";
    } else if (diffDays === 1) {
      return "yesterday";
    } else {
      return `${diffDays} days ago`;
    }
  }

  function clickHandler(name) {
    const url = `https://www.amazon.com/s?k=${name}`;
    window.open(url, "_blank");
  }
  //Add Status Indicator Instead of text
  function isOnline(online) {
    if (online) {
      return (
        <div className="userStatus">
          <Heading size={"md"}>Online</Heading>
        </div>
      );
    }
  }

  return (
    <div>
      <Header />
      {data?.map((user) => (
        <>
          <div className="UserCard" key={user.id}>
            <img src={user.user_info.image} />
            <Heading>{user.user_info.name}</Heading>
            <Heading size={"md"} className={"UserCreated"}>
              Created {daysAgo(user.created_at)}
            </Heading>
            {isOnline(user.user_info.online)}
          </div>
          <div className={"products"}>
            <Card
              direction={{ base: "column", sm: "row" }}
              overflow="hidden"
              variant="outline"
              className={"productCard"}
            >
              <Image
                objectFit="cover"
                maxW={{ base: "100%", sm: "200px" }}
                src={user.mouse.image}
                alt="mouse"
                fallbackSrc={"https://via.placeholder.com/500"}
              />

              <Stack>
                <CardBody>
                  <Heading size={"md"}>Mouse</Heading>
                  <Heading>{user.mouse.name}</Heading>

                  <Rating value={user.mouse.rating / 5} />
                </CardBody>

                <CardFooter>
                  <Button
                    variant="solid"
                    colorScheme="blue"
                    onClick={() => clickHandler(user.mouse.name)}
                  >
                    Link
                  </Button>
                </CardFooter>
              </Stack>
            </Card>
            <Card
              direction={{ base: "column", sm: "row" }}
              overflow="hidden"
              variant="outline"
              className={"productCard"}
            >
              <Image
                objectFit="cover"
                maxW={{ base: "100%", sm: "200px" }}
                src={user.mousepad.image}
                alt="mousepad"
                fallbackSrc={"https://via.placeholder.com/500"}
              />

              <Stack>
                <CardBody>
                  <Heading size={"md"}>Mousepad</Heading>
                  <Heading>{user.mousepad.name}</Heading>
                  <Rating value={user.mousepad.rating / 5} />
                </CardBody>

                <CardFooter>
                  <Button
                    variant="solid"
                    colorScheme="blue"
                    onClick={() => clickHandler(user.mousepad.name)}
                  >
                    Link
                  </Button>
                </CardFooter>
              </Stack>
            </Card>
            <Card
              direction={{ base: "column", sm: "row" }}
              overflow="hidden"
              variant="outline"
              className={"productCard"}
            >
              <Image
                objectFit="cover"
                maxW={{ base: "100%", sm: "200px" }}
                src={user.headphones.image}
                alt="headphones"
                fallbackSrc={"https://via.placeholder.com/500"}
              />

              <Stack>
                <CardBody>
                  <Heading size={"md"}>Headphones</Heading>
                  <Heading>{user.headphones.name}</Heading>
                  <Rating value={user.headphones.rating / 5} />
                </CardBody>

                <CardFooter>
                  <Button
                    variant="solid"
                    colorScheme="blue"
                    onClick={() => clickHandler(user.headphones.name)}
                  >
                    Link
                  </Button>
                </CardFooter>
              </Stack>
            </Card>
            <Card
              direction={{ base: "column", sm: "row" }}
              overflow="hidden"
              variant="outline"
              className={"productCard"}
            >
              <Image
                objectFit="cover"
                maxW={{ base: "100%", sm: "200px" }}
                src={user.monitor.image}
                alt="monitor"
                fallbackSrc={"https://via.placeholder.com/500"}
              />

              <Stack>
                <CardBody>
                  <Heading size={"md"}>Monitor</Heading>
                  <Heading>{user.monitor.name}</Heading>
                  <Rating value={user.monitor.rating / 5} />
                </CardBody>

                <CardFooter>
                  <Button
                    variant="solid"
                    colorScheme="blue"
                    onClick={() => clickHandler(user.monitor.name)}
                  >
                    Link
                  </Button>
                </CardFooter>
              </Stack>
            </Card>
          </div>
        </>
      ))}
    </div>
  );
}

export async function getServerSideProps(context) {
  const { name } = context.query;
  return { props: { name } };
}
