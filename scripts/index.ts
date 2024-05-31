import {
  intro,
  spinner,
  isCancel,
  cancel,
  text,
} from '@clack/prompts';
import { setTimeout as sleep } from 'node:timers/promises';
import color from 'picocolors';
import dayjs from 'dayjs';
import { info } from "./days"
import { mkdirSync, writeFileSync } from 'node:fs';

async function main() {
  const day = dayjs(new Date())
  console.log();
  intro(color.bgYellow(` Day ${info.length + 1} Challenge `));

  const name = await text({
    message: "What is this challenge's name?",
  });

  if (isCancel(name)) {
    cancel('Operation cancelled');
    return process.exit(0);
  }

  const s = spinner();
  s.start('');

  await sleep(3000);

  const challengeTemplate = `const Page = () => {
  return (
    <div>
      <h1>${day}</h1>
    </div>
  );
};

export default Page;`

  info.push({
    day: (info.length + 1).toString().padStart(3, '0'),
    title: name,
    date: day.format('MM.DD YYYY'),
  });

  writeFileSync('scripts/days.ts', `export const info = ${JSON.stringify(info, null, 2)}`);
  mkdirSync(`app/days/${(info.length).toString().padStart(3, '0')}`);
  writeFileSync(`app/days/${(info.length).toString().padStart(3, '0')}/page.tsx`, challengeTemplate);

  s.stop('Done!');
}

main().catch(console.error);
