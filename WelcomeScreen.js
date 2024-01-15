import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

const WelcomeScreen = ({ navigation }) => {
  useEffect(() => {
    // Attendez 2 à 3 secondes, puis naviguez vers l'écran principal
    const timer = setTimeout(() => {
      navigation.navigate('Main'); // Remplacez 'Main' par le nom de votre écran principal
    }, 2000); // Ajustez la durée en millisecondes selon vos besoins (par exemple, 3000 pour 3 secondes)

    return () => clearTimeout(timer); // Nettoyez le timer si le composant est démonté
  }, [navigation]);

  return (
    <View style={styles.container}>
      {/* Personnalisez cet écran de bienvenue */}
      <Image source={require('./your-logo.png')} style={styles.logo} />
      <Text style={styles.text}>Bienvenue dans l'application !</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 20,
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default WelcomeScreen;
