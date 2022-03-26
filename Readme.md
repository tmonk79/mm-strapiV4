### MM-NextJS-Strapi POC for DC
- Need to install docker and docker-compose to run this project
- This is a boiler plate repo for NextJS + Strapi
- NextJS code is in frontend directory
- Backend directory has a strapiV4 folder
- Strapi is running in Docker
- Nginx as reverse proxy to Strapi API for SSL
- Redis for backend cache
- MelliSearch Plugin for in-app search

### Steps to run locally:
- Delete node_modules in ./backend/strapiV4
- Delete package-lock.json in ./backend/strapiV4
- Add self-signed SSL for localhost development in `./nginx/ssl_certs`

```
openssl req -x509 -out localhost.crt -keyout localhost.key \
  -newkey rsa:2048 -nodes -sha256 \
  -subj '/CN=localhost' -extensions EXT -config <( \
   printf "[dn]\nCN=localhost\n[req]\ndistinguished_name = dn\n[EXT]\nsubjectAltName=DNS:localhost\nkeyUsage=digitalSignature\nextendedKeyUsage=serverAuth")
```
- update hostfile /etc/hosts and add this entry
  - 127.0.0.0 api.dessertcorner.com
  - 127.0.0.0 admin.dessertcorner.com
	- 127.0.0.0 dessertcorner.com
- cd to ./backend/strapi
  - run `./build.sh`
- create .env file in ./backend/strapiV4
- add the APP_KEYS variable

```
APP_KEYS=jgtC+4jleeqbEkiJl7+arA==,OfboGkSwnu3mAy1gsxTE7Q==,YlwVpW2XVJf1COs8z4bp+w==,zKvEfycixbgKMO6KCUTxNw==
```
- go to root directory and run

```
docker-compose -f docker-compose.dev.yaml up --build
```

### Database Backup
```
mysqldump -p strapi > dump.strapi.sql
```
