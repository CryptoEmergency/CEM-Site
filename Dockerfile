FROM node:19.6.0
LABEL maintainer="inbox@ienshin.ru"
ENV TZ=Europe/Moscow
WORKDIR /app
RUN git clone https://github.com/CryptoEmergency/CEM-Site.git ./
RUN npm install --loglevel=error
CMD [ "node", "index.js" ]