import moment from "moment";
import { pino } from "pino";
import PinoPretty from "pino-pretty";

export const logging = pino(
  {
    base: {
      pid: false,
    },
    timestamp: () => `, "time": "${moment().format()}"`,
  },
  PinoPretty({
    messageFormat: "{msg}",
    colorize: true,
    translateTime: "SYS:standard",
    ignore: "pid, hostname",
  })
);
