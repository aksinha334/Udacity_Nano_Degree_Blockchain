Secure Digital Assets on a Private Blockchain

PROJECT SPECIFICATION : Build a Private Blockchain Notary Service

1. Blockchain ID validation routine

 a. CRITERIA : Web API POST endpoint to validate request with JSON response.
 a. MEETS SPECIFICATIONS : Use the URL for the endpoint: http://localhost:8000/requestValidation
    The request should contain:

    { "address":"19xaiMqayaNrn3x7AjV5cU4Mk5f5prRVpL" }
    The response should contain: walletAddress, requestTimeStamp, message and validationWindow. It must be returned in a JSON format:

    {
        "walletAddress": "19xaiMqayaNrn3x7AjV5cU4Mk5f5prRVpL",
        "requestTimeStamp": "1544451269",
        "message": "19xaiMqayaNrn3x7AjV5cU4Mk5f5prRVpL:1544451269:starRegistry",
        "validationWindow": 300
    }
    Message format = [walletAddress]:[timeStamp]:starRegistry

    The request must configure a limited validation window of five minutes.

    When re-submitting within validation window, the validation window should reduce until it expires.

 b. CRITERIA: Web API POST endpoint validates message signature with JSON response.

 b. MEETS SPECIFICATIONS:  Use the URL for the endpoint: http://localhost:8000/message-signature/validate
    The request should contain:

    {
    "address":"19xaiMqayaNrn3x7AjV5cU4Mk5f5prRVpL",
     "signature":"H8K4+1MvyJo9tcr2YN2KejwvX1oqneyCH+fsUL1z1WBdWmswB9bijeFfOfMqK68kQ5RO6ZxhomoXQG3fkLaBl+Q="
    }
    Verify that the time window of 5 minutes didn't expired.

    The endpoint response should look like:

    {
        "registerStar": true,
        "status": {
            "address": "19xaiMqayaNrn3x7AjV5cU4Mk5f5prRVpL",
            "requestTimeStamp": "1544454641",
            "message": "19xaiMqayaNrn3x7AjV5cU4Mk5f5prRVpL:1544454641:starRegistry",
            "validationWindow": 193,
            "messageSignature": true
        }
    }
    Upon validation, the user is granted access to register a single star.

2. Star registration Endpoint

CRITERIA : Web API POST endpoint with JSON response that submits the Star information to be saved in the Blockchain.
MEETS SPECIFICATIONS : Use the Url for the endpoint: http://localhost:8000/block
The request should contain:

{
    "address": "19xaiMqayaNrn3x7AjV5cU4Mk5f5prRVpL",
    "star": {
                "dec": "68° 52' 56.9",
                "ra": "16h 29m 1.0s",
                "story": "Found star using https://www.google.com/sky/"
            }
}
The Star object and properties are stored within the body of the block of your Blockchain Dataset.

Verify that the "address" that send the Star was validated in the previous steps, if not respond back with an error.

The response will look like:

{
    "hash": "8098c1d7f44f4513ba1e7e8ba9965e013520e3652e2db5a7d88e51d7b99c3cc8",
    "height": 1,
    "body": {
        "address": "19xaiMqayaNrn3x7AjV5cU4Mk5f5prRVpL",
        "star": {
            "ra": "16h 29m 1.0s",
            "dec": "68° 52' 56.9",
            "story": "466f756e642073746172207573696e672068747470733a2f2f7777772e676f6f676c652e636f6d2f736b792f"
        }
    },
    "time": "1544455399",
    "previousBlockHash": "639f8e4c4519759f489fc7da607054f50b212b7d8171e7717df244da2f7f2394"
}

3. Star Lookup

 a. CRITERIA : Get Star block by hash with JSON response.
 a. MEETS SPECIFICATIONS : Use the URL: http://localhost:8000/stars/hash:[HASH]

    The response includes entire star block contents along with the addition of star story decoded to ASCII.

    {
      "hash": "a59e9e399bc17c2db32a7a87379a8012f2c8e08dd661d7c0a6a4845d4f3ffb9f",
      "height": 1,
      "body": {
        "address": "142BDCeSGbXjWKaAnYXbMpZ6sbrSAo3DpZ",
        "star": {
          "ra": "16h 29m 1.0s",
          "dec": "-26° 29' 24.9",
          "story": "466f756e642073746172207573696e672068747470733a2f2f7777772e676f6f676c652e636f6d2f736b792f",
          "storyDecoded": "Found star using https://www.google.com/sky/"
        }
      },
      "time": "1532296234",
      "previousBlockHash": "49cce61ec3e6ae664514d5fa5722d86069cf981318fc303750ce66032d0acff3"
    }

 b. CRITERIA : Get Star block by wallet address (blockchain identity) with JSON response.
 b. MEETS SPECIFICATIONS : Use the URL: http://localhost:8000/stars/address:[ADDRESS]
    The response includes entire star block contents along with the addition of star story decoded to ASCII.

    This endpoint response contained a list of Stars because of one wallet address can be used to register multiple Stars.

    Response:

    [
      {
        "hash": "a59e9e399bc17c2db32a7a87379a8012f2c8e08dd661d7c0a6a4845d4f3ffb9f",
        "height": 1,
        "body": {
          "address": "142BDCeSGbXjWKaAnYXbMpZ6sbrSAo3DpZ",
          "star": {
            "ra": "16h 29m 1.0s",
            "dec": "-26° 29' 24.9",
            "story": "466f756e642073746172207573696e672068747470733a2f2f7777772e676f6f676c652e636f6d2f736b792f",
            "storyDecoded": "Found star using https://www.google.com/sky/"
          }
        },
        "time": "1532296234",
        "previousBlockHash": "49cce61ec3e6ae664514d5fa5722d86069cf981318fc303750ce66032d0acff3"
      },
      {
        "hash": "6ef99fc533b9725bf194c18bdf79065d64a971fa41b25f098ff4dff29ee531d0",
        "height": 2,
        "body": {
          "address": "142BDCeSGbXjWKaAnYXbMpZ6sbrSAo3DpZ",
          "star": {
            "ra": "17h 22m 13.1s",
            "dec": "-27° 14' 8.2",
            "story": "466f756e642073746172207573696e672068747470733a2f2f7777772e676f6f676c652e636f6d2f736b792f",
            "storyDecoded": "Found star using https://www.google.com/sky/"
          }
        },
        "time": "1532330848",
        "previousBlockHash": "a59e9e399bc17c2db32a7a87379a8012f2c8e08dd661d7c0a6a4845d4f3ffb9f"
      }
    ]

 c. CRITERIA : Get star block by star block height with JSON response.
 c. MEETS SPECIFICATIONS:  Use the URL:http://localhost:8000/block/[HEIGHT]
    The response includes entire star block contents along with the addition of star story decoded to ASCII.

    {
      "hash": "a59e9e399bc17c2db32a7a87379a8012f2c8e08dd661d7c0a6a4845d4f3ffb9f",
      "height": 1,
      "body": {
        "address": "142BDCeSGbXjWKaAnYXbMpZ6sbrSAo3DpZ",
        "star": {
          "ra": "16h 29m 1.0s",
          "dec": "-26° 29' 24.9",
          "story": "466f756e642073746172207573696e672068747470733a2f2f7777772e676f6f676c652e636f6d2f736b792f",
          "storyDecoded": "Found star using https://www.google.com/sky/"
        }
      },
      "time": "1532296234",
      "previousBlockHash": "49cce61ec3e6ae664514d5fa5722d86069cf981318fc303750ce66032d0acff3"
    }


Submission :
To successfully complete this project and meet the rubric criteria. You may submit your project as a archive file in zip format, or, with your github repository.
