import React, { useRef } from "react";
import {
  SafeAreaView,
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  Image,
  Alert,
} from "react-native";
import QRCode from "react-native-qrcode-svg";
import { StatusBar } from "react-native";
import Icon from 'react-native-vector-icons/MaterialIcons';
import * as MediaLibrary from 'expo-media-library';
import { captureRef } from 'react-native-view-shot';

export function ActionModal({ handleClose, qrLink, modelo, serie }) {
  const viewRef = useRef();

  const saveToGallery = async () => {
    try {
      const uri = await captureRef(viewRef, {
        format: 'png',
        quality: 1,
      });

      const permission = await MediaLibrary.requestPermissionsAsync();
      if (permission.granted) {
        const asset = await MediaLibrary.createAssetAsync(uri);
        await MediaLibrary.createAlbumAsync('Expo', asset, false);
        Alert.alert('Success', 'Saved successfully!');
      } else {
        Alert.alert('Error', 'Permission to access media library is required!');
      }
    } catch (e) {
      console.log(e);
      Alert.alert('Error', 'Failed to save image!');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#000000" barStyle="light-content" />
      <TouchableOpacity
        style={{ flex: 1, zIndex: 1, width: "100%", height: "100%" }}
        onPress={handleClose}
      ></TouchableOpacity>

      <TouchableOpacity style={styles.close} onPress={handleClose}>
        <Icon style={styles.Icon} name="close" size={40} color='rgba(252, 3, 3, 0.9)' />
      </TouchableOpacity>
      <TouchableOpacity style={styles.save} onPress={saveToGallery}>
        <Icon style={styles.Icon} name="save-alt" size={35} color='white' />
      </TouchableOpacity>

      <View style={styles.content}>
        <View style={styles.content1} ref={viewRef}>
          <View style={styles.Etiqueta}>
            <QRCode value={qrLink} size={250} />
            <Image
              source={require("../../assets/logoM.png")}
              style={styles.logoM}
              resizeMode="contain"
            />
          </View>

          <Image
            source={require("../../assets/logo_MS.png")}
            style={styles.logoMs}
            resizeMode="contain"
          />
          <Text style={styles.textModal}>Modelo: {modelo}</Text>
          <Text style={styles.textModal}>Serie: {serie}</Text>
          <Text style={styles.textModal}>PAT: {""}</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.9)",
  },
  content: {
    marginVertical: 20,
    marginLeft: 10,
    marginRight: 10,
    backgroundColor: "white",
    width: "90%",
    height: 660,
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  content1: {
    marginVertical: 20,
    marginLeft: 10,
    marginRight: 10,
    backgroundColor: "white",
    width: "100%",
    height: 530,
    padding: 20,
    alignItems: "center",
    borderWidth: 2,
    position: "absolute",
  },
  Etiqueta: {
    width: "100%",
    height: 250,
    marginVertical: 1,
    marginLeft: 1,
    marginRight: 1,
    backgroundColor: "white",
    padding: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  save: {
    width: 40,
    height: 40,
    backgroundColor: "rgba(0, 0, 0, 0.9)",
    marginLeft: "80%",
    fontWeight: "bold",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 50,
    fontSize: 180,
  },
  close: {
    width: 40,
    height: 40,
    backgroundColor: "rgba(0, 0, 0, 0.9)",
    marginLeft: "55%",
    fontWeight: "bold",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 50,
    marginBottom: "-10%",
  },
  text: {
    fontWeight: "bold",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 15,
  },
  textModal: {
    fontWeight: "bold",
    fontSize: 20,
    width: "90%",
    paddingTop: 7,
    backgroundColor: "white",
  },
  logoMs: {
    width: "75%",
    height: 130,
    paddingEnd: 4,
  },
  logoM: {
    width: "30%",
    position: "absolute",
  },
  Icon: {
    position: "absolute",
  }
});
