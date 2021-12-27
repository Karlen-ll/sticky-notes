import {Note, Notes} from '../global/notes';

// Helpers
const FETCH_TIME = 2000;

// Emulate
function emulateFetch<T>(data: T, wait: number = FETCH_TIME): Promise<T> {
  return new Promise<T>(resolve => setTimeout(() => resolve(data), wait));
}

export function fetchNotes(): Promise<Notes> {
  return emulateFetch<Notes>([
    {
      id: 1,
      title: "If you haven't seen Game of Thrones, go watch it right now 🤪.",
      description:
        'Hodor. Hodor hodor, hodor. Hodor hodor hodor hodor hodor. Hodor. Hodor! Hodor hodor, hodor; hodor hodor hodor. Hodor. Hodor hodor!',
      section: 'doing',
    },
    {
      id: 2,
      title: 'Lorizzle ipsizzle dolizzle sit amizzle',
      description:
        'Nullam sapien velizzle, stuff fo shizzle my nizzle, suscipit check it out, gravida vizzle, get down get down.',
      section: 'doing',
      color: 'lime',
      size: 'lg',
    },
    {
      id: 3,
      title: 'Pizzle ipsum dolor sit amet',
      description:
        'consectetuer adipiscing elit. 👾 Nullam sapien velit, volutpat, suscipizzle shiznit, break yo neck, yall vizzle, check it out.',
      section: 'todo',
      size: 'sm',
    },
    {
      id: 4,
      title: 'Fizzle ipsizzle boofron black',
      description:
        'consectetuer adipiscing elit. Nullizzle sapizzle velizzle, yippiyo volutpat, suscipit quis, fo vizzle, phat.',
      section: 'todo',
      color: 'orange',
      size: 'lg',
    },
    {
      id: 5,
      title: 'Give your lorem ipsum.',
      description: 'One project, two projects, red project, blue project...',
      section: 'todo',
      color: 'blue',
      size: 'sm',
    },
  ]);
}

export async function fetchArchiveNotes(): Promise<Notes> {
  return await emulateFetch<Notes>([
    {
      id: 6,
      title: 'Boofron ipsizzle dolizzle sizzle amizzle',
      description:
        'Lorem ipsum dolor amet mustache knausgaard +1, blue bottle waistcoat tbh semiotics artisan synth stumptown gastropub cornhole celiac swag.',
    },
    {
      id: 7,
      title: '💥 Bitcoin Cash identified the',
      description:
        'Basic Attention Token cost a constant distributed ledger at lots of unspent transaction output, however, Decred thought few private chain!',
    },
  ]);
}

let id = 7;

export async function createNotes(): Promise<Note> {
  return await emulateFetch<Note>(
    {
      id: ++id,
      title: 'New note',
    },
    FETCH_TIME / 2,
  );
}
