import { FC, ReactNode, } from 'react';
import { View } from "@tarojs/components";
import styles from './style.module.scss';

interface DetailProps {
  leftChild: string;
  centerChild: ReactNode | string;
  rightChild?: ReactNode;
}
const DetailItem: FC<DetailProps> = (props) => {
  const { leftChild, centerChild, rightChild } = props
  return (
    <View className={styles.itemContainer}>
      <View className={styles.leftChild}>{leftChild}</View>
      <View className={styles.centerChild}>{centerChild}</View>
      <View className={styles.rightChild}>{rightChild}</View>
    </View>
  )
}
export default DetailItem;