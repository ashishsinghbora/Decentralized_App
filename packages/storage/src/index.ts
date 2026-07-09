import { createHash } from "node:crypto";

export type QueueItem<T> = {
  id: string;
  payload: T;
  retryCount: number;
  nextAttemptAt: number;
};

export class OfflineQueue<T> {
  private readonly queue: QueueItem<T>[] = [];

  enqueue(item: QueueItem<T>): void {
    this.queue.push(item);
  }

  pullReady(now = Date.now()): QueueItem<T> | undefined {
    const index = this.queue.findIndex((item) => item.nextAttemptAt <= now);
    if (index === -1) {
      return undefined;
    }
    return this.queue.splice(index, 1)[0];
  }

  scheduleRetry(item: QueueItem<T>, delayMs: number): void {
    this.enqueue({
      ...item,
      retryCount: item.retryCount + 1,
      nextAttemptAt: Date.now() + delayMs
    });
  }

  size(): number {
    return this.queue.length;
  }
}

export type StoredMedia = {
  cid: string;
  encrypted: Uint8Array;
};

export class IpfsMediaService {
  private readonly media = new Map<string, Uint8Array>();

  async put(encryptedData: Uint8Array): Promise<StoredMedia> {
    const cid = createHash("sha256").update(encryptedData).digest("hex");
    this.media.set(cid, encryptedData);
    return { cid, encrypted: encryptedData };
  }

  async get(cid: string): Promise<Uint8Array | null> {
    return this.media.get(cid) ?? null;
  }
}

export * from "./reconciliation.js";
