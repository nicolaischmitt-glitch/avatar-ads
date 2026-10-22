# Tracking de Meta Ads (landing + Hotmart)

Decisión del 22 oct 2026: para el primer lanzamiento (taller del 26 oct) usamos la **API de conversiones nativa de Hotmart**. Si las ventas no se atribuyen bien a los anuncios, pasamos al **plan B con n8n** (abajo, con las correcciones ya identificadas).

Nunca guardar el token de acceso de Meta en este repo ni en la landing: va solo en Hotmart (o en n8n). Si se filtra, generar uno nuevo en Events Manager → Configuración → API de conversiones.

---

## 1. Configuración actual (plan A: Hotmart nativo)

| Dónde | Qué | Eventos |
|---|---|---|
| Landing (`landing/index.html`, publicada) | Pixel de Meta `602723701857782` | `PageView` · `ViewContent` (cuando la oferta de $27 entra en pantalla, valor 27 USD) · `ClicCheckout` (evento propio al hacer clic en cualquier botón de Hotmart) |
| Landing → Hotmart | Los 4 botones copian los parámetros de la visita (`fbclid`, `utm_*`) al link del checkout | — |
| Hotmart (configuración del producto → Pixel de rastreo → Facebook) | Mismo pixel + API de conversiones con token | `InitiateCheckout` · `AddPaymentInfo` · `Purchase` (solo pago aprobado) |

- En la landing **no** se usa `InitiateCheckout` para que no se cuente dos veces: ese evento lo envía Hotmart al abrir el checkout.
- La landing no tiene API de conversiones propia: GitHub Pages no tiene servidor. Si algún día hace falta, un Cloudflare Worker gratis.
- Prueba: Events Manager → *Probar eventos* → abrir `https://taller.droilab.com/?fbclid=TEST123`, hacer clic en un botón y llegar al checkout. El `Purchase` debe aparecer como "navegador + servidor".

**Cómo saber si hay que cambiar al plan B:** comparar las ventas de Hotmart que vienen de anuncios (con `utm_source`) contra las compras que reporta el Administrador de anuncios. Si Meta reporta claramente menos compras que Hotmart, la atribución está fallando.

---

## 2. Plan B: `Purchase` por n8n (por si Hotmart no atribuye bien)

Origen: guía "Rastreo Server-Side (Hotmart ➡️ Meta CAPI)" de Sistema Digital Cash, la que el usuario ya usaba antes: https://docs.google.com/document/d/1ce8-VLKuZUcDVz7Yq0GmzP-fRURGKV8GPcRDaDyoxJQ/edit

### Cómo funciona
1. **Landing:** al hacer clic en un botón de Hotmart, un script agrega al link el parámetro `sck` con las cookies del pixel de la landing: `sck=organic|fbp:<_fbp>|fbc:<_fbc>`. Si la visita trae `fbclid`, el `fbc` se arma como `fb.1.<timestamp>.<fbclid>`.
2. **Hotmart:** guarda el `sck` en la compra y lo manda en el webhook.
3. **Hotmart → Herramientas → Webhook** (versión 2.0.0, todos los productos), solo con el evento **Compra aprobada**, apuntando a la URL de producción del webhook de n8n.
4. **n8n:** Webhook → limpiar datos y sacar `fbp`/`fbc` del `sck` → cifrar con SHA-256 el email y el teléfono → POST a `https://graph.facebook.com/<versión>/602723701857782/events` con el token. Evento `Purchase`, `event_id` = ID de la transacción, `action_source: website`.
5. **Hotmart → Pixel de rastreo → Facebook:** **desactivar `Purchase`** (si no, se duplica: los `event_id` de Hotmart y de n8n no coinciden). Dejar `InitiateCheckout` y `AddPaymentInfo`.
6. Prueba: código de prueba del servidor (`test_event_code`) en el body del nodo → botón "Enviar prueba" del webhook en Hotmart → ver el `Purchase` "recibido de: servidor" en *Probar eventos* → **borrar el `test_event_code`**.

### Por qué atribuye mejor que el nativo
- Usa el `_fbp` de **nuestra** landing (la visita que vino del anuncio). El pixel nativo de Hotmart corre en `pay.hotmart.com`, otro dominio, y crea un `_fbp` distinto.
- Envía email y teléfono cifrados (mejor coincidencia con usuarios de Meta).
- Solo envía compras aprobadas y no duplica (`event_id` = transacción).
- Contra: si n8n se cae, esas compras no llegan (no hay reintento). Lo nativo de Hotmart siempre está disponible.

### Correcciones a la guía original (aplicarlas al implementar)
1. **Leer las cookies al hacer clic, no al cargar la página.** El script original reescribe los links en `DOMContentLoaded`, antes de que el pixel cree `_fbp`, así que pierde el `fbp` justo de los visitantes nuevos.
2. **No enviar la IP ni el user-agent del webhook.** `headers['user-agent']` y `x-forwarded-for` son del servidor de Hotmart, no del comprador. Enviar solo `buyer_ip` si viene en el payload; si no, omitirlos.
3. **Versión de la API:** la guía usa `v20.0` (2024), que ya debe estar vencida. Usar la versión actual que muestre Meta.
4. `event_time`: usar la fecha de aprobación de la compra del payload (en segundos), no `Date.now()`.
5. Teléfono: normalizarlo con código de país antes de cifrarlo.

### Script para la landing (versión corregida)
Va dentro del `<script>` final de `landing/index.html`, en el bloque "Tracking de Meta", que ya copia `fbclid`/`utm_*` a los links. Se agrega el `sck` en el momento del clic:

```js
const cookie = (n) => (document.cookie.match("(^|;) ?" + n + "=([^;]*)") || [])[2] || null;
document.querySelectorAll('a[href^="https://pay.hotmart.com/"]').forEach((a) => {
  a.addEventListener("click", () => {
    const fbclid = new URLSearchParams(location.search).get("fbclid");
    const fbc = fbclid ? "fb.1." + Date.now() + "." + fbclid : cookie("_fbc");
    const fbp = cookie("_fbp");
    if (!fbc && !fbp) return;
    const url = new URL(a.href);
    const base = (url.searchParams.get("sck") || "organic").split("|")[0];
    url.searchParams.set("sck", base + (fbp ? "|fbp:" + fbp : "") + (fbc ? "|fbc:" + fbc : ""));
    a.href = url.toString();
  });
});
```
Comprobar: abrir la landing con `?fbclid=TEST_123`, hacer clic y ver en la URL del checkout `sck=organic|fbp:…|fbc:fb.1.…TEST_123`.
