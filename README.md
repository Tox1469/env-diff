[![CI](https://img.shields.io/github/actions/workflow/status/Tox1469/env-diff/ci.yml?style=flat-square&label=ci)](https://github.com/Tox1469/env-diff/actions)
[![License](https://img.shields.io/github/license/Tox1469/env-diff?style=flat-square)](LICENSE)
[![Release](https://img.shields.io/github/v/release/Tox1469/env-diff?style=flat-square)](https://github.com/Tox1469/env-diff/releases)
[![Stars](https://img.shields.io/github/stars/Tox1469/env-diff?style=flat-square)](https://github.com/Tox1469/env-diff/stargazers)

---

# env-diff

Compara .env com .env.example e reporta chaves faltando ou extras.

## Instalação

```bash
npm install env-diff
```

## Uso

```ts
import { diff, report } from 'env-diff';

const r = diff('.env', '.env.example');
console.log(report(r));
```

## API

- `parseEnv(content)`
- `diff(envPath?, examplePath?)`
- `report(result)`

## Licença

MIT