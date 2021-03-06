## Classes

<dl>
<dt><a href="#Authentication">Authentication</a></dt>
<dd><p>Class for decrypting and verifying, or signing and encrypting content in an End to End DID Authentication format</p></dd>
<dt><a href="#Constants">Constants</a></dt>
<dd><p>Class containing constants used in Authentication.</p></dd>
<dt><a href="#RsaCryptoSuite">RsaCryptoSuite</a></dt>
<dd><p>Encrypter plugin for RsaSignature2018</p></dd>
<dt><a href="#RsaPrivateKey">RsaPrivateKey</a> ⇐ <code><a href="#PrivateKey">PrivateKey</a></code></dt>
<dd><p>Represents an Rsa private key</p></dd>
<dt><a href="#RsaPublicKey">RsaPublicKey</a> ⇐ <code>PublicKey</code></dt>
<dd><p>Represents an Rsa public key</p></dd>
<dt><a href="#CryptoFactory">CryptoFactory</a></dt>
<dd><p>Utility class to handle all CryptoSuite dependency injection</p></dd>
<dt><a href="#JoseToken">JoseToken</a></dt>
<dd><p>Base class for containing common operations for JWE and JWS tokens.
Not intended for creating instances of this class directly.</p></dd>
<dt><a href="#JweToken">JweToken</a></dt>
<dd><p>Class for performing JWE encryption operations.
This class hides the JOSE and crypto library dependencies to allow support for additional crypto algorithms.</p></dd>
<dt><a href="#JwsToken">JwsToken</a></dt>
<dd><p>Class for containing JWS token operations.
This class hides the JOSE and crypto library dependencies to allow support for additional crypto algorithms.</p></dd>
<dt><a href="#PrivateKey">PrivateKey</a></dt>
<dd><p>Represents a Private Key in JWK format.</p></dd>
<dt><a href="#KeyOperation">KeyOperation</a></dt>
<dd></dd>
<dt><a href="#Base64Url">Base64Url</a></dt>
<dd><p>Class for performing various Base64 URL operations.</p></dd>
</dl>

## Members

<dl>
<dt><a href="#RecommendedKeyType">RecommendedKeyType</a></dt>
<dd><p>JWA recommended KeyTypes to be implemented</p></dd>
<dt><a href="#RecommendedKeyType">RecommendedKeyType</a></dt>
<dd><p>JWK key operations</p></dd>
</dl>

<a name="Authentication"></a>

## Authentication
<p>Class for decrypting and verifying, or signing and encrypting content in an End to End DID Authentication format</p>

**Kind**: global class  

* [Authentication](#Authentication)
    * [new Authentication(options)](#new_Authentication_new)
    * [.getVerifiedRequest(request, accessTokenCheck)](#Authentication+getVerifiedRequest) ⇒
    * [.getAuthenticatedResponse(request, response)](#Authentication+getAuthenticatedResponse) ⇒
    * [.getAuthenticatedRequest(content, privateKey, recipient, accessToken)](#Authentication+getAuthenticatedRequest)
    * [.getPrivateKeyForJwe(jweToken)](#Authentication+getPrivateKeyForJwe) ⇒
    * [.getPublicKey(request)](#Authentication+getPublicKey) ⇒
    * [.getRequesterNonce(jwsToken)](#Authentication+getRequesterNonce) ⇒
    * [.signThenEncryptInternal(nonce, localKey, requesterkey, content)](#Authentication+signThenEncryptInternal) ⇒
    * [.issueNewAccessToken(subjectDid, nonce, issuerKey, requesterKey)](#Authentication+issueNewAccessToken) ⇒
    * [.createAccessToken(subjectDid, privateKey, validDurationInMinutes)](#Authentication+createAccessToken) ⇒
    * [.verifyJwt(publicKey, signedJwtString, expectedRequesterDid)](#Authentication+verifyJwt) ⇒

<a name="new_Authentication_new"></a>

### new Authentication(options)
<p>Authentication constructor</p>


| Param | Description |
| --- | --- |
| options | <p>Arguments to a constructor in a named object</p> |

<a name="Authentication+getVerifiedRequest"></a>

### authentication.getVerifiedRequest(request, accessTokenCheck) ⇒
<p>Given a JOSE Authenticated Request, will decrypt the request, resolve the requester's did, and validate the signature.</p>

**Kind**: instance method of [<code>Authentication</code>](#Authentication)  
**Returns**: <p>The content of the request as a VerifiedRequest, or a response containing an access token</p>  

| Param | Default | Description |
| --- | --- | --- |
| request |  | <p>The JOSE Authenticated Request to decrypt and validate</p> |
| accessTokenCheck | <code>true</code> | <p>Check the validity of the access token</p> |

<a name="Authentication+getAuthenticatedResponse"></a>

### authentication.getAuthenticatedResponse(request, response) ⇒
<p>Given the verified request, uses the same keys and metadata to sign and encrypt the response</p>

**Kind**: instance method of [<code>Authentication</code>](#Authentication)  
**Returns**: <p>An encrypted and signed form of the response</p>  

| Param | Description |
| --- | --- |
| request | <p>The original JOSE Verified Request request</p> |
| response | <p>The plaintext response to be signed and encrypted</p> |

<a name="Authentication+getAuthenticatedRequest"></a>

### authentication.getAuthenticatedRequest(content, privateKey, recipient, accessToken)
<p>Creates an encrypted and authenticated JOSE request</p>

**Kind**: instance method of [<code>Authentication</code>](#Authentication)  

| Param | Description |
| --- | --- |
| content | <p>the content of the request</p> |
| privateKey | <p>the private key to sign with</p> |
| recipient | <p>the DID the request is indended for</p> |
| accessToken | <p>an access token to be used with the other party</p> |

<a name="Authentication+getPrivateKeyForJwe"></a>

### authentication.getPrivateKeyForJwe(jweToken) ⇒
<p>Given a JWE, retrieves the PrivateKey to be used for decryption</p>

**Kind**: instance method of [<code>Authentication</code>](#Authentication)  
**Returns**: <p>The PrivateKey corresponding to the JWE's encryption</p>  

| Param | Description |
| --- | --- |
| jweToken | <p>The JWE to inspect</p> |

<a name="Authentication+getPublicKey"></a>

### authentication.getPublicKey(request) ⇒
<p>Retrieves the PublicKey used to sign a JWS</p>

**Kind**: instance method of [<code>Authentication</code>](#Authentication)  
**Returns**: <p>The PublicKey the JWS used for signing</p>  

| Param | Description |
| --- | --- |
| request | <p>the JWE string</p> |

<a name="Authentication+getRequesterNonce"></a>

### authentication.getRequesterNonce(jwsToken) ⇒
<p>Retrieves the nonce from the JWS</p>

**Kind**: instance method of [<code>Authentication</code>](#Authentication)  
**Returns**: <p>The nonce</p>  

| Param | Description |
| --- | --- |
| jwsToken | <p>The JWS containing the nonce</p> |

<a name="Authentication+signThenEncryptInternal"></a>

### authentication.signThenEncryptInternal(nonce, localKey, requesterkey, content) ⇒
<p>Forms a JWS using the local private key and content, then wraps in JWE using the requesterKey and nonce.</p>

**Kind**: instance method of [<code>Authentication</code>](#Authentication)  
**Returns**: <p>An encrypted and signed form of the content</p>  

| Param | Description |
| --- | --- |
| nonce | <p>Nonce to be included in the response</p> |
| localKey | <p>PrivateKey in which to sign the response</p> |
| requesterkey | <p>PublicKey in which to encrypt the response</p> |
| content | <p>The content to be signed and encrypted</p> |

<a name="Authentication+issueNewAccessToken"></a>

### authentication.issueNewAccessToken(subjectDid, nonce, issuerKey, requesterKey) ⇒
<p>Creates a new access token and wrap it in a JWE/JWS pair.</p>

**Kind**: instance method of [<code>Authentication</code>](#Authentication)  
**Returns**: <p>A new access token</p>  

| Param | Description |
| --- | --- |
| subjectDid | <p>the DID this access token is issue to</p> |
| nonce | <p>the nonce used in the original request</p> |
| issuerKey | <p>the key used in the original request</p> |
| requesterKey | <p>the requesters key to encrypt the response with</p> |

<a name="Authentication+createAccessToken"></a>

### authentication.createAccessToken(subjectDid, privateKey, validDurationInMinutes) ⇒
<p>Creates an access token for the subjectDid using the privateKey for the validDurationInMinutes</p>

**Kind**: instance method of [<code>Authentication</code>](#Authentication)  
**Returns**: <p>Signed JWT in compact serialized format.</p>  

| Param | Description |
| --- | --- |
| subjectDid | <p>The did this access token is issued to</p> |
| privateKey | <p>The private key used to generate this access token</p> |
| validDurationInMinutes | <p>The duration this token is valid for, in minutes</p> |

<a name="Authentication+verifyJwt"></a>

### authentication.verifyJwt(publicKey, signedJwtString, expectedRequesterDid) ⇒
<p>Verifies:</p>
<ol>
<li>JWT signature.</li>
<li>Token's subject matches the given requeter DID.</li>
<li>Token is not expired.</li>
</ol>

**Kind**: instance method of [<code>Authentication</code>](#Authentication)  
**Returns**: <p>true if token passes all validation, false otherwise.</p>  

| Param | Description |
| --- | --- |
| publicKey | <p>Public key used to verify the given JWT in JWK JSON object format.</p> |
| signedJwtString | <p>The signed-JWT string.</p> |
| expectedRequesterDid | <p>Expected requester ID in the 'sub' field of the JWT payload.</p> |

<a name="Constants"></a>

## Constants
<p>Class containing constants used in Authentication.</p>

**Kind**: global class  
<a name="RsaCryptoSuite"></a>

## RsaCryptoSuite
<p>Encrypter plugin for RsaSignature2018</p>

**Kind**: global class  

* [RsaCryptoSuite](#RsaCryptoSuite)
    * [.verifySignatureRs256()](#RsaCryptoSuite.verifySignatureRs256) ⇒
    * [.signRs256(jwsHeaderParameters)](#RsaCryptoSuite.signRs256) ⇒
    * [.verifySignatureRs512()](#RsaCryptoSuite.verifySignatureRs512) ⇒
    * [.signRs512(jwsHeaderParameters)](#RsaCryptoSuite.signRs512) ⇒
    * [.encryptRsaOaep()](#RsaCryptoSuite.encryptRsaOaep)
    * [.decryptRsaOaep()](#RsaCryptoSuite.decryptRsaOaep)

<a name="RsaCryptoSuite.verifySignatureRs256"></a>

### RsaCryptoSuite.verifySignatureRs256() ⇒
<p>Verifies the given signed content using RS256 algorithm.</p>

**Kind**: static method of [<code>RsaCryptoSuite</code>](#RsaCryptoSuite)  
**Returns**: <p>true if passed signature verification, false otherwise.</p>  
<a name="RsaCryptoSuite.signRs256"></a>

### RsaCryptoSuite.signRs256(jwsHeaderParameters) ⇒
<p>Sign the given content using the given private key in JWK format using algorithm RS256.
TODO: rewrite to get rid of node-jose dependency.</p>

**Kind**: static method of [<code>RsaCryptoSuite</code>](#RsaCryptoSuite)  
**Returns**: <p>Signed payload in compact JWS format.</p>  

| Param | Description |
| --- | --- |
| jwsHeaderParameters | <p>Header parameters in addition to 'alg' and 'kid' to be included in the JWS.</p> |

<a name="RsaCryptoSuite.verifySignatureRs512"></a>

### RsaCryptoSuite.verifySignatureRs512() ⇒
<p>Verifies the given signed content using RS512 algorithm.</p>

**Kind**: static method of [<code>RsaCryptoSuite</code>](#RsaCryptoSuite)  
**Returns**: <p>true if passed signature verification, false otherwise.</p>  
<a name="RsaCryptoSuite.signRs512"></a>

### RsaCryptoSuite.signRs512(jwsHeaderParameters) ⇒
<p>Sign the given content using the given private key in JWK format using algorithm RS512.
TODO: rewrite to get rid of node-jose dependency.</p>

**Kind**: static method of [<code>RsaCryptoSuite</code>](#RsaCryptoSuite)  
**Returns**: <p>Signed payload in compact JWS format.</p>  

| Param | Description |
| --- | --- |
| jwsHeaderParameters | <p>Header parameters in addition to 'alg' and 'kid' to be included in the JWS.</p> |

<a name="RsaCryptoSuite.encryptRsaOaep"></a>

### RsaCryptoSuite.encryptRsaOaep()
<p>Rsa-OAEP encrypts the given data using the given public key in JWK format.</p>

**Kind**: static method of [<code>RsaCryptoSuite</code>](#RsaCryptoSuite)  
<a name="RsaCryptoSuite.decryptRsaOaep"></a>

### RsaCryptoSuite.decryptRsaOaep()
<p>Rsa-OAEP decrypts the given data using the given private key in JWK format.
TODO: correctly implement this after getting rid of node-jose dependency.</p>

**Kind**: static method of [<code>RsaCryptoSuite</code>](#RsaCryptoSuite)  
<a name="RsaPrivateKey"></a>

## RsaPrivateKey ⇐ [<code>PrivateKey</code>](#PrivateKey)
<p>Represents an Rsa private key</p>

**Kind**: global class  
**Extends**: [<code>PrivateKey</code>](#PrivateKey)  

* [RsaPrivateKey](#RsaPrivateKey) ⇐ [<code>PrivateKey</code>](#PrivateKey)
    * [new RsaPrivateKey(key)](#new_RsaPrivateKey_new)
    * [.wrapJwk(kid, jwk)](#RsaPrivateKey.wrapJwk)
    * [.generatePrivateKey(kid)](#RsaPrivateKey.generatePrivateKey)

<a name="new_RsaPrivateKey_new"></a>

### new RsaPrivateKey(key)
<p>Constructs a private key given a Did Document public key object containing additional private key
information</p>


| Param | Description |
| --- | --- |
| key | <p>public key object with additional private key information</p> |

<a name="RsaPrivateKey.wrapJwk"></a>

### RsaPrivateKey.wrapJwk(kid, jwk)
<p>Wraps a rsa private key in jwk format into a Did Document public key object with additonal information</p>

**Kind**: static method of [<code>RsaPrivateKey</code>](#RsaPrivateKey)  

| Param | Description |
| --- | --- |
| kid | <p>Key ID</p> |
| jwk | <p>JWK of the private key</p> |

<a name="RsaPrivateKey.generatePrivateKey"></a>

### RsaPrivateKey.generatePrivateKey(kid)
<p>Generates a new private key</p>

**Kind**: static method of [<code>RsaPrivateKey</code>](#RsaPrivateKey)  

| Param | Description |
| --- | --- |
| kid | <p>Key ID</p> |

<a name="RsaPublicKey"></a>

## RsaPublicKey ⇐ <code>PublicKey</code>
<p>Represents an Rsa public key</p>

**Kind**: global class  
**Extends**: <code>PublicKey</code>  
<a name="new_RsaPublicKey_new"></a>

### new RsaPublicKey(n, e)
<p>A Rsa JWK</p>


| Param | Description |
| --- | --- |
| n | <p>The Rsa modulus in Base64urlUInt encoding as specified by RFC7518 6.3.1.1</p> |
| e | <p>The Rsa public exponent in Base64urlUInt encoding as specified by RFC7518 6.3.1.2</p> |

<a name="CryptoFactory"></a>

## CryptoFactory
<p>Utility class to handle all CryptoSuite dependency injection</p>

**Kind**: global class  

* [CryptoFactory](#CryptoFactory)
    * [new CryptoFactory(suites)](#new_CryptoFactory_new)
    * [.constructJwe(content)](#CryptoFactory+constructJwe)
    * [.constructJws(content)](#CryptoFactory+constructJws)
    * [.constructPublicKey(key)](#CryptoFactory+constructPublicKey) ⇒
    * [.getEncrypter(name)](#CryptoFactory+getEncrypter) ⇒
    * [.getSigner(name)](#CryptoFactory+getSigner) ⇒

<a name="new_CryptoFactory_new"></a>

### new CryptoFactory(suites)
<p>Constructs a new CryptoRegistry</p>


| Param | Description |
| --- | --- |
| suites | <p>The suites to use for dependency injeciton</p> |

<a name="CryptoFactory+constructJwe"></a>

### cryptoFactory.constructJwe(content)
<p>constructs the jwe to be encrypted or decrypted</p>

**Kind**: instance method of [<code>CryptoFactory</code>](#CryptoFactory)  

| Param | Description |
| --- | --- |
| content | <p>content for the JWE</p> |

<a name="CryptoFactory+constructJws"></a>

### cryptoFactory.constructJws(content)
<p>constructs the jws to be signed or verified</p>

**Kind**: instance method of [<code>CryptoFactory</code>](#CryptoFactory)  

| Param | Description |
| --- | --- |
| content | <p>content for the JWS</p> |

<a name="CryptoFactory+constructPublicKey"></a>

### cryptoFactory.constructPublicKey(key) ⇒
<p>given a public key object found on a Did Document, constructs a JWK public key
Converts Did Document public keys to [PublicKey](PublicKey) implementations, or throws</p>

**Kind**: instance method of [<code>CryptoFactory</code>](#CryptoFactory)  
**Returns**: <p>The same key as a [PublicKey](PublicKey)</p>  

| Param | Description |
| --- | --- |
| key | <p>publicKey object from a [DidDocument](DidDocument)</p> |

<a name="CryptoFactory+getEncrypter"></a>

### cryptoFactory.getEncrypter(name) ⇒
<p>Gets the Encrypter object given the encryption algorithm's name</p>

**Kind**: instance method of [<code>CryptoFactory</code>](#CryptoFactory)  
**Returns**: <p>The corresponding Encrypter, if any</p>  

| Param | Description |
| --- | --- |
| name | <p>The name of the algorithm</p> |

<a name="CryptoFactory+getSigner"></a>

### cryptoFactory.getSigner(name) ⇒
<p>Gets the Signer object given the signing algorithm's name</p>

**Kind**: instance method of [<code>CryptoFactory</code>](#CryptoFactory)  
**Returns**: <p>The corresponding Signer, if any</p>  

| Param | Description |
| --- | --- |
| name | <p>The name of the algorithm</p> |

<a name="JoseToken"></a>

## JoseToken
<p>Base class for containing common operations for JWE and JWS tokens.
Not intended for creating instances of this class directly.</p>

**Kind**: global class  

* [JoseToken](#JoseToken)
    * [new JoseToken()](#new_JoseToken_new)
    * [.getHeader()](#JoseToken+getHeader)

<a name="new_JoseToken_new"></a>

### new JoseToken()
<p>Constructor for JoseToken that takes in a compact-serialized token string.</p>

<a name="JoseToken+getHeader"></a>

### joseToken.getHeader()
<p>Gets the header as a JS object.</p>

**Kind**: instance method of [<code>JoseToken</code>](#JoseToken)  
<a name="JweToken"></a>

## JweToken
<p>Class for performing JWE encryption operations.
This class hides the JOSE and crypto library dependencies to allow support for additional crypto algorithms.</p>

**Kind**: global class  

* [JweToken](#JweToken)
    * [.encrypt()](#JweToken+encrypt) ⇒
    * [.encryptContentEncryptionKey(keyEncryptionAlgorithm, keyBuffer, jwk)](#JweToken+encryptContentEncryptionKey)
    * [.decrypt()](#JweToken+decrypt) ⇒

<a name="JweToken+encrypt"></a>

### jweToken.encrypt() ⇒
<p>Encrypts the given string in JWE compact serialized format using the given key in JWK JSON object format.
Content encryption algorithm is hardcoded to 'A128GCM'.</p>

**Kind**: instance method of [<code>JweToken</code>](#JweToken)  
**Returns**: <p>Encrypted Buffer in JWE compact serialized format.</p>  
<a name="JweToken+encryptContentEncryptionKey"></a>

### jweToken.encryptContentEncryptionKey(keyEncryptionAlgorithm, keyBuffer, jwk)
<p>Encrypts the given content encryption key using the specified algorithm and asymmetric public key.</p>

**Kind**: instance method of [<code>JweToken</code>](#JweToken)  

| Param | Description |
| --- | --- |
| keyEncryptionAlgorithm | <p>Asymmetric encryption algorithm to be used.</p> |
| keyBuffer | <p>The content encryption key to be encrypted.</p> |
| jwk | <p>The asymmetric public key used to encrypt the content encryption key.</p> |

<a name="JweToken+decrypt"></a>

### jweToken.decrypt() ⇒
<p>Decrypts the given JWE compact serialized string using the given key in JWK JSON object format.
TODO: implement decryption without node-jose dependency so we can use decryption algorithms from plugins.</p>

**Kind**: instance method of [<code>JweToken</code>](#JweToken)  
**Returns**: <p>Decrypted plaintext.</p>  
<a name="JwsToken"></a>

## JwsToken
<p>Class for containing JWS token operations.
This class hides the JOSE and crypto library dependencies to allow support for additional crypto algorithms.</p>

**Kind**: global class  

* [JwsToken](#JwsToken)
    * [.sign(jwsHeaderParameters)](#JwsToken+sign) ⇒
    * [.verifySignature()](#JwsToken+verifySignature) ⇒
    * [.getSignedContent()](#JwsToken+getSignedContent)
    * [.getPayload()](#JwsToken+getPayload)
    * [.getSignature()](#JwsToken+getSignature)

<a name="JwsToken+sign"></a>

### jwsToken.sign(jwsHeaderParameters) ⇒
<p>Sign the given content using the given private key in JWK format.</p>

**Kind**: instance method of [<code>JwsToken</code>](#JwsToken)  
**Returns**: <p>Signed payload in compact JWS format.</p>  

| Param | Description |
| --- | --- |
| jwsHeaderParameters | <p>Header parameters in addition to 'alg' and 'kid' to be included in the JWS.</p> |

<a name="JwsToken+verifySignature"></a>

### jwsToken.verifySignature() ⇒
<p>Verifies the given JWS compact serialized string using the given key in JWK object format.</p>

**Kind**: instance method of [<code>JwsToken</code>](#JwsToken)  
**Returns**: <p>The payload if signature is verified. Throws exception otherwise.</p>  
<a name="JwsToken+getSignedContent"></a>

### jwsToken.getSignedContent()
<p>Gets the signed content (i.e. '<header>.<payload>').</p>

**Kind**: instance method of [<code>JwsToken</code>](#JwsToken)  
<a name="JwsToken+getPayload"></a>

### jwsToken.getPayload()
<p>Gets the base64 URL decrypted payload.</p>

**Kind**: instance method of [<code>JwsToken</code>](#JwsToken)  
<a name="JwsToken+getSignature"></a>

### jwsToken.getSignature()
<p>Gets the signature string.</p>

**Kind**: instance method of [<code>JwsToken</code>](#JwsToken)  
<a name="PrivateKey"></a>

## *PrivateKey*
<p>Represents a Private Key in JWK format.</p>

**Kind**: global abstract class  
<a name="KeyOperation"></a>

## *KeyOperation*
**Kind**: global abstract class  
<a name="new_KeyOperation_new"></a>

### *new exports.KeyOperation()*
<p>Represents a Public Key in JWK format.</p>

<a name="Base64Url"></a>

## Base64Url
<p>Class for performing various Base64 URL operations.</p>

**Kind**: global class  

* [Base64Url](#Base64Url)
    * [.encode()](#Base64Url.encode)
    * [.decode()](#Base64Url.decode)
    * [.toBase64()](#Base64Url.toBase64)
    * [.fromBase64()](#Base64Url.fromBase64)

<a name="Base64Url.encode"></a>

### Base64Url.encode()
<p>Encodes the input string or Buffer into a Base64URL string.</p>

**Kind**: static method of [<code>Base64Url</code>](#Base64Url)  
<a name="Base64Url.decode"></a>

### Base64Url.decode()
<p>Decodes a Base64URL string.</p>

**Kind**: static method of [<code>Base64Url</code>](#Base64Url)  
<a name="Base64Url.toBase64"></a>

### Base64Url.toBase64()
<p>Converts a Base64URL string to a Base64 string.
TODO: Improve implementation perf.</p>

**Kind**: static method of [<code>Base64Url</code>](#Base64Url)  
<a name="Base64Url.fromBase64"></a>

### Base64Url.fromBase64()
<p>Converts a Base64 string to a Base64URL string.
TODO: Improve implementation perf.</p>

**Kind**: static method of [<code>Base64Url</code>](#Base64Url)  
<a name="RecommendedKeyType"></a>

## RecommendedKeyType
<p>JWA recommended KeyTypes to be implemented</p>

**Kind**: global variable  
<a name="RecommendedKeyType"></a>

## RecommendedKeyType
<p>JWK key operations</p>

**Kind**: global variable  
