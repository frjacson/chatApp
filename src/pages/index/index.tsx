import TopBar from '@/components/topbar'
import FriendApply from '@/components/friendApply'
import FriendList from '@/components/friendList'
import { View } from '@tarojs/components'
import { useLoad } from '@tarojs/taro'
import './index.scss'



export default function Index() {
  useLoad(async () => {
    console.log('Page loaded.')
  })

  return (
    <View className='index'>
      <TopBar /> 
      <View className='main'>
        <FriendApply></FriendApply>
        <FriendList></FriendList>
      </View>
    </View>
  )
}
