
import { LinkItem } from './types';

export const INITIAL_NEWS: LinkItem[] = [
  { id: '1', name: 'The Guardian', url: 'https://www.theguardian.com/uk', domain: 'theguardian.com' },
  { id: '2', name: 'AT5', url: 'https://www.at5.nl', domain: 'at5.nl' },
  { id: '3', name: 'NOS', url: 'https://nos.nl', domain: 'nos.nl' },
  { id: '4', name: 'RA', url: 'https://ra.co', domain: 'ra.co' },
];

export const INITIAL_TOOLS: LinkItem[] = [
  { id: '5', name: 'Claude', url: 'https://claude.ai', domain: 'claude.ai' },
  { id: '6', name: 'Akhi Gym', url: 'https://www.akhigym.nl/blank-2', domain: 'akhigym.nl' },
];

export const INITIAL_RADIO: LinkItem[] = [
  { 
    id: '9', 
    name: 'Reprezent', 
    url: 'https://www.reprezent.org.uk', 
    tracklistUrl: 'https://www.reprezent.org.uk/radio', 
    streamUrl: 'https://shoutcast.reprezent.org.uk/stream?type=.mp3',
    domain: 'reprezent.org.uk' 
  },
  { 
    id: '8', 
    name: 'FunX', 
    url: 'https://www.funx.nl', 
    tracklistUrl: 'https://www.funx.nl/radio/playlist', 
    streamUrl: 'https://icecast.omroep.nl/funx-bb-mp3',
    domain: 'funx.nl' 
  },
  { 
    id: '7', 
    name: 'NTS 1', 
    url: 'https://www.nts.live', 
    tracklistUrl: 'https://www.nts.live/schedule', 
    streamUrl: 'https://stream-relay-geo.ntslive.net/stream?type=.mp3',
    domain: 'nts.live' 
  },
  { 
    id: 'nts-2', 
    name: 'NTS 2', 
    url: 'https://www.nts.live', 
    tracklistUrl: 'https://www.nts.live/schedule', 
    streamUrl: 'https://stream-relay-geo.ntslive.net/stream2?type=.mp3',
    domain: 'nts.live' 
  },
  { 
    id: '10', 
    name: 'Rinse FM', 
    url: 'https://rinse.fm', 
    tracklistUrl: 'https://rinse.fm/schedule', 
    streamUrl: 'https://streamer.rinse.fm/rinse_fm?type=.mp3',
    domain: 'rinse.fm' 
  },
];
