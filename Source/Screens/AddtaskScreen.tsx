import React, {useState} from 'react';
import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {useDispatch} from 'react-redux';
import {addToDo} from '../Redux/TodoSlice';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

type Props = {
  navigation: NativeStackNavigationProp<any, any>;
};

export default function AddtaskScreen(props: Props) {
  const dispatch = useDispatch();
  const [title, setTitle] = useState<string>('');

  const checkValidation = () => {
    if (title.trim().length === 0) {
      Alert.alert('Please enter task name');
      return false;
    }
    return true;
  };

  const handleSubmitClick = () => {
    if (checkValidation()) {
      dispatch(addToDo(title));
      props.navigation.goBack();
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        value={title}
        onChangeText={text => setTitle(text)}
        placeholder="Enter your task"
        style={styles.textInput}
      />
      <TouchableOpacity style={styles.btnContainer} onPress={handleSubmitClick}>
        <Text style={styles.text}>{'Submit'}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: wp(4),
    paddingVertical: hp(2),
  },
  textInput: {
    height: hp(6),
    paddingHorizontal: wp(4),
    borderColor: 'black',
    borderWidth: 0.5,
    borderRadius: 10,
    marginTop: hp(2),
    backgroundColor: 'white',
  },
  btnContainer: {
    backgroundColor: 'black',
    paddingHorizontal: wp(2),
    paddingVertical: hp(2),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    position: 'absolute',
    bottom: hp(2),
    width: wp(90),
    alignSelf: 'center',
  },
  text: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
  },
});
