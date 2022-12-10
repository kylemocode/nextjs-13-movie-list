# Movier

A simple full-stack movie list application which built with NextJS v13 & Prisma ORM (PostgresSQL) 🤖

![](https://i.imgur.com/Bv4In9Z.jpg)

## Quick Start

use [docker image](https://hub.docker.com/r/oldmo860617/movier-final) uploaded to Docker Hub

make sure you have docker installed locally

```shell
$ docker run -p 3000:3000 --name movier oldmo860617/movier-final
```

then go to `http://localhost:3000` in your browser, you will see the application interface (feel free to change the exposed port while running `docker run` command)

## Architecture

### Frontend

This application use some experimental features such as [app directory](https://nextjs.org/blog/next-13#new-app-directory-beta) and [React Server Component](https://nextjs.org/blog/next-13#server-components) in NextJS v13, which might be changed in the future stable version, but I think it is a great opportunity to try these new things.

(I also try many new features in Next13 in this project, like build-in `layout`, `head`, `loading`...etc)

#### Tech Stack

- `NextJS v13`
- `TypeScript`
- `TailwindCSS` (I tried `styled-components` first but found that React Server Component doesn't support `CSS-in-JS` solutions now. And this is also my first time to use `Tailwind`)

#### Server Component & Client Component

The components architecture of this application is like the image below:

![](https://i.imgur.com/eNmAdwO.jpg)

In conclusion, the application fetch data from API endpoints in server components and then pass data to client components that need state to handle interaction.

In `MoviesList` client component, I think the data set is not too big, so I choose to filter in client side when search by keyword (only fetch one time in server component).

In `CommentsList` client component, I found that we lack a mechanism to make parent server component re-render to get new data when we add a new comment, so I choose to copy the comments list passed down from parent using React state.

#### Lighthouse Score

![](https://i.imgur.com/lvJUGPA.png)

This simple application get wonderful Lighthouse scores in Performance and SEO.

### Backend

Because this is a simple application, I think serverless solution like NextJS's build in API routes is a good choice to build API endpoints.

As for database, I choose to use a hosted PostgreSQL database instance from [supabase](https://supabase.com/docs/guides/database), which will not cost and money in this simple application.

Inspired by [this talk session](https://www.youtube.com/watch?v=quNLtK7hWYs), I found that [Prisma ORM](https://www.prisma.io/) fits with NextJS very well. It not only support query builder but also support databse migration and TypeScript type definition based on our schema.

#### Entity Schema

![](https://i.imgur.com/Yn6JAKG.png)

We have only two entity - Movie and Comment, and their relation is 1:n, one movie can have multiple comments.

Prisma will help us to tramsform prisma schema to DB table schema.

PostgreSQL automatically creates indexes on primary keys and unique constraints, but not on the referencing side of foreign key relationships.
Because the comments will frequently get CREATE and maybe DELETE and UPDATE in the future, we may pay a performance cost for changes of comments in order to update index. Therefore, I decide to not add additional index by myself.

### CI Pipeline

I use Github Actions to build the CI pipeline, which run `build` and `lint` for now in order to make this application more stable. I also enable the cache mechanism of actions so that it doesn't need to install yarn & dependencies every time, improving the pipeline performance.

### Commit Message

All commit message is started with emoji from [gitmoji](https://gitmoji.dev/) so that we can easily identify the category of each task.

## TODO List & Roadmap

- [ ] Responsive Design
- [ ] Redis Cache to cache DB data if necessary
- [ ] Optimistic Updates using some Stale-While-Revalidate fetching libary and cooperate with in memory cache mechanism
- [ ] DELETE & UPDATE comments functionalities
