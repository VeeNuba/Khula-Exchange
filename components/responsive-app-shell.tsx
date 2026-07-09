import React from "react";
import {
  Platform,
  StyleSheet,
  View,
  useWindowDimensions,
} from "react-native";

// The screens in this app were designed as fixed mobile-phone layouts.
// On native (iOS/Android) that's fine — the device viewport IS a phone.
// On web, though, the browser window can be any size, and without a
// constraint the layout used to just stretch edge-to-edge on wide
// desktop windows, which breaks the app's look when demoing/pitching it.
//
// ResponsiveAppShell keeps native behavior untouched, and on web:
//  - renders the app full-bleed on narrow (mobile-width) browsers
//  - renders the app inside a centered, scaled "phone frame" on wider
//    browsers/monitors, so it always looks intentional regardless of
//    window size.

const DESIGN_WIDTH = 430; // reference width the screens were designed at
const DESIGN_HEIGHT = 932;
const FRAME_MARGIN = 24; // breathing room around the frame on large screens

export function ResponsiveAppShell({ children }: { children: React.ReactNode }) {
  const { width, height } = useWindowDimensions();
  const isWeb = Platform.OS === "web";
  const shouldFrame = isWeb && width > DESIGN_WIDTH;

  if (!shouldFrame) {
    return <View style={styles.fullBleed}>{children}</View>;
  }

  const availableWidth = width - FRAME_MARGIN * 2;
  const availableHeight = height - FRAME_MARGIN * 2;
  const scale = Math.min(
    1,
    availableWidth / DESIGN_WIDTH,
    availableHeight / DESIGN_HEIGHT,
  );
  const frameWidth = DESIGN_WIDTH * scale;
  const frameHeight = DESIGN_HEIGHT * scale;

  return (
    <View style={styles.backdrop}>
      <View
        style={[
          styles.phoneFrame,
          { width: frameWidth, height: frameHeight },
        ]}
      >
        <View
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: DESIGN_WIDTH,
            height: DESIGN_HEIGHT,
            transform: [{ scale }],
            transformOrigin: "top left",
          }}
        >
          {children}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  fullBleed: { flex: 1 },
  backdrop: {
    flex: 1,
    backgroundColor: "#1c1c22",
    alignItems: "center",
    justifyContent: "center",
  },
  phoneFrame: {
    position: "relative",
    borderRadius: 44,
    overflow: "hidden",
    backgroundColor: "#ffffff",
    borderWidth: 10,
    borderColor: "#0a0a0c",
    ...Platform.select({
      web: {
        boxShadow: "0 30px 60px rgba(0,0,0,0.45)",
      },
      default: {
        shadowColor: "#000000",
        shadowOffset: { width: 0, height: 20 },
        shadowOpacity: 0.4,
        shadowRadius: 40,
        elevation: 20,
      },
    }),
  },
});
