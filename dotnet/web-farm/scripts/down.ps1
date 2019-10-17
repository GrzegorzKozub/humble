# Run from root dir with .\scripts\down.ps1

$slnDir = (Get-Item ".").FullName

Push-Location

Set-Location $slnDir
docker-compose down

Pop-Location