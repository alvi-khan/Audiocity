FROM node:14.21 as client
WORKDIR /client
COPY client .
RUN npm ci
RUN npm run build

FROM node:14.21 as server
ENV NODE_ENV=production
WORKDIR /server
COPY server .
COPY --from=client /client/build public
RUN npm ci --omit=dev
COPY . .
EXPOSE 8080
ENTRYPOINT [ "npm", "start" ]
