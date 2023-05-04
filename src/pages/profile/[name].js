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

export default function ProfilePage(name) {
  const [data, setData] = useState();
  const [checked, setChecked] = useState(true);

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

  function EditableDesc({ initialText }) {
    const [text, setText] = useState(initialText);

    function handleBlur(event) {
      // Save the updated text when the input loses focus
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

  const textChange = () => {
    if (checked === true) {
      return "Public";
    } else {
      return "Private";
    }
  };

  function handleImageClick(s) {}

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

export async function getServerSideProps(context) {
  const { name } = context.query;
  return { props: { name } };
}
