import { useEffect, useState } from "react";
import Taro, { useRouter } from "@tarojs/taro";
import { View, Image } from "@tarojs/components";
import TopBar from "@/components/topbar";
import RequestItem from "@/components/requestItem/requestItem";
import { FriendReqProps } from "@/components/friendApply";
import backLogo from '@/asserts/images/back.png';
import styles from './styles.modules.scss';


const FriendRequest = () => {
  const router = useRouter();
  const [addList, setAddList] = useState<FriendReqProps[]>([]);
  const handleBackClick = () => {
    Taro.navigateBack();
  }
  useEffect(() => {
      const {requestList} = router.params 
      const decode = decodeURIComponent(requestList as string);
      const list = JSON.parse(decode as string);
      console.log(list);
      setAddList([...list])
  }, [router.params])
  return (
    <View className={styles.main}>
      <TopBar>
        <View className={styles.backLogo}>
          <Image src={backLogo} onClick={handleBackClick}></Image>
        </View>
        <View className={styles.title}>好友请求</View>
        <View></View>
      </TopBar>
      <View className={styles.friendContainer}>
        {
          addList && addList.map((item, index) => {
            return (
              <RequestItem key={index} FriendProp={item} />
            )
          })
        }
      </View>
    </View>
  )
}

export default FriendRequest;