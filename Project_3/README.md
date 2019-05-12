Connect Private Blockchain to Front-End Client via APIs

PROJECT SPECIFICATION : RESTful Web API with Node.js Framework

1. Setup

CRITERIA : Node.js framework
MEETS SPECIFICATIONS : Project uses one of these 3 Node.js frameworks:
Hapi.js
Express.js
Sails.js

CRITERIA : API Service Port Configuration
MEETS SPECIFICATIONS : The project’s API service is configured to run on port 8000. The default URL should remain private facing using localhost for connectivity (example: http://localhost:8000).

2. Functionality

CRITERIA : GET Block Endpoint

MEETS SPECIFICATIONS : The web API contains a GET endpoint that responds to a request using a URL path with a block height parameter or properly handles an error if the height parameter is out of bounds.
The response for the endpoint provides a block object in JSON format.

URL: http://localhost:8000/block/0

Response:
{
"hash":"49cce61ec3e6ae664514d5fa5722d86069cf981318fc303750ce66032d0acff3",
"height":0,
"body":"First block in the chain - Genesis block",
"time":"1530311457",
"previousBlockHash":""
}

CRITERIA : POST Block Endpoint

MEETS SPECIFICATIONS : The web API contains a POST endpoint that allows posting a new block with the data payload option to add data to the block body. Block body should support a string of text.

URL: http://localhost:8000/block

{
      "body": "Testing block with test string data"
}
The response for the endpoint is a block object in JSON format.

CRITERIA : Errors

MEETS SPECIFICATIONS : Service responds with appropriate error responses when posting or getting contents.
A common error to watchout for - When posting to localhost:8000/block without any content on the payload, the service should not create a block. Be sure to validate if there is content in the block before creating and adding it to the chain.

3. Code Readability

CRITERIA : Project README.md

MEETS SPECIFICATIONS : Project contains an updated README.md to include instructions on the deployment of your project. The README.md must include the Node.js framework for your RESTful API along with its endpoints and options.

Updated README.md must include:

Node.js framework
Endpoint documentation


Submission
To successfully complete this project and meet the rubric criteria. You may submit your project as a archive file in zip format, or, with your github repository.
