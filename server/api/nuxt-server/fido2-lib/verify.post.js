import { Base64 as base64Js } from 'js-base64';

import { getFido2Lib } from '@/utils/fido2-lib';

// https://webauthn-open-source.github.io/fido2-lib/index.html

export default defineEventHandler(async (event) => {
  const payload = await readBody(event);

  const f2l = getFido2Lib();

  const signature = base64Js.toUint8Array(payload.credential.response.signature).buffer

  const utf8Decoder = new TextDecoder('utf-8');
  const decodedClientData = utf8Decoder.decode(base64Js.toUint8Array(
    payload.credential.response.clientDataJSON
  ));
  const clientDataObj = JSON.parse(decodedClientData);
  clientDataObj.factor = 'first';
  clientDataObj.publicKey = base64Js.decode(payload.base64URLServerSaveData.credentialPublicKeyPem);
  // clientDataObj.prevCounter = signature.byteLength;
  // clientDataObj.prevCounter = 0;
  clientDataObj.prevCounter = payload.base64URLServerSaveData.counter;
  clientDataObj.userHandle = base64Js.toUint8Array(payload.userId);
  console.log({ clientDataObj });

  const assertionResult = await f2l.assertionResult({
    ...payload.credential,
    rawId: base64Js.toUint8Array(payload.credential.rawId).buffer,
    response: {
      ...payload.credential.response,
      authenticatorData: base64Js.toUint8Array(payload.credential.response.authenticatorData).buffer,
      clientDataJSON: base64Js.toUint8Array(payload.credential.response.clientDataJSON).buffer,
      signature,
      userHandle: base64Js.toUint8Array(payload.credential.response.userHandle).buffer,
    }
  }, clientDataObj);
  console.log({ assertionResult });

  // 無回傳值，無效直接拋出例外
  await assertionResult.validate();

  return {
    ...payload,
    assertionResult
    // base64URLServerSaveDataCredentialPublicKeyPem,
    // decodeClientDataObj: clientDataObj,
    // success: true,
    // userHandle: credential.userHandle
  };
});