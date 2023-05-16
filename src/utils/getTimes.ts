import dayjs from "dayjs";

export const getTime = (time: string) => {
  let newTime = dayjs(new Date());
  let oldTime = dayjs(time);
  // let nh = newTime.hour();
  let nm = newTime.minute();
  let ny = newTime.year();
  let nM = newTime.month() + 1;
  let nd = newTime.date();

  // let oh = oldTime.hour();
  let om = oldTime.minute();
  let oy = oldTime.year();
  let oM = oldTime.month() + 1;
  let od = oldTime.date();
  let oh = oldTime.hour();

  let writeTime = "";
  // 当天的时间
  if (od === nd && oM === nM && oy === ny) {
    if (oh < 10) {
      writeTime = "0" + oh + ":";
    } else {
      writeTime = oh + ":";
    }
    if (om < 10) {
      writeTime += "0" + om;
    } else {
      writeTime += om;
    }
    return writeTime;
  }
  // 前一天的时间
  if (od + 1 === nd && om === nm && oy === ny) {
    if (oh < 10) {
      writeTime = "0" + oh + ":";
    } else {
      writeTime = oh + ":";
    }
    if (om < 10) {
      writeTime += "0" + om;
    } else {
      writeTime += om;
    }
    writeTime += "昨天" + writeTime;
    return writeTime;
  } else {
    if (oM < 10) {
      writeTime = "0" + oM + "/";
    } else {
      writeTime = oM + "/";
    }
    if (od < 10) {
      writeTime = writeTime + "0" + od;
    } else {
      writeTime = writeTime + od;
    }
    return oy + "/" + writeTime;
  }
};

export const getChatTime = (time: number) => {
  let newTime = dayjs(new Date());
  let oldTime = dayjs(time);
  // let nh = newTime.hour();
  let nm = newTime.minute();
  let ny = newTime.year();
  let nM = newTime.month() + 1;
  let nd = newTime.date();
  // let oh = oldTime.hour();
  let om = oldTime.minute();
  let oy = oldTime.year();
  let oM = oldTime.month() + 1;
  let od = oldTime.date();
  let oh = oldTime.hour();

  let writeTime = "";
  // 当天的时间
  if (od === nd && oM === nM && oy === ny) {
    if (oh < 10) {
      writeTime = "0" + oh + ":";
    } else {
      writeTime = oh + ":";
    }
    if (om < 10) {
      writeTime += "0" + om;
    } else {
      writeTime += om;
    }
    return writeTime;
  }
  // 前一天的时间
  if (od + 1 === nd && om === nm && oy === ny) {
    if (oh < 10) {
      writeTime = "0" + oh + ":";
    } else {
      writeTime = oh + ":";
    }
    if (om < 10) {
      writeTime += "0" + om;
    } else {
      writeTime += om;
    }
    writeTime += "昨天" + writeTime;
    return writeTime;
  } else if (oy === ny) {
    if (oh < 10) {
      writeTime = "0" + oh + ":";
    } else {
      writeTime = oh + ":";
    }
    if (oM < 10) {
      writeTime += "0" + oM;
    } else {
      writeTime += oM;
    }
    return oM + "月" + od + "日 " + writeTime;
  } else {
    if (oh < 10) {
      writeTime = "0" + oh + ":";
    } else {
      writeTime = oh + ":";
    }
    if (oM < 10) {
      writeTime += "0" + oM;
    } else {
      writeTime += oM;
    }
    return oy + "年" + oM + "月" + od + "日 " + writeTime;
  }
};

export const spaceTime = (old: number, now: number) => {
  const oldTime = new Date(old).getTime();
  const nowTime = new Date(now).getTime();

  if (oldTime > nowTime + 1000 * 60 * 1) {
    return nowTime;
  } else {
    return "";
  }
};
