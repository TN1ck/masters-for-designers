const STORAGE_KEY = "MASTERS_FOR_DESIGNERS_v1.0";

const loadFromLocalStorage = () => {
  const empty = {
    savedMasters: [],
  };
  if (typeof localStorage === "undefined") {
    return empty;
  }
  const text = localStorage.getItem(STORAGE_KEY);
  if (text !== null) {
    try {
      return JSON.parse(text);
    } catch {
      // delete entry but save it as corrupted, so one might be able to restore it
      console.error("File corrupted: will delete and save as corrupted.");
      localStorage.setItem(STORAGE_KEY + "_corrupted_" + new Date().toISOString, text);
      localStorage.removeItem(STORAGE_KEY);
      return empty;
    }
  }
  return empty;
};

let cached = loadFromLocalStorage();

export const saveMasters = savedMasters => {
  cached.savedMasters = savedMasters;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cached));
  } catch {
    console.error("LocalStorage is not supported! No Saving possible.");
  }
};

export const getSavedMasters = () => {
  return cached.savedMasters;
};
