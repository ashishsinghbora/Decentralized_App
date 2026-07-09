export type DeviceTrust = "trusted" | "unverified" | "blocked";

export type EncryptedEnvelope = {
  ciphertext: string;
  senderKeyId: string;
  sessionId: string;
};

export interface SignalSessionAdapter {
  encrypt(plainText: string, recipientKeyId: string): Promise<EncryptedEnvelope>;
  decrypt(envelope: EncryptedEnvelope): Promise<string>;
  rotateSession(partnerDeviceKey: string): Promise<void>;
}

export interface MatrixSyncAdapter {
  publishEncrypted(roomId: string, envelope: EncryptedEnvelope): Promise<{ eventId: string }>;
  fetchEncryptedEvents(since?: string): Promise<{ nextBatch: string; events: EncryptedEnvelope[] }>;
}

export class MatrixSignalBridge {
  private syncToken?: string;

  constructor(
    private readonly matrix: MatrixSyncAdapter,
    private readonly signal: SignalSessionAdapter
  ) {}

  async sendSecureMessage(roomId: string, plainText: string, recipientKeyId: string): Promise<string> {
    const envelope = await this.signal.encrypt(plainText, recipientKeyId);
    const result = await this.matrix.publishEncrypted(roomId, envelope);
    return result.eventId;
  }

  async pullMessages(): Promise<string[]> {
    const sync = await this.matrix.fetchEncryptedEvents(this.syncToken);
    this.syncToken = sync.nextBatch;
    const decrypted: string[] = [];
    for (const event of sync.events) {
      decrypted.push(await this.signal.decrypt(event));
    }
    return decrypted;
  }
}
