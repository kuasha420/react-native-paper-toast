import React, { useReducer } from 'react';
import { Button, Surface, TextInput } from 'react-native-paper';
import { ToastOptions, useToast } from 'react-native-paper-toast';
import { StyleSheet } from 'react-native';

const initialToast: ToastOptions = { message: 'Here is a toast for ya!' };

enum ToastActionType {
  UPDATE = 'UPDATE',
  RESET = 'RESET',
}

interface ToastAction {
  type: ToastActionType;
  payload: ToastOptions;
}

const toastReducer = (state: ToastOptions, action: ToastAction) => {
  switch (action.type) {
    case ToastActionType.UPDATE:
      return { ...state, ...action.payload };
    case ToastActionType.RESET:
      return initialToast;
    default:
      return state;
  }
};

const Application: React.FC = () => {
  const toast = useToast();

  const [toastOptions, dispatch] = useReducer(toastReducer, initialToast);

  return (
    <Surface style={styles.container}>
      <TextInput
        value={toastOptions.message}
        onChangeText={(message) => dispatch({ type: ToastActionType.UPDATE, payload: { message } })}
      />
      <Button onPress={() => toast.show(toastOptions)}>Show Toast</Button>
      <Button onPress={toast.hide}>Hide Toast</Button>
    </Surface>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    margin: 10,
  },
});

export default Application;
