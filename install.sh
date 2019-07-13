#!/bin/bash
echo "Slif Installer"
echo "Make sure npm is installed"

if test "$#" -lt 1; then
    echo "Usage: ./install.sh [config file]"
    exit
fi

printf "Copying config: "
rm ./src/config.json >> current.log
cp $1 ./src/config.json >> current.log
printf "DONE!\n";




#Webpack the thing after injecting settings;

printf "Webpacking the package: "
npm run build >> current.log

if [ $? -eq 0 ]; then
    echo "DONE"
else
    echo "ERROR"
    echo "Check the log file for errors."
    exit;
fi

printf "Removing Files: "
rm ./src/config.json >> current.log
rm ./src/dispconf.json >> current.log
printf "DONE\n"

printf "Copying in extras: "
cp ./src/index.html ./dist/index.html >> current.log
cp ./src/index.theme ./dist/index.theme >> current.log
printf "DONE\n"

printf "Copying to LightDM (Requires SUDO): \n"
sudo rm -rf /usr/share/lightdm-webkit/themes/slif >> current.log
sudo mkdir /usr/share/lightdm-webkit/themes/slif >> current.log
sudo cp -r ./dist/* /usr/share/lightdm-webkit/themes/slif >> current.log
printf "DONE\n"

echo "Successfully installed into LightDM"
echo "There are a few final steps to complete before you can use SLIF"
echo "Follow them from here: "
echo "https://github.com/ComputerCandy/Slif#LightDM"
