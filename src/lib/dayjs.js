import dayjs from "dayjs";
import "dayjs/locale/de";

import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";

dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);

dayjs.locale("de");

export default dayjs;
