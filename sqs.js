// Load the SDK for JavaScript
var AWS = require('aws-sdk');
// Set the region
AWS.config.update({region: 'us-west-2'});

// Create an SQS service object
var sqs = new AWS.SQS({apiVersion: '2012-11-05'});

const sendSQS = () => {
  var params = {
    DelaySeconds: 10,
    MessageAttributes: {
      'Title': {
        DataType: 'String',
        StringValue: 'The Whistler'
      },
      'Author': {
        DataType: 'String',
        StringValue: 'John Grisham'
      },
      'WeeksOn': {
        DataType: 'Number',
        StringValue: '6'
      }
    },
    MessageBody: 'Information about current NY Times fiction bestseller for week of 12/11/2016.',
    QueueUrl: 'https://sqs.us-west-1.amazonaws.com/464657596304/playClick'
  };

  sqs.sendMessage(params, function(err, data) {
    if (err) {
      console.log('Error', err);
    } else {
      console.log('Success', data.MessageId);
    }
  });
};

const getSQS = () => {
  var queueURL = 'https://sqs.us-west-1.amazonaws.com/464657596304/playClick';

  var params = {
    AttributeNames: [
      'SentTimestamp'
    ],
    MaxNumberOfMessages: 1,
    MessageAttributeNames: [
      'All'
    ],
    QueueUrl: queueURL,
    VisibilityTimeout: 0,
    WaitTimeSeconds: 0
  };

  sqs.receiveMessage(params, function(err, data) {
    if (err) {
      console.log('Receive Error', err);
    } else if (data.Messages) {
      console.log(data);
      var deleteParams = {
        QueueUrl: queueURL,
        ReceiptHandle: data.Messages[0].ReceiptHandle
      };
      sqs.deleteMessage(deleteParams, function(err, data) {
        if (err) {
          console.log('Delete Error', err);
        } else {
          console.log('Message Deleted', data);
        }
      });
    }
  });
};


//sendSQS();
console.log('################');
getSQS();

module.exports.sendSQS = sendSQS;


// productSQS.receiveMessage(params, (error, data) => {
//   if (error) {
//     console.log('Product queue receive error', error);
//   } else if (data.Messages) {
//     // data.Messages.forEach(message => {
//       // const product = message.MessageAttributes;
//       const product = data.Messages[data.Messages.length - 1];
//       if (product.MessageAttributes.Name) {
//         axios.post('http://localhost:1337/products/new', product.MessageAttributes)
//           .then(response => {
//             const deleteParams = {
//               QueueUrl: queueUrl,
//               ReceiptHandle: product.ReceiptHandle,
//               // ReceiptHandle: message.ReceiptHandle,
//             };
//             productSQS.deleteMessage(deleteParams, (error, data) => {
//               if (error) {
//                 console.log('Product queue delete error', error);
//               } else {
//                 console.log('Product queue message deleted', data);
//               }
//             });
//           })
//           .catch(error => {
//             console.log(error);
//           });
//       } else {
//         axios.patch('http://localhost:1337/products/restock', product.MessageAttributes)
//           .then(response => {
//             const deleteParams = {
//               QueueUrl: queueUrl,
//               ReceiptHandle: product.ReceiptHandle,
//               // ReceiptHandle: message.ReceiptHandle,
//             };
//             productSQS.deleteMessage(deleteParams, (error, data) => {
//               if (error) {
//                 console.log('Product queue delete error', error);
//               } else {
//                 console.log('Product queue message deleted', data);
//               }
//             });
//           })
//           .catch(error => {
//             console.log(error);
//           });
//       }
//     // });
//   }
// });
// };
