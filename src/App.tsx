

import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useTimer } from 'react-timer-hook';

interface MyTimerProps {
  expiryTimestamp: Date;
}

const MyTimer: React.FC<MyTimerProps> = ({ expiryTimestamp }) => {
  const {
    seconds,
    minutes,
    hours,
    days,
    isRunning,
    start,
    pause,
    resume,
    restart,
  } = useTimer({ expiryTimestamp, onExpire: () => console.warn('Timer expired') });

  const handleStart = () => {
    if (seconds === 0 && minutes === 0 && hours === 0 && days === 0) {
      const time = new Date();
      time.setSeconds(time.getSeconds() + 600); // 10 minutes timer
      restart(time);
    } else {
      start();
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{days}d {hours}h {minutes}m {seconds}s</Text>
      <Text style={styles.text}>{isRunning ? 'Running' : 'Not running'}</Text>
      <View style={styles.buttonContainer}>
        <Button onPress={handleStart} title="Start" color="#841584" />
        <Button onPress={pause} title="Pause" color="#f194ff" />
        <Button onPress={resume} title="Resume" color="#2196F3" />
        <Button onPress={() => {
          const time = new Date();
          time.setSeconds(time.getSeconds() + 600); // 10 minutes timer
          restart(time);
        }} title="Restart" color="#FF6347" />
      </View>
    </View>
  );
};

const App: React.FC = () => {
  const time = new Date();
  time.setSeconds(time.getSeconds() + 600); // 10 minutes timer

  return (
    <View style={styles.container}>
      <MyTimer expiryTimestamp={time} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 30,
  },
  text: {
    fontSize: 30,
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    width: '100%',
    marginTop: 30,
    marginVertical: 50,
  },
});

export default App;
