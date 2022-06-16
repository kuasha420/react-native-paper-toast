import React, { createContext, useContext, useEffect, useMemo, useReducer } from 'react';
import { Keyboard, StyleProp, StyleSheet, ViewStyle } from 'react-native';
import { Portal, Snackbar, Text } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  ToastAction,
  ToastActionType,
  ToastIconType,
  ToastMethods,
  ToastOptions,
  ToastParams,
  ToastProviderProps,
  ToastStyles,
} from './types';

const ToastContext = createContext<ToastMethods | null>(null);

const defaults: ToastParams = {
  message: 'Hello React Native Paper Toast!',
  type: 'normal',
  position: 'bottom',
  duration: 2000,
  visibility: false,
  action: undefined,
  actionLabel: 'DONE',
};

const reducer = (state: ToastParams, action: ToastAction) => {
  switch (action.type) {
    case ToastActionType.SHOW:
      return { ...state, ...action.payload };

    case ToastActionType.HYDRATE:
      return { ...state, ...action.payload, visibility: false };

    case ToastActionType.HIDE:
      return { ...state, visibility: false };

    default:
      return state;
  }
};

/**
 * Wrap your component tree with ToastProvider. This should be after SafeAreaProvider & PaperProvider!
 * ## Usage
 * ```tsx
 * import React from 'react';
 * import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
 * import { initialWindowMetrics, SafeAreaProvider } from 'react-native-safe-area-context';
 * import { ToastProvider } from 'react-native-paper-toast';
 * import Application from './application';
 *
 * export default function App() {
 *   return (
 *     <SafeAreaProvider initialMetrics={initialWindowMetrics}>
 *       <PaperProvider theme={DefaultTheme}>
 *         <ToastProvider overrides={{ position: 'top' }}>
 *           <Application />
 *         </ToastProvider>
 *       </PaperProvider>
 *     </SafeAreaProvider>
 *   );
 * }
 * ```
 */
const ToastProvider: React.FC<ToastProviderProps> = ({ children, overrides }) => {
  const initialState = useMemo(() => ({ ...defaults, ...overrides }), [overrides]);
  const [state, dispatch] = useReducer(reducer, initialState);

  const insets = useSafeAreaInsets();

  const toast = useMemo(
    () => ({
      show(options: ToastOptions) {
        const newState: ToastParams = { ...initialState, ...options, visibility: true };
        newState.position === 'bottom' && Keyboard.dismiss();
        dispatch({ type: ToastActionType.SHOW, payload: newState });
      },
      hide() {
        dispatch({ type: ToastActionType.HIDE });
      },
    }),
    [initialState]
  );

  const computedStyle = useMemo(() => {
    const base: StyleProp<ViewStyle> = {
      position: 'absolute',
      left: insets.left,
      right: insets.right,
      width: undefined,
      alignItems: 'center',
    };
    let style: StyleProp<ViewStyle>;
    if (state.position === 'bottom') {
      style = {
        ...base,
        bottom: insets.bottom,
      };
      return style;
    }
    if (state.position === 'top') {
      style = {
        ...base,
        top: insets.top,
        bottom: undefined,
      };
      return style;
    }
    style = {
      ...base,
      top: insets.top,
      bottom: insets.bottom,
      justifyContent: 'center',
    };
    return style;
  }, [insets, state.position]);

  useEffect(() => {
    dispatch({ type: ToastActionType.HYDRATE, payload: initialState });
  }, [initialState]);

  return (
    <ToastContext.Provider value={toast}>
      <Portal.Host>{children}</Portal.Host>
      <Portal>
        <Snackbar
          onDismiss={toast.hide}
          style={types[state.type]}
          wrapperStyle={computedStyle}
          duration={state.duration}
          visible={state.visibility}
          action={state.action ? { label: state.actionLabel, onPress: state.action } : undefined}
        >
          <Icon size={20} name={icons[state.type]} color="#ffffff" />
          <Text style={styles.message}>{` ${state.message}`}</Text>
        </Snackbar>
      </Portal>
    </ToastContext.Provider>
  );
};

/**
 * useToast hook is used to show and hide Toast messages.
 * ## Usage
 * Import the `useToast` hook from the library. Calling it will return you an object with two functions `show` and `hide` to show or hide toast.
 *
 * ```tsx
 * import { useToast } from 'react-native-paper-toast';
 *
 * export const Screen: React.FC<Props> = (props) => {
 *   const toaster = useToast();
 *   // You can now toast methods from handler functions, effects or onPress props!
 *
 *   // Call from handler function
 *   const handleError = () =>
 *     toaster.show({ message: 'Invalid Username', type: 'error' });
 *
 *   // Call from Effects
 *   useEffect(() => {
 *     login(username, password).then((v) =>
 *       toaster.show({ message: 'Login successful', duration: 2000 })
 *     );
 *   });
 *
 *   return (
 *    <Surface>
 *      <Button onPress={() => toaster.show({ message: 'Here is a toast for ya!' })}>
 *        Show Toast
 *      </Button>
 *      <Button onPress={toaster.hide}>Hide Toast</Button>
 *    </Surface>
 *  );
 * };
 * ```
 */
const useToast = () => {
  const toast = useContext(ToastContext);
  if (!toast) {
    throw new Error('useToast must be used within a ToastProvider.');
  }
  return toast;
};

const icons: ToastIconType = {
  normal: 'information-outline',
  info: 'information-outline',
  warning: 'alert-circle-outline',
  success: 'check-circle-outline',
  error: 'close-circle-outline',
};

const common: ViewStyle = {
  borderRadius: 20,
};

const types: ToastStyles = {
  info: {
    ...common,
    backgroundColor: 'rgba(39, 182, 204)',
  },
  normal: {
    ...common,
    backgroundColor: 'rgba(72,77,81,0.9)',
  },
  success: {
    ...common,
    backgroundColor: 'rgba(75,153,79,0.9)',
  },
  warning: {
    ...common,
    backgroundColor: 'rgba(254,177,25,0.9)',
  },
  error: {
    ...common,
    backgroundColor: 'rgba(216,25,25,0.9)',
  },
};

const styles = StyleSheet.create({
  message: {
    fontSize: 20,
    color: '#ffffff',
  },
});

export { ToastProvider, useToast };
