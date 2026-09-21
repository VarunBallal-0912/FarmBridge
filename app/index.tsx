import { StyleSheet, Text, View, Pressable } from 'react-native';

export default function HomeScreen() {
  return (
    <View style={styles.container}>

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.logo}>🌾 KisanConnect</Text>
        <Text style={styles.subtitle}>
          Smart farming. Better decisions.
        </Text>
      </View>

      {/* Welcome */}
      <View style={styles.welcomeBox}>
        <Text style={styles.welcome}>Namaskar, Farmer 👋</Text>
        <Text style={styles.description}>
          Get market prices, crop guidance and useful farming information.
        </Text>
      </View>

      {/* Main Buttons */}
      <View style={styles.buttonContainer}>

        <Pressable style={styles.button}>
          <Text style={styles.icon}>📊</Text>
          <Text style={styles.buttonText}>Check Market Prices</Text>
        </Pressable>

        <Pressable style={styles.button}>
          <Text style={styles.icon}>🤖</Text>
          <Text style={styles.buttonText}>Ask Kisan AI</Text>
        </Pressable>

        <Pressable style={styles.button}>
          <Text style={styles.icon}>🌱</Text>
          <Text style={styles.buttonText}>Check Crop Disease</Text>
        </Pressable>

        <Pressable style={styles.button}>
          <Text style={styles.icon}>🏛️</Text>
          <Text style={styles.buttonText}>Government Schemes</Text>
        </Pressable>

      </View>

      {/* Footer */}
      <Text style={styles.footer}>
        KisanConnect • Empowering Farmers
      </Text>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F9F4',
    paddingHorizontal: 20,
    paddingTop: 60,
  },

  header: {
    marginBottom: 30,
  },

  logo: {
    fontSize: 28,
    fontWeight: '700',
    color: '#245C3A',
  },

  subtitle: {
    fontSize: 14,
    color: '#6B756D',
    marginTop: 5,
  },

  welcomeBox: {
    backgroundColor: '#E8F2E8',
    borderRadius: 18,
    padding: 20,
    marginBottom: 25,
  },

  welcome: {
    fontSize: 21,
    fontWeight: '700',
    color: '#245C3A',
    marginBottom: 8,
  },

  description: {
    fontSize: 15,
    lineHeight: 22,
    color: '#536056',
  },

  buttonContainer: {
    gap: 14,
  },

  button: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 18,
    flexDirection: 'row',
    alignItems: 'center',

    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 6,
    shadowOffset: {
      width: 0,
      height: 3,
    },

    elevation: 2,
  },

  icon: {
    fontSize: 27,
    marginRight: 15,
  },

  buttonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#26352A',
  },

  footer: {
    textAlign: 'center',
    marginTop: 'auto',
    marginBottom: 25,
    color: '#7A837C',
    fontSize: 12,
  },
});