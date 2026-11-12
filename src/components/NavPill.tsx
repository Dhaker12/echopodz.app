import { Feather } from '@expo/vector-icons';
import { router } from 'expo-router';
import { Pressable, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { color } from '../theme/tokens';

const ICONS: Record<string, keyof typeof Feather.glyphMap> = {
  index: 'home',
  discover: 'compass',
  challenges: 'award',
  me: 'user',
};
const LABELS: Record<string, string> = {
  index: 'Feed',
  discover: 'Discover',
  challenges: 'Challenges',
  me: 'Me',
};

export function NavPill({ state, navigation }: any) {
  const insets = useSafeAreaInsets();
  const items: React.ReactNode[] = [];

  state.routes.forEach((route: any, i: number) => {
    if (i === 2) {
      items.push(
        <Pressable
          key="create"
          accessibilityRole="button"
          accessibilityLabel="Create an action"
          onPress={() => router.push('/create')}
          style={styles.plus}
        >
          <Feather name="plus" size={28} color={color.forest} />
        </Pressable>
      );
    }
    const focused = state.index === i;
    items.push(
      <Pressable
        key={route.key}
        accessibilityRole="button"
        accessibilityLabel={LABELS[route.name] ?? route.name}
        accessibilityState={{ selected: focused }}
        onPress={() => navigation.navigate(route.name)}
        style={styles.item}
      >
        <Feather
          name={ICONS[route.name] ?? 'circle'}
          size={24}
          color={focused ? color.lime : color.mint}
          style={{ opacity: focused ? 1 : 0.7 }}
        />
      </Pressable>
    );
  });

  return (
    <View pointerEvents="box-none" style={[styles.wrap, { bottom: Math.max(insets.bottom, 16) }]}>
      <View style={styles.pill}>{items}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { position: 'absolute', left: 20, right: 20 },
  pill: {
    height: 68,
    borderRadius: 34,
    backgroundColor: color.forest,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    shadowColor: color.forest,
    shadowOpacity: 0.12,
    shadowRadius: 24,
    shadowOffset: { width: 0, height: 8 },
    elevation: 8,
  },
  item: { width: 48, height: 48, alignItems: 'center', justifyContent: 'center' },
  plus: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: color.lime,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
