import React, { Component } from 'react';
import { View, WebView, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';

import { authAutoAuth, getTokens, authClearStorage } from '../store/actions/index';

const initialUrl = 'https://www.strava.com/oauth/authorize?client_id=29860&response_type=code&redirect_uri=https://google.com&approval_prompt=auto&scope=activity:read_all';

class Auth extends Component {
  state = {
    url: initialUrl,
    webView: true
  }

  componentDidMount() {
    //this.props.onClearStorage();
    this.props.onAutoAuth();
  }

  onNavigationStateChange = navState => {
    const auxDomain = navState.url.split('https://');
    const domain = auxDomain[1].split('/');
    console.log(domain[0]);

    if (domain[0] === 'google.com') {
      try {
        const aux = navState.url.split('code=');
        console.log('AUX = ' + aux);
        const code = aux[1].split('&scope');
        console.log('CODE = ' + code[0]);
        this.props.onGetTokens(code[0]);
        this.setState({ webView: false });
      } catch (e) {
        console.log(e);
      }
    }
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        {
          this.state.webView
            ? <WebView
              style={{ flex: 1 }}
              source={{ uri: initialUrl }}
              onNavigationStateChange={this.onNavigationStateChange}
              startInLoadingState
              scalesPageToFit
              javaScriptEnabled
            />
            : <ActivityIndicator />
        }
      </View>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onGetTokens: code =>
      dispatch(getTokens(code)),
    onAutoAuth: () =>
      dispatch(authAutoAuth()),
    onClearStorage: () =>
      dispatch(authClearStorage())
  };
};

export default connect(null, mapDispatchToProps)(Auth);
