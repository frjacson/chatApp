import { FC, useState } from "react";
import Taro from "@tarojs/taro";
import { View, Image } from "@tarojs/components";
import file from '@/asserts/images/file.png';
import paizhao from '@/asserts/images/paizhao.png';
import photo from '@/asserts/images/photo.png';
import vedio from '@/asserts/images/vedio.png';
import position from '@/asserts/images/position.png';
import styles from './styles.module.scss';
import { ChatProps } from "../chatList/chatList";

type ItemType = '文件' | '定位' | '视屏' | '图片' | '拍照'
type AddProps = {
  itemSrc?: string;
  itemName?: ItemType;
  itemClick?: (value: ChatProps[]) => void;
}
const addItems:AddProps[] = [
  {
    itemSrc: file,
    itemName: '文件',
  },
  {
    itemSrc: paizhao,
    itemName: '拍照',
  },
  {
    itemSrc: photo,
    itemName: '图片',
  },
  {
    itemSrc: vedio,
    itemName: '视屏',
  },
  {
    itemSrc: position,
    itemName: '定位',
  },
]
const ChatAdd:FC<AddProps> = (props) => {
  const { itemClick } = props
  const [itemList, setItemList] = useState<AddProps[]>(addItems);
  const handleItemClick = (itemType) => {
    switch(itemType) {
      case '文件':
        break;
      case '拍照':
        handleImage('camera')
        break;
      case '图片':
        handleImage('album')
        break;
      case '视屏':
        break;
      case '定位':
        break;
    }
  }
  const handleImage = (type: 'album' | 'camera') => {
    Taro.chooseImage({
      count: type === 'album' ? 9 : 1,
      sizeType: ['compressed'],
      sourceType: [type],
      success: function(res) {
        let itemInfo = [] as ChatProps[]
        let curInfo = [] as ChatProps
        // 把它放到图片数组里面去
        res.tempFilePaths.forEach((item) => {
          curInfo['chatTypes'] = 'image';
          curInfo['chatImg'] = item;
          curInfo['chatId'] = 1;
          curInfo['chatTime'] = new Date().getTime();
          itemInfo.push(curInfo);
        })
        if(itemClick) {
          itemClick(itemInfo);
        }
      }
    })
  }
  return (
    <View className={styles.itemContainer}>
      {
        itemList && itemList.map((item, index) => {
          return (
            <View key={index} className={styles.item} onClick={() => handleItemClick(item.itemName)}>
              <Image src={item.itemSrc as string} className={styles.myImage}></Image>
              <View className={styles.name}>{item.itemName}</View>
            </View>
          )
        })
      }
    </View>
  )
}
export default ChatAdd;