# Flood Shelter — Frontend

Interface web para consulta e cadastro de abrigos de emergência em situações de enchente. Desenvolvida com Vue 3, TypeScript e Tailwind CSS.

## Sobre o Projeto

O frontend integra com a [API REST do backend](../back-end/README.md) para exibir informações em tempo real sobre abrigos disponíveis, permitindo que pessoas afetadas por enchentes encontrem rapidamente um local seguro.

## Funcionalidades

- **Listagem de abrigos** com status em tempo real (disponível, crítico, lotado)
- **Filtros combinados** por status, cidade/nome e acessibilidade (pets, idosos, PCD)
- **Cadastro de abrigos** com validação completa no cliente
- **Página de detalhes** com todas as informações do abrigo
- **Dashboard** com estatísticas gerais (total de vagas, ocupação, contagem por status)
- **Fallback para dados locais** quando a API está indisponível

## Telas

| Tela | Rota | Descrição |
| --- | --- | --- |
| Home | `/` | Dashboard com estatísticas e acesso rápido |
| Abrigos | `/abrigos` | Lista com filtros e busca |
| Detalhes | `/abrigos/:id` | Informações completas de um abrigo |
| Cadastrar | `/cadastrar` | Formulário de registro de novo abrigo |

## Estrutura do Projeto

```text
front-end/
├── src/
│   ├── components/          # Componentes reutilizáveis
│   │   ├── ShelterCard.vue  # Card de abrigo na listagem
│   │   ├── StatusBadge.vue  # Badge de status (available/critical/full)
│   │   ├── LoadingSpinner.vue
│   │   └── EmptyState.vue
│   ├── composables/
│   │   └── useShelters.ts   # Lógica de busca e estado dos abrigos
│   ├── data/
│   │   └── mockShelters.ts  # Dados de fallback offline
│   ├── services/
│   │   ├── api.ts           # Cliente HTTP base (fetch wrapper)
│   │   └── shelterService.ts # Métodos de acesso à API
│   ├── types/
│   │   └── index.ts         # Interfaces TypeScript (Shelter, ShelterFormData, etc.)
│   ├── views/
│   │   ├── HomeView.vue
│   │   ├── SheltersView.vue
│   │   ├── ShelterDetailView.vue
│   │   └── RegisterShelterView.vue
│   ├── router/
│   │   └── index.ts         # Rotas da aplicação
│   ├── App.vue
│   └── main.ts
├── .env.example             # Modelo de variáveis de ambiente
└── vite.config.ts
```

## Como Executar

### Pré-requisitos

- [Node.js](https://nodejs.org/) 18+
- Backend rodando em `http://localhost:3000` (ver [back-end/README.md](../back-end/README.md))

### Instalação

```bash
# 1. Instalar dependências
npm install

# 2. Configurar variável de ambiente
cp .env.example .env
```

### Iniciar em desenvolvimento

```bash
npm run dev
```

A aplicação estará disponível em `http://localhost:5173` (ou próxima porta disponível).

### Build para produção

```bash
npm run build
```

Os arquivos gerados ficam em `dist/`.

## Variáveis de Ambiente

| Variável | Descrição | Padrão |
| --- | --- | --- |
| `VITE_API_URL` | URL base da API backend | `http://localhost:3000` |

## Integração com o Backend

O serviço de API está em [src/services/api.ts](src/services/api.ts) e usa o Fetch nativo do browser:

```typescript
const BASE_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:3000'
```

Os métodos disponíveis em [src/services/shelterService.ts](src/services/shelterService.ts):

| Método | Endpoint | Descrição |
| --- | --- | --- |
| `getAll(params?)` | `GET /api/shelters` | Lista abrigos com filtros opcionais |
| `getById(id)` | `GET /api/shelters/:id` | Busca abrigo por ID |
| `create(data)` | `POST /api/shelters` | Cadastra novo abrigo |
| `update(id, data)` | `PATCH /api/shelters/:id` | Atualiza abrigo existente |

## Tecnologias Utilizadas

| Tecnologia | Uso |
| --- | --- |
| Vue 3 (Composition API) | Framework principal |
| TypeScript | Tipagem estática |
| Vite | Build tool e dev server |
| Tailwind CSS | Estilização utilitária |
| Vue Router | Navegação entre páginas |
| Fetch API | Requisições HTTP |
