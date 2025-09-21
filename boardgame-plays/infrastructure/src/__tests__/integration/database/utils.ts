import fs from "fs";
import path from "path";

export const getExistingPathFromRootDirectory = (fileName: string) => {
  const filePath = path.join(__dirname, "../../../../../../", fileName);
  const absolutePath = path.resolve(filePath);

  if (!fs.existsSync(absolutePath)) {
    throw new Error(`File path located at ${absolutePath} does not exists`);
  }

  return absolutePath;
};

export const sleep = (ms: number) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

export function eventually<
  D,
  R extends { kind: "not-good" } | { kind: "good"; data: D },
>(
  expectation: () => Promise<R>,
  timeoutInMs = 5000,
  interval = 100
): Promise<D> {
  let timeoutReached = false;
  setTimeout(() => {
    timeoutReached = true;
  }, timeoutInMs);

  return eventuallyInner(expectation, () => timeoutReached, interval);
}

async function eventuallyInner<
  D,
  R extends { kind: "not-good" } | { kind: "good"; data: D },
>(
  expectation: () => Promise<R>,
  timeoutReached: () => boolean,
  interval: number,
  errors: Error[] = []
): Promise<D> {
  try {
    const result = await expectation();

    if (result.kind === "not-good") {
      throw new Error("not-good");
    }

    return result.data;
  } catch (e) {
    if (timeoutReached()) {
      throw new Error(
        `Timeout reached: ${e}\n\n${errors
          .slice(-3)
          .map((error) => `${error.toString()}\n${error.stack}`)
          .join("\n\n")}`
      );
    }
    errors.push(e as Error);
    return new Promise((resolve) => {
      setTimeout(
        () =>
          resolve(
            eventuallyInner(expectation, timeoutReached, interval, errors)
          ),
        interval
      );
    });
  }
}
