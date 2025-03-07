import AsyncStorage from "@react-native-async-storage/async-storage";

// Save Token
export const saveToken = async (token: string) => {
  try {
    await AsyncStorage.setItem("authToken", token);
  } catch (error) {
    console.error("Error saving token:", error);
  }
};

// Get Token
export const getToken = async () => {
  try {
    return await AsyncStorage.getItem("authToken");
  } catch (error) {
    console.error("Error getting token:", error);
    return null;
  }
};

// Remove Token
export const removeToken = async () => {
  try {
    await AsyncStorage.removeItem("authToken");
  } catch (error) {
    console.error("Error removing token:", error);
  }
};
