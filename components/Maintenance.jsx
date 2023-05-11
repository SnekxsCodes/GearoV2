import { Flex, Heading } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { supabase } from "./helpers/supabase";

function CountDown({ date }) {
  const [time, setTime] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    time_up: "",
  });

  useEffect(() => {
    const deadline = new Date(date).getTime();
    const x = setInterval(() => {
      const now = new Date().getTime();
      const t = deadline - now;
      const days = Math.floor(t / (1000 * 60 * 60 * 24))
        .toString()
        .padStart(2, "0");
      const hours = Math.floor((t % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
        .toString()
        .padStart(2, "0");
      const minutes = Math.floor((t % (1000 * 60 * 60)) / (1000 * 60))
        .toString()
        .padStart(2, "0");
      const seconds = Math.floor((t % (1000 * 60)) / 1000)
        .toString()
        .padStart(2, "0");
      if (t < 0) {
        clearInterval(x);
        setTime({
          days: "00",
          hours: "00",
          minutes: "00",
          seconds: "00",
          time_up: "TIME IS UP",
        });
      } else {
        setTime({ days, hours, minutes, seconds });
      }
    }, 1000);
    return () => clearInterval(x);
  }, [date]);

  return (
    <div>
      <p>
        {time.days}d {time.hours}h {time.minutes}m {time.seconds}s{" "}
        {time.time_up}
      </p>
    </div>
  );
}

export default function Maintenance() {
  const [dateUnlock, setDateUnlock] = useState();

  useEffect(() => {
    supabase
      .from("site_settings")
      .select("site_unlocks")
      .eq("id", 1)
      .then(({ data, error }) => {
        if (error) {
          console.log(error);
        } else {
          const currentDate = data[0].site_unlocks;
          setTimeout(() => {
            setDateUnlock(currentDate);
          }, 5000);
        }
      });
  }, []);

  return (
    <div className={"Maintenance"}>
      <Flex
        height="100vh"
        justifyContent="center"
        alignItems="center"
        flexDir="column"
      >
        <Heading size="xl" pb="10" className={"MaintenanceText"}>
          {dateUnlock ? <CountDown date={dateUnlock} /> : "Loading..."}
        </Heading>
      </Flex>
    </div>
  );
}
