import Header from "../../../components/Header";
import { useEffect, useState } from "react";
import { supabase } from "../../../components/helpers/supabase";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Divider,
  Heading,
  Image,
  Stack,
  Switch,
  Textarea,
} from "@chakra-ui/react";
import Rating from "../../../components/Rating";
import toast from "react-hot-toast";
import { useRouter } from "next/router";

export default function ProfilePage(name) {
  const [data, setData] = useState();

  const [uuid, setUUID] = useState();
  const [username, setUsername] = useState();
  const router = useRouter();

  useEffect(() => {
    async function fetchData() {
      const response = await supabase
        .from("users")
        .select("*")
        .eq("name", name.name);
      setData(response.data);
    }

    async function userPermitted() {
      const username = localStorage.getItem("name");
      if (username !== name.name) {
        router.push("/");
      }
    }
    userPermitted();
    fetchData();
  }, []);

  function EditableHeading({ initialText }) {
    const [text, setText] = useState(initialText);

    function handleBlur(event) {
      const updatedText = event.target.innerText;
      setText(event.target.innerText);
      supabase
        .from("users")
        .update({ name: updatedText })
        .eq("name", name.name)
        .then((result) => {
          console.log(result);
        });
    }

    return (
      <Heading
        as="h1"
        contentEditable={true}
        onBlur={handleBlur}
        suppressContentEditableWarning={true}
      >
        {text}
      </Heading>
    );
  }

  function handleImageUpload(event) {
    const [image, setImage] = useState(user.user_info.image);

    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      setImage(e.target.result);
    };
    reader.readAsDataURL(file);
  }

  async function is_user() {
    console.log(username);
    console.log(uuid);
  }
  is_user();

  function EditableDesc({ initialText }) {
    const [text, setText] = useState(initialText);

    function handleBlur(event) {
      const updatedText = event.target.innerText;
      setText(updatedText);

      supabase
        .from("users")
        .update({ user_description: updatedText })
        .eq("name", name.name)
        .then((result) => {
          console.log(result);
        });
    }

    return (
      <Heading
        as="h1"
        size={"md"}
        contentEditable={true}
        onBlur={handleBlur}
        suppressContentEditableWarning={true}
      >
        {text}
      </Heading>
    );
  }

  function handleImageClick(s) {}

  function isPermitted() {
    if (typeof window !== "undefined") {
      const username = localStorage.getItem("name");
      const uuid = localStorage.getItem("uuid");
      if (username !== name.name) {
        router.push("/");
      } else {
        return true;
      }
    }
  }
  if (isPermitted()) {
    return (
      <div>
        <Header />
        {data?.map((user) => (
          <>
            <div className="UserCard" key={user.id}>
              <img src={user.user_image} onClick={() => handleImageClick()} />

              <div className={"userinfo"}>
                <EditableHeading initialText={user.name} />
                <EditableDesc initialText={user.user_description} />

                <Heading pt={5} size={"sm"}></Heading>
              </div>
            </div>
            <Divider />
          </>
        ))}
      </div>
    );
  }
}

export async function getServerSideProps(context) {
  const { name } = context.query;
  return { props: { name } };
}
