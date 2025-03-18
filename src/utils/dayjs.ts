import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

export const getCreatedAt = () => dayjs().format();

export const getFromNow = (date: string) => dayjs(date).fromNow();
