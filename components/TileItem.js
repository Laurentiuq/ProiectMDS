import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';

const TileItem = ({mainText, subtitle, iconImage, onIconPress}) => {
  return (
    <TouchableOpacity onPress={onIconPress} testID="ceva">
    <View style={styles.container}>
      <View>
        <Text style={styles.mainText}>{mainText}</Text>
        <Text style={styles.subtitle}>{subtitle}</Text>
      </View>
        <Image source={iconImage} style={styles.icon} />
    </View>
    </TouchableOpacity>
 );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#F9E0DD',
    borderRadius: 20,
    padding: 16,
    margin: 16,
    paddingStart:40
  },
  mainText: {
    fontSize: 18,
    fontWeight: 'bold',
    color:'#F16956'
  },
  subtitle: {
    fontSize: 14,
    color:'#F16951'
  },
  icon: {
    width: 24,
    height: 24,
  },
});

export default TileItem;
