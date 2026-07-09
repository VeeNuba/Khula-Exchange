import { Stack } from 'expo-router';
import React from 'react';

// This app is a single self-routed screen (see app/(tabs)/index.tsx, which
// manages its own in-app navigation and its own custom bottom tab bar). The
// default Expo Router tab navigator — with its stock "Home" / "Explore"
// buttons — isn't part of that design, so it's removed here in favor of a
// plain, header-less stack that just renders the app.
export default function TabLayout() {
  return <Stack screenOptions={{ headerShown: false }} />;
}
