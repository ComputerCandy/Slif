#!/bin/bash
echo "Slif Installer"
echo "Make sure npm is installed"

if test "$#" -lt 1; then
    echo "Usage: ./install.sh [config file]"
    exit
fi

printf "Copying config: "
rm ./src/config.json
cp $1 ./src/config.json
printf "DONE!\n";




#Webpack the thing after injecting settings;

printf "Webpacking the package: "
npm run build

if [ $? -eq 0 ]; then
    echo "DONE"
else
    echo "ERROR"
    echo "Check the log file for errors."
    exit;
fi

printf "Removing Files: "
rm ./src/config.json
rm ./src/dispconf.json
printf "DONE\n"

printf "Copying in extras: "
cp ./src/index.html ./dist/index.html
cp ./src/systens/lightdm/* ./dist/*
cp ./src/img/ ./dist/img/ -r
printf "DONE\n"

printf "Copying to LightDM (Requires SUDO): \n"
sudo rm -rf /usr/share/lightdm-webkit/themes/slif
sudo mkdir /usr/share/lightdm-webkit/themes/slif
sudo cp -r ./dist/* /usr/share/lightdm-webkit/themes/slif
printf "DONE\n"

echo "Successfully installed into LightDM"
echo "There are a few final steps to complete before you can use SLIF"
echo "Follow them from here: "
echo "https://github.com/ComputerCandy/Slif#LightDM"
