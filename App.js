import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from 'react-native';


const App = () => {
  const [tasks, setTasks] = useState([]);
  const [taskTitle, setTaskTitle] = useState('');

  // Function to add a new task
  const addTask = () => {
    if (taskTitle.trim()) {
      setTasks([...tasks, { id: Date.now().toString(), title: taskTitle, status: false }]);
      setTaskTitle('');
    }
  };

  // Function to toggle the status of a task
  const toggleTaskStatus = (taskId) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, status: !task.status } : task
      )
    );
  };

  // Function to delete a task
  const deleteTask = (taskId) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Enter Task Title"
        value={taskTitle}
        onChangeText={setTaskTitle}
      />
      <TouchableOpacity
        style={[styles.addButton, { backgroundColor: taskTitle.trim() ? '#6200ee' : '#ccc' }]}
        onPress={addTask}
        disabled={!taskTitle.trim()}
      >
        <Text style={styles.addButtonText}>Add Task</Text>
      </TouchableOpacity>

      <FlatList
        data={tasks}
        renderItem={({ item }) => (
          <View style={styles.taskCard}>
            <Text style={{ textDecorationLine: item.status ? 'line-through' : 'none' }}>
              {item.title}
            </Text>
            <TouchableOpacity
              style={styles.statusButton}
              onPress={() => toggleTaskStatus(item.id)}
            >
              <Text>{item.status ? 'Done' : 'Due'}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.deleteButton} onPress={() => deleteTask(item.id)}>
              <Text style={{ color: 'red' }}>Delete</Text>
            </TouchableOpacity>
          </View>
        )}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 40,
    backgroundColor: '#f0f0f0',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  addButton: {
    padding: 15,
    alignItems: 'center',
    borderRadius: 5,
  },
  addButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  taskCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 5,
    marginBottom: 10,
    elevation: 2,
  },
  statusButton: {
    paddingHorizontal: 10,
  },
  deleteButton: {
    paddingHorizontal: 10,
  },
});

export default App;
