# ABOUTME: Makefile for VarnaAI deployment operations
# ABOUTME: Run 'make help' for available commands

.PHONY: help up down logs restart clean backup restore preflight deploy-demo deploy-prod

# Default environment
ENV ?= demo
COMPOSE_BASE := docker-compose -f compose/compose.shared.yml
COMPOSE_APP :=
PROFILE ?= full

# Color output
RED := \033[0;31m
GREEN := \033[0;32m
YELLOW := \033[1;33m
NC := \033[0m # No Color

help: ## Show this help
	@echo "VarnaAI Deployment Operations"
	@echo "=============================="
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-20s\033[0m %s\n", $$1, $$2}'

# === ENVIRONMENT SETUP ===

init: ## Initialize environment files
	@echo "$(GREEN)Initializing environment...$(NC)"
	@mkdir -p ops/{env,compose,scripts,monitoring,backup}
	@[ -f ops/env/.env ] || cp ops/env/.env.example ops/env/.env
	@echo "$(YELLOW)Edit ops/env/.env with your values$(NC)"

check-env: ## Validate environment variables
	@echo "$(GREEN)Checking environment...$(NC)"
	@[ -f ops/env/.env ] || (echo "$(RED)Missing .env file! Run 'make init' first$(NC)" && exit 1)
	@./scripts/check-env.sh

# === DOCKER OPERATIONS ===

up: check-env ## Start all services with selected profile
	@echo "$(GREEN)Starting services (profile: $(PROFILE))...$(NC)"
	cd ops && $(COMPOSE_BASE) --profile $(PROFILE) up -d
	@echo "$(GREEN)Services started! Run 'make logs' to view$(NC)"

up-demo: ## Start demo services only
	@make up PROFILE=demo

up-secure: ## Start with Cloudflare Tunnel (secure mode)
	@make up PROFILE=secure

down: ## Stop all services
	@echo "$(YELLOW)Stopping services...$(NC)"
	cd ops && $(COMPOSE_BASE) --profile $(PROFILE) down
	@echo "$(GREEN)Services stopped$(NC)"

restart: ## Restart all services
	@make down
	@sleep 2
	@make up

logs: ## Show service logs (use SERVICE=name for specific)
	cd ops && $(COMPOSE_BASE) logs -f $(SERVICE)

ps: ## Show running services
	cd ops && $(COMPOSE_BASE) ps

clean: ## Remove all containers and volumes (DESTRUCTIVE!)
	@echo "$(RED)WARNING: This will delete all data!$(NC)"
	@echo "Press Ctrl+C to cancel, or Enter to continue..."
	@read confirm
	cd ops && $(COMPOSE_BASE) down -v
	@echo "$(GREEN)Cleanup complete$(NC)"

# === APPLICATION DEPLOYMENT ===

deploy-app: check-env ## Deploy specific app (use APP=agenticcoder)
	@[ -n "$(APP)" ] || (echo "$(RED)Please specify APP=<appname>$(NC)" && exit 1)
	@echo "$(GREEN)Deploying $(APP)...$(NC)"
	cd apps/$(APP) && docker-compose up -d --build
	@echo "$(GREEN)$(APP) deployed!$(NC)"

deploy-all: ## Deploy all applications
	@echo "$(GREEN)Deploying all applications...$(NC)"
	@make deploy-app APP=agenticcoder
	@make deploy-app APP=c3-dashboard
	@make deploy-app APP=varnaai-platform
	@make deploy-app APP=fwchange
	@make deploy-app APP=pension
	@echo "$(GREEN)All applications deployed!$(NC)"

# === DEMO OPERATIONS ===

demo-start: ## Start demo environment
	@echo "$(GREEN)Starting demo environment...$(NC)"
	@make init
	@make up-secure
	@./scripts/seed-demo-data.sh
	@make preflight
	@echo "$(GREEN)Demo ready! Access via Cloudflare Tunnel$(NC)"

demo-stop: ## Stop demo environment (preserves data)
	@echo "$(YELLOW)Stopping demo...$(NC)"
	@make down
	@echo "$(GREEN)Demo stopped (data preserved)$(NC)"

demo-reset: ## Reset demo to clean state
	@echo "$(YELLOW)Resetting demo environment...$(NC)"
	@make clean
	@make demo-start

# === VALIDATION ===

preflight: ## Run preflight checks before demo
	@echo "$(GREEN)Running preflight checks...$(NC)"
	@./scripts/preflight-check.sh
	@echo "$(GREEN)Preflight complete!$(NC)"

health: ## Check health of all services
	@echo "$(GREEN)Checking service health...$(NC)"
	@./scripts/health-check.sh

test-apps: ## Run application tests
	@echo "$(GREEN)Running application tests...$(NC)"
	@./scripts/test-apps.sh

validate-ssl: ## Validate SSL certificates
	@echo "$(GREEN)Checking SSL certificates...$(NC)"
	@./scripts/check-ssl.sh

# === BACKUP & RESTORE ===

backup: ## Create backup of databases and volumes
	@echo "$(GREEN)Creating backup...$(NC)"
	@./scripts/backup.sh
	@echo "$(GREEN)Backup complete!$(NC)"

restore: ## Restore from backup (use BACKUP_DATE=YYYY-MM-DD)
	@[ -n "$(BACKUP_DATE)" ] || (echo "$(RED)Please specify BACKUP_DATE=YYYY-MM-DD$(NC)" && exit 1)
	@echo "$(YELLOW)Restoring from $(BACKUP_DATE)...$(NC)"
	@./scripts/restore.sh $(BACKUP_DATE)
	@echo "$(GREEN)Restore complete!$(NC)"

backup-test: ## Test backup restoration process
	@echo "$(GREEN)Testing backup/restore...$(NC)"
	@./scripts/test-backup-restore.sh
	@echo "$(GREEN)Backup test successful!$(NC)"

# === MONITORING ===

monitor: ## Open monitoring dashboards
	@echo "$(GREEN)Opening monitoring dashboards...$(NC)"
	@echo "Grafana: http://monitor.$(shell grep DOMAIN_BASE ops/env/.env | cut -d= -f2)"
	@echo "Username: admin"
	@echo "Password: $(shell grep GRAFANA_ADMIN_PASSWORD ops/env/.env | cut -d= -f2)"

metrics: ## Show current metrics
	@./scripts/show-metrics.sh

alerts: ## Show active alerts
	@./scripts/show-alerts.sh

# === PRODUCTION OPERATIONS ===

prod-deploy: ## Deploy to production (requires confirmation)
	@echo "$(RED)PRODUCTION DEPLOYMENT$(NC)"
	@echo "This will deploy to production. Type 'DEPLOY' to confirm:"
	@read confirm && [ "$$confirm" = "DEPLOY" ] || exit 1
	@make preflight ENV=production
	@make up PROFILE=full ENV=production
	@echo "$(GREEN)Production deployment complete!$(NC)"

prod-rollback: ## Rollback production to previous version
	@echo "$(YELLOW)Rolling back production...$(NC)"
	@./scripts/rollback.sh
	@echo "$(GREEN)Rollback complete!$(NC)"

# === DEVELOPMENT ===

dev: ## Start local development environment
	@echo "$(GREEN)Starting local development...$(NC)"
	cd ops && $(COMPOSE_BASE) --profile db --profile cache up -d
	@echo "$(GREEN)Local services ready!$(NC)"
	@echo "Database: postgresql://postgres:password@localhost:5432"
	@echo "Redis: redis://localhost:6379"

dev-reset: ## Reset local development databases
	@echo "$(YELLOW)Resetting development databases...$(NC)"
	@make down PROFILE=db
	@docker volume rm varnaai_postgres_data varnaai_redis_data 2>/dev/null || true
	@make dev
	@echo "$(GREEN)Development environment reset!$(NC)"

# === UTILITIES ===

shell: ## Open shell in container (use SERVICE=name)
	@[ -n "$(SERVICE)" ] || (echo "$(RED)Please specify SERVICE=<name>$(NC)" && exit 1)
	cd ops && $(COMPOSE_BASE) exec $(SERVICE) sh

db-shell: ## Open PostgreSQL shell
	cd ops && $(COMPOSE_BASE) exec postgres psql -U postgres

redis-cli: ## Open Redis CLI
	cd ops && $(COMPOSE_BASE) exec redis redis-cli

logs-export: ## Export logs for debugging
	@echo "$(GREEN)Exporting logs...$(NC)"
	@mkdir -p exports
	cd ops && $(COMPOSE_BASE) logs --no-color > ../exports/logs-$$(date +%Y%m%d-%H%M%S).txt
	@echo "$(GREEN)Logs exported to exports/$(NC)"

# === CI/CD ===

ci-build: ## Build all Docker images (CI)
	@echo "$(GREEN)Building Docker images...$(NC)"
	@./scripts/ci-build.sh

ci-test: ## Run CI tests
	@echo "$(GREEN)Running CI tests...$(NC)"
	@./scripts/ci-test.sh

ci-scan: ## Security scan images
	@echo "$(GREEN)Scanning images for vulnerabilities...$(NC)"
	@./scripts/ci-scan.sh

# === SHORTCUTS ===

s: ps ## Alias for ps (show services)
l: logs ## Alias for logs
u: up ## Alias for up
d: down ## Alias for down
r: restart ## Alias for restart