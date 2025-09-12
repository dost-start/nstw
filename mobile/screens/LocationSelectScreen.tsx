import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
  FlatList,
  Keyboard,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';
import type { RootStackParamList } from '../navigation/AppNavigator';

type LocationSelectScreenNavProp = StackNavigationProp<
  RootStackParamList,
  'LocationSelectScreen'
>;

export default function LocationSelectScreen() {
  const navigation = useNavigation<LocationSelectScreenNavProp>();
  const [showList, setShowList] = useState(false);
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState<string | null>(null);

  const data = Array(20).fill('Pineapple');

  const handleSelect = (item: string) => {
    setSelected(item);
    setSearch(item);
    setShowList(false);
  };

  const handleSubmit = () => {
    if (search.trim()) {
      Keyboard.dismiss();
      navigation.navigate('FireStationSelectScreen', { location: search });
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image
            source={require('../assets/backicon.png')}
            style={styles.backIcon}
          />
        </TouchableOpacity>
        <Text style={styles.headerText}>Choose your location in Marikina</Text>
      </View>

      {/* Search Bar */}
      <TouchableOpacity
        activeOpacity={1}
        onPress={() => setShowList(true)}
        style={styles.searchBarWrapper}
      >
        <Image
          source={require('../assets/searchicon.png')}
          style={styles.searchIcon}
        />
        <TextInput
          style={styles.searchInput}
          placeholder="Search barangay in Marikina"
          placeholderTextColor="#999"
          value={search}
          onChangeText={setSearch}
          onFocus={() => setShowList(true)}
          returnKeyType="done"
          onSubmitEditing={handleSubmit}
        />
      </TouchableOpacity>

      {showList && (
        <View style={styles.listWrapper}>
          <FlatList
            data={data}
            keyExtractor={(_, i) => i.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.listItem}
                onPress={() => {
                  handleSelect(item);
                  navigation.navigate('FireStationSelectScreen', { location: item });
                }}
              >
                <View style={styles.listItemLeft}>
                  {selected === item ? (
                    <Image
                      source={require('../assets/checkicon.png')}
                      style={styles.checkIcon}
                    />
                  ) : (
                    <View style={styles.emptyIconSpace} />
                  )}
                  <Text style={styles.listText}>{item}</Text>
                </View>
              </TouchableOpacity>
            )}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#e5e5e5', padding: 16, marginTop: 30 },

  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  backIcon: { width: 24, height: 24, resizeMode: 'contain', marginRight: 10 },
  headerText: {
    fontSize: 20,
    fontWeight: '700',
    color: '#000',
  },

  searchBarWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f2f2f2',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    elevation: 2,
  },
  searchIcon: { width: 20, height: 20, resizeMode: 'contain', marginRight: 8 },
  searchInput: { flex: 1, fontSize: 16, color: '#000' },

  listWrapper: {
    marginTop: 20,
    backgroundColor: '#fff',
    borderRadius: 8,
    overflow: 'hidden',
    elevation: 2,
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  listItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkIcon: { width: 20, height: 20, resizeMode: 'contain', marginRight: 10 },
  emptyIconSpace: { width: 20, height: 20, marginRight: 10 },
  listText: { fontSize: 16, color: '#000' },
});
