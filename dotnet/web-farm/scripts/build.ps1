# Run from root dir with .\scripts\build.ps1

$slnDir = (Get-Item ".").FullName
$outDir = Join-Path $slnDir "out"
$apiDir = Join-Path $slnDir "src\Api"
$apiOutDir = Join-Path $outDir "Api"

Push-Location

Set-Location $slnDir
dotnet restore

Remove-Item $outDir -Force -Recurse -ErrorAction SilentlyContinue
New-Item $outDir -ItemType Directory | Out-Null

Set-Location $apiDir
dotnet publish --output $apiOutDir

Set-Location $apiOutDir
docker rmi web-farm-api -f
docker build -t web-farm-api .

Pop-Location