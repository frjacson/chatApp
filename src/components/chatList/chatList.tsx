import { FC, memo, useCallback } from "react";
import Taro from "@tarojs/taro";
import { View, Image, Text } from "@tarojs/components";
import leftLogo from '@/asserts/images/img.png';
import rightLogo from '@/asserts/images/img2.jpeg';
import yuyin from '@/asserts/images/yuyin.png';
import classNames from "classnames";
import { getChatTime } from "@/utils/getTimes";
import styles from './chatList.module.scss';


type chatTypes = 'text' | 'image' | 'audio' | 'vedio'
type VedioProps = {
  time?: number;
  valueSrc?: string;
}
export interface ChatProps {
  chatId?: number;
  currentId?: number;
  chatLeftAvatar?: string;
  chatRightAvatar?: string;
  chatTime?: number;
  chatTypes?: chatTypes
  chatMsg?: string | VedioProps;
  chatImg?: string;
  chatAudio?: string;
  chatVedio?: string;
  scrollId?: string;
}

const ChatList:FC<ChatProps & {chatImages: string[]}> = memo((props) => {
  const { chatId = 0, 
          chatLeftAvatar=leftLogo, 
          chatRightAvatar=rightLogo, 
          chatTime, 
          chatTypes = 'text', 
          chatMsg = "你好啊拉家带口撒了房间发动机撒了点撒了房间啊啥的风景", 
          chatImg = '',
          scrollId="msg0",
          chatImages
        } = props;
  const TextGenerate = () => {
    const textClasses = classNames(styles.textContainer, {
      [styles.leftText]: chatId === 0,
      [styles.rightText]: chatId === 1
    })
    return (
      <View className={textClasses}>
        <Text>{chatMsg as string}</Text>
      </View>
    )
  }
  const VoiceGenerate = () => {
    const voiceClasses = classNames({
      [styles.leftVoice]: chatId === 0,
      [styles.rightVoice]: chatId === 1
    })
    const msg = chatMsg as VedioProps
    return (
      <View className={styles.voiceContainer}>
       {
        chatId === 0 && <View className={voiceClasses} style={{width: `${msg.time as number * 4}px`}}>
          <Image src={yuyin} className={styles.voiceImage}></Image>
          {msg.time + '”' || 2 + '“'}
        </View>
       }
       {
        chatId === 1 && <View className={voiceClasses} style={{width: `${msg.time as number * 4}px`}}>
          {msg.time + '”' || 2 + '“'}
          <Image src={yuyin} className={styles.voiceImage}></Image>
        </View> 
       }
      </View>
    )
  }
  const handlePreviewImage = useCallback(() => {
    Taro.previewImage({
      urls: chatImages,
      current: chatImg
    })
  }, [chatImages, chatImg])
  const ImageGenerate = useCallback(() => {
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
  }, [chatId, chatImg, handlePreviewImage])
  const mapGen = {
    'text': TextGenerate,
    'image': ImageGenerate,
    'audio': VoiceGenerate
  }
  const chatClasses = classNames(styles.chatMessage, {
    [styles.reverse]: chatId === 1
  })
  return (
    <View className={styles.listContainer} id={scrollId}>
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
})
export default ChatList;