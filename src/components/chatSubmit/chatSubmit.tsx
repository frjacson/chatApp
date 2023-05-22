import Taro from "@tarojs/taro";
import { FC, useState } from "react";
import { View, Image, Textarea } from "@tarojs/components";
import voice from '@/asserts/images/voice.png';
import emoji from '@/asserts/images/emoji.png';
import addLogo from '@/asserts/images/add.png';
import keyboard from '@/asserts/images/keyboard.png';
import optBack from '@/asserts/images/opt_back.png';
import Emoji from "../emoji/emoji";
import ChatAdd from "../chatAddCom/ChatAdd";
import styles from './styles.module.scss';

interface ChatSubMitProps  {
  onConfirmInput?: (value) => void;
  onChangeHeight?: (value) => void;
  onItemClick?: (value) => void;
  onVoiceTouchInfo?: (path, duration) => void;
  onTimeShow?: (value) => void;
}
const ChatSubmit:FC<ChatSubMitProps> = (props) => {
  const { onConfirmInput, onChangeHeight, onItemClick, onTimeShow, onVoiceTouchInfo } = props;
  const [isVoice, setIsVoice] = useState(false);
  const [showEmoji, setShowEmoji] = useState(false);
  const [showMore, setShowMore] = useState(false);
  const [textareaValue, setTextareaValue] = useState("");
  const [resetTextarea, setResetTextarea] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const recorderManager = Taro.getRecorderManager();
  let timer = null as any;
  const handleVoiceClick = () => {
    setIsVoice(!isVoice);
    setShowEmoji(false);
    setShowMore(false);
  }
  const handleEmojiClick = () => {
    setShowEmoji(!showEmoji);
    setShowMore(false);
    setIsVoice(false);
    Taro.nextTick(() => {
      getHeight();
    })
  }
  const handleInputConfirm = (e) => {
    // 这里通过setResetTextarea控制它的重新渲染，以达到自适应高度
    if(onConfirmInput) {
      setResetTextarea(false);
      if (e.detail.value.trim() === '') {
        // 文本为空，不执行发送逻辑
        return
      }
      onConfirmInput(e.detail.value);
      setTimeout(() => {
        setTextareaValue("");
         // 重置Textarea高度为初始值
        setResetTextarea(true);
      }, 0)
    }
  }
  const getHeight = () => {
    const query = Taro.createSelectorQuery();
    query.select("#container").boundingClientRect((rect:any) => {
      if(rect && rect.height) {
        if(onChangeHeight) {
          onChangeHeight(rect.height);
        }
      }else {
        if(onChangeHeight) {
          onChangeHeight(60);
        }
      }
    })
    query.exec();
  }
  const getClickEmoji = (value) => {
    setTextareaValue(textareaValue + value);
  }
  const handleSubmit = (value) => {
    if(onConfirmInput) {
      setResetTextarea(false);
      if (value.trim() === '') {
        // 文本为空，不执行发送逻辑
        return
      }
      onConfirmInput(value);
      setTimeout(() => {
        setTextareaValue("");
         // 重置Textarea高度为初始值
        setResetTextarea(true);
      }, 0)
    }
  }
  const handleDelete = () => {
    setTextareaValue(textareaValue.substring(0, textareaValue.length-1));
  }
  const handleTextareaFocus = () => {
    setShowEmoji(false);
    // 重新计算高度
    if(onChangeHeight) {
      onChangeHeight(60);
    }
  }
  const handleAddClick = () => {
    setShowEmoji(false);
    setShowMore(!showMore);
    setIsVoice(false);
    Taro.nextTick(() => {
      getHeight();
    })
  }
  const getItemClick = (value) => {
    console.log(value);
    if(onItemClick) {
      onItemClick(value);
    }
  }
  const handleTouchStart = () => {
    timer = setTimeout(() => {
      setIsRecording(true);
      recorderManager.start({
        duration: 60000, // 最大录音时长，单位为毫秒
        format: 'mp3', // 录音格式
      });
      recorderManager.onStart(() => {
        console.log('Recording started');
        // 在开始录音时执行一些操作
        if(onTimeShow) {
          onTimeShow(true);
        }
        setTimeout(() => {
          handleTouchEnd();
        },60000)
      });
    }, 500)
  }
  const handleTouchEnd = () => {
    clearTimeout(timer);
    if(isRecording) {
      // 停止录音
      recorderManager.stop();
      // 监听录音结束事件
      recorderManager.onStop((res) => {
        console.log('Recording stopped', res);
        const { tempFilePath, duration } = res;
        // 在结束录音时执行一些操作，如上传录音文件等
        if(onVoiceTouchInfo) {
          onVoiceTouchInfo(tempFilePath, duration);
        }
        if(onTimeShow) {
          onTimeShow(false);
        }
        setIsRecording(false);
        // 可以使用 tempFilePath 获取录音文件的临时路径
      });
    } else {
      // 如果未达到长按时间阈值，则视为点击操作，执行相应的点击事件
      console.log('Click event');
    }
  }
  return (
    <View className={styles.main} id='container'>
      <View className={styles.submitContainer}>
        <View className={styles.voice} onClick={handleVoiceClick}>
          {
            !isVoice && <Image src={voice}></Image> 
          }
          {
            isVoice && <Image src={keyboard}></Image>
          }
        </View>
        <View className={styles.center}>
          {
            !isVoice && <Textarea key={resetTextarea ? 'reset' : 'normal'} autoHeight value={textareaValue} onInput={(e) => {setTextareaValue(e.detail.value)}} className={styles.input} confirmType='send' onConfirm={handleInputConfirm} onFocus={handleTextareaFocus} />
          }
          {
            isVoice && <View className={styles.talkText} onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd}>按住 说话</View>
          }
        </View>
        <View className={styles.right}>
          <View className={styles.emoji} onClick={handleEmojiClick}>
            <Image src={emoji}></Image>
          </View>
          <View className={styles.add}>
            <Image src={addLogo} onClick={handleAddClick}></Image>
          </View>
        </View>
      </View>
      <View className={styles.bottomContainer}>
        {
          showEmoji &&  <View className={styles.emojiContainer}>
            <View className={styles.emojiButton}>
              <View className={styles.delButton} onClick={handleDelete}>
                <Image src={optBack} className={styles.delete}></Image>
              </View>
              <View className={styles.compButton} onClick={() => handleSubmit(textareaValue)}>发送</View>
            </View>
            <Emoji onClickEmoji={getClickEmoji}></Emoji>
          </View>
        }
        {
          showMore && <View className={styles.moreContainer}>
            <ChatAdd itemClick={getItemClick}></ChatAdd>
          </View>
        }
      </View>
    </View>
  )
}

export default ChatSubmit;