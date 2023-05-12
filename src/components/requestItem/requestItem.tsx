import { FC } from "react";
import { View, Image, Text } from "@tarojs/components";
import avatar from '@/asserts/images/img.png';
import styles from './styles.module.scss';
import { FriendReqProps } from "../friendApply";

type IProps = {
  FriendProp: FriendReqProps
}
const RequestItem: FC<IProps> = (props) => {
  const { FriendProp } = props;
  return (
    <View className={styles.content}>
      <View className={styles.requestTop}>
        <View className={styles.rejectBtn}>
          <View className={styles.reject}>拒绝</View>
        </View>
        <View className={styles.avatar}>
          <Image src={avatar}></Image>
        </View>
        <View className={styles.aggreeBtn}>
          <View className={styles.aggree}>同意</View>
        </View>
      </View>
      <View className={styles.requestCenter}>
        <View className={styles.nickName}>{ FriendProp.nickName }</View>
        <View className={styles.time}>{ FriendProp.requestTime }</View>
      </View>
      <View className={styles.requestMsg}>
        <Text className={styles.text}>{ FriendProp.requestMsg }</Text>
      </View>
    </View>
  )
}
export default RequestItem;