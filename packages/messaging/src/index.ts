export type ChatMessage = {
  id: string;
  roomId: string;
  senderDid: string;
  encryptedPayload: string;
  sentAt: string;
};

export interface MatrixGateway {
  send(roomId: string, encryptedPayload: string): Promise<{ eventId: string }>;
  sync(since?: string): Promise<{ nextBatch: string; events: ChatMessage[] }>;
}

export type SpamPolicy = {
  maxMessagesPerMinute: number;
};

export class RateLimiter {
  private readonly timestamps: number[] = [];

  constructor(private readonly policy: SpamPolicy) {}

  allow(now = Date.now()): boolean {
    const cutoff = now - 60_000;
    while (this.timestamps.length && this.timestamps[0] < cutoff) {
      this.timestamps.shift();
    }
    if (this.timestamps.length >= this.policy.maxMessagesPerMinute) {
      return false;
    }
    this.timestamps.push(now);
    return true;
  }
}

export class MessagingService {
  private syncToken?: string;

  constructor(
    private readonly matrixGateway: MatrixGateway,
    private readonly limiter = new RateLimiter({ maxMessagesPerMinute: 20 })
  ) {}

  async sendMessage(roomId: string, encryptedPayload: string): Promise<string> {
    if (!this.limiter.allow()) {
      throw new Error("Rate limit exceeded");
    }
    const response = await this.matrixGateway.send(roomId, encryptedPayload);
    return response.eventId;
  }

  async syncMessages(): Promise<ChatMessage[]> {
    const result = await this.matrixGateway.sync(this.syncToken);
    this.syncToken = result.nextBatch;
    return result.events;
  }
}

export * from "./matrixSignal.js";
