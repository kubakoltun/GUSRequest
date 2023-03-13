# GUS-Request

This code is a Node.js script that uses the SOAP web service provided by the Polish government to retrieve information about a company based on its NIP (tax identification number).

The script sends SOAP requests to the web service to perform the following actions:

Authenticate the user with a provided API key using the "Zaloguj" method.
Retrieve information about the company with the provided NIP using the "DaneSzukajPodmioty" method.
Logout the user using the "Wyloguj" method.
The retrieved information about the company is stored in variables for later use.

The script uses the "request" package to make HTTP requests to the web service. The response body is parsed using string manipulation functions. The script is triggered by an event and returns the retrieved company information as a callback function.
