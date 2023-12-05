import { PaperProvider } from 'react-native-paper';
import App from './src/app';

export default function Main() {
  return (
    <PaperProvider>
      <App />
    </PaperProvider>
  );
}
