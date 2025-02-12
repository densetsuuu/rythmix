import { createTuyau } from "@tuyau/client";
import { api } from "@rythmix/backend";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const tuyau = createTuyau({
  api,
  baseUrl: "http://localhost:3333",
  hooks: {
    beforeRequest: [
      async (request) => {
        const token = await AsyncStorage.getItem("token");
        console.log(token);
        if (token) {
          request.headers.set("Authorization", `Bearer ${token}`);
        }
      },
    ],
  },
});
