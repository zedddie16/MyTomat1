

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useTimer } from 'react-timer-hook';
import { Audio } from 'expo-av';

interface MyTimerProps {
  expiryTimestamp: Date;
}

const MyTimer: React.FC<MyTimerProps> = ({ expiryTimestamp }) => {
  const {
    seconds,
    minutes,
    isRunning,
    pause,
    resume,
    restart,
  } = useTimer({ expiryTimestamp, onExpire: () => {playSound(); console.info('Timer expired')} });

  const handleWork = () => {
    const time = new Date();
    time.setSeconds(time.getSeconds() + 1500); // 10 minutes timer
    restart(time);
  };
  const handleRest = () => {
    const time = new Date();
          time.setSeconds(time.getSeconds() + 300); // 10 minutes timer
          restart(time);
  };
  const handlePause = () => {
   isRunning ? pause() : resume()
  }
  const playSound = async () => {
    try {
      const { sound } = await Audio.Sound.createAsync(
        require('../assets/alarm.wav') // Adjusted path
      );
      await sound.playAsync();
    } catch (error) {
      console.error('Error playing sound:', error);
    }
  };

  return (
    <View style={styles.timerContainer}>
      <Text style={styles.timeText}>{minutes}m {seconds}s</Text>
      <Text style={styles.StatusText}>{isRunning ? 'Running' : 'Not running'}</Text>
      <TouchableOpacity style={[styles.touchButton]} onPressIn={handleWork}>
        <Text style = {styles.buttonText}>Start Work</Text>
      </TouchableOpacity>
      
      <TouchableOpacity style={[styles.touchButton]} onPressIn={handlePause}>
        <Text style = {styles.buttonText}>{isRunning ? 'Pause' : 'Resume'}</Text>
      </TouchableOpacity>
    
      <TouchableOpacity style={[styles.touchButton]} onPressIn={handleRest}>
        <Text style = {styles.buttonText}>Start Rest</Text>
      </TouchableOpacity>
    </View>
  );
};

const App: React.FC = () => {
  const time = new Date();
  time.setSeconds(time.getSeconds() + 1500); // 10 minutes timer

  return (
    <View style={styles.container}>
      <MyTimer expiryTimestamp={time} />
    </View>
  );
};

const styles = StyleSheet.create({
  timerContainer: {
    backgroundColor: '#1E1E1E', // Slightly lighter dark background
    padding: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 3,
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  touchButton:{
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 3,
    backgroundColor: '#BB86FC',
    padding: 15,
    marginVertical: 10,
    alignItems: "center",
    width: 200,
    height: 50,
  },
  buttonText: {
    color: '#121212', // Dark text on light button
    fontSize: 16,
    fontWeight: 'bold',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#121212', // Dark background
    padding: 16,
  },
  timeText: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#E0E0E0', // Light grey text
    marginBottom: 16,
  },
  StatusText: {
    flex: 1,
    fontSize: 24,
    color: '#B0B0B0', // Medium grey text
    marginBottom: 16,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
  },
});

export default App;
