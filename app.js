const restify = require('restify');
const builder = require('botbuilder');
require('dotenv').config();

//=========================================================
// Bot Setup
//=========================================================

// Setup Restify Server
const server = restify.createServer()
server.listen(process.env.port || process.env.PORT || 3978, (() => {
    console.log('%s listening to %s', server.name, server.url);
}));

// Create chat bot
const connector = new builder.ChatConnector({
    appId: process.env.MICROSOFT_APP_ID,
    appPassword: process.env.MICROSOFT_APP_PASSWORD
});

const bot = new builder.UniversalBot(connector)
server.post('/api/messages', connector.listen());

const scriptChoices = [
  "demo script 1",
  "demo script 2"
];

  // Send proactive messages on connection
bot.on('conversationUpdate', (message) => {
  if (message.membersAdded) {
    if (message.membersAdded[0].id == 'default-bot') {
        const initialProactiveMessage = new builder.Message()
            .address(message.address)
            .text("Welcome to the Kids Help Phone Assessment Bot!");
        bot.send(initialProactiveMessage);

        const secondProactiveMessage = new builder.Message()
              .address(message.address)
              .text("Type 'scripts' for a list of scripts to run");
          bot.send(secondProactiveMessage);
    }
  }
});

// Send script list
bot.dialog('/', ((session) => {
  var msg = new builder.Message(session)
  	.text("Please select a script to run:")
  	.suggestedActions(
  		builder.SuggestedActions.create(
  				session, [
  					builder.CardAction.imBack(session, "demo script 1", "demo script 1"),
  					builder.CardAction.imBack(session, "demo script 2", "demo script 2")
  				]
  			));
  session.send(msg);
})).triggerAction({ matches: /^scripts/i });


// Call createLibrary for all scripts
bot.library(require('./lib/demo1').createLibrary());
bot.library(require('./lib/demo2').createLibrary());
const awardPoints = require('./lib/scores');

// Middleware for logging scores
bot.use({
    receive: ((event, next) => {

      // // conditionally award points for each answer
      awardPoints(event.text);

      next();
    })
});
