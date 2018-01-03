const axios = require('axios');
const { db } = require('./database/index.js');
const Promise = require('bluebird');
var AWS = require('aws-sdk');
const faker = require('faker');
const Consumer = require('sqs-consumer');
// Set the region
AWS.config.update({region: 'us-west-1'});
// axios.defaults.timeout =  100000;

// Create an SQS service object
var sqs = new AWS.SQS({apiVersion: '2012-11-05'});
let queueUrl = 'https://sqs.us-west-1.amazonaws.com/464657596304/playClick';

const sendSQS = () => {
  let playClickSQS = {
    DelaySeconds: 10,
    MessageAttributes: {
      user: {
        DataType: 'Number',
        StringValue: `${(Math.floor(Math.random() * (1000)) + 1)}`
      },
      song: {
        DataType: 'Number',
        StringValue: `${(Math.floor(Math.random() * (500)) + 1)}`
      },
      shuffle: {
        DataType: 'Number',
        StringValue: `${Math.round(Math.random())}`
      },
      skip: {
        DataType: 'Number',
        StringValue: `${Math.round(Math.random())}`
      },
      songLength: {
        DataType: 'Number',
        StringValue: `${((Math.floor((Math.random() * 3) + 1)) * 100)}`
      },
    },
    //MessageBody: 'INFORMATION KORY AND WILL, WILL BE SENDING ME',
    MessageBody: JSON.stringify({
      user: (Math.floor(Math.random() * (1000)) + 1),
      song: (Math.floor(Math.random() * (500)) + 1),
      shuffle: Math.round(Math.random()),
      skip: Math.round(Math.random()),
      songLength: (Math.floor((Math.random() * 3) + 1)) * 100
    }),
    QueueUrl: queueUrl
  };

  let querySQS = {
    DelaySeconds: 10,
    MessageAttributes: {
      user: {
        DataType: 'Number',
        StringValue: `${(Math.floor(Math.random() * (1000)) + 1)}`
      },
      query: {
        DataType: 'String',
        StringValue: `${(Math.floor(Math.random() * (500)) + 1)}`
      },
    },
    MessageBody: JSON.stringify({
      user: (Math.floor(Math.random() * (1000)) + 1),
      query: faker.internet.domainWord()
    }),
    QueueUrl: queueUrl
  };

  let songChunkSQS = {
    DelaySeconds: 10,
    MessageAttributes: {
      user: {
        DataType: 'Number',
        StringValue: `${(Math.floor(Math.random() * (1000)) + 1)}`
      },
      chunkLength: {
        DataType: 'String',
        StringValue: '10'
      },
    },
    MessageBody: JSON.stringify({
      user: (Math.floor(Math.random() * (1000)) + 1),
      chunkLength: 10
    }),
    QueueUrl: queueUrl
  };

  //GENERATING A RANDOM DIFFERENT SQS- WHAT IS ENGLISH
  let paramsArray = [playClickSQS, querySQS, songChunkSQS];
  let params = paramsArray[(Math.floor(Math.random() * (3)) + 1) - 1];
  //let params = playClickSQS;
  sqs.sendMessage(params, function(err, data) {
    if (err) {
      console.log('Error', err);
    } else {
      //console.log('Success', data.MessageId);
    }
  });
};

// const getSQS = () => {
//   var params = {
//     AttributeNames: [
//       'SentTimestamp'
//     ],
//     MaxNumberOfMessages: 1,
//     MessageAttributeNames: [
//       'All'
//     ],
//     QueueUrl: queueUrl,
//     VisibilityTimeout: 0,
//     WaitTimeSeconds: 0
//   };
//
//   sqs.receiveMessage(params, (error, data) => {
//     if (error) {
//       console.log('There is an error receiving Message from Event Queue');
//     } else if (data.Messages) {
//
//       /* THIS IS THE OBJECT THAT IS SENT BY STREAMING OR CLIENT */
//       let clickPlayObject = data.Messages[data.Messages.length - 1];
//       /*
//       //EXAMPLE OF WHAT IT LOOKS LIKE, MessageAttributes : OBJECT is the object properties set by sender
//       [ { MessageId: 'b20ac90c-394e-4109-beab-b815fbe9d466',
//              ReceiptHandle: 'AQEBjxF8WhYAfTRBLPAflkqe5vc63yNO23odoPf0lsStb1zCk8T5EklQ0TcJftp+sCf82NTFZRYZ1h5YdZOoXb/G3n4H8ywqMKORwr8BN2gL9yU61i+BLAl/B/IDsCrgCUShXMCViDW5HPj8+2h07cWcmK6GRZ5QdZwB2QL4ZYsQxA5hud0GonbyFoC8Jc986JaKSbYfWEECGMOfkP68Tkmd49sXTMZ68d1q1i8379pfpSt7HFXFIwVqCnWNuh/Uts1IeavW0ZgFbf6QOlHRt7YScz5CRxHDgni6oPwCvRVI//s0g7BPPVkl5se498DbFY4ILrYSsgrB89OK1KthjmyRZOeppjesh8KhWpKZ/AqVmo7namlyyd0WnCMO3Yt8pHAlm3PiB51g8paUQZBsx9tmIg==',
//              MD5OfBody: 'bbdc5fdb8be7251f5c910905db994bab',
//              Body: 'Information about current NY Times fiction bestseller for week of 12/11/2016.',
//              Attributes: [Object],
//              MD5OfMessageAttributes: 'd25a6aea97eb8f585bfa92d314504a92',
//              MessageAttributes: [Object] } ]
//
//       */
//       //console.log(data);
//       //console.log(clickPlayObject,' EASAKESAKESAKESAKESEASAERK');
//       if (clickPlayObject.MessageAttributes.shuffle) {
//         //console.log('SAVE ME PLEASE');
//         console.log('GETTING INTO CLICKPLAY');
//         axios.post('http://localhost:3000/playClick', clickPlayObject.MessageAttributes)
//           .then(() => {
//             let deleteParams = {
//               QueueUrl: queueUrl,
//               ReceiptHandle: clickPlayObject.ReceiptHandle,
//             };
//             //console.log(deleteParams, "weflbihagyagpgpuerhgeiaugbpabgeapubgerguberaugbeapgbegrbegeuabigpeurb");
//             sqs.deleteMessage(deleteParams, (error, data) => {
//               if (error) {
//                 console.log('Event Queue error, couldn\'t be deleted');
//               } else {
//                 console.log('Event Queue successfully deleted');
//               }
//             });
//           })
//           .catch(error => {
//             console.log(error);
//           });
//       } else if (clickPlayObject.MessageAttributes.query) {
//         console.log('GETTING INTO QUERY');
//         axios.post('http://localhost:3000/searchQueries', clickPlayObject.MessageAttributes)
//           .then(() => {
//             let deleteParams = {
//               QueueUrl: queueUrl,
//               ReceiptHandle: clickPlayObject.ReceiptHandle,
//             };
//             sqs.deleteMessage(deleteParams, (error, data) => {
//               if (error) {
//                 console.log('Event Queue Query error, couldn\'t be deleted');
//               } else {
//                 console.log('Event Queue Query successfully deleted');
//               }
//             });
//           })
//           .catch(error => {
//             console.log(error);
//           });
//       } else if (clickPlayObject.MessageAttributes.chunkLength) {
//         console.log('GETTING INTO CHUNKS');
//         axios.post('http://localhost:3000/songChunks', clickPlayObject.MessageAttributes)
//           .then(() => {
//             let deleteParams = {
//               QueueUrl: queueUrl,
//               ReceiptHandle: clickPlayObject.ReceiptHandle,
//             };
//             sqs.deleteMessage(deleteParams, (error, data) => {
//               if (error) {
//                 console.log('Event Queue songChunks error, couldn\'t be deleted');
//               } else {
//                 console.log('Event Queue songChunks successfully deleted');
//               }
//             });
//           })
//           .catch(error => {
//             console.log(error);
//           });
//       } else {
//         console.log('error in GET');
//       }
//     }
//   });
// };

let i = 0;
const app = Consumer.create({
  queueUrl: queueUrl,
  batchSize: 20,
  handleMessage: (message, done) => {
    //console.log(JSON.parse(message.Body), 'THIS IS LINE 200');
    if ((JSON.parse(message.Body)).shuffle !== undefined) {
      // ++i;
      axios.post('http://localhost:3000/playClick', JSON.parse(message.Body))
        .then(() => {
          console.log(i);
          console.log('Finished clickPlay message');
          done();
        });
    } else if ((JSON.parse(message.Body)).query !== undefined) {
      // i++;
      axios.post('http://localhost:3000/searchQueries', JSON.parse(message.Body))
        .then(() => {
          console.log(i);
          console.log('Finished query message');
          done();
        });
    } else if ((JSON.parse(message.Body)).chunkLength !== undefined) {
      i++;
      axios.post('http://localhost:3000/songChunks', JSON.parse(message.Body))
        .then(() => {
          console.log(i);
          console.log('Finished songChunk Message');
          done();
        });
    } else {
      console.log('You got problems');
    }
  }
});
const fillQueue = () => {
  for (let i = 0; i < 3000; i++) {
    sendSQS();
    // setTimeout(getSQS, 3000);
  }
};

// getSQS();
// sendSQS();
app.on('error', (err) => {
  console.log(err.message);
});


// setInterval(function() {
//   app.start();
// }, 60 * 1000);
// const stopApp = () => {
//   app.stop();
// };

// const appStop = () => {
//   setTimeout(function() {
//     app.stop();
//   }, 3000);
// };

const everyFiveSeconds = () => {
  // const retrieveMessage = () => {
  app.start();
  setTimeout(() => {
    app.stop();
    console.log('stopped');
  }, 2000);
  //app.stop();
  //setInterval(everyFiveSeconds(), 5000);
  // };
};

everyFiveSeconds();
// fillQueue();
// app.start();
