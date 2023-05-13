import { FC , useContext } from "react";
import Taro from "@tarojs/taro";
import { View, Image, Text } from "@tarojs/components";
import leftLogo from '@/asserts/images/img.png';
import rightLogo from '@/asserts/images/img2.jpeg';
import classNames from "classnames";
import { getChatTime } from "@/utils/getTimes";
import styles from './chatList.module.scss';
import { ImageContext } from "../../../src/pages/chatRoom/chatRoom";


type chatTypes = 'text' | 'image' | 'audio' | 'vedio'
export interface ChatProps {
  chatId?: number;
  currentId?: number;
  chatLeftAvatar?: string;
  chatRightAvatar?: string;
  chatTime?: number;
  chatTypes?: chatTypes
  chatMsg?: string;
  chatImg?: string;
  chatAudio?: string;
  chatVedio?: string;
}

const ChatList:FC<ChatProps> = (props) => {
  const { chatId = 0, 
          chatLeftAvatar=leftLogo, 
          chatRightAvatar=rightLogo, 
          chatTime, 
          chatTypes = 'text', 
          chatMsg = "你好啊拉家带口撒了房间发动机撒了点撒了房间啊啥的风景", 
          chatImg = ''
        } = props;
  const { chatImages } = useContext(ImageContext)
  const TextGenerate = () => {
    const textClasses = classNames(styles.textContainer, {
      [styles.leftText]: chatId === 0,
      [styles.rightText]: chatId === 1
    })
    return (
      <View className={textClasses}>
        <Text>{chatMsg}</Text>
      </View>
    )
  }
  const ImageGenerate = () => {
    const imgClasses = classNames({
      [styles.leftImage]: chatId === 0,
      [styles.rightImage]: chatId === 1
    })
    return (
      <View>
        {chatImg && <View className={styles.imgContainer}>
          <Image src={chatImg} mode='widthFix' className={imgClasses} onClick={handlePreviewImage}></Image>
        </View>}
      </View>
    )
  }
  const mapGen = {
    'text': TextGenerate,
    'image': ImageGenerate
  }
  const chatClasses = classNames(styles.chatMessage, {
    [styles.reverse]: chatId === 1
  })
  const handlePreviewImage = () => { 
    Taro.previewImage({
      urls: chatImages,
      current: chatImg
    })
  }
  return (
    <View className={styles.listContainer}>
      {
        chatTime && <View className={styles.chatTime}>
          <Text>{getChatTime(chatTime)}</Text>
        </View>
      }
      <View className={chatClasses}>
        <View className={styles.chatAvatar}>
          <Image src={rightLogo ? chatLeftAvatar : chatRightAvatar}></Image>
        </View>
        {
          mapGen[chatTypes]()
        }
      </View>
    </View>
  )
}
export default ChatList;