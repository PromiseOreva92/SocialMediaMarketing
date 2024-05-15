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


}

