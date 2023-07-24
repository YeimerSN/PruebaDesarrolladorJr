FROM node:20-slim
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]

FROM node:20-slim
WORKDIR /app
#RUN npm install -g postgraphile
EXPOSE 5000
CMD ["postgraphile", "-c", "postgres://geosat:zQjaHHSTIuuG14bipI04JA81VpdqTTgr@dpg-ciqmphl9aq0dcpo5orkg-a.oregon-postgres.render.com/crudgeosat?ssl=true", "--schema", "public", "--enhance-graphiql", "--dynamic-json", "--cors"]