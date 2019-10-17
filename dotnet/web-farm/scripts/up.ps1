# Run from root dir with .\scripts\up.ps1

$slnDir = (Get-Item ".").FullName

Push-Location

Set-Location $slnDir
docker-compose up --scale web-farm-api=3

Pop-Location