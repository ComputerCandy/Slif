# Unsplash

Unsplash is a website full of royalty-free images for you to use.
Unsplash contains thousands of curated lists for all sorts of picutres you would enjoy.

Module Type: `Background`

## Config

### enabled

Should the background be picked from Unsplash?

Type: `boolean`
Allowed Values: `true`, `false`
Default: `true`

### apiEndpoint

The endpoint to query on the Unsplash API, The default value should satisfy most users.
Replaces `%key` with your API Key

Type: `string`
Default: `https://api.unsplash.com/photos/random/?client_id=%key`

### apiKey

The API key we use to query Unsplash's API
To obtain an API key, see [Obtaining an API Key](#obtaining-an-api-key)

Type: `string`
Default: `empty`

### displayLocation

Do we display the location if the image is tagged with one?
Type: `boolean`
Allowed Values: `true`, `false`
Default: `true`

### SearchQuery

The query we pass in when we search for a new image
See the [Unsplash documentation](https://unsplash.com/documentation#get-a-random-photo) for more information on this.
Note: searchTerm is query in the Unsplash Documentation
Type: `object`

### Image Type

Type: `string`
Allowed Values: `raw`, `full`, `regular`, `small`, `thumb`
Default: `raw`

## Config Example

```json
...
"unsplash": {
    "enabled": true,
    "apiEndpoint": "https://api.unsplash.com/photos/random/?client_id=%key",
    "apiKey": "6***************************************************************",
    "displayLocation": true,
    "SearchQuery": {
        "featured": true,
        "username": "",
        "orientation": "",
        "searchTerm": "",
        "collections": [
            142375
        ]
    },
    "ImageType": "raw"
}
...
```

## Obtaining an API Key

1. Join the Unsplash Development Program
2. Navigate to the [Unsplash Applications Portal](https://unsplash.com/oauth/applications)
3. Select New Application
4. Read through the API Use Guidelines and accept everything
5. Fill out your application name, and description. Some examples are `Slif` and `Slif Unsplash Module`
6. Your Access Key is your API Key you can use for the `apiKey` setting

![API Key Demonstration](/screenshots/UA1.png)

## Links

[Unsplash](https://unsplash.com)
