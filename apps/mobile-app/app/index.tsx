import { router } from "expo-router";
import React from "react";
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const Login = () => {
  return (
    <View style={styles.container}>
      <Image
        style={{
          width: 200,
          height: 200,
          marginInline: "auto",
          marginTop: 70,
        }}
        source={{
          uri: "https://www.pinclipart.com/picdir/big/43-433338_cartoon-student-clip-art-transprent-png-free-student.png",
        }}
      />
      <Text
        style={{
          fontSize: 30,
          textAlign: "center",
          fontWeight: "bold",
          color: "white",
          marginTop: 10,
        }}
      >
        Hi Student
      </Text>
      <Text
        style={{
          fontSize: 20,
          textAlign: "center",
          color: "white",
        }}
      >
        Sign in to continue
      </Text>
      <View
        style={{
          backgroundColor: "white",
          height: 600,
          borderRadius: 60,
          padding: 20,
          marginTop: 30,
        }}
      >
        <TextInput
          style={{
            borderBottomWidth: 1,
            borderBottomColor: "gray",
            margin: 20,
          }}
          placeholder="enter your email"
        />

        <TextInput
          style={{
            borderBottomWidth: 1,
            borderBottomColor: "gray",
            margin: 20,
          }}
          placeholder="enter your password"
        />
        <TouchableOpacity style={{}}>
          <Text
            onPress={() => router.replace("/home")}
            style={{
              backgroundColor: "#4C82E4",
              padding: 10,
              color: "white",
              fontSize: 20,
              textAlign: "center",
              borderRadius: 10,
              margin: 20,
            }}
          >
            Login
          </Text>
        </TouchableOpacity>
        <Text
          style={{
            textAlign: "center",
            fontSize: 15,
            color: "#4C82E4",
            fontWeight: "bold",
          }}
        >
          Forgot Password?
        </Text>
        <Text
          onPress={() => router.replace("/signup")}
          style={{
            textAlign: "center",
            fontSize: 15,
            color: "#4C82E4",
            fontWeight: "bold",
          }}
        >
          Don't have an account
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#4C82E4",
  },
});

export default Login;
