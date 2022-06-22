import * as bcu from 'bigint-crypto-utils'



export interface rsaKeyPair {
  publicKey: PublicKey
  privateKey: PrivateKey
}


export class PrivateKey {
  d: bigint
  n: bigint

  constructor (d: bigint, n: bigint) {
    this.d = d
    this.n = n
  }

  decrypt (c: bigint): bigint {
    return bcu.modPow(c, this.d, this.n)
  }

  sign (m: bigint ): bigint  {
    return bcu.modPow(m, this.d, this.n)
  }
}


export class PublicKey {
  e: bigint
  n: bigint

  constructor (e: bigint, n: bigint) {
    this.e = e
    this.n = n
  }

  encrypt (m: bigint): bigint {
    return bcu.modPow(m, this.e, this.n)
  }

  verify (c: bigint ): bigint {
    return bcu.modPow(c, this.e, this.n)
  }

  blind ( m : bigint, r : bigint) : bigint | undefined {
    const { g } = bcu.eGcd(r, this.n);
    if(g !== 1n) return undefined; 

    const blindMessage = bcu.modPow(m*(r**this.e),1n,this.n)
    return blindMessage

    
  }

  unblind ( b : bigint , r : bigint) : bigint {
    const inverse = bcu.modInv(r,this.n)

    let unblindFactor = bcu.modPow(b*inverse,1n,this.n)
    return unblindFactor
    
  }

}


export const generateKeys = async function (bitLength: number): Promise<rsaKeyPair> {
  const e = 65537n
  let p: bigint, q: bigint, n: bigint, phi: bigint
  do {
    p = await bcu.prime(bitLength / 2 + 1)
    q = await bcu.prime(bitLength / 2)
    n = p * q
    phi = (p - 1n) * (q - 1n)
  } while (bcu.bitLength(n) !== bitLength || (phi % e === 0n))

  const publicKey = new PublicKey(e, n)

  const d = bcu.modInv(e, phi)

  const privateKey = new PrivateKey(d, n)

  return {
    publicKey,
    privateKey
  }
}
