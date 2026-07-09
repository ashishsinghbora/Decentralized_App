export type SupportedLocale = "en" | "hi" | "bn" | "ta";

type Dictionary = {
  appTitle: string;
  welcome: string;
  secureMessaging: string;
  anonymousId: string;
};

const dictionaries: Record<SupportedLocale, Dictionary> = {
  en: {
    appTitle: "Decentralized Chat",
    welcome: "Welcome",
    secureMessaging: "End-to-end encrypted messaging",
    anonymousId: "Anonymous ID ready"
  },
  hi: {
    appTitle: "विकेंद्रीकृत चैट",
    welcome: "स्वागत है",
    secureMessaging: "एंड-टू-एंड एन्क्रिप्टेड संदेश",
    anonymousId: "गुमनाम आईडी तैयार है"
  },
  bn: {
    appTitle: "বিকেন্দ্রীকৃত চ্যাট",
    welcome: "স্বাগতম",
    secureMessaging: "এন্ড-টু-এন্ড এনক্রিপ্টেড মেসেজিং",
    anonymousId: "বেনামি আইডি প্রস্তুত"
  },
  ta: {
    appTitle: "மையமற்ற அரட்டை",
    welcome: "வரவேற்கிறோம்",
    secureMessaging: "முற்றிலும் குறியாக்கப்பட்ட செய்தி",
    anonymousId: "அடையாளமற்ற ஐடி தயாராக உள்ளது"
  }
};

export const t = (locale: SupportedLocale, key: keyof Dictionary): string => {
  return dictionaries[locale][key];
};

export const supportedLocales: SupportedLocale[] = ["en", "hi", "bn", "ta"];
