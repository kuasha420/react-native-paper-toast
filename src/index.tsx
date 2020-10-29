import React, { createContext, useContext, useMemo, useState } from 'react';
import { Keyboard, StyleProp, StyleSheet, ViewStyle } from 'react-native';
import { Portal, Snackbar, Text } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

type ToastType = 'info' | 'normal' | 'success' | 'warning' | 'error';

interface ToastParams {
  /** The message to show */
  message: string;
  /** Type of toast */
  type: ToastType;
  /** Toast duration */
  duration: number;
}

/** All params are optional */
export type ToastOptions = Partial<ToastParams>;

export interface ToastMethods {
  /** Show a new toast */
  show(options: ToastOptions): void;
  /** Hide toast that are on display */
  hide(): void;
}

const ToastContext = createContext<ToastMethods>({ show() {}, hide() {} });

export const ToastProvider: React.FC = ({ children }) => {
  const [message, setMessage] = useState('Hello World');
  const [type, setType] = useState<ToastType>('normal');
  const [duration, setDuration] = useState(1500);
  const [show, setShow] = useState(false);

  const insets = useSafeAreaInsets();

  const toast = useMemo(
    () => ({
      show(options: ToastOptions) {
        const { duration: d = 1500, message: m = 'Hello World', type: t = 'normal' } = options;
        Keyboard.dismiss();
        setDuration(d);
        setMessage(m);
        setType(t);
        setShow(true);
      },
      hide() {
        setShow(false);
      },
    }),
    []
  );

  return (
    <ToastContext.Provider value={toast}>
      <Portal.Host>{children}</Portal.Host>
      <Portal>
        <Snackbar
          onDismiss={toast.hide}
          style={[types[type], { marginBottom: insets.bottom + 12 }]}
          duration={duration}
          visible={show}
        >
          <Icon size={20} name={icons[type]} color="#ffffff" />
          <Text style={styles.message}>{` ${message}`}</Text>
        </Snackbar>
      </Portal>
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const toast = useContext(ToastContext);
  return toast;
};

type ToastIconType = {
  [key in ToastType]: string;
};

const icons: ToastIconType = {
  normal: 'information-outline',
  info: 'information-outline',
  warning: 'alert-circle-outline',
  success: 'check-circle-outline',
  error: 'close-circle-outline',
};

type ToastStyles = {
  [key in ToastType]: StyleProp<ViewStyle>;
};

const common: ViewStyle = {
  marginHorizontal: 12,
  borderRadius: 20,
};

const types: ToastStyles = {
  info: {
    ...common,
    backgroundColor: 'rgba(81,98,188,0.9)',
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
