# ABOUTME: VarnaAI Docker Manager - prevents cross-app Docker conflicts
# ABOUTME: Each app uses explicit project names for complete isolation

param(
    [Parameter(Position=0)]
    [ValidateSet("start", "stop", "restart", "logs", "status", "menu", "")]
    [string]$Action = "menu",

    [Parameter(Position=1)]
    [ValidateSet("all", "pension", "c3", "fwchange", "librechat", "")]
    [string]$App = ""
)

$apps = @{
    "pension"   = @{ path = "D:\VarnaAI\pension";    project = "pension";   port = 3001 }
    "c3"        = @{ path = "D:\VarnaAI\dashboard";  project = "c3";        port = 3002 }
    "fwchange"  = @{ path = "D:\VarnaAI\fwchange";   project = "fwchange";  port = 3003 }
    "librechat" = @{ path = "D:\VarnaAI\LibreChat";  project = "librechat"; port = 3080 }
}

function Show-Menu {
    Write-Host ""
    Write-Host "╔══════════════════════════════════════════════════════════════╗" -ForegroundColor Cyan
    Write-Host "║           VarnaAI Docker Manager - Big Dick Edition          ║" -ForegroundColor Cyan
    Write-Host "╠══════════════════════════════════════════════════════════════╣" -ForegroundColor Cyan
    Write-Host "║  App           │ Port  │ Status                              ║" -ForegroundColor Cyan
    Write-Host "╠══════════════════════════════════════════════════════════════╣" -ForegroundColor Cyan

    foreach ($name in $apps.Keys | Sort-Object) {
        $app = $apps[$name]
        $containers = docker ps --filter "name=$($app.project)-" --format "{{.Names}}" 2>$null
        $status = if ($containers) { "✅ Running" } else { "⏹️ Stopped" }
        $paddedName = $name.PadRight(14)
        Write-Host "║  $paddedName │ $($app.port)  │ $status" -ForegroundColor White
    }

    Write-Host "╠══════════════════════════════════════════════════════════════╣" -ForegroundColor Cyan
    Write-Host "║  Commands:                                                    ║" -ForegroundColor Cyan
    Write-Host "║    1. Start app       5. View logs                           ║" -ForegroundColor White
    Write-Host "║    2. Stop app        6. Status (detailed)                   ║" -ForegroundColor White
    Write-Host "║    3. Restart app     7. Start ALL                           ║" -ForegroundColor White
    Write-Host "║    4. Stop ALL        8. Exit                                ║" -ForegroundColor White
    Write-Host "╚══════════════════════════════════════════════════════════════╝" -ForegroundColor Cyan
    Write-Host ""
}

function Start-App($name) {
    $app = $apps[$name]
    if (-not $app) { Write-Host "Unknown app: $name" -ForegroundColor Red; return }

    Write-Host "Starting $name..." -ForegroundColor Green
    Push-Location $app.path
    $env:COMPOSE_PROJECT_NAME = $app.project
    docker compose up -d
    Pop-Location
    Write-Host "$name started on port $($app.port)" -ForegroundColor Green
}

function Stop-App($name) {
    $app = $apps[$name]
    if (-not $app) { Write-Host "Unknown app: $name" -ForegroundColor Red; return }

    Write-Host "Stopping $name..." -ForegroundColor Yellow
    Push-Location $app.path
    $env:COMPOSE_PROJECT_NAME = $app.project
    docker compose down
    Pop-Location
    Write-Host "$name stopped" -ForegroundColor Yellow
}

function Show-Logs($name) {
    $app = $apps[$name]
    if (-not $app) { Write-Host "Unknown app: $name" -ForegroundColor Red; return }

    Push-Location $app.path
    $env:COMPOSE_PROJECT_NAME = $app.project
    docker compose logs -f --tail=100
    Pop-Location
}

function Show-Status {
    Write-Host ""
    Write-Host "═══════════════════════════════════════════════════════════════" -ForegroundColor Cyan
    Write-Host "                    CONTAINER STATUS" -ForegroundColor Cyan
    Write-Host "═══════════════════════════════════════════════════════════════" -ForegroundColor Cyan
    docker ps --format "table {{.Names}}\t{{.Status}}\t{{.Ports}}" | ForEach-Object {
        if ($_ -match "pension") { Write-Host $_ -ForegroundColor Blue }
        elseif ($_ -match "c3") { Write-Host $_ -ForegroundColor Green }
        elseif ($_ -match "fwchange") { Write-Host $_ -ForegroundColor Magenta }
        elseif ($_ -match "librechat|ollama|mongo|meili|rag|vector") { Write-Host $_ -ForegroundColor Yellow }
        else { Write-Host $_ }
    }
}

# Main logic
switch ($Action) {
    "start"   { if ($App -eq "all") { foreach ($n in $apps.Keys) { Start-App $n } } else { Start-App $App } }
    "stop"    { if ($App -eq "all") { foreach ($n in $apps.Keys) { Stop-App $n } } else { Stop-App $App } }
    "restart" { Stop-App $App; Start-App $App }
    "logs"    { Show-Logs $App }
    "status"  { Show-Status }
    "menu"    {
        while ($true) {
            Show-Menu
            $choice = Read-Host "Select option"
            switch ($choice) {
                "1" { $a = Read-Host "App name (pension/c3/fwchange/librechat)"; Start-App $a }
                "2" { $a = Read-Host "App name"; Stop-App $a }
                "3" { $a = Read-Host "App name"; Stop-App $a; Start-App $a }
                "4" { foreach ($n in $apps.Keys) { Stop-App $n } }
                "5" { $a = Read-Host "App name"; Show-Logs $a }
                "6" { Show-Status }
                "7" { foreach ($n in $apps.Keys) { Start-App $n } }
                "8" { exit }
                default { Write-Host "Invalid option" -ForegroundColor Red }
            }
        }
    }
}

Write-Host ""
Write-Host "Usage: .\docker-manager.ps1 [start|stop|restart|logs|status|menu] [app|all]" -ForegroundColor Gray
Write-Host "Examples:" -ForegroundColor Gray
Write-Host "  .\docker-manager.ps1 start pension" -ForegroundColor Gray
Write-Host "  .\docker-manager.ps1 stop all" -ForegroundColor Gray
Write-Host "  .\docker-manager.ps1 logs c3" -ForegroundColor Gray
