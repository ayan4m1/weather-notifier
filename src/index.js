import { sendMail } from './modules/mail.js';
import { getLogger } from './modules/logging.js';
import { getScreenshot } from './modules/weather.js';

const log = getLogger('app');

const execute = async () => {
  await sendMail(await getScreenshot());
  // await getVideo();

  log.info('Done with daily email');
};

execute();
setInterval(execute, 8.64e7);
