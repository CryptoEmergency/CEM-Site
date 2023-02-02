FROM node:17.8.0
LABEL maintainer="inbox@ienshin.ru"
ENV TZ=Europe/Moscow
WORKDIR /app
RUN apt install git
RUN git clone https://github.com/CryptoEmergency/CEM-Site.git ./
RUN npm install
CMD [ "node", "index.js" ]