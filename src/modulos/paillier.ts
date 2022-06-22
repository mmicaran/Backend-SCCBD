import * as paillierBigint from 'paillier-bigint'


export class paillierKeyPair {
    publicKey: paillierBigint.PublicKey
    privateKey: paillierBigint.PrivateKey

    constructor (pub:paillierBigint.PublicKey, priv: paillierBigint.PrivateKey ){
        this.publicKey = pub
        this.privateKey = priv

    }
}
  
export const generatePaillierKeys = async function (): Promise<paillierKeyPair> {

    const { publicKey, privateKey }   =  await paillierBigint.generateRandomKeys(3072)

    return new paillierKeyPair(publicKey, privateKey)


}
