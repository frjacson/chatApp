import Taro from '@tarojs/taro';
import { View, Text, Image } from '@tarojs/components'
import {FC, useCallback, useEffect, useState} from 'react';
import addFriendImg from '@/asserts/images/tianjiahaoyou.png';
import styles from './styles.module.scss';
import { getRequestList } from '../../../src/api/getData';

export type FriendReqProps = {
  nickName?: string;
  requestMsg?: string;
  requestTime?: string;
}
const FriendApply: FC = () => {
  const [requestList, setRequestList] = useState<FriendReqProps[]>([]);

  const getAddList = useCallback(async () => {
    const { data } = await getRequestList();
    setRequestList([...data.data])
  }, [])
  useEffect(() => {
    getAddList();
  }, [getAddList])

 const handleClick = () => {
  const encodedArr = encodeURIComponent(JSON.stringify(requestList))
  Taro.navigateTo({
    url: `/pages/friendRequest/friendRequest?requestList=${encodedArr}`,
  })
 } 
  return (
    <View className={styles.applyContainer} onClick={handleClick}>
      <View className={styles.listLeft}>
        <Text className={styles.tip}>{requestList.length}</Text>
        <Image src={addFriendImg}></Image>
      </View>
      <View className={styles.listRight}>
        <View className={styles.top}>
        <View className={styles.name}>好友请求</View>
          <View className={styles.time}>上午9.03</View>
        </View>
        <View className={styles.info}>茫茫人海之中，你我相聚于此！</View>
      </View>
    </View>
  )
}
export default FriendApply;