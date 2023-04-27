const crypto = require("crypto");

const TRIVIAL_PARTITION_KEY = "0";
const MAX_PARTITION_KEY_LENGTH = 256;

const hash = (data) => {
  return crypto.createHash("sha3-512").update(data).digest("hex");
};

const getCandidateFromEvent = (event) => {
  if (event.partitionKey) {
    return event.partitionKey;
  }
  return hash(JSON.stringify(event));
};

const stringifyCandidate = (candidate) => {
  return typeof candidate !== "string" ? JSON.stringify(candidate) : candidate;
};

const truncateCandidate = (candidate) => {
  return candidate.length > MAX_PARTITION_KEY_LENGTH
    ? hash(candidate)
    : candidate;
};

exports.deterministicPartitionKey = (event) => {
  if (!event) {
    return TRIVIAL_PARTITION_KEY;
  }

  let candidate = getCandidateFromEvent(event);
  candidate = stringifyCandidate(candidate);
  return truncateCandidate(candidate);
};
