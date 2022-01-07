import { format, transports } from 'winston';

/**
 * remove nest startup logs
 */
export default {
  config: (value: string) => {
    return {
      transports: [
        new transports.Console({
          level: 'debug',
          format: format.prettyPrint({ colorize: true }),
        }),
      ],
      exitOnError: false,
    };
  },
};
