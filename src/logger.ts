const stringify = (message: unknown) => {
  return typeof message === "string" ? message : JSON.stringify(message);
};
export const debug = (message: unknown) => {
  console.debug(`${new Date().toISOString()} [DEBUG] ${stringify(message)}`);
};
export const info = (message: unknown) => {
  console.info(`${new Date().toISOString()} [INFO] ${stringify(message)}`);
};

export const log = (message: unknown) => {
  console.log(`${new Date().toISOString()} [LOG] ${stringify(message)}`);
};

export const warn = (message: unknown) => {
  console.warn(`${new Date().toISOString()} [WARN] ${stringify(message)}`);
};

export const error = (message: unknown) => {
  console.error(`${new Date().toISOString()} [ERROR] ${stringify(message)}`);
};
