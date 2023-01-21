const Botkit = require('botkit');


// dummy dataset
const {candidates} = require('./dataset.json')

const filteredResumes = candidates.filter(people => people.applied_for === 'SDE' && people.qualification === "Graduate")

const controller = Botkit.slackbot({
  debug: false
});



controller.spawn({
  token: 'YOUR_SLACK_BOT_TOKEN',
}).startRTM();

controller.hears(['hi', 'hello', 'start'], 'direct_message,direct_mention,mention', (bot, message) => {
  bot.startConversation(message, (err, convo) => {
    filteredResumes.forEach((resume) => {
      convo.ask(`${resume.name}, What experience do you have in software development?`, (response, convo) => {
        convo.ask(`What specific programming languages are you proficient in?`, (response, convo) => {
          convo.ask(`What projects have you worked on in the past?`, (response, convo) => {
            convo.next();
          });
        });
      });
    });
  });
});