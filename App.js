
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  SafeAreaView,
  ScrollView,
} from 'react-native';

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />

      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.logo}>🐾 PawSitive</Text>
        <Text style={styles.subtitle}>PET ACADEMY</Text>

        <View style={styles.welcomeCard}>
          <Text style={styles.emoji}>🐶</Text>
          <Text style={styles.heading}>
            Welcome to PawSitive!
          </Text>
          <Text style={styles.description}>
            Learn, play and grow with your furry best friend.
          </Text>
        </View>

        <Text style={styles.sectionTitle}>Explore our academy</Text>

        <View style={styles.featureCard}>
          <Text style={styles.featureEmoji}>🎓</Text>
          <View>
            <Text style={styles.featureTitle}>Training courses</Text>
            <Text style={styles.featureDescription}>
              Learn new skills with your pet.
            </Text>
          </View>
        </View>

        <View style={styles.featureCard}>
          <Text style={styles.featureEmoji}>🐕</Text>
          <View>
            <Text style={styles.featureTitle}>Pet activities</Text>
            <Text style={styles.featureDescription}>
              Discover fun activities and challenges.
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF9F0',
  },
  content: {
    padding: 24,
    paddingTop: 45,
  },
  logo: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#287C75',
    textAlign: 'center',
  },
  subtitle: {
    textAlign: 'center',
    letterSpacing: 5,
    color: '#D69B65',
    marginTop: 5,
    marginBottom: 35,
  },
  welcomeCard: {
    backgroundColor: '#DDF1E9',
    padding: 25,
    borderRadius: 22,
    alignItems: 'center',
    marginBottom: 30,
  },
  emoji: {
    fontSize: 65,
    marginBottom: 15,
  },
  heading: {
    fontSize: 23,
    fontWeight: 'bold',
    color: '#245B55',
    textAlign: 'center',
  },
  description: {
    fontSize: 15,
    color: '#526B64',
    textAlign: 'center',
    marginTop: 10,
    lineHeight: 23,
  },
  sectionTitle: {
    fontSize: 21,
    fontWeight: 'bold',
    color: '#245B55',
    marginBottom: 15,
  },
  featureCard: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 16,
    marginBottom: 14,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
  },
  featureEmoji: {
    fontSize: 35,
  },
  featureTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#245B55',
  },
  featureDescription: {
    color: '#777777',
    marginTop: 5,
  },
});
