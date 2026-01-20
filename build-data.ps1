$itemsDir = Join-Path $PSScriptRoot "items"
$outputFile = Join-Path $PSScriptRoot "data.js"

if (-not (Test-Path $itemsDir)) {
    Write-Error "Items directory not found!"
    exit 1
}

$files = Get-ChildItem -Path $itemsDir -Include *.txt, *.json -Recurse
$allData = @()

foreach ($file in $files) {
    try {
        $content = Get-Content -Path $file.FullName -Raw
        $json = $content | ConvertFrom-Json
        $allData += $json
    }
    catch {
        Write-Warning "Error parsing JSON in file $($file.Name): $_"
    }
}

$jsonString = $allData | ConvertTo-Json -Depth 10
$finalContent = "const stockData = $jsonString;"

Set-Content -Path $outputFile -Value $finalContent -Encoding UTF8
Write-Host "Successfully combined $($allData.Count) items into data.js"
