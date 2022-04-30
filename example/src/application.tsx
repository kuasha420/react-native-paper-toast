import React, { useCallback, useReducer } from 'react';
import { Alert, StyleSheet, View } from 'react-native';
import {
  Button,
  Headline,
  Subheading,
  Surface,
  Text,
  TextInput,
  ToggleButton,
} from 'react-native-paper';
import { ToastOptions, useToast } from 'react-native-paper-toast';

const initialToast: ToastOptions = { message: 'Here is a toast for ya!' };

enum ToastActionType {
  UPDATE = 'UPDATE',
  RESET = 'RESET',
}

interface ToastAction {
  type: ToastActionType;
  payload?: ToastOptions;
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

  const action = useCallback(
    () => Alert.alert('Toast Action', 'You clicked the toast action button'),
    []
  );

  return (
    <Surface style={styles.container}>
      <Headline style={styles.headline}>React Native Paper Toast</Headline>
      <Subheading style={styles.subheading}>Interactive Example</Subheading>
      <View style={styles.row}>
        <Text style={styles.label}>Message: </Text>
        <TextInput
          style={styles.message}
          value={toastOptions.message}
          onChangeText={(message) =>
            dispatch({ type: ToastActionType.UPDATE, payload: { message } })
          }
        />
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Type: </Text>
        <ToggleButton.Row
          onValueChange={(type: ToastOptions['type']) =>
            dispatch({ type: ToastActionType.UPDATE, payload: { type } })
          }
          value={toastOptions.type}
        >
          <ToggleButton
            icon="information-outline"
            value="normal"
            style={styles.toggle}
            color={colors.normal}
          />
          <ToggleButton
            icon="information-outline"
            value="info"
            style={styles.toggle}
            color={colors.info}
          />
          <ToggleButton
            icon="alert-circle-outline"
            value="warning"
            style={styles.toggle}
            color={colors.warning}
          />
          <ToggleButton
            icon="check-circle-outline"
            value="success"
            style={styles.toggle}
            color={colors.success}
          />
          <ToggleButton
            icon="close-circle-outline"
            value="error"
            style={styles.toggle}
            color={colors.error}
          />
        </ToggleButton.Row>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Position: </Text>
        <ToggleButton.Row
          onValueChange={(position: ToastOptions['position']) =>
            dispatch({ type: ToastActionType.UPDATE, payload: { position } })
          }
          value={toastOptions.position}
        >
          <ToggleButton icon="arrow-collapse-up" value="top" style={styles.toggle} />
          <ToggleButton icon="plus" value="middle" style={styles.toggle} />
          <ToggleButton icon="arrow-collapse-down" value="bottom" style={styles.toggle} />
        </ToggleButton.Row>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Action: </Text>
        <ToggleButton.Row
          onValueChange={(actionBtn: 'true' | 'false') =>
            dispatch({
              type: ToastActionType.UPDATE,
              payload: { action: actionBtn === 'true' ? action : undefined },
            })
          }
          value={toastOptions.action ? 'true' : 'false'}
        >
          <ToggleButton icon="eye" value="true" style={styles.toggle} />
          <ToggleButton icon="eye-off" value="false" style={styles.toggle} />
        </ToggleButton.Row>
      </View>
      <Button mode="contained" onPress={() => toast.show(toastOptions)}>
        Show Toast
      </Button>
      <Button onPress={toast.hide}>Hide Toast</Button>
    </Surface>
  );
};

const colors = {
  info: 'rgba(81,98,188,0.9)',
  normal: 'rgba(72,77,81,0.9)',
  success: 'rgba(75,153,79,0.9)',
  warning: 'rgba(254,177,25,0.9)',
  error: 'rgba(216,25,25,0.9)',
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    margin: 10,
  },
  headline: {
    textAlign: 'center',
  },
  subheading: {
    textAlign: 'center',
    marginBottom: 10,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  toggle: {
    marginRight: 10,
  },
  label: {
    marginRight: 10,
    minWidth: 60,
  },
  message: {
    flex: 1,
  },
});

export default Application;
