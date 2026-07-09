export type DidIdentity = {
  did: string;
  deviceId: string;
  recoveryHint: string;
};

export interface KeyStore {
  setSecret(key: string, value: string): Promise<void>;
  getSecret(key: string): Promise<string | null>;
}

export class InMemoryKeyStore implements KeyStore {
  private readonly store = new Map<string, string>();

  async setSecret(key: string, value: string): Promise<void> {
    this.store.set(key, value);
  }

  async getSecret(key: string): Promise<string | null> {
    return this.store.get(key) ?? null;
  }
}

const randomUUIDCompat = (): string => {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return crypto.randomUUID();
  }
  const random = Math.random().toString(16).slice(2);
  const timestamp = Date.now().toString(16);
  return `${timestamp}-${random}`;
};

const digestLite = (value: string): string => {
  let hash = 2166136261;
  for (let index = 0; index < value.length; index += 1) {
    hash ^= value.charCodeAt(index);
    hash +=
      (hash << 1) +
      (hash << 4) +
      (hash << 7) +
      (hash << 8) +
      (hash << 24);
  }
  return (hash >>> 0).toString(16).padStart(8, "0");
};

const didFromSeed = (seed: string): string => {
  const digest = digestLite(seed.repeat(4));
  return `did:key:z${digest.slice(0, 32)}`;
};

export const createAnonymousIdentity = (alias = "anon"): DidIdentity => {
  const seed = randomUUIDCompat();
  return {
    did: didFromSeed(seed),
    deviceId: randomUUIDCompat(),
    recoveryHint: `${alias}-${seed.slice(0, 8)}`
  };
};

export const storeDeviceSecret = async (
  keyStore: KeyStore,
  did: string,
  secret: string
): Promise<void> => {
  const key = `device-secret:${did}`;
  await keyStore.setSecret(key, secret);
};

export type EncryptedBackup = {
  did: string;
  payload: string;
};

export const buildEncryptedBackup = (did: string, plainJson: string, passphrase: string): EncryptedBackup => {
  const nonce = randomUUIDCompat();
  const material = `${did}:${passphrase}:${nonce}:${plainJson}`;
  const payload = digestLite(material.repeat(2));
  return { did, payload: `${nonce}.${payload}` };
};
