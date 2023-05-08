import { View, Image, Form, Input, Button, Text } from "@tarojs/components";
import { useRef, useState } from "react";
import { rules } from '@/utils/validateRules';
import Validator, { Rules } from 'async-validator'
import firelogo from '@/asserts/images/fire.png';
import backlogo from '@/asserts/images/back.png';
import bingo from '@/asserts/images/bingo.png';
import look from '@/asserts/images/look.png';
import unlook from '@/asserts/images/unlook.png';
import styles from "./register.module.scss";
import Taro from "@tarojs/taro";

const Register = () => {
  const [pass, setPass] = useState("");
  const [email, setEmail] = useState("");
  const errorMessage = useRef("");
  const [emailStatus, setEmailStatus] = useState(true);
  const [showPass, setShowPass] = useState(false);
  const handleClickEyes = (e) => {
    e.preventDefault();
    setShowPass(!showPass)
  }
  const handleEmailChange = (e) => {
    setEmail(e.detail.value);
  }
  const handlePassChange = (e) => {
    setPass(e.detail.value);
  }
  const handleEmailBlur = () => {
    const validator = new Validator(rules as Rules)
    validator.validate({email}, (error, fields) => {
      if(error) {
        // 如果验证不成功，则提示错误fields[0].message
        setEmailStatus(false);
        errorMessage.current = fields.email[0].message;
        console.log(fields);
      }else {
        errorMessage.current = "";
        setEmailStatus(true);
      }
    })
  }
  const handleBackClick = () => {
    Taro.navigateBack();
  }
  return (
    <View className={styles.main}>
      <View className={styles.header}>
        <Image className={styles.image} onClick={handleBackClick} src={backlogo}></Image>
      </View>
      <View className={styles.logoContainer}>
        <Image src={firelogo}></Image>
      </View>
      <View className={styles.registerContainer}>
        <View className={styles.loginText}>注册</View>
        <Form className={styles.formContainer}>
          <View className={styles.inputContainer}>
            <View className={styles.input}>
              <Input className={styles.name} placeholder='请取个名字'></Input>
              <View className={styles.right}>用户名已有</View>
            </View>
            <View className={styles.line}></View>
          </View>
          <View className={styles.inputContainer}>
            <View className={styles.input}>
              <Input className={styles.email} onInput={handleEmailChange} onBlur={handleEmailBlur} placeholder='请输入邮箱'></Input>
              <View className={styles.right}>
                {
                  emailStatus ? <Image src={bingo}></Image> : <Text className={styles.false}>x</Text>
                }
              </View>
            </View>
            <View className={styles.line}>
            </View>
            {
              emailStatus === false && <View className={styles.errorMessage}>{errorMessage.current}</View>
            }
          </View>
          <View className={styles.inputContainer}>
            <View className={styles.input}>
              <Input className={styles.pass} type={showPass ? 'text' : 'password'} value={pass} onInput={handlePassChange} placeholder='请输入密码'></Input>
              <View className={styles.right} onClick={handleClickEyes}>
                <Image src={showPass ? look : unlook}></Image>
              </View>
              </View>
            <View className={styles.line}></View>
          </View>
          <Button className={styles.loginButton}>注册</Button>
        </Form>
    </View>
  </View>
  )
}

export default Register;