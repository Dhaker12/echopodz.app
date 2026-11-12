import { StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { color, font, space } from '../theme/tokens';

export function Screen({ title, children }: { title: string; children?: React.ReactNode }) {
  const insets = useSafeAreaInsets();
  return (
    <View style={[styles.root, { paddingTop: insets.top + space.lg }]}>
      <Text style={styles.title}>{title}</Text>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: color.mint, paddingHorizontal: space.xl },
  title: { fontFamily: font.display, fontSize: 32, lineHeight: 36, color: color.ink },
});
