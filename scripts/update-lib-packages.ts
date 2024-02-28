import { readFileSync, writeFileSync } from 'fs';
import { globSync } from 'glob';

const files = globSync('dist/libs/*/package.json');
for (const file of files) {
  const packageContent = readFileSync(file, 'utf8');
  const packageJson = JSON.parse(packageContent);
  const { version, peerDependencies } = packageJson;

  Object.keys(peerDependencies).forEach((dependency) => {
    if (dependency.startsWith('@ng-supabase')) {
      peerDependencies[dependency] = `>=${version}`;
    }
  });

  const newPackageContent = JSON.stringify(packageJson, null, 2);
  writeFileSync(file, newPackageContent, 'utf-8');
}
