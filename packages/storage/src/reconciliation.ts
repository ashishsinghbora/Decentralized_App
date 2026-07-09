export type SyncRecord<T> = {
  id: string;
  clientTimestamp: number;
  serverTimestamp?: number;
  value: T;
};

export const reconcileByNewest = <T>(records: SyncRecord<T>[]): SyncRecord<T>[] => {
  const grouped = new Map<string, SyncRecord<T>>();
  for (const record of records) {
    const existing = grouped.get(record.id);
    if (!existing) {
      grouped.set(record.id, record);
      continue;
    }
    const existingTime = existing.serverTimestamp ?? existing.clientTimestamp;
    const incomingTime = record.serverTimestamp ?? record.clientTimestamp;
    if (incomingTime >= existingTime) {
      grouped.set(record.id, record);
    }
  }
  return [...grouped.values()];
};
