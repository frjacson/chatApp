import dayjs from "dayjs";

export const getTime = (time: string) => {
  let newTime = dayjs(new Date());
  let oldTime = dayjs(time);
  let nh = newTime.hour();
  let nm = newTime.minute();
  let ny = newTime.year();
  let nM = newTime.month() + 1;
  let nd = newTime.day();

  // let oh = oldTime.hour();
  let om = oldTime.minute();
  let oy = oldTime.year();
  let oM = oldTime.month() + 1;
  let od = oldTime.day();

  let writeTime = "";
  // 当天的时间
  if (od === nd && oM === nM && oy === ny) {
    if (nh < 10) {
      writeTime = "0" + nh + ":";
    } else {
      writeTime = nh + ":";
    }
    if (nm < 10) {
      writeTime += "0" + nm;
    } else {
      writeTime += nm;
    }
    return writeTime;
  }
  // 前一天的时间
  if (od + 1 === nd && om === nm && oy === ny) {
    if (nh < 10) {
      writeTime = "0" + nh + ":";
    } else {
      writeTime = nh + ":";
    }
    if (nm < 10) {
      writeTime += "0" + nm;
    } else {
      writeTime += nm;
    }
    writeTime += "昨天" + writeTime;
    return writeTime;
  }

  if (oM < 10) {
    writeTime = "0" + oM + "/";
  }
  if (od < 10) {
    writeTime = writeTime + "0" + od;
  }
  return oy + "/" + writeTime;
};
