import React from 'react';
import {StyleSheet, Dimensions} from 'react-native';
const {height, width} = Dimensions.get('window');
const spacing = 12;
const SIZE = width * 0.34;
const TOP = 24;
const color = '#E0E5EC';
const black = 'black';
const backgroundColor = '#FFFFFF';
const globalStyle = StyleSheet.create({
  container: {
    backgroundColor,
    flex: 1,
  },
  content: {
    marginLeft: 20,
    marginRight: 20,
  },
  optionalContainer: {
    backgroundColor,
    flex: 1,
  },
  cardContainer: {
    width: width * 0.9,
    height: SIZE,
    backgroundColor: '#FFFFFF',
    borderWidth: 0.3,
    borderColor: 'grey',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    justifyContent: 'center',
    borderRadius: 10,
  },
  image: {
    height: height / 4,
    width: width / 4,
    alignItems: 'center',
    justifyContent: 'center',
    top: -10,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 17,
    color: '#000',
    width: 300,
    bottom: 40,
  },
  commonButton: {
    width: width - 250,
    top: 20,
    height: 45,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: '#5790f2',

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 8,
  },
  textInput: {borderBottomWidth: 1.2, borderBottomColor: 'grey'},

  textButton: {fontSize: 18, color: 'white', fontWeight: 'bold'},
});

export {
  globalStyle,
  color,
  black,
  SIZE,
  spacing,
  width,
  height,
  TOP,
  backgroundColor,
};
