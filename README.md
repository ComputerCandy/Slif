# Slif
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/004a0d626efa4c56b852784857c4a984)](https://app.codacy.com/app/ComputerCandy/Slif?utm_source=github.com&utm_medium=referral&utm_content=ComputerCandy/Slif&utm_campaign=Badge_Grade_Dashboard)

A Lockscreen designed for LightDM, but made to work with other platforms.
Slif contains a modular design, allowing for 

## Installing
### LightDM
 1. Download the latest build from [here](https://github.com/ComputerCandy/Slif/archive/master.zip)
 2. Extract the build
 3. Make sure that `lightdm-webkit2-greeter (v2.2.5)` is installed
 4. Make sure the install file has execute permissions `$ chmod +x ./install.sh`
 5. Make a copy of `settings.template.json` and tweak to your likings
 5. Run `$ ./install.sh [config file]`
 6. Edit `/etc/lightdm/lightdm-webkit2-greeter.conf` and change `theme` to `slif` and set `secure_mode` to `false`

## Screenshots
![Screenshot 1](/screenshots/1.png?raw=true)
![Screenshot 2](/screenshots/2.png?raw=true)

## Known Issues
Currenly there is an issue in webkit with `filter:blur()` in the CSS engine, cropping the elements to ~4000px, this directly effects Slif running in LightDM Mode, as cann be seen in the second screenshot.