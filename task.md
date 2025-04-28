task.md
2025-04-17
Node.js Takeaway Task: Router Management API
Objective: Develop a Node.js API that interacts with your home router to fetch information and manage
settings.
Task Overview
You will implement an API that performs the following actions on your home router:
. Fetch Router Status:
Create a GET endpoint /router/status that authenticates to the router, retrieves and
returns the following information in JSON format:
Model
Firmware Version
MAC Address
Serial Number
Uptime
Example JSON response:
{
"model": "RouterModel123",
"firmwareVersion": "1.0.0",
"macAddress": "AA:BB:CC:DD:EE:FF",
"serialNumber": "SN123456789",
"uptime": "48 hours"
}
. Manage Router Settings:
Implement the following POST endpoints to enable and disable specific router settings:
POST /router/settings/wifi/enable - Enable WiFi.
POST /router/settings/wifi/disable - Disable WiFi.
POST /router/settings/firewall/enable - Enable the firewall.
POST /router/settings/firewall/disable - Disable the firewall.
POST /router/settings/password/change - Change the password.
Each endpoint should return a JSON response indicating success or failure. Example response:
{
"success": true,
"message": "WiFi has been enabled."
}
1/2task.md
2025-04-17
Requirements
.
Inspect the above website, using browser and reconstruct the requests programatically to perform the operations
Use Express.js to build the REST API.
Ensure your API interacts directly with the real router (ensure you comply with any security
considerations).
Include proper error handling for network issues and invalid requests.
Maintain clean and organized code with clear naming conventions and comments.
Implement unit tests for both the router status retrieval and the settings management endpoints.
Update the README file with:
A description of your implementation.
Instructions for running and testing your application.
Sample requests and responses for both sets of endpoints.
Submission
Please send your completed project as a zip file or provide a link to a private GitHub repository. Ensure that
your code is well-organized and follows best practices for Node.js development.
Evaluation Criteria
Your submission will be evaluated based on:
Code quality and structure.
Clarity and completeness of implementation for both fetching and managing router settings.
Effective error handling.
Quality and coverage of tests.
Clarity and comprehensiveness of documentation.
This comprehensive task will help evaluate your ability to work with real-world applications, manage direct
API interactions, and ensure the quality of your Node.js code. Good luck!
2/2