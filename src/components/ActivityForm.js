import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  KeyboardAvoidingView,
  Keyboard,
  TouchableWithoutFeedback,
  ActivityIndicator,
  Text,
} from 'react-native';
import { connect } from 'react-redux';

import { Formik } from 'formik';
import * as Yup from 'yup';

import ButtonWithBackground from './UI/ButtonWithBackground';
import InputValidation from './UI/InputValidation';

class ActivityForm extends Component {
  render() {
    return (
      <Formik
        initialValues={{ activity: '' }}
        onSubmit={this.props.submitHandler}
        validationSchema={Yup.object().shape({
          activity: Yup.string()
            .required('Insira o ID da atividade')
        })}
        render={({
          values,
          handleSubmit,
          setFieldValue,
          errors,
          touched,
          setFieldTouched,
          isValid
        }) => (
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
              <KeyboardAvoidingView
                style={styles.container}
                behavior='padding'
              >
                <Text style={styles.title}>
                  Pesquise pelo ID da atividade no campo abaixo
								</Text>
                <View style={styles.inputContainer}>
                  <InputValidation
                    placeholder='ID'
                    keyboardType='number-pad'
                    autoCapitalize='none'
                    returnKeyType='search'
                    autoCorrect={false}
                    value={values.activity}
                    onChange={setFieldValue}
                    onTouch={setFieldTouched}
                    onSubmitEditing={handleSubmit}
                    blurOnSubmit={false}
                    name='activity'
                    error={touched.activity && errors.activity}
                    style={styles.input}
                  />
                  { // Show Activity Indicator instead of button when loading
                    !this.props.isLoading
                      ? <ButtonWithBackground
                        color='#57bbbc'
                        onPress={handleSubmit}
                        isDisabled={!isValid}
                      >
                        Pesquisar
                        </ButtonWithBackground>
                      : <ActivityIndicator />
                  }
                </View>
              </KeyboardAvoidingView>
            </TouchableWithoutFeedback>
          )}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    height: 40,
    width: 160,
    resizeMode: 'stretch',
    marginBottom: 45
  },
  title: {
    textAlign: 'center',
    color: '#383743',
    backgroundColor: 'transparent',
    fontSize: 28,
    fontWeight: 'bold'
  },
  description: {
    textAlign: 'center',
    color: '#383743',
    backgroundColor: 'transparent',
    fontSize: 16,
    fontWeight: 'normal',
    marginBottom: 25
  },
  backgroundImage: {
    width: '100%',
    flex: 1
  },
  input: {
    borderBottomWidth: 1,
    backgroundColor: 'transparent',
    borderBottomColor: '#bbb'
  },
  inputContainer: {
    width: '80%'
  }
});

const mapStateToProps = state => {
  return {
    isLoading: state.ui.isLoading
  };
};

export default connect(mapStateToProps)(ActivityForm);
