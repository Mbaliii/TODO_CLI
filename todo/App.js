import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList } from 'react-native';
import { Button, List, Checkbox, IconButton } from 'react-native-paper';

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [taskText, setTaskText] = useState('');

  const addTask = () => {
    if (taskText.trim() !== '') {
      setTasks([...tasks, { text: taskText, completed: false, editing: false }]);
      setTaskText('');
    }
  };

  const toggleTaskStatus = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].completed = !updatedTasks[index].completed;
    setTasks(updatedTasks);
  };

  const toggleEditTask = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].editing = !updatedTasks[index].editing;
    setTasks(updatedTasks);
  };

  const updateTaskText = (index, newText) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].text = newText;
    setTasks(updatedTasks);
  };

  const deleteTask = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks.splice(index, 1);
    setTasks(updatedTasks);
  };

  const renderTaskItem = ({ item, index }) => (
    <List.Item
      title={item.text}
      left={() => (
        <Checkbox
          status={item.completed ? 'checked' : 'unchecked'}
          onPress={() => toggleTaskStatus(index)}
        />
      )}
      right={() => (
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          {item.editing ? (
            <TextInput
              value={item.text}
              onChangeText={(newText) => updateTaskText(index, newText)}
              onBlur={() => toggleEditTask(index)}
              autoFocus
            />
          ) : (
            <>
              <IconButton
                icon="pencil"
                onPress={() => toggleEditTask(index)}
              />
              <IconButton
                icon="delete"
                onPress={() => deleteTask(index)}
              />
            </>
          )}
        </View>
      )}
    />
  );

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 16 }}>
        To-Do List
      </Text>
      <TextInput
        placeholder="Add a new task"
        value={taskText}
        onChangeText={(text) => setTaskText(text)}
        style={{
          marginBottom: 16,
          paddingVertical: 8,
          paddingHorizontal: 12,
          borderColor: 'gray',
          borderWidth: 1,
        }}
      />
      <Button mode="contained" onPress={addTask} style={{ marginBottom: 16 }}>
        Add Task
      </Button>
      <FlatList
        data={tasks}
        renderItem={renderTaskItem}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};

export default App;
