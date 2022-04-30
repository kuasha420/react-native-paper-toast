import { loadAsync } from 'expo-font';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Provider as PaperProvider } from 'react-native-paper';
import { ToastProvider } from 'react-native-paper-toast';
import { initialWindowMetrics, SafeAreaProvider } from 'react-native-safe-area-context';
import Application from './application';

export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadAsync({
      'material-community': require('@expo/vector-icons/build/vendor/react-native-vector-icons/Fonts/MaterialCommunityIcons.ttf'),
    }).then(() => setIsLoading(false));
  });

  if (isLoading) {
    return <ActivityIndicator />;
  }

  return (
    <SafeAreaProvider initialMetrics={initialWindowMetrics}>
      <PaperProvider>
        <ToastProvider>
          <Application />
        </ToastProvider>
      </PaperProvider>
    </SafeAreaProvider>
  );
}
