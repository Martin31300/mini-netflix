# Mini Netflix

Application de films réalisée avec l'API TMDB.

## Fonctionnalités
- Liste de films (discover)
- Recherche
- Page détail d'un film
- Favoris (sauvegardés dans le localStorage)
- Pagination
- Filtre par genre

## Stack
React, Vite, React Router, Redux Toolkit, Tailwind CSS

## Lancer le projet
1. Installer les dépendances : `npm install`
2. Copier `.env.example` en `.env` et y mettre son jeton TMDB (« Jeton d'accès en lecture à l'API ») : `cp .env.example .env`
3. Démarrer : `npm run dev`

## Structure
- `src/pages` : les pages
- `src/components` : les composants réutilisables
- `src/services` : les appels à l'API TMDB
- `src/routing` : la configuration de React Router
- `src/app` : le store Redux
- `src/features` : les slices Redux (movies, favorites, genres)

## Choix techniques
- La recherche, les filtres (genre, tri, année, note) et la page courante sont stockés dans l'adresse (React Router, `useSearchParams`) plutôt que dans Redux : on peut recharger la page ou partager un lien sans perdre la liste affichée, et le bouton « Retour » du navigateur fonctionne.
- Redux Toolkit gère les données partagées entre plusieurs pages : la liste de films (avec `createAsyncThunk`), les genres et les favoris.
- Les favoris sont sauvegardés dans le `localStorage` à chaque modification du store (`store.subscribe`).
- L'URL de l'API et le jeton TMDB sont dans le fichier `.env` (variables `VITE_API_URL` et `VITE_TMDB_TOKEN`). Ce fichier n'est pas versionné, `.env.example` sert de modèle.

## Énoncé du TP

```
https://developer.themoviedb.org/reference/getting-started
https://api.themoviedb.org/3

Créer une application de films type mini Netflix

pour tmdb une clé est nécessaire, il faut créer un compte puis fournir la clé dans les headers du call fetch
exemple :
    dans les headers d'un call fetch :
        Authorization: `Bearer eyJhbGciOiJIUz................`,
        "Content-Type": "application/json",

Fonctionnalités

Liste de films
recherche
page détail

Endpoints utiles

discover/movie
search/movie
movie/{id}
/movie/${id}?language=fr-FR

Architecture conseillée

pages
components
services
routing

Bonus

favoris
pagination
genres
```
