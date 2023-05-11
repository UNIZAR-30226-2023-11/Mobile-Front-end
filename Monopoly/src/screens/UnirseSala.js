import React, { useEffect, useCallback } from 'react';
import { View, StyleSheet , Text } from'react-native';
import {Searchbar} from 'react-native-paper';
import StyledModalSala from "../components/StyledModalSala";
import { SocketContext } from '../components/SocketContext';

const styles = StyleSheet.create({
    barra: { 
        padding: 15,
    },
    titulo: {
        fontSize: 25,
        marginBottom: '5%',
        marginTop: '5%',
        alignContent: 'center',
        alignSelf: 'center',
    },
    unirme: {

    },
    modal: {
        height: '30%',
        width: '84%',
    }
});

export default function UnirseSalaScreen({ route, navigation }) {

    // const user = route.params.user;
    // console.log(user);

    const [modalPartidaVisible, setModalPartidaVisible] = React.useState(false);
    const [idPartida, setIdPartida] = React.useState(0);

    const {socket} = React.useContext(SocketContext);

    const handleEsperaJugadores = useCallback((mensaje) => {
        console.log('Mensaje recibido: ' + mensaje);
        const mensajeCadena = mensaje.toString();
        const subcadenas = mensajeCadena.split(",");
        console.log(subcadenas);
        navigation.replace('EsperaUnirse', {idPartida: idPartida, jugadores: subcadenas});
      }, [navigation, idPartida]);

    useEffect(()=>{
        socket.on('esperaJugadores', (mensaje) => handleEsperaJugadores(mensaje));

        return () => {
            socket.off('esperaJugadores', (mensaje) => handleEsperaJugadores(mensaje));
        };

    },[])

    return (
        <View style={styles.barra}>
            <Text style={styles.titulo}> Introduce el id de la partida</Text>
            <Searchbar
                placeholder="123456"
                placeholderTextColor="grey"
                onChangeText={(id) => setIdPartida(id)}
                onSubmitEditing={() => setModalPartidaVisible(true)}
            />

            <StyledModalSala
                title="Únete a la partida"
                text={"Partida #"+idPartida}
                style={styles.modal}
                buttonText="Unirme"
                idPartida={idPartida}
                navigation={navigation}
                onClose={ () => {setModalPartidaVisible({setModalPartidaVisible: !modalPartidaVisible})}}
                visible={modalPartidaVisible}
                onRequestClose={() => {
                    setModalReglasVisible({modalPartidaVisible: !modalPartidaVisible});
                }} 
            >
            </StyledModalSala> 

        </View>
    );
};
