import dayjs from "dayjs";
import pino from "pino";
import pretty from "pino-pretty";

const log = pino({
  transport: {
    target: "pino-pretty",
    options: {
      translateTime: "SYS:dd-mm-yyyy HH:MM:ss.l",
      colorize: true,
      ignore: "pid,hostname",
    },
  },
});

export default log;
