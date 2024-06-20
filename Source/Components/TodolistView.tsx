import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {AppDispatch} from '../Redux/Store';
import {useDispatch} from 'react-redux';
import {deleteToDo, toggleTodoStatus} from '../Redux/TodoSlice';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

type Todo = {
  id: number;
  title: string;
  status: boolean;
};

type Props = {
  todoItem: Todo;
  editBtnClick: (todo: Todo) => void;
};

const TodolistView: React.FC<Props> = ({todoItem, editBtnClick}) => {
  const dispatch = useDispatch<AppDispatch>();

  const handleDeleteClick = (id: number) => {
    dispatch(deleteToDo({id}));
  };
  const handleCheckboxClick = (id: number) => {
    dispatch(toggleTodoStatus({id}));
  };

  return (
    <View style={styles.itemView}>
      <View>
        <Text style={[styles.text, {fontSize: 18, width: wp(60)}]}>
          {todoItem?.title}
        </Text>
        <Text
          style={[styles.text, {color: todoItem.status ? 'green' : 'orange'}]}>
          {todoItem.status ? 'completed' : 'pending'}
        </Text>
      </View>
      <View style={styles.rowView}>
        <TouchableOpacity
          style={styles.checkBoxView}
          onPress={() => handleCheckboxClick(todoItem?.id)}>
          {todoItem.status && <Text style={{color: 'white'}}>{'✓'}</Text>}
        </TouchableOpacity>
        <TouchableOpacity onPress={() => editBtnClick(todoItem)}>
          <Image
            source={require('../Images/edit.png')}
            style={styles.editBtn}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleDeleteClick(todoItem?.id)}>
          <Image
            source={require('../Images/download.png')}
            style={styles.icon}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  icon: {
    height: hp(3),
    width: hp(2),
  },
  editBtn: {
    height: hp(2),
    width: hp(2),
    marginRight: wp(4),
  },
  rowView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  itemView: {
    borderColor: 'white',
    marginVertical: hp(1),
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderRadius: 10,
    paddingHorizontal: wp(4),
    paddingVertical: hp(1),
    alignItems: 'center',
    backgroundColor: 'black',
  },
  text: {
    color: 'white',
    fontSize: 14,
    fontWeight: '400',
    paddingVertical: hp(0.5),
  },
  checkBoxView: {
    height: hp(2),
    width: hp(2),
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'white',
    marginRight: wp(4),
  },
});

export default TodolistView;
