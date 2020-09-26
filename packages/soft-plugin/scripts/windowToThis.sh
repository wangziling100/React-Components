#!/bin/bash
# get all filename in specified path

echo $0
old_dir=`pwd`
path="dist"
files=$(ls $path)
cd dist
for filename in $files
do
   # replace "window" with "this"
   sed -i 's/window/this/g' $filename
done
cd $old_dir