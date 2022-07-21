$currentLocation = Get-Location
& "npm" install
& Set-Location .\client
& "npm" install
& "npx" quasar build
Set-Location $currentLocation
& "npm" install
& "npm" run build
& Set-Location .\build\wgo-base
& "npm" install
& Set-Location .\build\wgo-swisspay
& "npm" install
Set-Location $currentLocation
Copy-Item ..\wgo-base\package-lock.json -Destination .\build\wgo-base\
Copy-Item ..\wgo-base\package.json -Destination .\build\wgo-base\
& "npm" install
Set-Location $currentLocation
Copy-Item .\package-lock.json -Destination .\build\wgo-swisspay\
Copy-Item .\package.json -Destination .\build\wgo-swisspay\
& "npm" install
& "node" index.js 