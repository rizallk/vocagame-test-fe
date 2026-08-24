type GetLocalStorageParams = {
  key: string;
  initValue?: string | number | boolean;
};

const getLocalStorage = ({ key, initValue }: GetLocalStorageParams) => {
  const storedValue = localStorage.getItem(key);

  // Kasus 1: Nilai tidak ada di localStorage
  if (storedValue === null) {
    const value = initValue;
    localStorage.setItem(key, JSON.stringify(value));
    return value;
  }

  // Kasus 2: Nilai ada, coba parse
  try {
    return JSON.parse(storedValue);
  } catch (error) {
    // Kasus 3: Nilai ada tapi format JSON-nya rusak
    console.error(`Gagal parse '${key}' dari localStorage:`, error);
    const value = initValue;
    localStorage.setItem(key, JSON.stringify(value));
    return value;
  }
};

export { getLocalStorage };
