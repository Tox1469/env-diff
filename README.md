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
