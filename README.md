# Niloy | Portfolio

Personal portfolio website of Naeem Biswass Niloy.

## Tech Stack

- Next.js
- TypeScript
- React
- Tailwind CSS
- Framer Motion
- MongoDB (CMS content)
- Cloudinary (media upload)
- JWT Auth (admin CMS)

## Setup

1. Install dependencies:

```sh
npm install
```

2. Add environment variables:

```sh
cp .env.example .env.local
```

3. Start development server:

```sh
npm run dev
```

## CMS Usage

1. Open `/admin/login`
2. Click `Need first admin? Create account` and create your first admin (only once)
3. Login with that account
4. Edit your full portfolio content JSON from `/admin`
5. Upload images from CMS panel and paste returned Cloudinary URLs into JSON

Public content API:
- `GET /api/content`

Admin APIs (JWT cookie protected):
- `POST /api/auth/register`
- `POST /api/auth/login`
- `POST /api/auth/logout`
- `GET /api/auth/me`
- `GET /api/cms/content`
- `PUT /api/cms/content`
- `POST /api/cms/upload`

## Build

```sh
npm run build
```

## Production

```sh
npm run start
```
