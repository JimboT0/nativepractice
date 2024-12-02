import "./global.css";
import React, { useEffect, useState } from "react";
import HomestayPage from "./components/kitchensink-components/HomestayPage";
import { SafeAreaView, GluestackUIProvider } from "./components/ui";
import * as Linking from "expo-linking";
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import Auth from "./components/Auth";
import { supabase } from "./lib/supabase";
import { Session } from '@supabase/supabase-js'
import { View } from 'react-native';

const Stack = createStackNavigator()

let defaultTheme: "dark" | "light" = "light";

Linking.getInitialURL().then((url: any) => {
  let { queryParams } = Linking.parse(url) as any;
  defaultTheme = queryParams?.iframeMode ?? defaultTheme;
});

type ThemeContextType = {
  colorMode?: "dark" | "light";
  toggleColorMode?: () => void;
};
export const ThemeContext = React.createContext<ThemeContextType>({
  colorMode: "light",
  toggleColorMode: () => { },
});



export default function App() {
  const [session, setSession] = useState<Session | null>(null)
  const [colorMode, setColorMode] = React.useState<"dark" | "light">(defaultTheme);
  const backgroundColor = colorMode === "light" ? "#FFFFFF" : "#171717";
  const topBackgroundColor = colorMode === "light" ? "#E5E5E5" : "#262626";

  useEffect(() => {
    // Set the session when the app starts
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
    })

    // Listen for auth state changes
    const { data: subscription } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })

    // Cleanup the subscription on component unmount
    return () => subscription.subscription.unsubscribe()
  }, [])

  const toggleColorMode = async () => {
    setColorMode((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <View style={{ flex: 1, backgroundColor }}>
      <SafeAreaView style={{ backgroundColor: topBackgroundColor }} />
      <ThemeContext.Provider value={{ colorMode, toggleColorMode }}>
        <GluestackUIProvider mode={colorMode}>
          <SafeAreaView style={{ 
            flex: 1, 
            backgroundColor,
            overflow: 'hidden'
          }}>
            <View style={{ 
              flex: 1, 
              backgroundColor 
            }}>
              <NavigationContainer>
                <Stack.Navigator 
                  screenOptions={{
                    cardStyle: { backgroundColor }
                  }}
                >
                  {session && session.user ? (
                    <Stack.Screen
                      name="Home"
                      component={HomestayPage}
                      options={{ 
                        headerShown: false,
                        cardStyle: { backgroundColor }
                      }}
                    />
                  ) : (
                    <Stack.Screen
                      name="Auth"
                      component={Auth}
                      options={{ 
                        headerShown: false,
                        cardStyle: { backgroundColor }
                      }}
                    />
                  )}
                </Stack.Navigator>
              </NavigationContainer>
            </View>
          </SafeAreaView>
        </GluestackUIProvider>
      </ThemeContext.Provider>
    </View>
  );
}