import cookie from 'cookie';

const COOKIE_NAME = "presetPick";
const DAYS = 60 * 60 * 24 * 30;

const COOKIE_MAX_AGE = DAYS; // 30 days

const STORAGE_KEY = "pickedPresents";

export const savePickToCookie = (presetPick: string) => {
  cookie.serialize(COOKIE_NAME, presetPick, {
    path: "/",
    maxAge: COOKIE_MAX_AGE,
  });
};

export const getPickToCookie = () => {
  return cookie.parse(document.cookie)[COOKIE_NAME];
};

export const savePickToStorage = (presentId: string) => {
  const pickedPresents = getPicksFromStorage();
  if (!pickedPresents.includes(presentId)) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify([...pickedPresents, presentId]));
  }
};

export const removePickFromStorage = (presentId: string) => {
  const pickedPresents = getPicksFromStorage();
  const updatedPresents = pickedPresents.filter(id => id !== presentId);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedPresents));
};

export const getPicksFromStorage = (): string[] => {
  const stored = localStorage.getItem(STORAGE_KEY);
  return stored ? JSON.parse(stored) : [];
};

export const isPresentPicked = (presentId: string): boolean => {
  return getPicksFromStorage().includes(presentId);
};
