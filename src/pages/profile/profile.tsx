import Taro from "@tarojs/taro";
import { ChangeEvent, useState } from "react";
import { View, Image } from "@tarojs/components";
import TopBar from "@/components/topbar";
import backlogo from '@/asserts/images/back.png';
import morelogo from '@/asserts/images/more@2x.png';
import bglogo from '@/asserts/images/lyf.jpeg';
import female from '@/asserts/images/female.png';
import styles from './profile.modules.scss';


const Profile = () => {
  const [areaInfo, setAreaInfo] = useState("肖枫请求添加好友!");
  const [isAdd, setIsAdd] = useState(false);
  const [btnAnimationData, setBtnAnimationData] = useState({});
  const [friendAnimationData, setFriendAnimationData] = useState({});
  const [imgAnimationData, setImgAnimationData] = useState({});
  const [logoAnimationData, setLogoAnimationData] = useState({});
  const [bgAnimationData, setBgAnimationData] = useState({});
  const handleAreaChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setAreaInfo(e.target.value);
  }
  const handleAddClick = () => {
    const animation = Taro.createAnimation({
      duration: 600,
      timingFunction: 'ease'
    });
    const fAnimation = Taro.createAnimation({
      duration: 600,
      timingFunction: 'ease'
    })
    const iAnimationData = Taro.createAnimation({
      duration: 600,
      timingFunction: 'ease'
    })
    const iLogoAnimationData = Taro.createAnimation({
      duration: 0,
      timingFunction: 'step-start'
    })
    const iBgAnimationData =Taro.createAnimation({
      duration: 600,
      timingFunction: 'ease'
    })
    if(isAdd) {
      animation.bottom(-80).step();
      fAnimation.bottom("-80%").step();
      iAnimationData.width(200).height(200).step();
      iLogoAnimationData.opacity(1).step();
      iBgAnimationData.backgroundColor("rgba(255, 228, 49, 0)").step(); 
    }else {
      animation.bottom('80px').step();
      fAnimation.bottom("80%").step();
      iAnimationData.width(100).height(100).step()
      iLogoAnimationData.opacity(0).step();
      iBgAnimationData.backgroundColor("rgba(255, 228, 49, 0.6)").step();
      setIsAdd(true);
    }
    setBtnAnimationData(animation.export());
    setFriendAnimationData(fAnimation.export());
    setImgAnimationData(iAnimationData.export());
    setLogoAnimationData(iLogoAnimationData.export());
    setBgAnimationData(iBgAnimationData.export());
  }
  const handleCancleClick = () => {
    setIsAdd(false);
    handleAddClick();
  }
  const handleBackClick = () => {
    Taro.navigateBack();
  }
  const handleMoreClick = () => {
    Taro.navigateTo({
      url: '/pages/user_detail/userDetail?id=1'
    })
  }
  return (
    <View className={styles.profileContainer}>
      <TopBar isOpacity underline={false}>
        <View className={styles.back}>
          <Image src={backlogo} onClick={handleBackClick}></Image>
        </View>
        <View></View>
        <View className={styles.more}>
          <Image src={morelogo} onClick={handleMoreClick}></Image>
        </View>
      </TopBar>
      <View className={styles.bg} animation={bgAnimationData}>
        <View className={styles.profile}>
          <View className={styles.profileImage}>
            <Image src={bglogo} className={styles.logo} animation={imgAnimationData}></Image>
            <Image src={female} className={styles.sexLogo} animation={logoAnimationData}></Image>
          </View>
          <View className={styles.profileTitle} animation={logoAnimationData}>左左表妹</View>
          <View className={styles.nickName} animation={logoAnimationData}>昵称: 刘亦菲大美女</View>
          <View className={styles.profileMotto} animation={logoAnimationData}>夜，结束了一天的喧嚣后安静下来，伴随着远处路灯那微弱的光。风，毫无预兆地席卷整片旷野，撩动人的思绪万千。</View>
        </View>
        <View className={styles.friendContainer} animation={friendAnimationData}>
          <View className={styles.friendName}>左左表妹</View>
          <View className={styles.myContent}>
            <textarea className={styles.myTextArea} value={areaInfo} onChange={handleAreaChange}></textarea>
          </View>
        </View>
        <View className={styles.addFriendBox}>
          <View className={styles.addFriend} onClick={handleAddClick}>加好友</View>
        </View>
        <View className={styles.postBox}>
          <View className={styles.postContainer} animation={btnAnimationData}>
            <View className={styles.postCancle} onClick={handleCancleClick}>取消</View>
            <View className={styles.post}>发送</View>
          </View> 
        </View>
        <Image src={bglogo} className={styles.bgImage} mode='aspectFill'></Image>
      </View>
    </View>
  )
}

export default Profile;