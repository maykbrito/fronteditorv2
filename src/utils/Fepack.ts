/*
  FrontEditor Pack
  By Bill Rocha <https://billrocha.com>
  Version: 1.0.0

  This is a simple tool to help you encrypt and decrypt your FrontEditor files.
  Feel free to use it and share it with your friends.
*/
import * as CryptoJS from 'crypto-js'
import { saveAs } from 'file-saver'

const keySize = 256
const ivSize = 128
const saltSize = 256
const iterations = 100
const fileExtension = '.fep'
export type dataType = {
  path: String
  data: Object
}

type tMessages = {
  prompt: string
  empty: string
  replace: string
  invalid: string
}

const messages: tMessages = {
  prompt: 'Type the password:',
  empty: 'Password is required!',
  replace:
    'Replace the content of this page?\n\n** Press "CANCEL" to load the new location.',
  invalid: "It's not a valid file!",
}

export function setMsgPrompt(value: string) {
  messages.prompt = value
}

export function setMsgEmpty(value: string) {
  messages.empty = value
}

export function setMsgReplace(value: string) {
  messages.replace = value
}

export function setMsgInvalid(value: string) {
  messages.invalid = value
}

export function getMessages() {
  return messages
}

// Load a file
export function loadFile(
  ext: string = fileExtension,
  callback: Function,
): void {
  const f = document.createElement('input')
  f.type = 'file'
  f.accept = ext
  f.click()

  f.onchange = async (e) => {
    e.preventDefault()
    const target = e.target as HTMLInputElement
    const files = target.files
    const file = files?.length ? files[0] : false

    if (!file) {
      f.remove()
      // eslint-disable-next-line n/no-callback-literal
      return callback(false)
    }
    // const content: string = await file.text()
    f.remove()

    callback(file)
  }
}

// Load a crypto file .fep
export function load(callback: Function): void {
  loadFile(fileExtension, async (file: any) => {
    // eslint-disable-next-line n/no-callback-literal
    if (!file) return callback(false)

    const content: string = await file.text()

    // Getting the user's password
    const pass: string = getUserPassword().toString()
    // eslint-disable-next-line n/no-callback-literal
    if (pass === '') return callback(false)

    // Trying to decrypt the file...
    let data: dataType
    try {
      data = JSON.parse(decrypt(content, pass))
    } catch (error) {
      // eslint-disable-next-line n/no-callback-literal
      return callback(false)
    }

    // Ask if the user wants to replace it's content
    const replace = confirm(messages.replace)

    return callback(
      undefined === data.path || undefined === data.data ? false : data,
      replace,
    )
  })
}

// Save encrypted file
export function save(data: dataType): any {
  // Getting the user's password
  const pass: string = getUserPassword().toString()
  if (pass === '') return false

  // Encrypting the file...
  const enc = encrypt(JSON.stringify(data), pass)

  // Formatting the filename...
  const path = data.path.replace(/^(\/)|(\/)$/g, '').replace(/\//g, '-')
  const date = new Date()
    .toJSON()
    .replace(/\..*/g, '')
    .replace('T', '')
    .replace(/\:|\-/g, '')
  const filename = `${path === '' ? 'fepack' : path}-${date}${fileExtension}`

  saveAs(
    window.URL.createObjectURL(new Blob([enc], { type: 'text/plain' })),
    filename,
  )
}

function getUserPassword(): string | boolean {
  // Getting the user's password
  const pass: string | null = prompt(messages.prompt, '')
  if (!pass) {
    alert(messages.empty)
    return ''
  }
  return pass
}

/**
 * AES - Encrypt
 * @param  String str  String data to be encrypted
 * @param  String pass Password
 * @return String      Base64 encoded string containing the encrypted data
 */
export function encrypt(str: string, pass: string) {
  const salt: any = CryptoJS.lib.WordArray.random(saltSize / 8)
  const iv: any = CryptoJS.lib.WordArray.random(ivSize / 8)

  return hexToBase64(
    salt +
      iv +
      base64ToHex(
        CryptoJS.AES.encrypt(str, AESKey(pass, salt), AESCfg(iv)).toString(),
      ),
  )
}

/**
 * AES - Decrypt
 * @param  String str  Base64 encoded string containing the encrypted data
 * @param  String pass Password
 * @return String      Result
 */
export function decrypt(str: string, pass: string) {
  const hexResult = base64ToHex(str)

  const x = CryptoJS.AES.decrypt(
    hexToBase64(hexResult.substring(96)),
    AESKey(pass, CryptoJS.enc.Hex.parse(hexResult.substring(0, 64))),
    AESCfg(CryptoJS.enc.Hex.parse(hexResult.substring(64, 96))),
  )
  const y = x.toString(CryptoJS.enc.Utf8)
  return y
}

// Helpers -------------------------------------------------------------
export function AESKey(pass: string, salt: any) {
  return CryptoJS.PBKDF2(pass, salt, {
    keySize: keySize / 32,
    iterations,
  })
}

export function AESCfg(iv: any) {
  return {
    iv,
    padding: CryptoJS.pad.Pkcs7,
    mode: CryptoJS.mode.CBC,
  }
}

export function hexToBase64(a: any) {
  return CryptoJS.enc.Hex.parse(a).toString(CryptoJS.enc.Base64)
}

export function base64ToHex(a: any) {
  return CryptoJS.enc.Base64.parse(a).toString(CryptoJS.enc.Hex)
}
