FROM node:20.9.0-alpine

WORKDIR /app

EXPOSE 3000

LABEL framework="next"

# to avoid invalidating the cache for changes not related to dependencies  copy in package.json and package-lock.json and install dependencies before copying the remaining code

ADD ./package*.json .

# install dependencies
RUN --mount=type=cache,target=/app/.npm \
npm set cache /app/.npm \
&& npm ci --omit=dev

# copy source files into image working directory
COPY --link . .

HEALTHCHECK --interval=30s --timeout=30s --start-period=5s --retries=3 CMD [ "node","healthcheck.js" ]

#create unprivileged user
USER node

CMD ["npm","run","start" ]