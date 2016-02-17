#!/bin/bash

rm -rf lib
git clone https://github.com/OpenEtherCATsociety/SOEM.git lib
cd lib
sed -i -- 's/STATIC/SHARED/g' CMakeLists.txt
mkdir build
cd build
cmake ..
make
cd ..
cp build/libsoem.so /usr/local/lib
cd ..

