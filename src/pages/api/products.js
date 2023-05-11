// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import {supabase} from "../../../components/helpers/supabase";

export default async function handler(req, res) {
  await supabase
      .from("products")
      .select("*")
      .then((response) => {
        if (response.data.length === 0) {
          res.status(404).json({ message: "Error Getting Products" });
        } else {
          res.status(200).json(response.data);
        }
      })
      .catch((error) => {
        console.log("error", error);
      });
}
