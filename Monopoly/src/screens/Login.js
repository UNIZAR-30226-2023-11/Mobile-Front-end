import React from 'react'
import { Formik, useField } from 'formik'
import { StyleSheet, Button, View, TouchableOpacity, useEffect } from 'react-native'
import StyledTextInput from '../components/StyledTextInput'
import StyledText from '../components/StyledText'
import { loginValidationSchema } from '../validationSchemas/login'
import CryptoJS from 'crypto-js'

import io from 'socket.io-client';

import { login } from '../url/users'

const initialValues = {
  username: '',
  password:''
}

const styles = StyleSheet.create({
  error: {
    color: 'red',
    fontSize: 12,
    marginBottom: 20,
    marginTop: -5
  },
  form: {
    flex:1,
    flexDirection: 'column',
    backgroundColor: '#FFFFFF',
    margin: 12,
    marginTop: 100,
    marginBottom: 20
  },
  registro:{
    flex:1, 
    flexDirection:'row', 
    justifyContent:'center',
    marginTop:'10%'
  }
})

const FormikInputValue =({ name, ...props}) => {
  const [field, meta, helpers] = useField(name);
  
  return (
    <>
    <StyledTextInput
      error={meta.error} 
      value={field.value} 
      onChangeText={value => helpers.setValue(value)}
      {... props}
    />
    {meta.error && <StyledText error style={styles.error}>{meta.error}</StyledText>}
    </>
  )
}

export default function LogInScreen({navigation}){

  const [socket, setSocket] = React.useState(null);

  React.useEffect(() => {
    let newSocket = io('http://10.0.2.2:3000');
    setSocket(newSocket);


  }, []);

  const handleLogin = ({ username, password }) => {
    console.log("emitiendo socket ...");
    socket.emit('login', {
      username: 'clarita',
      password: 'clarita12',
      socketId: socket.id
    })
  }

  // useEffect(() => {
  //   if (!socket) return;

  //   socket.on('login', (data) => {
  //     if (data.success) {
  //       navigation.navigate('Home');
  //     } else {
  //       setError(data.message);
  //     }
  //   });
  // }, [socket, navigation]);


  return <Formik validationSchema={loginValidationSchema} initialValues={initialValues} 
  onSubmit={handleLogin}>
   onSubmit={values => {
     const hashedPassword = CryptoJS.SHA512(values.password).toString();
     handleLogin();
   }}

  {({handleChange, handleSubmit, values}) =>{
    return (
      <View style={{flex:1, backgroundColor:'white'}}>
      <View style={styles.form}>
        <FormikInputValue 
        name='username'
        placeholder='Usuario' 
        />
        <FormikInputValue 
        name='password'
        placeholder='Contraseña'
        secureTextEntry 
        />
        <Button
          color= '#CFA8FC'
          title='Iniciar sesión'
          onPress={handleSubmit} 
        />
        <View style={styles.registro}>
          <StyledText medium>No tienes cuenta? </StyledText>
          <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
            <StyledText medium blue>Registrarse</StyledText>
          </TouchableOpacity>
        </View>
      </View>
      </View>
    )
  }}
  </Formik>
}