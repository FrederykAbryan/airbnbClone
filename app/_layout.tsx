import FontAwesome from '@expo/vector-icons/FontAwesome';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { SplashScreen, Stack, useRouter } from 'expo-router';
import { useEffect } from 'react';
import { StyleSheet, useColorScheme } from 'react-native';
import { BottomSheetModalProvider, TouchableOpacity } from '@gorhom/bottom-sheet';
import { Ionicons } from '@expo/vector-icons';
import * as SecureStore from 'expo-secure-store';
import { ClerkProvider, useAuth } from '@clerk/clerk-expo';
import ModalHeaderText from '@/components/ModalHeaderText';
import Colors from '@/constants/Colors';

const CLERK_PUBLISHABLE_KEY = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY;
const tokenCache = {
  async getToken(key: string) {
    try {
      return SecureStore.getItemAsync(key);
    } catch (error) {
      return null
    }
  },
  async saveToken(key: string, value: string) {
    try {
      return SecureStore.setItemAsync(key, value);
    } catch (error) {
      return;
    }
  }
}
export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: '(tabs)',
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    "mon": require('../assets/fonts/Montserrat-Regular.ttf'),
    "mon-b": require('../assets/fonts/Montserrat-Bold.ttf'),
    "mon-sb": require('../assets/fonts/Montserrat-SemiBold.ttf'),
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <ClerkProvider tokenCache={tokenCache} publishableKey={CLERK_PUBLISHABLE_KEY!}>
      <RootLayoutNav />
    </ClerkProvider>
  );
}

function RootLayoutNav() {
  const colorScheme = useColorScheme();
  const router = useRouter();
  const { isLoaded, isSignedIn } = useAuth();

  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      router.push('/(modals)/login');
    }
  }, [isLoaded])

  return (
    <BottomSheetModalProvider>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          {/* <JsStack.Screen
          name="(modals)/booking"
          options={{
            presentation: "modal",
            ...TransitionPresets.ModalPresentationIOS,
          }}
        /> */}
          <Stack.Screen
            name="listing/[id]"
            options={{
              headerTitle: "",
              // headerTransparent: true,
            }}
          ></Stack.Screen>
          <Stack.Screen name="(modals)/login" options={{
            title: 'Log in or Sign up',
            headerTitleAlign: 'center',
            presentation: 'modal',
            headerLeft: () => (
              <TouchableOpacity onPress={() => router.back()}>
                <Ionicons name='close-outline' size={24} />
              </TouchableOpacity>
            )
          }}>
          </Stack.Screen>
          <Stack.Screen name="(modals)/booking" options={{
            presentation: 'transparentModal',
            animation: 'fade',
            headerTransparent: true,
            headerTitleAlign: 'center',
            headerTitle: () => <ModalHeaderText />,
            headerBackVisible: false,
            headerLeft: () => {
             return <TouchableOpacity
                onPress={() => router.back()}
                style={{
                  backgroundColor: '#fff',
                  borderColor: Colors.grey,
                  borderRadius: 20,
                  borderWidth: 1,
                  padding: 4,
                }}>
                <Ionicons name="close-outline" size={22} />
              </TouchableOpacity>
            }
          }}></Stack.Screen>
        </Stack>
      </ThemeProvider>
    </BottomSheetModalProvider>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: 'white',
  },
  activeBackground: {
    position: 'absolute',
  },
  tabBarContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  component: {
    height: 60,
    width: 60,
    marginTop: -5,
  },
  componentCircle: {
    flex: 1,
    borderRadius: 30,
    backgroundColor: 'white',
  },
  iconContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center'
  },
  icon: {
    height: 36,
    width: 36,
  }
})
