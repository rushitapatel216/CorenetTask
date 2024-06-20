import {createStackNavigator} from '@react-navigation/stack';
import Homescreen from '../Screens/Homescreen';
import AddtaskScreen from '../Screens/AddtaskScreen';

const Stack = createStackNavigator();

function StackNavigation() {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="Home" component={Homescreen} />
      <Stack.Screen name="Addtask" component={AddtaskScreen} />
    </Stack.Navigator>
  );
}

export default StackNavigation;
