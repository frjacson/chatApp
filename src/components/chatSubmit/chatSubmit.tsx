import Taro from "@tarojs/taro";
import { FC, useState } from "react";
import { View, Image, Textarea } from "@tarojs/components";
import voice from '@/asserts/images/voice.png';
import emoji from '@/asserts/images/emoji.png';
import addLogo from '@/asserts/images/add.png';
import keyboard from '@/asserts/images/keyboard.png';
import optBack from '@/asserts/images/opt_back.png';
import Emoji from "../emoji/emoji";
import styles from './styles.module.scss';

interface ChatSubMitProps  {
  onConfirmInput?: (value) => void;
  onChangeHeight?: (value) => void;
}
const ChatSubmit:FC<ChatSubMitProps> = (props) => {
  const { onConfirmInput, onChangeHeight } = props;
  const [isVoice, setIsVoice] = useState(false);
  const [showEmoji, setShowEmoji] = useState(false);
  const [textareaValue, setTextareaValue] = useState("");
  const [resetTextarea, setResetTextarea] = useState(false);
  const handleVoiceClick = () => {
    setIsVoice(!isVoice);
  }
  const handleEmojiClick = () => {
    setShowEmoji(!showEmoji);
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
            isVoice && <View className={styles.talkText}>按住 说话</View>
          }
        </View>
        <View className={styles.right}>
          <View className={styles.emoji} onClick={handleEmojiClick}>
            <Image src={emoji}></Image>
          </View>
          <View className={styles.add}>
            <Image src={addLogo}></Image>
          </View>
        </View>
      </View>
      <View className={styles.bottomContainer}>
        {
          showEmoji &&  <View className={styles.emojiContainer}>
            <View className={styles.emojiButton}>
              <View className={styles.delButton} onClick={handleDelete}>
                <Image src={optBack}></Image>
              </View>
              <View className={styles.compButton} onClick={() => handleSubmit(textareaValue)}>发送</View>
            </View>
            <Emoji onClickEmoji={getClickEmoji}></Emoji>
          </View>
        }
      </View>
    </View>
  )
}

export default ChatSubmit;