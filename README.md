# React Native Paper Toast

🔥 An easy to use toast implementation for React Native Paper 🔥

- Toast persists accross screen transition. 🚀
- Easy to use using useToast Hook and doesn't polute markup. 🪝
- Various toast types including info, warning and error. 👗
- Written on TypeScript. 🔵
- Supports Web (react-native-web). 🌞
- 🔥 NEW: Attach action to toast. 🐍
- 🔥 NEW: Set toast position (top, middle or bottom(default)). 🪜
- 🔥 NEW: configure default options appwide! 💦
- 🔥 NEW: Interactive example added! 🎉

## Installation

Install with your favorite package manager.

Using Yarn:

```
yarn add react-native-paper-toast
```

Using NPM:

```
npm i react-native-paper-toast
```

Now Wrap your component tree with ToastProvider. This should be after SafeAreaProvider & PaperProvider!

```tsx
// App.tsx
import React from 'react';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import { initialWindowMetrics, SafeAreaProvider } from 'react-native-safe-area-context';
import { ToastProvider } from 'react-native-paper-toast';
import Application from './application';

export default function App() {
  return (
    <SafeAreaProvider initialMetrics={initialWindowMetrics}>
      <PaperProvider theme={DefaultTheme}>
        <ToastProvider>
          <Application />
        </ToastProvider>
      </PaperProvider>
    </SafeAreaProvider>
  );
}
```

## Usage

Import the `useToast` hook from the library. Calling it will return you an object with two functions `show` and `hide` to show or hide toast.

```tsx
import { useToast } from 'react-native-paper-toast';

export const Screen: React.FC<Props> = (props) => {
  const toaster = useToast();

  // You can now toast methods from handler functions, effects or onPress props!

  // Call from handler function
  const handleError = () => toaster.show({ message: 'Invalid Username', type: 'error' });

  // Call from Effects
  useEffect(() => {
    login(username, password).then((v) =>
      toaster.show({ message: 'Login successful', duration: 2000 })
    );
  });

  return (
    <Surface>
      <Button onPress={() => toaster.show({ message: 'Here is a toast for ya!' })}>
        Show Toast
      </Button>
      <Button onPress={toaster.hide}>Hide Toast</Button>
    </Surface>
  );
};
```

## API

````typescript
type ToastType = 'info' | 'normal' | 'success' | 'warning' | 'error';
type ToastPosition = 'top' | 'bottom' | 'middle';

interface ToastOptions {
   /** The message to show */
  message?: string;
  /** Type of toast */
  type?: ToastType;
  /**  Position of the toast */
  position?: ToastPosition;
  /** Toast duration */
  duration?: number;
  /** Toast Action onPress */
  action?: () => void;
  /** Toast Action Label */
  actionLabel?: string;
  /** Toast Message Style */
  messageStyle: StyleProp<ViewStyle>;
  /** Toast Message Container Style */
  messageContainerStyle: StyleProp<ViewStyle>;
  /** Toast Snackbar Style */
  snackbarStyle: StyleProp<ViewStyle>;
}

interface ToastMethods {
    /** Show a new toast */
    show(options: ToastOptions): void;
    /** Hide toast that are on display */
    hide(): void;
}

interface ToastProviderProps {
    /**
     * App wide default overrides.
     * Use this to set default position or duration of toasts
     *
     * ```tsx
     * <ToastProvider overrides={{ position: 'top', duration: 3000 }}>
     *   <Application />
     * </ToastProvider>
     * ```
     */
    overrides?: ToastOptions;
}

const ToastProvider: React.FC<ToastProviderProps>;

function useToast: () => ToastMethods;

````

## Development

This project integrates with `react-native-builder-bob`. To get started:

1. Fork and Clone the repository.
2. Create your feature branch.
3. Install dependencies using `yarn`.
4. Run example project using `yarn example android`, `yarn example ios` or `yarn example web`.
5. Make your changes and create a PR!
6. Thank you.

## License

This package is licensed under the MIT License.

## Contribution

Any kind of contribution is welcome. Thanks!
