#!/bin/bash -e

echo -e "......Running Build......"
npm run build
echo -e "......Finished Build......"
echo -e "......Remove old Build folder......"
rm -rf ../../nginx/build
echo -e "......Move new Build to nginx......"
mv build ../../nginx
echo -e "......Done with Success......"
