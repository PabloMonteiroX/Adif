# ADIF OEP 2026 — iOS/PWA final

Versión estática optimizada para iPhone/Safari.

## Características

- PWA instalable en iOS mediante Safari → Compartir → Añadir a pantalla de inicio.
- `safe-area` para Dynamic Island y zona inferior.
- Navegación inferior tipo app.
- Sin Google Fonts ni dependencias externas.
- 162 preguntas integradas en `index.html`.
- Progreso persistente mediante `localStorage`.
- Service Worker con caché local.
- Animaciones de tren pixel-art hechas exclusivamente con CSS.
- `prefers-reduced-motion` respetado.
- Funciona como sitio estático.

## Servidor

Servir esta carpeta mediante HTTPS.

### Nginx

```nginx
server {
    listen 443 ssl http2;
    server_name adif.tudominio.es;

    root /var/www/adif;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    location = /sw.js {
        add_header Cache-Control "no-cache";
    }

    location = /manifest.webmanifest {
        add_header Content-Type "application/manifest+json";
    }
}
```

### Caddy

```caddy
adif.tudominio.es {
    root * /var/www/adif
    encode gzip
    file_server
}
```

## iPhone

1. Abrir la URL HTTPS en Safari.
2. Compartir.
3. `Añadir a pantalla de inicio`.
4. Abrir el icono desde la pantalla de inicio.

La aplicación quedará en modo `standalone`, sin la barra normal de Safari.
