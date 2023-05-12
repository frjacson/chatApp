import TopBar from '@/components/topbar'
import FriendApply from '@/components/friendApply'
import FriendList from '@/components/friendList'
import { View, Image } from '@tarojs/components'
import Taro, { useLoad } from '@tarojs/taro'
import pic1 from '@/asserts/images/img.png';
import fireLogo from '@/asserts/images/fire.png';
import search from '@/asserts/images/search.png';
import add from '@/asserts/images/group.png';
import './index.scss'




export default function Index() {
  useLoad(async () => {
    console.log('Page loaded.')
  })

  const handleSearchClick = () => {
    Taro.navigateTo({
      url: '/pages/search/search'
    })
  }
  const handleImageClick = () => {
    Taro.navigateTo({
      url: '/pages/profile/profile?id=1',
    })
  }
  return (
    <View className='index'>
      <TopBar underline>
        <Image src={pic1} onClick={handleImageClick}></Image>
        <Image src={fireLogo} className='fileLogo'></Image>
        <View>
        <View className='search'>
          <Image src={search} onClick={handleSearchClick}></Image>
          </View>
          <View className='add'>
            <Image src={add}></Image>
          </View>
        </View>
      </TopBar>
      <View className='main'>
        <FriendApply></FriendApply>
        <FriendList></FriendList>
      </View>
    </View>
  )
}
