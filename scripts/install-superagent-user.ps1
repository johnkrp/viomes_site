$ErrorActionPreference = "Stop"

$repoRoot = Split-Path -Parent $PSScriptRoot
$userPrompts = Join-Path $env:APPDATA "Code\User\prompts"

New-Item -ItemType Directory -Path $userPrompts -Force | Out-Null

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

    $dest = Join-Path $userPrompts $file
    Copy-Item -Path $source -Destination $dest -Force
    Write-Host "Installed $file to user prompts"
}

Write-Host "User-level superagent installation complete: $userPrompts"
