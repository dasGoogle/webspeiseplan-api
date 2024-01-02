import { app } from "./app";
import { DataLogger } from "./datalogger/datalogger";

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
  const LOGGING_INTERVAL_HOURS = process.env.LOGGING_INTERVAL_HOURS;
  const LOGGING_PATH = process.env.LOGGING_PATH;
  if (LOGGING_INTERVAL_HOURS !== undefined) {
    if (LOGGING_PATH === undefined) {
      throw new Error(
        "LOGGING_PATH must be set if LOGGING_INTERVAL_HOURS is set"
      );
    }
    const loggingInterval = parseInt(LOGGING_INTERVAL_HOURS) * 60 * 60 * 1000;
    const logger = new DataLogger(loggingInterval, LOGGING_PATH);
    logger.start();
  }
});
