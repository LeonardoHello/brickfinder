import { Slot } from "expo-router";
import * as SecureStore from "expo-secure-store";

import { ClerkProvider } from "@clerk/clerk-expo";

import { TRPCReactProvider } from "@/trpc/Provider";

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

const tokenCache = {
  async getToken(key: string) {
    try {
      return SecureStore.getItemAsync(key);
    } catch (err) {
      return null;
    }
  },
  async saveToken(key: string, value: string) {
    try {
      return SecureStore.setItemAsync(key, value);
    } catch (err) {
      return;
    }
  },
};

export default function RootLayout() {
  return (
    <ClerkProvider
      tokenCache={tokenCache}
      publishableKey={process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!}
    >
      <TRPCReactProvider>
        <Slot />
      </TRPCReactProvider>
    </ClerkProvider>
  );
}
