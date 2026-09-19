import type { Play } from '../domain/model.js';
import type { PlayWriter, PlayReader } from '../domain/ports.js';
export function buildMemoryStore(): PlayWriter & PlayReader {
  const plays: Play[] = [];
  return {
    async save(play) { plays.push(structuredClone(play)); },
    async all() { return structuredClone(plays); },
  };
}
