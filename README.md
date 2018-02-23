# kids-nodejs-bot

## Description
This is an exploratory fork of the [kids-nodejs-bot](https://github.com/GTC-Excelsior/kids-nodejs-bot) repository to accomplish the following:

- Integrate scores / feedback with Team tim h0rt0ns [Firebase dashboard](https://gift-the-code.firebaseapp.com/home)

- Pass custom payloads
  - Create custom payload containing score, selected answer, for Middleware to intercept. This eliminates need for Regex in `awardPoints()`.
  - UPDATE: This can't be accomplished with `imBack`. See:
    - https://github.com/Microsoft/BotBuilder/issues/3353
    - https://github.com/Microsoft/BotFramework-WebChat/issues/459 (WebChat embed)
    - https://www.npmjs.com/package/botframework-webchat-modified (WebChat embed)
    - Manually score in middleware (for now)

- Manage in session state:
  - Object with UUID
    - Username??
    - Date/timestamp
    - Scores for current session
    - When final question is answered, post entire object as data/payload to web server api endpoint

- Handle multiple scripts
  - List for user to select scenario to run
    - See https://docs.microsoft.com/en-us/bot-framework/nodejs/bot-builder-nodejs-dialog-prompt#promptschoice
  - Resources:
    - https://www.microsoft.com/developerblog/2017/01/21/orchestrating-multiple-bots-with-multilingual-support/
    - https://github.com/morsh/multilingual-uber-bot

- Other actions
  - Examine WebChat with chatbox ported into a webpage: https://github.com/Microsoft/BotFramework-WebChat/


## Stack
This version of AssessmentBot has been paired down, and really just relies on the Microsoft Botbuilder framework in node.js
