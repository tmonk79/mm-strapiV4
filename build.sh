#!/usr/bin/env bash -e

function run_dcomp() {
cd backend/strapiV4
echo -e "NODE_ENV=$1\n"
echo -e "..........Remove cache..........."
rm -rf .cache
echo -e "..........Remove build..........."
rm -rf build
echo -e "..........Remove nginx build folder..........."
rm -rf ../../nginx/build

if [ $1 = 'dev' ]
then
  echo -e "......Running $1 Build......"
 NODE_ENV=development npm run build
elif [ $1 = 'release' ]
then
  echo -e "......Running $1 Build......"
  NODE_ENV=production npm run build
else echo -e "invalid NODE_ENV, please enter dev or release" && exit 1
fi

mv build ../../nginx
cd ../..
echo -e "..........Docker prune..........."
yes | docker system prune
echo -e "..........Run app for $1..........."
docker-compose -f docker-compose.${1:0:3}.yaml up --build
}

read -p "Enter NODE_ENV dev|release: " n_env
run_dcomp $n_env
