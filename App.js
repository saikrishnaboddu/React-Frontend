import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
     <View style={styles.tasksWrapper}>
       <Text style={styles.sectionTitle}>To Do List</Text>
     <View style={styles.items}>

     </View>
     </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#878282'
  },
  tasksWrapper:{
    paddingTop:80,
    paddingHorizontal:20,

  },
  sectionTitle:{
    fontSize:24,
    fontWeight:'bold',
    color:'#fff',
  },
  items:{},
});
