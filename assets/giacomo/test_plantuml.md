```plantuml
"browse posts page" as (UC1)
"requests posts list" as (UC2)
actor user
actor server
actor client
user -> UC1
client --> UC1
client --> UC2
server --> UC2

```
```plantuml
client -> localstorage : check if data exists
localstorage --> client : data do not exist
client -> server : request posts
server --> client : sends posts
```
