import React, { Component } from 'react';
import { View, StyleSheet, Keyboard } from 'react-native';
import { connect } from 'react-redux';

import { getActivity } from '../store/actions/index';

import ActivityForm from '../components/ActivityForm';

class Home extends Component {
  submitHandler = (values, { resetForm, setFieldTouched, setSubmitting }) => {
    this.props.onGetActivity(values.activity);
    Keyboard.dismiss();
    setTimeout(() => {
      resetForm({ activity: '' });
      setSubmitting(false);
      setFieldTouched('acitivty', false, false);
    }, 100);
  }

  render() {
    return (
      <View style={styles.container}>
        <ActivityForm
          submitHandler={this.submitHandler}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
});

const mapDispatchToProps = dispatch => {
  return {
    onGetActivity: id =>
      dispatch(getActivity(id)),
  };
};

export default connect(null, mapDispatchToProps)(Home);
