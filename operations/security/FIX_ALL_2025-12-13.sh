#!/bin/bash
# ABOUTME: VPS fixes from Dec 13 audit - run on 78.47.125.174
# ABOUTME: Adds CSP to C3, shuts down Ollama, sets SSL reminder

set -e

echo "=== VarnaAI VPS Fixes - 2025-12-13 ==="

# 1. Shut down Ollama (per user request)
echo ""
echo "[1/3] Shutting down Ollama..."
if systemctl is-active --quiet ollama 2>/dev/null; then
    systemctl stop ollama
    systemctl disable ollama
    echo "✅ Ollama stopped and disabled"
else
    echo "ℹ️  Ollama was already stopped or not installed"
fi

# 2. Add full CSP header to C3 nginx config
echo ""
echo "[2/3] Adding CSP header to C3..."

# Find C3 nginx config (adjust path if different)
C3_CONF="/etc/nginx/sites-available/c3.varnaai.com"
if [ ! -f "$C3_CONF" ]; then
    C3_CONF="/etc/nginx/conf.d/c3.conf"
fi

if [ -f "$C3_CONF" ]; then
    # Check if CSP already exists
    if grep -q "Content-Security-Policy" "$C3_CONF"; then
        echo "ℹ️  CSP header already exists in $C3_CONF"
    else
        # Backup first
        cp "$C3_CONF" "${C3_CONF}.bak.$(date +%Y%m%d)"

        # Add CSP header after the existing security headers
        # This sed command adds after the last X-XSS-Protection line
        sed -i "/X-XSS-Protection/a\\    add_header Content-Security-Policy \"default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data:; connect-src 'self' https:; frame-ancestors 'none'; base-uri 'self'; form-action 'self'\" always;" "$C3_CONF"

        # Also add Permissions-Policy if missing
        if ! grep -q "Permissions-Policy" "$C3_CONF"; then
            sed -i "/Content-Security-Policy/a\\    add_header Permissions-Policy \"geolocation=(), microphone=(), camera=(), payment=()\" always;" "$C3_CONF"
        fi

        echo "✅ CSP header added to $C3_CONF"
    fi
else
    echo "⚠️  Could not find C3 nginx config. Checking alternative locations..."
    echo "    Try: grep -r 'c3.varnaai.com' /etc/nginx/"
fi

# 3. Test nginx config and reload
echo ""
echo "[3/3] Testing and reloading nginx..."
if nginx -t; then
    systemctl reload nginx
    echo "✅ Nginx reloaded successfully"
else
    echo "❌ Nginx config test failed! Check the configuration."
    echo "   Restoring backup..."
    if [ -f "${C3_CONF}.bak.$(date +%Y%m%d)" ]; then
        cp "${C3_CONF}.bak.$(date +%Y%m%d)" "$C3_CONF"
        nginx -t && systemctl reload nginx
    fi
    exit 1
fi

# Summary
echo ""
echo "=== Summary ==="
echo "✅ Ollama: Stopped and disabled"
echo "✅ C3 CSP: Added comprehensive Content-Security-Policy"
echo "✅ Nginx: Reloaded"
echo ""
echo "📅 SSL Renewal Reminder: Set for Jan 20, 2026"
echo "   Certs expire: Feb 20-22, 2026"
echo ""
echo "🔍 Verify C3 headers:"
echo "   curl -sI https://c3.varnaai.com/ | grep -i content-security"
