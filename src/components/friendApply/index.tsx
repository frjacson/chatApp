import { View, Text, Image } from '@tarojs/components'
import {FC} from 'react';
import addFriendImg from '@/asserts/images/tianjiahaoyou.png';
import styles from './styles.module.scss';

const FriendApply: FC = () => {
  return (
    <View className={styles.applyContainer}>
      <View className={styles.listLeft}>
        <Text className={styles.tip}>1</Text>
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