FROM node:alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

ENV DATABASE_URL="postgresql://finance_user:246mod%23ast@postgres:5432/finance_db"
ENV JWT_SECRET="246mod#ast"

RUN npx prisma generate
RUN npx prisma db push

RUN npm run build

EXPOSE 3000

CMD ["node", "dist/main.js"]