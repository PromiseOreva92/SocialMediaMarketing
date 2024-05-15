import React, { useState, useEffect, useRef } from 'react';
import {
  Button,
  PanResponder,
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  Image,
} from 'react-native';

export default function PanRes() {
  const [show, setShow] = useState(false);
  const timerRef = useRef(null);

  const _panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => {
      resetTimer();
      return true;
    },
    onMoveShouldSetPanResponder: () => true,
    onStartShouldSetPanResponderCapture: () => {
      resetTimer();
      return false;
    },
    onMoveShouldSetPanResponderCapture: () => false,
    onPanResponderTerminationRequest: () => true,
    onShouldBlockNativeResponder: () => false,
  });

  useEffect(() => {
    timerRef.current = setTimeout(() => setShow(true), 5000);

    return () => {
      clearTimeout(timerRef.current);
    };
  }, []);

  const resetTimer = () => {
    clearTimeout(timerRef.current);
    if (show) setShow(false);
    timerRef.current = setTimeout(() => setShow(true), 5000);
  };

  return (
    <View style={styles.container} collapsable={false} {..._panResponder.panHandlers}>
      {show ? console.log("Timer Expired: 5 sec "): null}

      <TouchableOpacity>
        <Image
          style={{ width: 300, height: 300 }}
          source={{ uri: 'https://facebook.github.io/react/img/logo_og.png' }}
        />
      </TouchableOpacity>

      <Button title="Here is a button for some reason" onPress={() => {}} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
  },
});
