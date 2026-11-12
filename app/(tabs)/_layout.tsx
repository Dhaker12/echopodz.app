import { Tabs } from 'expo-router';
import { NavPill } from '../../src/components/NavPill';

export default function TabsLayout() {
  return (
    <Tabs screenOptions={{ headerShown: false }} tabBar={(props) => <NavPill {...props} />}>
      <Tabs.Screen name="index" />
      <Tabs.Screen name="discover" />
      <Tabs.Screen name="challenges" />
      <Tabs.Screen name="me" />
    </Tabs>
  );
}
