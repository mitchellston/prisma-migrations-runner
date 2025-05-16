import { createHash, type BinaryToTextEncoding } from "crypto";

export function generateChecksum(
  fileContents: string,
  algorithm: string = "md5",
  encoding: BinaryToTextEncoding = "hex"
) {
  return createHash(algorithm).update(fileContents, "utf8").digest(encoding);
}
