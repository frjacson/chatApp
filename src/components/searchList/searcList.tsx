import Taro from "@tarojs/taro";
import { ChangeEvent, FC, useCallback, useEffect, useState } from "react";
import { View, Image, Text } from "@tarojs/components";
import onePic from '@/asserts/images/img2.jpeg';
import { SearchProps } from "src/pages/search/search";
import styles from './index.modules.scss';


type IProps = {
  searchList?: SearchProps[];
  searchValue?: string;
  groupName?: string;
}

const SearchList: FC<IProps> = (props) => {
  const { searchList = [], searchValue = "" } = props; 
  const [groupList, setGroupList] = useState<SearchProps[]>([]);
  const [userList, setUserList] = useState<SearchProps[]>([]);
  const generateEle = useCallback(() => {
    setUserList([...searchList.filter(item => item.groupName === '用户')])
    setGroupList([...searchList.filter(item => item.groupName === '群组')]) 
  },[searchList])
  useEffect(() => {
    generateEle();
  }, [generateEle])
  const getHighLightText = (text: string, highlight: string) => {
    const chunks = text.split(new RegExp(`(${highlight})`, "gi"));
    return chunks.map((chunk, i) =>
      chunk.toLowerCase() === highlight.toLowerCase() ? (
        <mark key={i}>{chunk}</mark>
      ) : (
        chunk
      )
    );
  }
  const handleImageClick = (e) => {
    e.preventDefault();
    Taro.navigateTo({
      url: "/pages/profile/profile?id=1"
    })
  }
  const renderElement = (list: SearchProps[]) => {
    return (
      list && list.filter((item) => item.listName.toLocaleLowerCase().includes(searchValue.toLocaleString())).map((item, index) => {
        return (
          <View className={styles.listContainer} key={index}>
            <View className={styles.listLeft} onClick={handleImageClick}>
              <Image src={onePic}></Image>
            </View>
            <View className={styles.listRight}>
              <View className={styles.name}>{getHighLightText(item.listName, searchValue)}</View>
              <View className={styles.option}>
                {/* <View className="text"></View> */}
                <Text className={styles.text}>发消息</Text>
              </View>
            </View>
          </View>
        )
      }) 
    )
  }
  return (
    <View className={styles.searchContainer}>
      { userList && <View className={styles.groupName}>用户</View>}
      {renderElement(userList)}
      { groupList && <View className={styles.groupName}>群组</View>}
      {renderElement(groupList)}
    </View>
  )
}
export default SearchList;