
type Size = 'sm' | 'md' | 'lg';

export class GuildMember {
  name: string;
  level: number;
  ascensionLevel: number;
  title: string;
  profession: string;
  rank: 1 | 3 | 5;
  unacceptedInvite: boolean;
  lastSeen: number;
  joinedAt: number;
}

export class GuildBuilding {
  name: string;
  desc: string;
  size: Size;
  properties: any[];
}

export class GuildBuildings {
  otherBases: Array<{ name: string, cost: number }> = [];
  buildingInfo: GuildBuilding[];
  levels: any = {};
  hallCosts: any = {};
  hallSizes: any = {};
  buildings: any = { currentlyBuilt: { sm: [], md: [], lg: [] }, levels: {}, properties: {} };
}

export class Guild {
  name: string;
  tag: string;
  leader: string;
  founded: number;
  level: number;
  gold: number;

  maxMembers: number;
  members: GuildMember[];

  motd: string;
  taxRate: number;

  resources: any = { stone: 0, wood: 0, clay: 0, astralium: 0 };

  $me?: GuildMember;
}