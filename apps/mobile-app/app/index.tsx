import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Switch,
  Alert,
} from "react-native";
import { getToken, saveToken } from "@/config/token";
import { useUser } from "@/context/context";
// import { apiClient } from "@/config/api";
import { apiClient, signIn } from "@repo/api";

const Login = () => {
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  const [isTeacher, setIsTeacher] = useState(true); // Switch state for toggling roles
  const [user, setUser] = useState({
    email: "teacher@gmail.com",
    password: "password1",
    role: isTeacher ? "TEACHER" : "STUDENT",
  });
  console.log("ip", process.env.SYSTEM_IP);

  const loginHandler = async () => {
    console.log("click");
    try {
      const response = await signIn(user.email, user.password);
      console.log(response);
      if (response) {
        await saveToken(response.access_token);
        Alert.alert("Login Success " + response.access_token);
        router.replace("/home");
      }
    } catch (error) {
      console.log("error", error);
      Alert.alert("Login Failed");
    }
  };

  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        source={{
          uri: "https://www.pinclipart.com/picdir/big/43-433338_cartoon-student-clip-art-transprent-png-free-student.png",
        }}
      />
      <Text style={styles.headerText}>
        {isTeacher ? "Hi Teacher" : "Hi Student"}
      </Text>
      <Text style={styles.subText}>Sign in to continue</Text>

      <View style={styles.formContainer}>
        <TextInput
          style={styles.input}
          placeholder="Enter your email"
          value={user.email}
          onChangeText={(text) => setUser({ ...user, email: text })}
          keyboardType="email-address"
        />
        <TextInput
          style={styles.input}
          placeholder="Enter your password"
          value={user.password}
          onChangeText={(text) => setUser({ ...user, password: text })}
          secureTextEntry
        />

        <TouchableOpacity onPress={loginHandler} style={styles.loginButton}>
          <Text style={styles.loginButtonText}>Login</Text>
        </TouchableOpacity>

        <View style={styles.roleToggleContainer}>
          <Text style={styles.roleToggleLabel}>
            Login as {isTeacher ? "Teacher" : "Student"}
          </Text>
          <Switch
            value={isTeacher}
            onValueChange={() => setIsTeacher(!isTeacher)}
            thumbColor={isTeacher ? "#4C82E4" : "#f4f3f4"}
            trackColor={{ false: "#767577", true: "#81b0ff" }}
          />
        </View>

        <Text
          onPress={() => router.replace(isTeacher ? "/home" : "/home")}
          style={styles.forgotPasswordText}
        >
          Forgot Password?
        </Text>
      </View>

      <View style={styles.switchRoleContainer}>
        <Text onPress={() => setIsTeacher(false)} style={styles.roleSwitchText}>
          As a Student
        </Text>
        <Text onPress={() => setIsTeacher(true)} style={styles.roleSwitchText}>
          As a Teacher
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#4C82E4",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  image: {
    width: 150,
    height: 150,
    marginBottom: 20,
  },
  headerText: {
    fontSize: 32,
    fontWeight: "bold",
    color: "white",
    marginTop: 10,
  },
  subText: {
    fontSize: 18,
    color: "white",
    marginBottom: 30,
  },
  formContainer: {
    backgroundColor: "white",
    width: "100%",
    padding: 20,
    borderRadius: 10,
    elevation: 5,
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: "gray",
    marginVertical: 15,
    paddingLeft: 10,
    fontSize: 16,
  },
  loginButton: {
    backgroundColor: "#4C82E4",
    padding: 15,
    borderRadius: 10,
    marginVertical: 20,
  },
  loginButtonText: {
    color: "white",
    fontSize: 18,
    textAlign: "center",
  },
  roleToggleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  roleToggleLabel: {
    fontSize: 16,
    color: "gray",
  },
  forgotPasswordText: {
    textAlign: "center",
    fontSize: 16,
    color: "#4C82E4",
    fontWeight: "bold",
  },
  switchRoleContainer: {
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  roleSwitchText: {
    fontSize: 16,
    color: "#4C82E4",
    fontWeight: "bold",
  },
});

export default Login;
