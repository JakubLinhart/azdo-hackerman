FROM node:20.13.1

RUN npm install -g -D typescript
RUN npm install -g tfx-cli
RUN npm install -g mocha --save-dev

ENTRYPOINT /bin/bash
WORKDIR /home/node