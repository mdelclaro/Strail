import { Navigation } from 'react-native-navigation';

const startApp = () => {
  Navigation.setDefaultOptions({
    topBar: {
      background: {
        color: '#fc6d07'
      },
      title: {
        color: 'white'
      }
    }
  });

  Navigation.setRoot({
    root: {
      stack: {
        id: 'stack',
        children: [
          {
            component: {
              id: 'Home',
              name: 'app.Home',
              options: {
                topBar: {
                  visible: true,
                  title: {
                    text: 'Pesquisar Atividade',
                    fontSize: 22
                  }
                }
              },
            }
          }
        ]
      }
    }
  });
};

export default startApp;
