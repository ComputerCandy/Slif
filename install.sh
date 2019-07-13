#!/bin/bash
#Webpack the thing after injecting settings;
cp

sudo rm -rf /usr/share/lightdm-webkit/themes/slif
sudo mkdir /usr/share/lightdm-webkit/themes/slif
sudo cp -r ./dist/* /usr/share/lightdm-webkit/themes/slif

lightdm-webkit2-greeter