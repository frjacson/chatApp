import { View, Image } from '@tarojs/components';
import pic1 from '@/asserts/images/img.png';
import fireLogo from '@/asserts/images/fire.png';
import search from '@/asserts/images/search.png';
import add from '@/asserts/images/group.png';

import styles from './style.module.scss';


const TopBar = function () {
  return (
    <View className={styles.content}>
      <View className={styles.topBar}>
       <View className={styles.topBarContainer}>
        <View className={styles.topBarLeft}>
          <Image src={pic1}></Image>
        </View>
        <View className={styles.topBarContent}>
          <Image src={fireLogo}></Image>
        </View>
        <View className={styles.topBarRight}>
          <View className={styles.search}>
            <Image src={search}></Image>
          </View>
          <View className={styles.add}>
            <Image src={add}></Image>
          </View>
        </View>
        </View> 
      </View>
    </View>
  )
}

export default TopBar;