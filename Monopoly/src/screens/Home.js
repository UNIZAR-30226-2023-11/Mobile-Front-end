import React from "react";
import { View, Image, StyleSheet, TouchableOpacity    } from "react-native";
import { FontAwesome5 } from '@expo/vector-icons';
import StyledButton from "../components/StyledButton";
import StyledTextInput from "../components/StyledTextInput";
import StyledModal from "../components/StyledModal";


const styles = StyleSheet.create({
    pantalla: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "white",
    },
    icon:{
        position:'absolute',
        top:'3%',
        right:'5%'
    },
    logoJuego: {
        height: '35%',
        width: '50%',
        alignSelf: 'center'
      },
    nickname: {
        height: '7%',
        width: '70%',
        textAlign: 'center',
        marginTop:'5%',
        marginLeft: '13%',
        marginRight: '13%',   
    }
});


export default function HomeScreen({ navigation }){

    const [nickname, setNickname] = React.useState("");
    const [modalReglasVisible, setModalReglasVisible] = React.useState(false);
    return(
        <View style={styles.pantalla}>
        <TouchableOpacity style={styles.icon} onPress={() => navigation.navigate('Perfil')}>
            <FontAwesome5 name="user-alt" size={28} color="black" />
        </TouchableOpacity>
        <Image
            style={styles.logoJuego}
            source={require('../../assets/logo_juego_monopoly.png')}
        />
        <StyledTextInput style={styles.nickname}
                placeholder="Ingresa tu nickname"
                onChangeText={value => setNickname(value)}
                value={nickname}
         />
            <StyledButton
                homeScreen
                title="Crear sala"
                onPress={() => navigation.navigate('CrearSala')}
            />
            <StyledButton
                homeScreen
                title="Unirse a una sala"
                onPress={() => navigation.navigate('UnirseSala')}
            />
            <StyledModal
                title="REGLAS"
                text="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                    Lorem ipsum dolor sit amet, con sectetuer adipiscing elit, sed do eiusmod tempor incididunt ut lab et d Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incidid id odio ut aliquip ex ea commodo consequat"   
                onClose = { () => {setModalReglasVisible({modalReglasVisible: !modalReglasVisible})}}
                visible={modalReglasVisible}
                onRequestClose={() => {
                    Alert.alert('Modal has been closed.');
                    setModalReglasVisible({modalReglasVisible: !modalReglasVisible});
                }} 
            />
            <StyledButton
                homeScreen
                title="Reglas"
                onPress={() => setModalReglasVisible(true)}
            />
        </View>
    );
};