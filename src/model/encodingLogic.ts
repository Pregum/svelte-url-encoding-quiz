
/**
 * 指定した文字列をパーセントエンコーディングする関数
 * @param str - エンコードする文字列
 * @returns エンコード済みの文字列
 */
export function percentEncode(str: string): string {
  return encodeURIComponent(str);
}

/**
 * エンコードされた文字列を6文字ずつの配列に分割する関数
 * @param encodedStr - エンコード済みの文字列
 * @returns 6文字ごとに分割された文字列の配列
 */
export function splitIntoChunks(encodedStr: string, chunkSize: number = 6): string[] {
  const chunks: string[] = [];
  for (let i = 0; i < encodedStr.length; i += chunkSize) {
    chunks.push(encodedStr.slice(i, i + chunkSize));
  }
  return chunks;
}