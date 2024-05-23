ZAPNUTÍ DOCKERU
docker login
docker-compose up -d

- pukud vznikne chyba 14, je třeba smazat obsah složky mongo-data

docker exec -it mongodb bash
mongosh --username admin --password Admin123! --authenticationDatabase admin

SEEDOVÁNÍ DAT