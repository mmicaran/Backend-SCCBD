import { Router } from "express";

import { keys ,decrypt ,sign, encrypt, verify } from '../controllers/rsa.controller'

import {getPublicKeyPaillier } from '../controllers/paillier.controller'

const router = Router()

//localhost:4000/

//Modulos que estan en librerias

//-----------------------//
//----------RSA----------//
//-----------------------//

//Estabecer conexión
//Envia la clave publica
router.get('/rsa/publickey', keys) //Pasar en hexa bigint-conversion

//Recibir un mensaje y descifrar y lo verificar
router.post('/rsa/decrypt', decrypt)

//Firma del servidor
router.post('/rsa/sign', sign)

//Prueva de cifrado
router.post('/rsa/encrypt', encrypt)

router.post('/rsa/verify', verify)


//----------------------------//
//----------PAILLIER----------//
//----------------------------//

router.get('/paillier/publickey', getPublicKeyPaillier)

export default router
