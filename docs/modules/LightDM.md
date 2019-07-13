# LightDM

A module to manage LightDM logins via lightdm-webkit2-greeter

Module Type: `Foreground`

## Config

### enabled

enabled determens if the LightDM signin prompt should be shown.

Type: `boolean`
Allowed Values: `true`, `false`
Default: `true`

### defaultUserId

defaultUserId is the default user id to select when signing in, the user id is not assocuiated with the Linux User's uid, but instead what order they show up in, starting at 0.

Type: `number`
Default: `0`

### timeout

timeout specifys the time in *miliseconds* before the window will shrink back down to small size.

Type: `number`
Default: `10000`

### focusPasswordBoxOnKeystrone

focusPasswordBoxOnKeystrone will determine if when you press a key, and the box enlarges, should the focus be given to the password box or not.

Type: `boolean`
Allowed Values: `true`, `false`
Default: `true`

## Config Example

```json
...
"lightdm": {
    "enabled": true,
    "defaultUserId": 0,
    "timeout": 10000,
    "focusPasswordBoxOnKeystroke": true
}
...
```
