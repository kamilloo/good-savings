import { Injectable } from '@nestjs/common';
import { EventEmitter } from 'events';
import { Signal } from '../models/Signal';
import * as process from 'process';

@Injectable()
export class BotService {
  private notifier: EventEmitter;
  constructor() {
    this.init();
  }
  init() {
    this.notifier = require('../events/SignalEmitter');

    const token = process.env.DISCORD_BOT_TOKEN;

    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const discord = require('discord.js');

    const { Client, GatewayIntentBits } = require('discord.js');
    const client = new Client({
      intents: [GatewayIntentBits.Guilds],
    });

    client.on('ready', () => {
      console.log(`Logged in as ${client.user.tag}!`);
      client.channels.fetch('1214683014282354721').then((channel) => {
        // setTimeout(() => channel.send('BTCUSDT/1h/x3'), 10000); //m15,m30,h1, pierwsza buy/sell -> druga buy
      });
    });
    https: this.notifier.on('signal', (signal: Signal) => {
      client.channels
        .fetch(process.env.DISCORD_DEBUG_CHANNEL)
        .then((channel) => {
          const message =
            signal.coin +
            '/' +
            signal.interval +
            '/' +
            'x' +
            signal.factor +
            '(' +
            signal.debug +
            ')';
          console.log(message);
          channel.send(message); //m15,m30,h1, pierwsza buy/sell -> druga buy
        });

      client.channels
        .fetch(process.env.DISCORD_GENERAL_CHANNEL)
        .then((channel) => {
          const message =
            signal.coin + '/' + signal.interval + '/' + 'x' + signal.factor;
          console.log(message);
          channel.send(message); //m15,m30,h1, pierwsza buy/sell -> druga buy
        });
    });

    client.login(token);
  }
}
