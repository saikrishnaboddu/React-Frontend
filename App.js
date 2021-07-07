import React, { useState } from 'react';
import 'react-native-gesture-handler';

import { NavigationContainer } from '@react-navigation/native';
import { Button, KeyboardAvoidingView, StyleSheet, Text, View, TextInput, TouchableOpacity, Keyboard, ScrollView } from 'react-native';
import Task from './components/Task';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

export default function App() {
  const [task, setTask] = useState();
  const [taskItems, setTaskItems] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);

  const handleAddTask = () => {
    Keyboard.dismiss();
    setTaskItems([...taskItems, task])
    setTask(null);
  }

  const completeTask = (index, navigation) => {
    setSelectedTask({ index: index, text: taskItems[index] });
    navigation.navigate('Todo', { name: 'Jane' })
    // let itemsCopy = [...taskItems];
    // itemsCopy.splice(index, 1);
    // setTaskItems(itemsCopy)
  }


  const TodoScreen = ({ navigation }) => {
    return (
      <View style={styles.todoScreen}>
        <Text >{selectedTask.text}</Text>
        <View style={styles.deleteButton}>
          <TouchableOpacity onPress={() => {
            let itemsCopy = [...taskItems];
            itemsCopy.splice(selectedTask.index, 1);
            setTaskItems(itemsCopy);
            setSelectedTask(null);
            navigation.goBack();
          }}>Delete</TouchableOpacity>
        </View>

      </View>
    );
  };
  const MainScreen = ({ navigation, route }) => {
    return (
      <View style={styles.container}>

        <ScrollView
          contentContainerStyle={{
            flexGrow: 1
          }}
          keyboardShouldPersistTaps='handled'
        >


          <View style={styles.tasksWrapper}>
            <Text style={styles.sectionTitle}>ToDo List</Text>
            <View style={styles.items}>

              {
                taskItems.map((item, index) => {
                  return (
                    <TouchableOpacity key={index} onPress={() => completeTask(index, navigation)}>
                      <Task text={item} />
                    </TouchableOpacity>
                  )
                })
              }
            </View>
          </View>

        </ScrollView>

        <KeyboardAvoidingView

          style={styles.writeTaskWrapper}
        >
          <TextInput style={styles.input} placeholder={'Plan Your Day'} value={task} onChangeText={text => setTask(text)} />
          <TouchableOpacity onPress={() => handleAddTask()}>
            <View style={styles.addWrapper}>
              <Text style={styles.addText}>+</Text>
            </View>
          </TouchableOpacity>
        </KeyboardAvoidingView>

      </View>
    );
  };

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Main"
          component={MainScreen}
          options={{ title: '' }}
        />
        <Stack.Screen options={{ title: '' }} name="Todo" component={TodoScreen} />
      </Stack.Navigator>

    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#90938b',
  },
  tasksWrapper: {
    paddingTop: 80,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold'
  },
  items: {
    marginTop: 30,
  },
  writeTaskWrapper: {
    position: 'absolute',
    bottom: 60,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  input: {
    paddingVertical: 15,
    paddingHorizontal: 15,
    backgroundColor: '#FFF',
    borderRadius: 60,
    borderColor: '#C0C0C0',
    borderWidth: 1,
    width: 250,
  },
  addWrapper: {
    width: 60,
    height: 60,
    backgroundColor: '#FFF',
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#C0C0C0',
    borderWidth: 1,
  },
  addText: {},
  todoScreen: {
    padding: 20
  },
  deleteButton: {
    width: 60,
    padding: 10,
    backgroundColor: 'red',
    color: '#fff',
    borderRadius: 20
  }
});
