const Botkit = require('botkit');


// dummy dataset
const resumes = [
  { name: "Comes from dataset", experience: "software development", skills:["Java", "Spring", "MySQL"] },
  { name: "Comes from dataset", experience: "software development", skills:["Python", "Node"]},
  { name: "Comes from dataset", experience: "software development", skills:["", "", ""] },
  { name: "Comes from dataset", experience: "software development" , skills:["", "", ""]},
  { name: "Comes from dataset", experience: "software development", skills:["", "", ""] },
  { name: "Comes from dataset", experience: "software development", skills:["", "", ""] },
];

const filteredResumes = resumes.filter((resume) => resume.experience.includes("software development"));

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