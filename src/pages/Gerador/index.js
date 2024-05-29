import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Modal,
  SafeAreaView,
} from "react-native";

import * as Animatable from "react-native-animatable";
import { useNavigation } from "@react-navigation/native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { ActionModal } from "../Gerador/ActionModal";
import Icon from 'react-native-vector-icons/MaterialIcons';

export default function Gerador() {
  const navigation = useNavigation();
  const [visibleModal, setVisibleModal] = useState(false);
  const [modelo, setModelo] = useState("");
  const [serie, setSerie] = useState("");
  const [qrLink, setQrLink] = useState("");

  const handleGerarQRCode = () => {
    const link = `https://app.mcopy.com.br:8443/newdataservice/#/qrcode/${modelo}/${serie}`;
    console.log(link);
    setQrLink(link);
    setVisibleModal(true);
  };

  return (
    <SafeAreaView style={styles.gradient}>
      <KeyboardAwareScrollView
        extraScrollHeight={10}
        enableOnAndroid={true}
        keyboardShouldPersistTaps="always"
        contentContainerStyle={styles.container}
      >
        <Animatable.Image
          source={require("../../assets/logo.png")}
          style={styles.logo}
          resizeMode="contain"
        />

        <Animatable.View animation="fadeInUp" style={styles.containerForm}>
          <Text style={styles.title}>Digite o modelo:</Text>
          <TextInput
            style={styles.input}
            value={modelo}
            onChangeText={(text) => setModelo(text)}
          />

          <Text style={styles.title}>Digite a série:</Text>
          <TextInput
            style={styles.input}
            value={serie}
            onChangeText={(text) => setSerie(text)}
          />

          <TouchableOpacity style={styles.button} onPress={handleGerarQRCode}>
            <Text style={styles.buttonText}>Gerar  </Text>
            <Icon style={styles.Icon} name="qr-code-2" size={30} color='white'/>
          </TouchableOpacity>

          <Modal
            visible={visibleModal}
            transparent={true}
            onRequestClose={() => setVisibleModal(false)}
          >
            <ActionModal
              handleClose={() => setVisibleModal(false)}
              qrLink={qrLink}
              modelo={modelo}
              serie={serie}
            />
          </Modal>
        </Animatable.View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
    backgroundColor: "#1A1A1A",
  },
  container: {
    alignItems: "center",
    paddingTop: 40,
  },
  logo: {
    width: "80%",
    height: 120,
    marginBottom: 20,
  },
  containerForm: {
    backgroundColor: "#FFF",
    borderRadius: 25,
    padding: 20,
    width: "90%",
    minHeight: 320,
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    marginBottom: 10,
  },
  input: {
    height: 40,
    width: "90%",
    fontSize: 16,
    paddingLeft: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#F000",
    marginBottom: 20,
    backgroundColor: "#d1d1d1",
  },
  button: {
    backgroundColor: "#b02329",
    borderRadius: 4,
    paddingVertical: 12,
    paddingHorizontal: 35,
    marginBottom: 20,
    alignContent: 'center',
    justifyContent: 'center',
    padding: 20

  },
  buttonSair: {
    backgroundColor: "#b02329",
    borderRadius: 4,
    paddingVertical: 12,
    paddingHorizontal: 25,
    marginBottom: 20,
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    right: 8

  },
  buttonTextSair: {
    color: "white",
    fontSize: 14,
    fontWeight: "bold",
    
  },
  Icon:{
    position: "absolute",
    right: 1,
    alignItems: "center",
    justifyContent: 'center',
    paddingHorizontal: 15,

  }
});
