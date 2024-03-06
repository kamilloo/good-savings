import { Injectable } from '@nestjs/common';
import { EventEmitter } from 'events';
import { Signal } from '../models/Signal';

@Injectable()
export class BotService {
  private notifier: EventEmitter;
  constructor() {
    this.init();
  }
  init() {
    this.notifier = require('../events/SignalEmitter');

    const token = 'token';
    // eslint-disable-next-line @typescript-eslint/no-var-requires

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

    this.notifier.on('signal', (signal: Signal) => {
      client.channels.fetch('1214683014282354721').then((channel) => {
        const message =
          signal.coin + '/' + signal.interval + '/' + 'x' + signal.factor;
        console.log(message);
        channel.send(message); //m15,m30,h1, pierwsza buy/sell -> druga buy
      });
    });

    client.login(token);
  }
}
