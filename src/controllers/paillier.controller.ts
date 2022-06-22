import crypto = require('crypto');
import { isConstructorDeclaration } from 'typescript';
import * as bc from 'bigint-conversion'
import * as paillier from 'paillier-bigint';
const got = require('got');

import {Request, Response } from 'express';

export async function getPublicKeyPaillier(req : Request, res : Response) 
{
  const { publicKey, privateKey } = await paillier.generateRandomKeys(3072)
  //console.log(publicKey)
  //console.log(privateKey)

  //Mensaje a cifrar
  var msg1 = bc.textToBigint("HOLA")
  //Cifrado normal
  const encrypt = publicKey.encrypt(msg1)

  const decrypt = privateKey.decrypt(encrypt)
  //console.log(decrypt)

  //Cifrado homomorfico
  const msg2 = bc.textToBigint("MUNDO")
  const encrypt2 = publicKey.encrypt(msg2)

  const encryptHomomorf = publicKey.addition(encrypt, encrypt2) 
    
  const decriptHomomorf = privateKey.decrypt(encryptHomomorf) // total = msg1 + msg2 --> msg1 = total - msg2

  var msg1decript = decriptHomomorf - msg2
  var msg2decript = decriptHomomorf - msg1

  return res.json({
    homomorficoEncript: bc.bigintToHex(encryptHomomorf),
    decryptNormal: bc.bigintToText(decrypt),
    decryptHomomorf1: bc.bigintToText(msg1decript),
    decryptHomomorf2: bc.bigintToText(msg2decript)

  })
}