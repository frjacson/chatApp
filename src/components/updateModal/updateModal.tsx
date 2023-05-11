import { FC, useCallback, useEffect, useState } from "react";
import classNames from "classnames";
import { View } from "@tarojs/components";
import TopBar from "../topbar";
import styles from './styles.module.scss';

type IProps = {
  title?: string;
  curKey?: string;
  initValue?: string;
  showModal?: boolean;
  onConfirm: (curKey: string, value: string, showModal: boolean) => void;
  onCancle: (showModal: boolean) => void;
}
const UpdateModal:FC<IProps> = (props) => {
  const {title, curKey, initValue, onConfirm, onCancle, showModal} = props;
  const [isShow, setIsShow] = useState(showModal);
  const [updateValue, setUpdateValue] = useState(initValue);
  const handleTextareaChange = (e) => {
    setUpdateValue(e.target.value);
  }
  const handleCancleClick = () => {
    setIsShow(false);
    onCancle(false);
  }
  const handleConfirmClick = () => {
    setIsShow(false);
    onConfirm(curKey as string, updateValue || '', false);
  }
  const classes = classNames(styles.modal, {
    [styles.show]: isShow,
  })
  return (
    <View className={classes}>
      <View className={styles.modalMain}>
        <TopBar>
          <View className={styles.modalCancle} onClick={handleCancleClick}>取消</View>
          <View className={styles.modalTitle}>{title}</View>
          <View className={styles.modalConfirm} onClick={handleConfirmClick}>确定</View>
        </TopBar>
        <View className={styles.modalContent}>
          <textarea className={styles.myTextarea} value={updateValue} onChange={handleTextareaChange}></textarea>
        </View>
      </View>
    </View>
  )
}

export default UpdateModal;