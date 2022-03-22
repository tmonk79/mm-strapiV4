### MM-NextJS-Strapi Boilerplate

- This is a boiler plate repo for NextJS + Strapi
- NextJS code is in frontend directory
- Backend directory has a strapiV4 folder
- Strapi is running in Docker
- Nginx as reverse proxy to Strapi API for SSL
- Redis for backend cache
- MelliSearch Plugin for in-app search

### Steps to run locally:

```

- Delete node_modules in ./backend/strapi
- Delete package-lock.json in ./backend/strapiV4
- Add self-signed SSL for localhost development
- update hostfile /etc/hosts and add this entry
- 127.0.0.0 api.dessertcorner.com
- 127.0.0.0 admin.dessertcorner.com
- Run npm run build in ./backend/strapi
- move the build folder to ./nginx folder
- create .env file in ./backend/strapiV4
- add the APP_KEYS variable
- add self-signed certs to ./nginx/ssl_certs

```

### Database Backup
```
mysqldump -p strapi > dump.strapi.sql
```
