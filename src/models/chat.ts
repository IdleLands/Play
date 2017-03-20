
export class ChatMessage {
  timestamp: number;
  playerName: string;
  title: string;
  text: string;
  channel: string;
  route: string;
  isMod: boolean;
  ascensionLevel: number;
  ip: string = '<self>';
  hidden?: boolean;
  seen?: boolean;
  guildTag?: string;
}

export class ChatUser {
  $shard: number;
  $currentIp: string;
  _id: string;
  name: string;
  title: string;
  professionName: string;
  ascensionLevel: number;
  gender: string;
  isMod: boolean;
  level: number;
  map: string;
  x: number;
  y: number;
  guild: string;
  guildTag: string;
}