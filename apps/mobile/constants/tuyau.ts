import { createTuyau } from "@tuyau/client";
import { api } from "@rythmix/backend";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const tuyau = createTuyau({
  api,
  baseUrl: process.env.EXPO_PUBLIC_BACKEND_URL!,
  hooks: {
    beforeRequest: [
      async (request) => {
        const token = await AsyncStorage.getItem("token");
        if (token) {
          request.headers.set("Authorization", `Bearer ${token}`);
        }
      },
    ],
  },
});
