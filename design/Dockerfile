# ABOUTME: Dockerfile for VarnaAI Design System static site
# ABOUTME: Serves HTML/CSS mockups via nginx on port 80

FROM nginx:alpine

# Copy static files to nginx html directory
COPY . /usr/share/nginx/html/

# Remove unnecessary files from the image
RUN rm -f /usr/share/nginx/html/Dockerfile \
    /usr/share/nginx/html/docker-compose.yml \
    /usr/share/nginx/html/.dockerignore \
    /usr/share/nginx/html/nginx.conf

# Copy custom nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 80

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD wget --quiet --tries=1 --spider http://localhost/ || exit 1
