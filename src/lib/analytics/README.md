# 📊 Analytics Module

Este módulo proporciona utilidades para rastrear eventos con Google Analytics 4 (GA4).

## 🚀 Inicio Rápido

### Configuración

1. Agrega tu Measurement ID en `.env.local`:

```env
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

2. Reinicia el servidor de desarrollo:

```bash
pnpm dev
```

### Uso Básico

```tsx
import { trackEvent } from "@/lib/analytics/gtag";

// Rastrear suscripción de email
trackEvent.emailSubscribe("usuario@example.com", true);

// Rastrear selección de candidato
trackEvent.compareCandidate("candidate-123", "Juan Pérez");

// Rastrear clic en CTA
trackEvent.ctaClick("Suscribirse", "hero-section");
```

## 📋 Eventos Predefinidos

| Función                                             | Descripción                        | Parámetros                                              |
| --------------------------------------------------- | ---------------------------------- | ------------------------------------------------------- |
| `trackEvent.emailSubscribe(email, termsAccepted)`   | Suscripción de email               | email: string, termsAccepted: boolean                   |
| `trackEvent.compareCandidate(id, name)`             | Selección de candidato             | id: string, name: string                                |
| `trackEvent.comparisonTabChange(tabName)`           | Cambio de tab en comparación       | tabName: string                                         |
| `trackEvent.ctaClick(ctaName, location)`            | Clic en botón CTA                  | ctaName: string, location: string                       |
| `trackEvent.volunteerFormSubmit()`                  | Envío de formulario de voluntarios | -                                                       |
| `trackEvent.search(searchTerm)`                     | Búsqueda                           | searchTerm: string                                      |
| `trackEvent.share(method, contentType, contentId?)` | Compartir en redes sociales        | method: string, contentType: string, contentId?: string |
| `trackEvent.error(message, location)`               | Error en la aplicación             | message: string, location: string                       |
| `trackEvent.pwaInstall()`                           | Instalación de PWA                 | -                                                       |
| `trackEvent.pwaUpdate()`                            | Actualización de PWA               | -                                                       |

## 🎯 Ejemplos Comunes

### Rastrear clic en botón

```tsx
<Button
  onClick={() => {
    trackEvent.ctaClick("Ver Candidatos", "navigation");
    router.push("/compara");
  }}
>
  Ver Candidatos
</Button>
```

### Rastrear selección en dropdown

```tsx
<Select
  onChange={(value) => {
    trackEvent.compareCandidate(value, getCandidateName(value));
    handleCandidateChange(value);
  }}
>
  {/* options */}
</Select>
```

### Rastrear búsqueda

```tsx
<Input
  onKeyDown={(e) => {
    if (e.key === "Enter") {
      trackEvent.search(e.currentTarget.value);
      performSearch(e.currentTarget.value);
    }
  }}
/>
```

### Rastrear compartir

```tsx
<Button
  onClick={() => {
    trackEvent.share("twitter", "candidate", candidateId);
    shareOnTwitter(candidateUrl);
  }}
>
  Compartir en Twitter
</Button>
```

## 🔧 Eventos Personalizados

Para eventos que no están predefinidos, usa la función `event()`:

```tsx
import { event } from "@/lib/analytics/gtag";

event("custom_event_name", {
  param1: "value1",
  param2: 123,
  param3: true,
});
```

## 📊 Ver Datos en Google Analytics

1. Ve a [Google Analytics](https://analytics.google.com/)
2. Selecciona tu propiedad
3. **Tiempo Real** → Ver eventos en tiempo real
4. **Informes** → **Eventos** → Ver todos los eventos capturados

## 🔍 Depuración

### Verificar que GA está cargado

```javascript
// En la consola del navegador
console.log(window.gtag);
console.log(window.dataLayer);
```

### Ver todos los eventos en consola

Instala la extensión [Google Analytics Debugger](https://chrome.google.com/webstore/detail/google-analytics-debugger/) para Chrome.

## ⚠️ Privacidad

**NUNCA envíes información personal identificable (PII):**

❌ **NO HAGAS ESTO:**

```tsx
trackEvent.emailSubscribe("usuario@gmail.com", true); // ❌ Email completo
```

✅ **HAZ ESTO:**

```tsx
// El módulo automáticamente extrae solo el dominio
trackEvent.emailSubscribe("usuario@gmail.com", true); // ✅ Solo envía "gmail.com"
```
