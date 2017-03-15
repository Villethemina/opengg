import React, { Component } from 'react';
import {
  Modal as NativeModal,
  StyleSheet,
  Text,
  View,
  Button
} from 'react-native';

export default class Modal extends Component {
  render() {
    return (
      <NativeModal
        animationType={'slide'}
        transparent={true}
        visible={this.props.visible}
        onRequestClose={this.props.handleClose}
      >
        <View style={styles.containerSpacer} />
        <View style={styles.container}>
          <View style={styles.spacer} />
          <View style={styles.content}>
            <Text style={styles.text}>
              {this.props.text}
            </Text>
            <Button
              onPress={this.props.handleClose}
              title={this.props.buttonTitle}
            />
          </View>
          <View style={styles.spacer} />
        </View>
        <View style={styles.containerSpacer} />
      </NativeModal>
    );
  }
}

const styles = StyleSheet.create({
  containerSpacer: {
    flex: 0.35
  },
  container: {
    flexDirection: 'row',
    flex: 0.3
  },
  content: {
    backgroundColor: '#cccccc',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 0.8,
    borderRadius: 10
  },
  text: {
    textAlign: 'center',
    fontSize: 20,
    marginBottom: 20
  },
  spacer: {
    flex: 0.1
  }
});
