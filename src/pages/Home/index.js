import React, { useState } from "react";
import {
  View,
  SafeAreaView,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from "react-native";

import * as Animatable from "react-native-animatable";
import { useNavigation } from "@react-navigation/native";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup.object({
  email: yup
    .string()
    .email("Usuário inválido!")
    .required("Informe seu usuário"),
  password: yup
    .string()
    .min(6, "A senha deve ter pelo menos 6 caracteres")
    .max(8, "A senha deve ter no máximo 8 caracteres")
    .required("Informe sua senha"),
});

export default function Home() {
  const navigation = useNavigation();
  const [loggedIn, setLoggedIn] = useState(false);
  const [userType, setUserType] = useState(null);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  function handleHome(data) {
    const predefinedCredentials = {
      admin: { email: "qrapp@mcopy", password: "mcopy25" },
    };

    if (
      data.email === predefinedCredentials.admin.email &&
      data.password === predefinedCredentials.admin.password
    ) {
      setLoggedIn(true);
      setUserType("admin");
      navigation.navigate("Gerador"); // Navega para a tela Gerador após o login
    } else {
      alert("Credenciais inválidas. Por favor, tente novamente.");
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
      >
        <View style={styles.container}>
          <Animatable.Image
            source={require("../../assets/logo.png")}
            style={styles.logo}
            resizeMode="contain"
          />
        </View>

        <Animatable.View animation="fadeInUp" style={styles.containerForm}>
          <Text style={styles.title}>Usuário</Text>
          <Controller
            control={control}
            name="email"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={[
                  styles.input,
                  {
                    borderWidth: errors.email && 1,
                    borderColor: errors.email && "#fa0707",
                    backgroundColor: errors.email && "#ffcfcf",
                  },
                ]}
                onChangeText={onChange}
                onBlur={onBlur}
                value={value}
                placeholder="Informe seu usuário"
              />
            )}
          />
          {errors.email && (
            <Text style={styles.labelError}>{errors.email?.message}</Text>
          )}

          <Text style={styles.title}>Senha</Text>
          <Controller
            control={control}
            name="password"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={[
                  styles.input,
                  {
                    borderWidth: errors.password && 1,
                    borderColor: errors.password && "#fa0707",
                    backgroundColor: errors.password && "#ffcfcf",
                  },
                ]}
                onChangeText={onChange}
                onBlur={onBlur}
                value={value}
                placeholder="Digite sua senha"
                secureTextEntry={true}
              />
            )}
          />
          {errors.password && (
            <Text style={styles.labelError}>{errors.password?.message}</Text>
          )}

          <TouchableOpacity
            style={styles.button}
            onPress={handleSubmit(handleHome)}
          >
            <Text style={styles.buttonText}>Acessar</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.buttonRegister}
            onPress={() => navigation.navigate("Gerador")}
          ></TouchableOpacity>
        </Animatable.View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1A1A1A",
  },
  containerHeader: {
    alignItems: "center",
    marginBottom: 30,
  },
  logo: {
    width: "100%",
    height: "100%",
    marginTop: "10%",
    marginBottom: "-20%",
  },
  containerForm: {
    backgroundColor: "#FFF",
    borderRadius: 25,
    margin: 20,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 5,
    marginBottom: 80,
    paddingTop: 55,
  },
  title: {
    fontSize: 20,
    marginBottom: 20,
  },
  input: {
    height: 40,
    fontSize: 16,
    paddingLeft: 10,
    borderWidth: 1,
    borderRadius: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#000",
    marginBottom: 12,
  },
  button: {
    backgroundColor: "#b02329",
    borderRadius: 4,
    paddingVertical: 12,
    alignItems: "center",
    marginBottom: 100,
    padding: 20,
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  labelError: {
    color: "#ff375b",
    marginBottom: 8,
  },
});
