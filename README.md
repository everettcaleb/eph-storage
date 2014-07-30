# eph-storage

A super simple ephemeral storage engine using Node.js.

### Usage

You access the storage engine via a HTTP/REST API.  The API specification is as follows:

`GET /` - Gets a test message to check if the engine is running.  
`GET /<key>` - Gets the value for the specified key, or 404 if it doesn't exist.  
`POST /<key>?value=<value>[&expire=<expire>]` - Sets the value for the specified key, `<expire>` is the TTL for the record in milliseconds. (default is 36000, pass 0 for infinite)  
`DELETE /<key>` - Deletes the key/value pair with the specified key.  

### Architecture

There are three main pieces: storage.js, server.js, and config.js.  Storage is a Javascript prototype-style class for storage and retrieval of key/value pairs.  Server is the code for handling the REST API logic.  Config is pretty much just an object export for settings used by the server logic.
