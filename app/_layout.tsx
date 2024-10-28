import React, { useEffect, useMemo, useState } from "react";
import { Image, useWindowDimensions } from "react-native";
import { Stack } from "expo-router";
import { useFonts } from "expo-font";
import { ThemedView } from "@/components/ThemedView";

const App = ({ isReady = false }: { isReady: boolean }) => {
  const { width: deviceWidth } = useWindowDimensions();

  if (!isReady) {
    return (
      <ThemedView style={{ flex: 1 }}>
        {/** Any image componet, e.g. FastImage, Image from expo-image, etc. **/}
        <Image
          source={require("../assets/images/splash.png")}
          resizeMode="contain"
          style={{ width: deviceWidth, flex: 1 }}
        />
      </ThemedView>
    );
  }

  return (
    <Stack screenOptions={{}}>
      <Stack.Screen name="index" options={{ headerShown: false }} />
    </Stack>
  );
};

export default function RootLayout() {
  const [active, setActive] = useState<boolean>(false);
  const [fontsLoaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  const appReady = useMemo(() => {
    return fontsLoaded && active;
  }, [fontsLoaded, active]);

  useEffect(() => {
    setTimeout(() => {
      setActive(true);
    }, 1.5 * 1000);
  }, []);

  return <App isReady={appReady} />;
}
