import { ChangeEvent, useState } from "react";
import { View, Image, Input, Form, Button, BaseEventOrig, InputProps } from "@tarojs/components"
import firelogo from '@/asserts/images/fire.png';
import styles from './login.module.scss';
import { debounce } from "../../../src/utils/debounce";


const Login = () => {
  const [name, setName] = useState("");
  const [pass, setPass] = useState("");
  const handleClick = () => {
    console.log("button click");
  }
  const handleNameInput = (event: BaseEventOrig<InputProps>) => {
    console.log(event.detail.value);
    let value = event.detail.value;
    debounce(() => {
      setName(value as string);
    })
  }
  const handlePassInput = (e: BaseEventOrig<InputProps>) => {
    let value = e.detail.value;
    debounce(() => {
      setPass(value as string);
    })
  }
  return (
    <View className={styles.main}>
      <View className={styles.header}>
        <View className={styles.register}>注册</View>
      </View>
      <View className={styles.logoContainer}>
        <Image src={firelogo}></Image>
      </View>
      <View className={styles.loginContainer}>
        <View className={styles.loginText}>登录</View>
        <View className={styles.loginContent}>您好，欢迎来到yike ! </View>
        <Form className={styles.formContainer}>
          <View className={styles.inputContainer}>
            <Input className={styles.name} placeholder='请输入用户名' onInput={handleNameInput}></Input>
            <View className={styles.line}></View>
          </View>
          <View className={styles.inputContainer}>
            <Input className={styles.pass} type='password' placeholder='密码' onInput={handlePassInput}></Input>
            <View className={styles.line}></View>
          </View>
          <Button className={styles.loginButton} onClick={handleClick}>登录</Button>
        </Form>
      </View>

    </View>
  )
}

export default Login;