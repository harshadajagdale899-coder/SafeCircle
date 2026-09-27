const User = require('../models/User');

exports.emergencyMessage = function (userName, latitude, longitude, time) {
  return `
SAFE CIRCLE EMERGENCY ALERT

${userName} has activated an SOS and may need immediate assistance.

Location: https://www.google.com/maps?q=${latitude},${longitude}

Time: ${time}
Please contact ${userName} immediately.

— SafeCircle
`;
};

exports.sendSms = async function (phoneNo, message) {
  console.log(!!process.env.TEXTBEE_API_KEY);
  const response = await fetch(
    'https://api.textbee.dev/api/v1/gateway/send-sms',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.TEXTBEE_API_KEY,
      },
      body: JSON.stringify({
        recipients: [phoneNo],
        message: message,
      }),
    },
  );
  const data = await response.json();
  console.log(data);
};
