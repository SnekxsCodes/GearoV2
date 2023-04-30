import Header from "../../../components/Header";
import { useEffect, useState } from "react";
import { supabase } from "../../../components/helpers/supabase";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Heading,
  Image,
  Stack,
} from "@chakra-ui/react";
import Rating from "../../../components/Rating";

export default function ProfilePage(name) {
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

  return (
    <div>
      <Header />
    </div>
  );
}

export async function getServerSideProps(context) {
  const { name } = context.query;
  return { props: { name } };
}
