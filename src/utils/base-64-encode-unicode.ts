export function base64EncodeUnicode(str: string): string {
  const toSolidBytes = (match: string, p1: string): string => {
    return String.fromCharCode(Number(`0x${p1}`))
  }

  return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, toSolidBytes))
}
