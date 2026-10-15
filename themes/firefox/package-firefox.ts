import { join } from 'node:path';
import { mkdir, rename, rm } from 'node:fs/promises';

const root = import.meta.dir;
const dist = join(root, 'dist');
await mkdir(dist, { recursive: true });
for (const variant of ['dark', 'black']) {
  const source = join(root, `aroli-${variant}`);
  const manifest = await Bun.file(join(source, 'manifest.json')).json();
  if (!/^\d+\.\d+\.\d+$/.test(manifest.version) || !manifest.theme?.colors) {
    throw new Error(`Manifest inválido: ${source}`);
  }
  const archive = join(dist, `aroli-${variant}-${manifest.version}.zip`);
  const temporary = `${archive}.tmp.zip`;
  await rm(temporary, { force: true });
  for (const command of [
    ['zip', '-q', temporary, 'manifest.json'],
    ['unzip', '-t', temporary],
  ]) {
    const result = Bun.spawnSync(command, { cwd: source, stdout: 'inherit', stderr: 'inherit' });
    if (result.exitCode !== 0) throw new Error(`Falhou: ${command.join(' ')}`);
  }
  await rename(temporary, archive);
  console.log(archive);
}
