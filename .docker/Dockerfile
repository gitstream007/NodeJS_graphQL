FROM node:alpine
LABEL name="thing-api" vendor="me"
#set npm config
RUN mkdir -p /home/node/.npm-global
ENV NPM_CONFIG_PREFIX=/home/node/.npm-global
ENV PATH=$PATH:/home/node/.npm-global/bin
#add sources
ADD ./ /app
RUN chown -R node:node /home/node /app
#install app
WORKDIR /app
USER node
RUN yarn install
RUN node -v
EXPOSE 4000
CMD ["yarn", "start"]
