import { openDB } from 'idb';

//Up the version [2 - 3] when I make overall db changes
export const dbPromise = openDB('graph-visualizer-db', 2, {
  upgrade(db) {
    if (!db.objectStoreNames.contains('activeDataset')) {
      db.createObjectStore('activeDataset');
    }
    if (!db.objectStoreNames.contains('datasets')) {
      db.createObjectStore('datasets');
    }
  },
});

const KEY = 'activeDatasetID';

export async function getActiveDatasetId() {
  const db = await dbPromise;
  return db.get('activeDataset', KEY);
}

export async function saveActiveDatasetId(id) {
  const db = await dbPromise;
  return db.put('activeDataset', id, KEY);
}

export async function deleteActiveDatasetId() {
  const db = await dbPromise;
  return db.delete('activeDataset', KEY);
}

export async function saveDataset(id, data) {
  const db = await dbPromise;
  return db.put('datasets', data, id);
}

export async function getDataset(id) {
  const db = await dbPromise;
  return db.get('datasets', id);
}

export async function updateDatasetName(id, newName) {
  const db = await dbPromise;
  const dataset = await db.get('datasets', id);
  if (dataset) {
    dataset.name = newName;
    return db.put('datasets', dataset, id);
  }
}
