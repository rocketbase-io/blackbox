FROM hypriot/rpi-node

RUN mkdir /app
WORKDIR /app

COPY server.js package.json node_modules lib /app/

CMD "node --harmony server.js"
