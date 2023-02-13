### Multi Stage Build ###

### Estagio 1 - Obter o source e gerar o build ###

## ng-builder eh o nome do container
FROM node:latest AS ng-builder 

## Criacao de uma pasta chamada app
RUN mkdir -p /app 

## Setando para trabalhar na pasta app
WORKDIR /app

## Copiando arquivo package.json para pasta app
COPY package.json /app 

## Para instalar dependencias do pacjage.json
RUN npm install --force

## Copiar todo o projeto para pasta app
COPY . /app/

## Comando do tipo npm, para build em prod
RUN $(npm bin)/ng build --configuration production


### Estagio 2 - Subir o source para o servidor NGINGX com o app Angular ###

FROM nginx
COPY nginx.conf /etc/nginx/nginx.conf

## Copiar os arquivos de app/dist/fron-end/ da aplicacao para o servidor
COPY --from=ng-builder /app/dist/frond-end/ usr/share/nginx/html

## Expoe a porta 80
EXPOSE 80