// Importing required libraries
const sdk = require("node-appwrite");
const moment = require('moment');

// Exports the main function
module.exports = async function (req, res) {
  // Initializing the Appwrite Client
  const client = new sdk.Client();
  // Initializing the Appwrite Database Service
  const database = new sdk.Databases(client);

  // Check if the necessary environment variables are set
  if (
    !req.variables['APPWRITE_FUNCTION_ENDPOINT'] ||
    !req.variables['APPWRITE_FUNCTION_API_KEY']
  ) {
    // Print a warning if the environment variables are not set
    console.warn("Environment variables are not set. Function cannot use Appwrite SDK.");
  } else {
    // If environment variables are set, use them to set up the Appwrite Client
    client
      .setEndpoint(req.variables['APPWRITE_FUNCTION_ENDPOINT'])
      .setProject(req.variables['APPWRITE_FUNCTION_PROJECT_ID'])
      .setKey(req.variables['APPWRITE_FUNCTION_API_KEY'])
      .setSelfSigned(true);
  }

  // Initialize the response object
  const response = {
    userIteratedCount: 0,
    documentsIteratedCount: 0,
    documentDeletedCount: 0,
  };

  // Create a query to limit the document results to 100
  const query = sdk.Query.limit(100);

  // Get the list of documents from the Appwrite Database
  const documentList = (await database.listDocuments(
    req.variables['DATABASE_ID'],
    req.variables['COLLECTION_ID'],
    [query]
  )).documents;

  // Iterate through each document in the list
  await Promise.all(documentList.map(async (document) => {
    // Increment the count of iterated documents
    response.documentsIteratedCount++;

    // Calculate the difference in months between the document creation time and now
    const time_difference = moment().diff(moment(document.$createdAt), 'months');

    // If the document was created six or more months ago (difference is 6 or greater), delete it
    if (time_difference >= 6) {

      // Delete the document
      const deleteRes = (await database.deleteDocument(
        req.variables['DATABASE_ID'],
        req.variables['COLLECTION_ID'],
        document.$id));
      // Increment the count of deleted documents
      response.documentDeletedCount++;
    } else {
      console.log("no deleted");
    }
  }));

  // Send the response as a JSON object
  res.json({
    response
  });
};
