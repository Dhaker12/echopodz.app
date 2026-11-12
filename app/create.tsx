import { router } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { color, font, radius, space } from '../src/theme/tokens';

export default function CreateScreen() {
  return (
    <View style={styles.root}>
      <Text style={styles.title}>What did you do today?</Text>
      <Pressable accessibilityRole="button" onPress={() => router.back()} style={styles.btn}>
        <Text style={styles.btnText}>Close</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: color.white, padding: space.xl, gap: space.xxl },
  title: { fontFamily: font.title, fontSize: 22, lineHeight: 28, color: color.ink },
  btn: {
    height: 52,
    borderRadius: radius.pill,
    backgroundColor: color.forest,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnText: { fontFamily: font.label, fontSize: 16, color: color.white },
});
