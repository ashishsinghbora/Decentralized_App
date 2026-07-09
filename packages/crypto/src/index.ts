import { createHash, randomUUID } from "node:crypto";

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

const didFromSeed = (seed: string): string => {
  const digest = createHash("sha256").update(seed).digest("hex");
  return `did:key:z${digest.slice(0, 32)}`;
};

export const createAnonymousIdentity = (alias = "anon"): DidIdentity => {
  const seed = randomUUID();
  return {
    did: didFromSeed(seed),
    deviceId: randomUUID(),
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
  const nonce = randomUUID();
  const material = `${did}:${passphrase}:${nonce}:${plainJson}`;
  const payload = createHash("sha256").update(material).digest("hex");
  return { did, payload: `${nonce}.${payload}` };
};
