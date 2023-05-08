import React, { FC, PropsWithChildren, ReactNode} from "react";
import { View } from "@tarojs/components";
import './index.scss'

const TopBar = (props) => {
  const { children } = props;
  const [leftChildren, centerChildren, rightChildren] = React.Children.toArray(children);
  return (
    <View className='content'>
      <View className='topBar'>
      <View className='topBarContainer'>
       <View className='topBarLeft'>{leftChildren}</View> 
       <View className='topBarContent'>{centerChildren}</View> 
       <View className='topBarRight'>
          {rightChildren}
        </View>
        </View> 
      </View>
    </View>
  )
}

export default TopBar;