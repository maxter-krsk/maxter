"use client";

import * as React from "react";

export function Clock() {
  const [time, setTime] = React.useState("");

  React.useEffect(() => {
    const formatter = new Intl.DateTimeFormat("ru-RU", {
      timeZone: "Asia/Krasnoyarsk",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });

    const update = () => {
      setTime(formatter.format(new Date()));
    };

    update();
    const id = window.setInterval(update, 30_000);
    return () => window.clearInterval(id);
  }, []);

  return <span className="text-100 font-unbounded font-light">{time}</span>;
}
