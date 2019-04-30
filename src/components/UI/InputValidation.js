import React, { Component } from 'react';
import {
  View,
  TextInput,
  Text,
  StyleSheet,
} from 'react-native';

class InputValidation extends Component {
  textChangeHandler = (value) => {
    this.props.onChange(this.props.name, value);
  }

  touchHandler = () => {
    this.props.onTouch(this.props.name);
  }

  render() {
    const { placeholder, error, ...rest } = this.props;
    return (
      <View>
        <View style={styles.container}>
          <TextInput
            ref={this.props.myRef}
            underlineColorAndroid='transparent'
            onChangeText={this.textChangeHandler}
            onBlur={this.touchHandler}
            placeholder={placeholder}
            {...rest}
            style={[styles.input, this.props.style]}
          />
        </View>
        {error && <Text style={styles.errorMsg}>{error}</Text>}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    //flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    width: '100%',
    padding: 5,
    marginTop: 8,
    marginBottom: 8,
    //justifyContent: 'center'
  },
  errorMsg: {
    color: 'red',
    fontSize: 12,
    justifyContent: 'center',
    textAlign: 'center',
  }
});

export default InputValidation;
