# EComm-project
Ecommerce project using laravel as a backend and Next.js as frontend
## Installation Guide
You need composer and node installed to install and configure this project.
1.Installing laravel packages

```console
composer install
```
2.Installing Next.js packages for the client side
you have to install the required packages for the client side to work.
all you need to do is:

```console
cd client/
npm i
```
3.Generate app key for laravel
you need to run this command:

```console
php artisan key:generate
```

4.Configure .env file
You have to create .env file or copy .env.example and rename it to ".env", then add your local keys to it, it should look like this:

```code
APP_NAME=Laravel
APP_ENV=local
APP_KEY=base64:JGT2sIw8iMl15enbPHv6lu87FYmAHD8bnqRDyDmYlHM=
APP_DEBUG=true
APP_URL=http://localhost

LOG_CHANNEL=stack
LOG_LEVEL=debug

DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=ecomm_project
DB_USERNAME=root
DB_PASSWORD=

BROADCAST_DRIVER=log
CACHE_DRIVER=file
FILESYSTEM_DRIVER=local
QUEUE_CONNECTION=sync
SESSION_DRIVER=file
SESSION_LIFETIME=120

MEMCACHED_HOST=127.0.0.1

REDIS_HOST=127.0.0.1
REDIS_PASSWORD=null
REDIS_PORT=6379

MAIL_MAILER=smtp
MAIL_HOST=mailhog
MAIL_PORT=1025
MAIL_USERNAME=null
MAIL_PASSWORD=null
MAIL_ENCRYPTION=null
MAIL_FROM_ADDRESS=null
MAIL_FROM_NAME="${APP_NAME}"

AWS_ACCESS_KEY_ID=
AWS_SECRET_ACCESS_KEY=
AWS_DEFAULT_REGION=us-east-1
AWS_BUCKET=
AWS_USE_PATH_STYLE_ENDPOINT=false

PUSHER_APP_ID=
PUSHER_APP_KEY=
PUSHER_APP_SECRET=
PUSHER_APP_CLUSTER=mt1

MIX_PUSHER_APP_KEY="${PUSHER_APP_KEY}"
MIX_PUSHER_APP_CLUSTER="${PUSHER_APP_CLUSTER}"

SESSION_DRIVER=cookie
SANCTUM_STATEFUL_DOMAINS=localhost:8000,localhost:3000
```

SESSION_DRIVER and SANCTUM_STATEFUL_DOMAINS are required for the authentication to work.
5.Migrate and seed your database
if you configured .env correctly choosing your database name and created it now you have to migrate and seed the database using this command:

```console
php artisan migrate --seed

## How to run
after you installed and configured the project you need to run the laravel api, you can do that running this command:
```console
php artisan serve
```

and you need to run your client so if you are inside the client folder run:

```console
npm run dev
```

or if you are in the root of the project:

```console
cd client/
npm run dev
```

and your project is up and running.
