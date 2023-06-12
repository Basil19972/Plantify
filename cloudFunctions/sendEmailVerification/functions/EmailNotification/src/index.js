// Importing required libraries
const sdk = require("node-appwrite");
const nodemailer = require('nodemailer');
const moment = require('moment');

// Exports the main function
module.exports = async function (req, res) {
  // Initializing the Appwrite Client
  const client = new sdk.Client();
  // Initializing the Appwrite Database and User services
  const database = new sdk.Databases(client);
  const users = new sdk.Users(client);

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

  // Set up email transporter with nodemailer
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: req.variables['GOOGLE_MAIL'],
      pass: req.variables['GOOGLE_MAIL_APP_PASSWORD']
    }
  });

  // Initialize the response object
  const response = {
    userIteratedCount: 0,
    EmailSentCountSuccess: 0,
    EmailSentCountError: 0,
    documentsIteratedCount: 0,
    time_difference: null,
    maiMethodeerreicht: false
  };

  // Get the list of users from the Appwrite Users Service
  const userList = (await users.list()).users;

  // Iterate through each user in the list
  for (const user of userList) {
    response.userIteratedCount++;

    // Check if the user has email notifications turned on
    if (user.prefs.emailNotification == true) {
      // Create queries to select documents related to the current user, ordered by creation date descending, and limited to one result
      const query = sdk.Query.equal("userId", user.$id);
      const query2 = sdk.Query.orderDesc("$createdAt");
      const query3 = sdk.Query.limit(1);

      // Get the list of documents matching the queries from the Appwrite Database
      const documentList = (await database.listDocuments(
        req.variables['DATABASE_ID'],
        req.variables['COLLECTION_ID'],
        [query, query2, query3]
      )).documents;

      // Iterate through each document in the list
      await Promise.all(documentList.map(async (document) => {
        response.documentsIteratedCount++;
        // Calculate the difference in days between the document creation time and now
        const time_difference = moment().diff(moment(document.$createdAt), 'days');
        response.time_difference = time_difference;
        // If the document was created within the last day, send an email
        if (time_difference >= 7) {
          return await sendMail(user.email);
        } else {
          console.log("no mail");
          return null;
        }
      }));
    }
  }

  // Define the email sending function
  async function sendMail(mail) {
    response.maiMethodeerreicht = true;
    const mailOptions = {
      from: req.variables['GOOGLE_MAIL'],
      to: mail,
      subject: 'Reminder: Please water your plants',
      text: 'This email is automatlly generated. Please do not reply.',
      html: `<div style="background-color: #f6f6f6; padding: 20px;">
            <div style="max-width: 600px; margin: auto;">
                <h1 style="text-align: center; color: #323232;">Hello!</h1>
                <p style="font-size: 16px; color: #323232;">'We are <strong> dying of thirst!</strong> Please water us! Best regards, your plants'</p>
                <div style="text-align: center; margin: 30px 0;">
                    <a href="https://plantify-two.vercel.app/" style="background-color: #323232; color: #f6f6f6; text-decoration: none; padding: 15px 20px; border-radius: 5px;">Plantify</a>
                </div>
                <p style="font-size: 14px; color: #323232; text-align: center;">To stop receiving these notifications, please visit Plantify and turn off the Email Notification setting.</p>
            </div>
         </div>`
    };


    // Send the email and log the result
    await new Promise((resolve, reject) => transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        response.EmailSentCountError++;
        console.log(error);
        reject(error)
      } else {
        response.EmailSentCountSuccess++;
        console.log('Email sent: ' + info.response);
        resolve();
      }
    }));
  }

  // Send the response as a JSON object
  res.json({
    response,
  });
};
