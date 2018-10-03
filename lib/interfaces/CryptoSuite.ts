import PublicKey from '../security/PublicKey';
import { DidPublicKey } from 'did-common-typescript';
import { PrivateKey } from '..';

/** A dictionary with the did document key type mapping to the public key constructor */
export type PublicKeyConstructors = {[didDocumentKeyType: string]: (keyData: DidPublicKey) => PublicKey};

/**
 * Interface for the Crypto Algorithms Plugins
 */
export default interface CryptoSuite {
 /**
  * Gets all of the Encrypter Algorithms from the plugin
  * @returns a dictionary with the name of the algorithm for encryption/decryption as the key
  */
  getEncrypters (): { [algorithm: string]: Encrypter };

 /**
  * Gets all of the Signer Algorithms from the plugin
  * @returns a dictionary with the name of the algorithm for sign and verify as the key
  */
  getSigners (): {[algorithm: string]: Signer };

  /**
   * Gets all of the {@link PublicKey} constructors
   * @returns a dictionary with the did document key type mapping to the public key constructor
   */
  getKeyConstructors (): PublicKeyConstructors;
}

/**
 * Interface for Encryption/Decryption
 */
export interface Encrypter {
  encrypt (data: Buffer, jwk: PublicKey): Buffer;

  decrypt (data: Buffer, jwk: PrivateKey): Buffer;
}

/**
 *  Interface for Signing/Signature Verification
 */
export interface Signer {
  sign (content: string, jwk: PrivateKey): Promise<string>;

  verify (signedContent: string, signature: string, jwk: PublicKey): boolean;
}