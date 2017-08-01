#!/bin/bash

rm -rf lib
git clone https://github.com/OpenEtherCATsociety/SOEM.git lib
cd lib
#sed -i -- 's/STATIC/SHARED/g' CMakeLists.txt
sed -i "/target_link_libraries(soem\ pthread\ rt)/a \ \ set_property(TARGET soem PROPERTY POSITION_INDEPENDENT_CODE ON)" CMakeLists.txt
mkdir build
cd build
cmake ..
make
cd ..
#cp build/libsoem.so /usr/local/lib
cd ..

