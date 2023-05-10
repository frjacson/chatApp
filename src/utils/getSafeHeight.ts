import Taro from "@tarojs/taro";
import { useEffect, useState } from "react";

export const useSafeHeight = () => {
  const [safeAreaBottom, setSafeAreaButton] = useState(0);
  useEffect(() => {
    const { safeArea } = Taro.getSystemInfoSync();
    const { bottom, height, left } = safeArea as TaroGeneral.SafeAreaResult;
    console.log(height);
    console.log(left);
    console.log(bottom);
    // console.log(viewHeight);
    setSafeAreaButton(bottom);
  }, []);
  return safeAreaBottom;
};
