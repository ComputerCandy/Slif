# Clock

A simple module to let you tell the time

Module Type: `Foreground`

## Config

### enabled

Should the clock be displayed?

Type: `boolean`

Allowed Values: `true`, `false`

Default: `true`

### timeFormat

timeFormat tells the clock module how to display the time, the formatting is losely based on the [.NET DateTime format string](https://docs.microsoft.com/en-us/dotnet/standard/base-types/custom-date-and-time-format-strings)

Type: `string`

Default: `hh:mm`

## updateInterval

updateInterval is the time in miliseconds it takes to refresh the clock, the lower the value the more accurate it will be.

Type: `number`
Default: `1000`

## Config Example

```json
...
"clock": {
    "enabled": true,
    "timeFormat": "hh:mm",
    "updateInterval": 1000
}
...
```
