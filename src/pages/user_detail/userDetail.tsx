import Taro from "@tarojs/taro";
import { useCallback, useEffect, useState } from "react";
import { View, Image, Input } from "@tarojs/components";
import TopBar from "@/components/topbar";
import DetailItem from "@/components/detailItem/detailItem";
import UpdateModal from "@/components/updateModal/updateModal";
import backLogo from '@/asserts/images/back.png';
import imgAvatar from '@/asserts/images/img.png'
import styles from './userDetail.module.scss';
import { getUserDetail } from "../../../src/api/getData";

type UserDetailProps = {
  id?: number;
  sign: string;
  registerTime: string;
  nickName: string;
  sex: string;
  birthDay: string;
  phone: string;
  email: string;
  password: string;
}
const UserDetail = () => {
  const [userDetail, setUserDetail] = useState<UserDetailProps>({} as UserDetailProps);
  const [showModal, setShowModal] = useState(false);
  const [title, setTitle] = useState("");
  const [key, setKey] = useState("");
  const [imgSrc, setImgSrc] = useState(imgAvatar);
  const getUserInfo = useCallback(async() => {
    const { data } = await getUserDetail();
    setUserDetail({...data.data})
  }, [])
  useEffect(() => {
    getUserInfo();
  }, [getUserInfo])
  const handleImageClick = () => {
    Taro.chooseImage({
      count: 1, 
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
      success: (res) => {
        // setImgSrc(res.tempFilePaths[0]);
        console.log(res);
        setImgSrc(imgAvatar);
      }
    })
  }
  const handleUpdateClick = (curTitle: string,curKey: string) => {
    setTitle(curTitle);
    setKey(curKey);
    setShowModal(true);
  }
  const handleConfirm = (curKey: string, newValue: string, isShow: boolean) => {
    setUserDetail({...userDetail, [`${curKey}`]: newValue})
    setShowModal(isShow);
  }
  const handleCancle = (isShow: boolean) => {
    setShowModal(isShow);
  }
  const centerChild = () => {
    return (
      <Image src={imgSrc} onClick={handleImageClick}></Image>
    )
  }
  const rightChild = (curTitle: string, curKey: string) => {
    return (
      <Image src={backLogo} onClick={() => handleUpdateClick(curTitle, curKey)}></Image> 
    )
  }
  const handleBackClick =() => {
    Taro.navigateBack();
  }
  return (
    <View className={styles.detailContainer}>
      <TopBar underline>
        <Image src={backLogo} className={styles.backLogo} onClick={handleBackClick}></Image>
        <View className={styles.topText}>个人详情</View>
        <View></View>
      </TopBar>
      <View className={styles.itemList}>
        <DetailItem leftChild='头像' centerChild={centerChild()} />
        <DetailItem leftChild='签名' centerChild={userDetail.sign} rightChild={rightChild('签名','sign')} />
        <DetailItem leftChild='注册' centerChild={userDetail.registerTime} rightChild={rightChild('注册','registerTime')} />
        <DetailItem leftChild='昵称' centerChild={userDetail.nickName} rightChild={rightChild('昵称','nickName')} />
        <DetailItem leftChild='性别' centerChild={userDetail.sex} rightChild={rightChild('性别','sex')} />
        <DetailItem leftChild='生日' centerChild={userDetail.birthDay} rightChild={rightChild('生日','birthDay')} />
        <DetailItem leftChild='电话' centerChild={userDetail.phone} rightChild={rightChild('电话','phone')} />
        <DetailItem leftChild='邮箱' centerChild={userDetail.email} rightChild={rightChild('邮箱','email')} />
        {/* @ts-ignore */}
        <DetailItem leftChild='密码' centerChild={<Input type='password' disabled value={userDetail.password}></Input>} rightChild={rightChild('密码','password')} />
      </View>
      {showModal && <UpdateModal showModal={showModal} title={title} curKey={key} onConfirm={handleConfirm} onCancle={handleCancle} initValue={userDetail[`${key}`]}></UpdateModal>}
    </View>
  )
}
export default UserDetail;