import { format } from 'date-fns';
import nodemailer from 'nodemailer';

import { smtp as config } from './config.js';

const transport = nodemailer.createTransport(config);

export const sendMail = async (screenshot) =>
  await transport.sendMail({
    from: `Weather Notifier <noreply@bulletlogic.com>`,
    to: 'Andrew DeLisa <andrew@bulletlogic.com>',
    subject: `Forecast for ${format(Date.now(), 'yyyy-MM-dd')}`,
    html: `<img src="cid:forecast@bulletlogic.com"/>`,
    attachments: [
      {
        content: screenshot,
        filename: 'forecast.png',
        cid: 'forecast@bulletlogic.com'
      }
    ]
  });
