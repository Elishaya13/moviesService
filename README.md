# Movies Service

Service de catalogue de films (NestJS, Clean Architecture).

---

## Avant de lancer

- Lancer **Docker Desktop**
- Lancer la stack : `docker-compose up -d`
- Pour ouvrir la BDD en interface :

  ```bash
  npx prisma studio
  ```

---

## Description

API REST pour gérer un catalogue de films (CRUD, recherche). Basé sur [Nest](https://github.com/nestjs/nest) (TypeScript).

---

## Architecture

Le service suit une **Clean Architecture** : les dépendances vont vers le centre (Domain). L’infrastructure implémente les interfaces du domain.

### Flux

```
Client HTTP  →  MovieController  →  Use cases  →  MovieRepository (interface)
                                                      ↑
                                              PrismaMovieRepository  →  PrismaService  →  PostgreSQL
```

### Couches

| Couche          | Rôle                                                                 | Éléments principaux                                                                 |
|-----------------|----------------------------------------------------------------------|-------------------------------------------------------------------------------------|
| **Presentation** | Reçoit HTTP, valide les entrées, renvoie les réponses               | `MovieController`, `RemoteAuthGuard`, DTOs (Create, Update, Response, Search)       |
| **Application**  | Orchestre le métier (cas d’usage)                                    | Use cases : GetAll, GetById, Create, Update, Delete, Search                         |
| **Domain**       | Cœur métier, sans dépendance externe                                 | Entité `Movie`, enum `MovieCategory`, interface `MovieRepository`                   |
| **Infrastructure** | Implémentation technique et accès aux données                     | `PrismaMovieRepository`, `PrismaService`, PostgreSQL                                |

---

## Installation

```bash
npm install
```

---

## Lancer le projet

```bash
# développement
npm run start:dev

# production
npm run start:prod
```

---

## Tests

```bash
# tests unitaires
npm run test

# tests e2e
npm run test:e2e

# couverture
npm run test:cov
```

---

## Documentation

- [NestJS](https://docs.nestjs.com)
- Diagrammes du projet : voir `docs/README-diagramme.md`
