import React, { FC, ReactNode } from "react";
import { View } from "@tarojs/components";
import classNames from "classnames";
import './index.scss'

type Iprops = {
  underline ?: boolean
  children: ReactNode
  isOpacity?: boolean;
}
const TopBar: FC<Iprops> = (props) => {
  const { children, underline = true, isOpacity = false } = props;
  const [leftChildren, centerChildren, rightChildren] = React.Children.toArray(children);
  const topBarClasses = classNames('topBar', {
    'topBarUnderline': underline,
    'topBarOpacity': isOpacity
  })
  return (
    <View className='content'>
      <View className={topBarClasses}>
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