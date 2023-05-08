import { View, Text, Image } from '@tarojs/components'
import {FC, Fragment, useEffect, useState} from 'react';
import onePic from '@/asserts/images/img2.jpeg';
import styles from './styles.module.scss';
import {getFriendList} from '../../api/getData';
import { getTime } from '../../../src/utils/getTimes';


type friendListProp = {
  listName: string;
  listInfo: string;
  listTime: string;
}

const FriendList: FC = () => {
  const [friendList, setFriendList] = useState<friendListProp[]>([]);
  const getData = async () => {
    const data = await getFriendList();
    data.data.data.forEach(item => {
      item.listTime = getTime(item.listTime);
    })
    setFriendList([...data.data.data])
  }
  useEffect(() => {
    getData();
  }, [])
  return (
    <Fragment>
      {
        friendList && friendList.map((item, index) => {
          return (
            <View className={styles.listContainer} key={index}>
              <View className={styles.listLeft}>
              <Text className={styles.tip}>99</Text>
              <Image src={onePic}></Image>
            </View>
            <View className={styles.listRight}>
              <View className={styles.top}>
              <View className={styles.name}>{item.listName}</View>
                <View className={styles.time}>{item.listTime}</View>
              </View>
              <View className={styles.info}>{item.listInfo}</View>
            </View>
            </View>
          )
        })
      }
    </Fragment>
  )
}
export default FriendList;