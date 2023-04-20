import { useEffect, useState } from "react";
import { supabase } from "../../../components/helpers/supabase";
import Header from "../../../components/Header";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Text,
  Stack,
  Heading,
  Button,
  Image,
} from "@chakra-ui/react";
export default function UserPage(name) {
  const [data, setData] = useState();

  useEffect(() => {
    async function fetchData() {
      await supabase
        .from("users")
        .select("*")
        .eq("name", name.name)
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
    const oneDay = 24 * 60 * 60 * 1000; // milliseconds in one day
    const diffDays = Math.round(Math.abs((today - date) / oneDay));

    if (diffDays === 0) {
      return "today";
    } else if (diffDays === 1) {
      return "yesterday";
    } else {
      return `${diffDays} days ago`;
    }
  }

  return (
    <div>
      <Header />
      {data?.map((user) => (
        <>
          <div className="UserCard" key={user.id}>
            <img src={user.image_url} />
            <h1>{user.name}</h1>
            <h1 className={"UserCreated"}>
              Created {daysAgo(user.created_at)}
            </h1>
            <div className="userStatus">
              <h1>Online</h1>
            </div>
          </div>
          <div className={"products"}>
            <Card
              direction={{ base: "column", sm: "row" }}
              overflow="hidden"
              variant="outline"
            >
              <Image
                objectFit="cover"
                maxW={{ base: "100%", sm: "200px" }}
                src={user.mouse_image}
                alt="mouse"
              />

              <Stack>
                <CardBody>
                  <Heading size={"md"}>Mouse</Heading>
                  <Heading>{user.mouse}</Heading>
                </CardBody>

                <CardFooter>
                  <Button variant="solid" colorScheme="blue">
                    Link
                  </Button>
                </CardFooter>
              </Stack>
            </Card>
            <Card
              direction={{ base: "column", sm: "row" }}
              overflow="hidden"
              variant="outline"
            >
              <Image
                objectFit="cover"
                maxW={{ base: "100%", sm: "200px" }}
                src={user.mousepad_image}
                alt="mousepad"
              />

              <Stack>
                <CardBody>
                  <Heading size={"md"}>Mousepad</Heading>
                  <Heading>{user.mousepad}</Heading>
                </CardBody>

                <CardFooter>
                  <Button variant="solid" colorScheme="blue">
                    Link
                  </Button>
                </CardFooter>
              </Stack>
            </Card>
            <Card
              direction={{ base: "column", sm: "row" }}
              overflow="hidden"
              variant="outline"
            >
              <Image
                objectFit="cover"
                maxW={{ base: "100%", sm: "200px" }}
                src={user.headphones_image}
                alt="headphones"
              />

              <Stack>
                <CardBody>
                  <Heading size={"md"}>Headphones</Heading>
                  <Heading>{user.headphones}</Heading>
                </CardBody>

                <CardFooter>
                  <Button variant="solid" colorScheme="blue">
                    Link
                  </Button>
                </CardFooter>
              </Stack>
            </Card>
            <Card
              direction={{ base: "column", sm: "row" }}
              overflow="hidden"
              variant="outline"
            >
              <Image
                objectFit="cover"
                maxW={{ base: "100%", sm: "200px" }}
                src={user.monitor_image}
                alt="monitor"
              />

              <Stack>
                <CardBody>
                  <Heading size={"md"}>Monitor</Heading>
                  <Heading>{user.monitor}</Heading>
                </CardBody>

                <CardFooter>
                  <Button variant="solid" colorScheme="blue">
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
