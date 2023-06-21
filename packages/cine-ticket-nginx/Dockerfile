FROM nginx:alpine

# Copia o arquivo de configuração do nginx para o container
COPY nginx.conf /etc/nginx/nginx.conf

# Expor a porta 80 (padrão do nginx)
EXPOSE 80

# Comando para iniciar o nginx ao executar o container
CMD ["nginx", "-g", "daemon off;"]
