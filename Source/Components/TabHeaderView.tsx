import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

type HeaderViewProps = {
  selectedTab: string;
  onTabPress: (tab: string) => void;
};

const HeaderView: React.FC<HeaderViewProps> = ({selectedTab, onTabPress}) => (
  <View style={styles.headerView}>
    {['To-Do list', 'Posts list'].map(tabName => (
      <TouchableOpacity
        key={tabName}
        style={styles.tabItemView}
        onPress={() => onTabPress(tabName)}>
        <Text style={styles.text}>{tabName}</Text>
        {selectedTab === tabName && <View style={styles.borderView} />}
      </TouchableOpacity>
    ))}
  </View>
);

const styles = StyleSheet.create({
  headerView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  tabItemView: {
    justifyContent: 'center',
    alignItems: 'center',
    width: wp(35),
    padding: wp(2),
  },
  text: {
    color: 'white',
    fontSize: 18,
    fontWeight: '500',
    paddingVertical: hp(1),
  },
  borderView: {
    width: wp(35),
    height: 1,
    backgroundColor: 'white',
  },
});

export default HeaderView;
