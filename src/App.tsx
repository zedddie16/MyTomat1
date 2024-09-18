import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useTimer } from 'react-timer-hook';
import { Audio } from 'expo-av';

// Constants for time durations
const WORK_DURATION = 1500; // 25 minutes
const REST_DURATION = 300;  // 5 minutes

interface MyTimerProps {
  expiryTimestamp: Date;
}

// Button Component for reusability
const TimerButton: React.FC<{ onPress: () => void; label: string }> = ({ onPress, label }) => (
  <TouchableOpacity style={styles.touchButton} onPress={onPress}>
    <Text style={styles.buttonText}>{label}</Text>
  </TouchableOpacity>
);

const MyTimer: React.FC<MyTimerProps> = ({ expiryTimestamp }) => {
  const { seconds, minutes, isRunning, pause, resume, restart } = useTimer({
    expiryTimestamp,
    onExpire: () => {
      playSound();
      console.info('Timer expired');
    },
  });

  const handleWork = () => restartTimer(WORK_DURATION);
  const handleRest = () => restartTimer(REST_DURATION);
  const handlePauseResume = () => (isRunning ? pause() : resume());

  const restartTimer = (duration: number) => {
    const time = new Date();
    time.setSeconds(time.getSeconds() + duration);
    restart(time);
  };

  const playSound = async () => {
    try {
      const { sound } = await Audio.Sound.createAsync(require('../assets/alarm.wav'));
      await sound.playAsync();
    } catch (error) {
      console.error('Error playing sound:', error);
    }
  };

  return (
    <View style={styles.timerContainer}>
      <TimeDisplay minutes={minutes} seconds={seconds} />
      <StatusDisplay isRunning={isRunning} />
      <TimerButton onPress={handleWork} label="Start Work" />
      <TimerButton onPress={handlePauseResume} label={isRunning ? 'Pause' : 'Resume'} />
      <TimerButton onPress={handleRest} label="Start Rest" />
    </View>
  );
};

// Separate Timer Display
const TimeDisplay: React.FC<{ minutes: number; seconds: number }> = ({ minutes, seconds }) => (
  <Text style={styles.timeText}>
    {minutes}m {seconds}s
  </Text>
);

// Separate Status Display
const StatusDisplay: React.FC<{ isRunning: boolean }> = ({ isRunning }) => (
  <Text style={styles.statusText}>{isRunning ? 'Running' : 'Paused'}</Text>
);

const App: React.FC = () => {
  const initialTime = new Date();
  initialTime.setSeconds(initialTime.getSeconds() + WORK_DURATION); // 25 minutes

  return (
    <View style={styles.container}>
      <MyTimer expiryTimestamp={initialTime} />
    </View>
  );
};

const styles = StyleSheet.create({
  timerContainer: {
    backgroundColor: '#1E1E1E',
    padding: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 3,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  touchButton: {
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 3,
    backgroundColor: '#BB86FC',
    padding: 15,
    marginVertical: 10,
    alignItems: 'center',
    width: 200,
    height: 50,
  },
  buttonText: {
    color: '#121212',
    fontSize: 16,
    fontWeight: 'bold',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#121212',
    padding: 16,
  },
  timeText: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#E0E0E0',
    marginBottom: 16,
  },
  statusText: {
    fontSize: 24,
    color: '#B0B0B0',
    marginBottom: 16,
  },
});

export default App;
