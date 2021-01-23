# nordic-doc-titles

Before:

<img src="https://raw.githubusercontent.com/fridtjof/nordic-doc-titles/main/screenshots/before.png" width="30%" height="30%">

After:

<img src="https://raw.githubusercontent.com/fridtjof/nordic-doc-titles/main/screenshots/after.png" width="28%" height="28%">

[Get it here!](https://addons.mozilla.org/de/firefox/addon/nordic-doc-titles/)

This could also work with other sites that use the same tool for documentation, but I have only tested this on Nordic's page.

# Development

## Preparation:

Install `web-ext`:

```
npm install web-ext
```

## Run

```
web-ext run
```

## Build

```
web-ext build
```

## Todo

* a logo

## Releasing

* Update version in `manifest.json`
* `web-ext build`
* Sign as specified further below
* create a new release on GitHub with the tag = version number, but prefixed with 'v'
* attach the .xpi to the release and copy the link to it by right clicking on the file in the release list
* add the new version to update.json, using the link you just copied

## Signing

Key and Secret can be obtained with an Mozilla Addons account.

ID has to be specified if you're not @fridtjof (I signed 0.0.1 with my account, and I think IDs are global)
```
web-ext sign --api-key="" --api-secret="" --id=""
```

