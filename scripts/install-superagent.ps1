param(
    [Parameter(Mandatory = $true)]
    [string]$TargetPath,

    [switch]$AddPlansIgnore
)

$ErrorActionPreference = "Stop"

$repoRoot = Split-Path -Parent $PSScriptRoot
$targetRoot = [System.IO.Path]::GetFullPath($TargetPath)

if (-not (Test-Path -Path $targetRoot -PathType Container)) {
    throw "Target path '$TargetPath' does not exist or is not a directory."
}

$agentFiles = @(
    "superagent.agent.md",
    "Conductor.agent.md",
    "planning-subagent.agent.md",
    "implement-subagent.agent.md",
    "code-review-subagent.agent.md"
)

foreach ($file in $agentFiles) {
    $source = Join-Path $repoRoot $file
    if (-not (Test-Path -Path $source -PathType Leaf)) {
        throw "Missing source file: $source"
    }

    $dest = Join-Path $targetRoot $file
    if ([System.IO.Path]::GetFullPath($source) -eq [System.IO.Path]::GetFullPath($dest)) {
        Write-Host "Skipped $file (already in target)"
        continue
    }
    Copy-Item -Path $source -Destination $dest -Force
    Write-Host "Copied $file"
}

$sourcePlansReadme = Join-Path $repoRoot "plans\README.md"
$targetPlansDir = Join-Path $targetRoot "plans"
$targetPlansReadme = Join-Path $targetPlansDir "README.md"

if (-not (Test-Path -Path $sourcePlansReadme -PathType Leaf)) {
    throw "Missing source file: $sourcePlansReadme"
}

New-Item -ItemType Directory -Path $targetPlansDir -Force | Out-Null
if ([System.IO.Path]::GetFullPath($sourcePlansReadme) -eq [System.IO.Path]::GetFullPath($targetPlansReadme)) {
    Write-Host "Skipped plans/README.md (already in target)"
} else {
    Copy-Item -Path $sourcePlansReadme -Destination $targetPlansReadme -Force
    Write-Host "Copied plans/README.md"
}

if ($AddPlansIgnore) {
    $gitignorePath = Join-Path $targetRoot ".gitignore"

    if (-not (Test-Path -Path $gitignorePath -PathType Leaf)) {
        New-Item -ItemType File -Path $gitignorePath -Force | Out-Null
    }

    $current = Get-Content -Path $gitignorePath -Raw
    $marker = "# Orchestra plan artifacts"
    if ($current -notmatch [regex]::Escape($marker)) {
        Add-Content -Path $gitignorePath -Value "`n$marker`nplans/*-plan.md`nplans/*-phase-*-complete.md`nplans/*-complete.md"
        Write-Host "Updated .gitignore with Orchestra plan artifacts"
    }
}

Write-Host "Superagent setup completed in: $targetRoot"
