import Taro from "@tarojs/taro";
import { createContext, createRef, useCallback, useEffect, useRef, useState } from "react";
import { View, Image, ScrollView } from "@tarojs/components";
import TopBar from "@/components/topbar";
import ChatList, { ChatProps } from "@/components/chatList/chatList";
import ChatSubmit from "@/components/chatSubmit/chatSubmit";
import { spaceTime } from "@/utils/getTimes";
import backLogo from '@/asserts/images/back.png';
import groupLogo from '@/asserts/images/more@2x.png';
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
  const [submitHeight, setSubmitHeight] = useState(60);
  // const [scrollToId, setScrollToId] = useState("");
  const scrollViewRef = createRef();
  let oldTime = useRef(new Date().getTime());
  const getDataList = useCallback(() => {
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
    setDataList([...newMockData].reverse())
  }, [])
  useEffect(() => {
    const imageData = mockData.filter(item => item.chatTypes)
    setChatImages(imageData.map(item => item.chatImg + ""));
    getDataList();
  }, [getDataList])
  const getConfirmInputValue = (value) => {
    setDataList((pre) => {
      return [...pre, {"chatId": 1, "chatTypes": 'text', "chatMsg": value, "chatTime": new Date().getTime()}]
    })
  }
  const getScrollBottom = useCallback(() => {
    setTimeout(() => {
      document.querySelector(`#msg${dataList.length-1}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 64)
  }, [dataList.length])
  const getSubmitHeight = (value) => {
    Taro.nextTick(() => {
      setSubmitHeight(value);
      const query = Taro.createSelectorQuery();
      query.select(`#msg${dataList.length-1}`).boundingClientRect((rect:any) => {
        if(rect && rect.height) {
          Taro.pageScrollTo({
            scrollTop: rect.top,
            duration: 16,
          })
        }
      })
      query.exec();
    })
    getScrollBottom();
  }
  useEffect(() => {
    getScrollBottom()
    console.log(2);
  }, [getScrollBottom])
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
      <View className={styles.chatContainer} style={{marginBottom: submitHeight}}>
        <ScrollView scrollY scrollWithAnimation ref={scrollViewRef}>
          <ImageContext.Provider value={{chatImages}}>
            {
              dataList && dataList.map((item, key) => {
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
                    scrollId={"msg" +key+""}
                  />
                )
              })
            }
          </ImageContext.Provider>
        </ScrollView>
      </View>
      <ChatSubmit onConfirmInput={getConfirmInputValue} onChangeHeight={getSubmitHeight}></ChatSubmit>
    </View>
  )
}

export default ChatRoom;