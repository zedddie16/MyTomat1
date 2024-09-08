

import React from 'react';
import { View, Text, Button, StyleSheet, Platform, TouchableOpacity } from 'react-native';
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
      time.setSeconds(time.getSeconds() + 5); // 10 minutes timer
      restart(time);
    } else {
      start();
    }
  };
  const handleRestart = () => {
    const time = new Date();
          time.setSeconds(time.getSeconds() + 5); // 10 minutes timer
          restart(time);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{days}d {hours}h {minutes}m {seconds}s</Text>
      <Text style={styles.text}>{isRunning ? 'Running' : 'Not running'}</Text>
      <TouchableOpacity style={[styles.touchButton]} onPressIn={handleStart}>
        <Text style = {styles.buttonText}>Button 1</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.touchButton]} onPressIn={pause}>
        <Text style = {styles.buttonText}>Pause</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.touchButton]} onPressIn={resume}>
        <Text style = {styles.buttonText}>Resume</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.touchButton]} onPressIn={handleRestart}>
        <Text style = {styles.buttonText}>Button 1</Text>
      </TouchableOpacity>
    </View>
  );
};

const App: React.FC = () => {
  const time = new Date();
  time.setSeconds(time.getSeconds() + 5); // 10 minutes timer

  return (
    <View style={styles.container}>
      <MyTimer expiryTimestamp={time} />
    </View>
  );
};

const styles = StyleSheet.create({
  touchButton:{
    
    backgroundColor: '#262626',
    padding: 15,
    marginVertical: 10,
    borderRadius: 5,
    width: '80%',
    alignItems: 'center',

  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  container: {
    backgroundColor:"#454545",
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  text: {
    fontSize: 30,
    marginBottom: 20,
    color:'#ffff'
  },
  buttonContainer: {
    flex: 0.5,
    padding: 5,
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    marginVertical: 10,
    width: '80%',
    borderRadius: 5,
    marginTop: 100,
    alignItems: 'center',
    margin: 0,
    
    ...Platform.select({
      ios: {
        borderWidth: 1,
        marginVertical: 50,
        backgroundColor: '#007BFF',
        cornerRadius: 25,
        shadowColor: '#FFFF',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.8,
        shadowRadius: 0,
      },
      android: {
        elevation: 5,
      },
      web: {
        boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.3)',
      },
    }),
  },
});

export default App;
