import { StatusBar } from "expo-status-bar";
import { useMemo, useState } from "react";
import { Pressable, SafeAreaView, StyleSheet, Text, View } from "react-native";
import { supportedLocales, t, type SupportedLocale } from "../../packages/localization/src";

export default function App() {
  const [locale, setLocale] = useState<SupportedLocale>("en");
  const labels = useMemo(
    () => ({
      title: t(locale, "appTitle"),
      welcome: t(locale, "welcome"),
      secureMessaging: t(locale, "secureMessaging"),
      anonymousId: t(locale, "anonymousId")
    }),
    [locale]
  );

  return (
    <SafeAreaView style={styles.root}>
      <View style={styles.container}>
        <Text style={styles.title}>{labels.title}</Text>
        <Text style={styles.text}>{labels.welcome}</Text>
        <Text style={styles.text}>{labels.secureMessaging}</Text>
        <Text style={styles.text}>{labels.anonymousId}</Text>
        <View style={styles.languageRow}>
          {supportedLocales.map((item) => (
            <Pressable
              key={item}
              onPress={() => setLocale(item)}
              style={[styles.languageButton, item === locale ? styles.languageButtonActive : null]}
            >
              <Text style={styles.languageButtonText}>{item.toUpperCase()}</Text>
            </Pressable>
          ))}
        </View>
        <StatusBar style="auto" />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "#0f172a"
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    paddingHorizontal: 24
  },
  title: {
    color: "#e2e8f0",
    fontSize: 26,
    fontWeight: "700"
  },
  text: {
    color: "#cbd5e1",
    fontSize: 15,
    textAlign: "center"
  },
  languageRow: {
    flexDirection: "row",
    gap: 8,
    marginTop: 12
  },
  languageButton: {
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 8,
    backgroundColor: "#1e293b"
  },
  languageButtonActive: {
    backgroundColor: "#2563eb"
  },
  languageButtonText: {
    color: "#e2e8f0",
    fontWeight: "600"
  }
});
