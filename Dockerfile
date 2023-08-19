# Use uma imagem Node.js oficial como base
FROM node:14

# Defina o diretório de trabalho no container
WORKDIR /usr/src/app

# Copie o arquivo package.json e package-lock.json (se estiver presente)
COPY package*.json ./

# Instale as dependências da sua aplicação
RUN npm install

# Copie o restante dos arquivos da sua aplicação para o container
COPY . .

# Defina a porta em que a aplicação rodará
EXPOSE 3000

# Defina o comando para rodar a aplicação
CMD ["node", "index.js"]