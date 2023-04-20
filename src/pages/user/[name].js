import { useEffect, useState } from "react";
import { supabase } from "../../../components/helpers/supabase";

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
        });
    }
    fetchData();
  }, []);

  return (
    <div>
      {data?.map((user) => (
        <div>
          <h1>{user.name}</h1>
          <h1>{user.mouse}</h1>
          <h1>{user.mousepad}</h1>
        </div>
      ))}
    </div>
  );
}

export async function getServerSideProps(context) {
  const { name } = context.query;
  return { props: { name } };
}
