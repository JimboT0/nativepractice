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

  // Add console log to debug session state
  console.log('Current session:', session)

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
  const [colorMode, setColorMode] = React.useState<"dark" | "light">(
    defaultTheme
  );

  const toggleColorMode = async () => {
    setColorMode((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <>
      {/* top SafeAreaView */}
      <SafeAreaView
        className={`${colorMode === "light" ? "bg-[#E5E5E5]" : "bg-[#262626]"}`}
      />
      <ThemeContext.Provider value={{ colorMode, toggleColorMode }}>
        <GluestackUIProvider mode={colorMode}>
          {/* bottom SafeAreaView */}
          <SafeAreaView
            className={`${colorMode === "light" ? "bg-white" : "bg-[#171717]"
              } flex-1 overflow-hidden`}
          >
            <NavigationContainer>
              <Stack.Navigator>
                {session && session.user ? (
                  <Stack.Screen
                    name="Home"
                    component={HomestayPage}
                    options={{ headerShown: false }}
                  />
                ) : (
                  <Stack.Screen
                    name="Auth"
                    component={Auth}
                    options={{ headerShown: false }}
                  />
                )}
              </Stack.Navigator>
            </NavigationContainer>
          </SafeAreaView>
        </GluestackUIProvider>
      </ThemeContext.Provider>
    </>
  );
}