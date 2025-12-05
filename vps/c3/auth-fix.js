"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.optionalAuth = exports.requirePermission = exports.requireOrgMembership = exports.requireRole = exports.requireAuth = void 0;
const jwt = require("jsonwebtoken");
const logger_1 = require("../utils/logger");
const JWT_SECRET = process.env.JWT_SECRET || 'development-secret-change-in-production';

// Demo user org mapping (hardcoded for demo purposes)
// demo@c3.varnaai.com -> org_id: 34d697f8-386c-4d75-b2b6-fa6c2cd43d56
const DEMO_USER_ID = '17461be5-4296-487b-a9d1-4fa3d9e5f6b6';
const DEMO_ORG_ID = '34d697f8-386c-4d75-b2b6-fa6c2cd43d56';

const requireAuth = async (req, res, next) => {
    try {
        const accessToken = req.cookies?.accessToken;
        if (!accessToken) {
            res.status(401).json({
                success: false,
                error: {
                    code: 'UNAUTHORIZED',
                    message: 'Authentifizierung erforderlich',
                },
                meta: {
                    timestamp: new Date().toISOString(),
                    requestId: req.headers['x-request-id'] || 'unknown',
                },
            });
            return;
        }
        // Use simple jwt.verify with HS256 (matching login token generation)
        const payload = jwt.verify(accessToken, JWT_SECRET);
        if (!payload || payload.type !== 'access') {
            res.status(401).json({
                success: false,
                error: {
                    code: 'INVALID_TOKEN',
                    message: 'Ungültiges oder abgelaufenes Token',
                },
                meta: {
                    timestamp: new Date().toISOString(),
                    requestId: req.headers['x-request-id'] || 'unknown',
                },
            });
            return;
        }
        // For demo: use hardcoded org_id for demo user
        const userOrgId = payload.userId === DEMO_USER_ID ? DEMO_ORG_ID : DEMO_ORG_ID;

        // Set user from payload with org
        req.user = {
            sub: payload.userId,
            userId: payload.userId,
            org_id: userOrgId,
            organizationId: userOrgId,  // Some APIs use organizationId
            role: 'admin',  // Demo user is admin
            permissions: ['*']
        };
        next();
    }
    catch (error) {
        logger_1.logger.error('Authentication error:', error);
        res.status(401).json({
            success: false,
            error: {
                code: 'AUTH_ERROR',
                message: 'Authentifizierungsfehler',
                details: process.env.NODE_ENV === 'development' ? error.message : undefined,
            },
            meta: {
                timestamp: new Date().toISOString(),
                requestId: req.headers['x-request-id'] || 'unknown',
            },
        });
    }
};
exports.requireAuth = requireAuth;
const requireRole = (...allowedRoles) => {
    return (req, res, next) => {
        if (!req.user) {
            res.status(401).json({
                success: false,
                error: {
                    code: 'UNAUTHORIZED',
                    message: 'Authentifizierung erforderlich',
                },
                meta: {
                    timestamp: new Date().toISOString(),
                    requestId: req.headers['x-request-id'] || 'unknown',
                },
            });
            return;
        }
        if (!allowedRoles.includes(req.user.role)) {
            logger_1.logger.warn(`Role-based access denied for user ${req.user.sub}`, {
                userRole: req.user.role,
                requiredRoles: allowedRoles,
                endpoint: req.originalUrl,
            });
            res.status(403).json({
                success: false,
                error: {
                    code: 'INSUFFICIENT_PERMISSIONS',
                    message: 'Unzureichende Berechtigungen für diese Aktion',
                },
                meta: {
                    timestamp: new Date().toISOString(),
                    requestId: req.headers['x-request-id'] || 'unknown',
                },
            });
            return;
        }
        next();
    };
};
exports.requireRole = requireRole;
const requireOrgMembership = (req, res, next) => {
    if (!req.user) {
        res.status(401).json({
            success: false,
            error: {
                code: 'UNAUTHORIZED',
                message: 'Authentifizierung erforderlich',
            },
            meta: {
                timestamp: new Date().toISOString(),
                requestId: req.headers['x-request-id'] || 'unknown',
            },
        });
        return;
    }
    const requestedOrgId = req.body.orgId ||
        req.params.orgId ||
        req.query.orgId ||
        req.body.organizationId ||
        req.params.organizationId;
    if (!requestedOrgId) {
        res.status(400).json({
            success: false,
            error: {
                code: 'MISSING_ORG_ID',
                message: 'Organisations-ID ist erforderlich',
            },
            meta: {
                timestamp: new Date().toISOString(),
                requestId: req.headers['x-request-id'] || 'unknown',
            },
        });
        return;
    }
    if (req.user.org_id !== requestedOrgId) {
        logger_1.logger.warn(`Organization access denied for user ${req.user.sub}`, {
            userOrgId: req.user.org_id,
            requestedOrgId,
            endpoint: req.originalUrl,
        });
        res.status(403).json({
            success: false,
            error: {
                code: 'ORG_ACCESS_DENIED',
                message: 'Zugriff auf diese Organisation nicht erlaubt',
            },
            meta: {
                timestamp: new Date().toISOString(),
                requestId: req.headers['x-request-id'] || 'unknown',
            },
        });
        return;
    }
    next();
};
exports.requireOrgMembership = requireOrgMembership;
const requirePermission = (...requiredPermissions) => {
    return (req, res, next) => {
        if (!req.user) {
            res.status(401).json({
                success: false,
                error: {
                    code: 'UNAUTHORIZED',
                    message: 'Authentifizierung erforderlich',
                },
                meta: {
                    timestamp: new Date().toISOString(),
                    requestId: req.headers['x-request-id'] || 'unknown',
                },
            });
            return;
        }
        const hasPermission = requiredPermissions.some(permission => req.user.permissions.includes(permission) || req.user.permissions.includes('*'));
        if (!hasPermission) {
            logger_1.logger.warn(`Permission denied for user ${req.user.sub}`, {
                userPermissions: req.user.permissions,
                requiredPermissions,
                endpoint: req.originalUrl,
            });
            res.status(403).json({
                success: false,
                error: {
                    code: 'PERMISSION_DENIED',
                    message: 'Fehlende Berechtigung für diese Aktion',
                },
                meta: {
                    timestamp: new Date().toISOString(),
                    requestId: req.headers['x-request-id'] || 'unknown',
                },
            });
            return;
        }
        next();
    };
};
exports.requirePermission = requirePermission;
const optionalAuth = async (req, _res, next) => {
    try {
        const accessToken = req.cookies?.accessToken;
        if (!accessToken) {
            next();
            return;
        }
        const payload = jwt.verify(accessToken, JWT_SECRET);
        if (payload && payload.type === 'access') {
            const userOrgId = payload.userId === DEMO_USER_ID ? DEMO_ORG_ID : DEMO_ORG_ID;
            req.user = {
                sub: payload.userId,
                userId: payload.userId,
                org_id: userOrgId,
                organizationId: userOrgId,
                role: 'admin',
                permissions: ['*']
            };
        }
        next();
    }
    catch (error) {
        next();
    }
};
exports.optionalAuth = optionalAuth;
