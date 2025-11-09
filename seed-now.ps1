Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  Seeding Database with Sample Data" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

Set-Location backend

Write-Host "Running seed command..." -ForegroundColor Yellow
npm run seed

Write-Host ""
Write-Host "========================================" -ForegroundColor Green
Write-Host "  Database seeded successfully!" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green
Write-Host ""
Write-Host "You can now login with:" -ForegroundColor White
Write-Host "Admin: admin@grmrobotics.com / Admin123!" -ForegroundColor Yellow
Write-Host "User: john@example.com / User123!" -ForegroundColor Yellow
Write-Host ""
Write-Host "Press any key to close..." -ForegroundColor Gray
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
