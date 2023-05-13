import { createContext, useEffect, useRef, useState } from "react";
import { View, Image, ScrollView } from "@tarojs/components";
import TopBar from "@/components/topbar";
import ChatList, { ChatProps } from "@/components/chatList/chatList";
import { spaceTime } from "@/utils/getTimes";
import backLogo from '@/asserts/images/back.png';
import groupLogo from '@/asserts/images/more@2x.png'
import testbg from '@/asserts/images/bg2.jpeg';
import testbg2 from '@/asserts/images/bg.jpeg';
import styles from './chatRoom.module.scss';

const mockData: ChatProps[] = [
  {
    chatId: 0,
    chatMsg: "你是魔鬼中的天使",
    chatTime: 1683963951012
  },
  {
    chatId: 1,
    chatMsg: "你好啊",
    chatTime: 1683963952813
  },
  {
    chatId: 1,
    chatMsg: "你好啊",
    chatTime: 1683964210001
  },
  {
    chatId: 1,
    chatTypes: "image",
    chatImg: testbg,
    chatTime: 1683964218181
  },
  {
    chatId: 0,
    chatMsg: "你是魔鬼中的天使",
    chatTime: 1683964256806
  },
  {
    chatId: 0,
    chatTypes: "image",
    chatImg: testbg2,
    chatTime: 1683966100000,
  },
  {
    chatId: 1,
    chatMsg: "你好啊",
    chatTime: 1683966124590
  },
]
export const ImageContext = createContext<{chatImages: string[]}>({ chatImages: [] });
const ChatRoom = () => {
  const [chatImages, setChatImages] = useState<string[]>([]);
  const [dataList, setDataList] = useState<ChatProps[]>([]);
  let oldTime = useRef(new Date().getTime());
  const getDataList = () => {
    const newMockData = mockData.reverse();
    newMockData.forEach((item, index) => {
      let t = spaceTime(oldTime.current, item.chatTime as number);
      if(t) {
        oldTime.current = t as number
      }else if(index === newMockData.length - 1 && !t) {
        item.chatTime = item.chatTime
      }else {
        item.chatTime = t as number;
      }
    })
    setDataList([...mockData])
  }
  useEffect(() => {
    const imageData = mockData.filter(item => item.chatTypes)
    setChatImages(imageData.map(item => item.chatImg + ""));
    getDataList();
  }, [])
  return (
    <View className={styles.main}>
      <TopBar>
        <View className={styles.backLogo}>
          <Image src={backLogo}></Image>
        </View>
        <View className={styles.title}>杨洋</View>
        <View className={styles.groupLogo}>
          <Image src={groupLogo}></Image>
        </View>
      </TopBar>
      <View className={styles.chatContainer}>
        <ScrollView scrollY>
          <ImageContext.Provider value={{chatImages}}>
            {
              dataList && dataList.reverse().map((item, key) => {
                return (
                  <ChatList key={key} chatId={item.chatId} 
                    chatLeftAvatar={item.chatLeftAvatar}
                    chatRightAvatar={item.chatRightAvatar}
                    chatTime={item.chatTime}
                    chatTypes={item.chatTypes}
                    chatMsg={item.chatMsg}
                    chatImg={item.chatImg}
                    chatAudio={item.chatAudio}
                    chatVedio={item.chatVedio}
                  />
                )
              })
            }
          </ImageContext.Provider>
        </ScrollView>
      </View>
    </View>
  )
}

export default ChatRoom;