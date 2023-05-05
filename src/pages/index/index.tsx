import TopBar from '@/components/topbar'
import { View, Text } from '@tarojs/components'
import { useLoad } from '@tarojs/taro'
import './index.scss'

export default function Index() {

  useLoad(() => {
    console.log('Page loaded.')
  })

  return (
    <View className='index'>
      <TopBar />
      <Text>this is my first taro app</Text>
    </View>
  )
}
