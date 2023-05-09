import { useEffect, useState } from "react";
import Taro from "@tarojs/taro";
import { View, Input, Image, BaseEventOrig, InputProps } from "@tarojs/components";
import TopBar from "@/components/topbar";
import SearchList from "@/components/searchList/searcList";
import searchLogo from '@/asserts/images/search@2x.png';
import styles from './index.modules.scss';
import { getSearchInfo } from '../../api/getData';

export interface SearchProps {
  listName: string;
  groupName: string;
}
const Seach = () => {
  const [searchList, setSearchList] = useState<SearchProps[]>([]);
  const [searchValue, setSearchValue] = useState("");
  const getSearchList = async () => {
    const { data } = await getSearchInfo();
    setSearchList([...data.data]);
  }
  useEffect(() => {
    getSearchList();
  }, [])
  const handleSearchInput = (e: BaseEventOrig<InputProps>) => {
    const value = e.detail.value || "";
    setSearchValue(value);
  }
  const handleCancleClick =() => {
    Taro.navigateBack();
  }
  return (
    <View>
      <TopBar>
        <View></View>
        <View className={styles.searchBar}>
          <Input placeholder='请输入' id='search' name='search' onInput={handleSearchInput}></Input> 
          <Image src={searchLogo} className={styles.seach}></Image> 
        </View>
        <View className={styles.cancle} onClick={handleCancleClick}>取消</View>
      </TopBar>
    <SearchList searchValue={searchValue} searchList={searchList}></SearchList>
    </View>
  )
}
export default Seach;