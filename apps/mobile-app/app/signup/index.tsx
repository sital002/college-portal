import { router } from "expo-router";
import React, { useState } from "react";
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const Signup = () => {
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
  });
  const signupHandler = async () => {
    const response = await fetch("http://localhost:8080/api/v1/auth/signup", {
      method: "POST",
      body: JSON.stringify(user),
    });
    console.log(response.json());
  };
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
        Sign up to continue
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
          value={user.email}
          onChangeText={(text) => setUser({ ...user, email: text })}
        />
        <TextInput
          style={{
            borderBottomWidth: 1,
            borderBottomColor: "gray",
            margin: 20,
          }}
          placeholder="enter your username"
          value={user.username}
          onChangeText={(text) => setUser({ ...user, username: text })}
        />

        <TextInput
          style={{
            borderBottomWidth: 1,
            borderBottomColor: "gray",
            margin: 20,
          }}
          placeholder="enter your password"
          value={user.password}
          onChangeText={(text) => setUser({ ...user, password: text })}
        />
        <TouchableOpacity style={{}}>
          <Text
            onPress={signupHandler}
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
            SinUp
          </Text>
        </TouchableOpacity>

        <Text
          onPress={() => router.replace("/")}
          style={{
            textAlign: "center",
            fontSize: 15,
            color: "#4C82E4",
            fontWeight: "bold",
          }}
        >
          Already have an account
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

export default Signup;
