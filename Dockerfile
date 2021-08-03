# This stage installs our modules
FROM node:14 as builder

WORKDIR /home/node/app
COPY package.json package-lock.json ./

# If you have native dependencies, you'll need extra tools
# RUN apk add --no-cache make gcc g++ python3

RUN npm install --only=prod

# Then we copy over the modules from above onto a `slim` image
FROM node:14-slim

# If possible, run your container using `docker run --init`
# Otherwise, you can use `tini`:
# RUN apk add --no-cache tini
# ENTRYPOINT ["/sbin/tini", "--"]

WORKDIR /home/node/app
COPY --from=builder /home/node/app .
COPY . .
CMD ["node", "telegraf-pvoutput.js"]
