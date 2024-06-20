import React, {useEffect, useState} from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  Alert,
  ActivityIndicator,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {useDispatch, useSelector} from 'react-redux';
import {addToDo, editTodo} from '../Redux/TodoSlice';
import {RootState, AppDispatch} from '../Redux/store';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import TodolistView from '../Components/TodolistView';
import HeaderView from '../Components/TabHeaderView';
import {fetchPosts} from '../Redux/PostsSlice';

type Props = {
  navigation: NativeStackNavigationProp<any, any>;
};

type Todo = {
  id: number;
  title: string;
};

export default function Homescreen(props: Props) {
  const dispatch = useDispatch<AppDispatch>();
  const {todoList} = useSelector((state: RootState) => state.todo);
  const {posts, loading, error} = useSelector(
    (state: RootState) => state.posts,
  );
  const [selectedTab, setSelectedTab] = useState('To-Do list');
  const [taskName, setTaskName] = useState('');
  const [editingTodo, setEditingTodo] = useState<Todo | null>(null);

  useEffect(() => {
    if (selectedTab === 'Posts list') {
      dispatch(fetchPosts());
    }
  }, [selectedTab, dispatch]);

  //Function for the longest return substring without repating charecters

  const longestSubstringFind = (s: string) => {
    let start = 0;
    let maxLen = 0;
    let maxSubstr = '';
    let currentWindow: string[] = [];

    for (let end = 0; end < s.length; end++) {
      while (currentWindow.includes(s[end])) {
        currentWindow.shift();
        start++;
      }

      currentWindow.push(s[end]);

      if (currentWindow.length > maxLen) {
        maxLen = currentWindow.length;
        maxSubstr = currentWindow.join('');
      }
    }

    return maxSubstr;
  };

  console.log(longestSubstringFind('hello i am developer'));

  //

  const handleAddBtnClick = () => {
    if (taskName.trim() === '') {
      Alert.alert('Please enter a task name');
      return;
    } else {
      dispatch(addToDo(taskName));
      setTaskName('');
    }
  };

  const handleEditClick = (todo: Todo) => {
    setEditingTodo(todo);
    setTaskName(todo.title);
  };

  const handleSaveClick = () => {
    if (editingTodo) {
      dispatch(
        editTodo({
          id: editingTodo.id,
          title: taskName,
          status: false,
        }),
      );
      setEditingTodo(null);
      setTaskName('');
    }
  };

  const handleClearBtnClick = () => {
    setTaskName('');
  };

  const handleAddClick = () => {
    if (editingTodo) {
      handleSaveClick();
    } else {
      handleAddBtnClick();
    }
  };

  const renderPosts = () => {
    if (loading)
      return (
        <ActivityIndicator
          size="large"
          color="#fff"
          style={{alignSelf: 'center', height: '100%'}}
        />
      );
    if (error) return <Text>{error}</Text>;
    return (
      <FlatList
        showsVerticalScrollIndicator={false}
        style={{marginTop: hp(1)}}
        data={posts}
        keyExtractor={item => item.id.toString()}
        renderItem={({item}) => (
          <View style={styles.postItemView}>
            <Text style={styles.titleText}>{item.title}</Text>
            <Text style={[styles.text, {color: 'grey'}]}>{item.body}</Text>
          </View>
        )}
      />
    );
  };

  return (
    <View style={styles.container}>
      <HeaderView selectedTab={selectedTab} onTabPress={setSelectedTab} />
      {selectedTab == 'To-Do list' ? (
        <>
          <TextInput
            value={taskName}
            onChangeText={text => setTaskName(text)}
            style={styles.textInput}
            placeholderTextColor={'#D6D6D6'}
            placeholder="Enter task name"
          />
          <View style={styles.rowView}>
            <TouchableOpacity style={styles.btnView} onPress={handleAddClick}>
              <Text style={[styles.text, {color: 'black'}]}>
                {editingTodo ? 'Save' : 'Add'}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.btnView}
              onPress={handleClearBtnClick}>
              <Text style={[styles.text, {color: 'black'}]}>{'Clear'}</Text>
            </TouchableOpacity>
          </View>
          <FlatList
            showsVerticalScrollIndicator={false}
            style={{marginTop: hp(1)}}
            data={todoList}
            keyExtractor={item => item.id.toString()}
            renderItem={({item, index}) => (
              <TodolistView todoItem={item} editBtnClick={handleEditClick} />
            )}
          />
        </>
      ) : (
        renderPosts()
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: wp(4),
    paddingVertical: hp(2),
    backgroundColor: '#323131',
  },
  titleText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '500',
    paddingVertical: hp(1),
  },

  text: {
    color: 'white',
    fontSize: 16,
    fontWeight: '400',
    paddingVertical: hp(1),
  },
  textInput: {
    height: hp(6),
    paddingHorizontal: wp(4),
    borderColor: 'black',
    borderWidth: 0.5,
    borderRadius: 10,
    marginTop: hp(2),
    backgroundColor: 'black',
    color: 'white',
  },
  rowView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  btnView: {
    backgroundColor: 'white',
    paddingHorizontal: wp(4),
    paddingVertical: hp(0.5),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    width: wp(40),
    alignSelf: 'center',
    marginTop: hp(2),
  },
  postItemView: {
    borderColor: 'white',
    borderWidth: 1,
    marginVertical: hp(1),
    borderRadius: 10,
    paddingHorizontal: wp(4),
    paddingVertical: hp(1),
    backgroundColor: 'black',
  },
});
