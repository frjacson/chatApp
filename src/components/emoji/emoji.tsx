import { FC, useState } from "react";
import { View } from "@tarojs/components";
import styles from './emoji.module.scss';

const emoji = [
  ['😃', '😀', '😄', '😁', '😆', '😅','🤣', '😂'], 
  ['🙂', '🙃', '😳', '😟', '🙁', '😧', '😰', '😥'],
  ['😞', '😣', '😖', '😱', '😭', '😩', '🥱', '😤',],
  ['😡', '😠', '💩', '🙈', '💜', '🥰', '😍', '😘',],
  ['😗', '🧑‍🎓', '🤪', '🤗', '🤭', '🤫', '🤔', '🤨',],
  ['😐', '😑', '😶', '😏', '😒', '🙄', '😮‍💨', '😔',],
  ['😷', '🤒', '🤮', '🤧', '😎', '🤓', '👋', '❤',],
  ['🍔', '🍎', '🍍', '🍌', '🍊', '🍉', '🍑', '⏰',],
]
interface EmojiProps  {
  onClickEmoji?: (value) => void;
}
const Emoji:FC<EmojiProps> = (props) => {
  const { onClickEmoji } = props;
  const [emojiValue, setEmojiValue] = useState<string[][]>(emoji);
  const handleEmojiClick = (itm) => {
    if(onClickEmoji) {
      onClickEmoji(itm);
    }
  }
  return (
    <View className={styles.emojiContainer}>
      {
        emojiValue && emojiValue.map((item, index) => {
          return (
            <View key={index} className={styles.rowContainer}>
              {
                item && item.map((itm, idx) => {
                  return (
                    <View key={idx} className={styles.emoji} onClick={() => handleEmojiClick(itm)}>{itm}</View>
                  )
                })
              }
            </View>
          )
        })
      }
    </View>
  )
}

export default Emoji