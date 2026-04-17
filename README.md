# Documentacion Tecnica - Kambista App

## Descarga

- **APK Android**: [Descargar desde Expo](https://expo.dev/accounts/marcosalanya/projects/frontend-app-challenge/builds/c7e9a168-aad0-4575-83d1-8f0d6c0a1b05)
- El archivo `app.apk` tambien se encuentra en la raiz del proyecto para instalacion directa.

## Instrucciones de ejecucion

```bash
# Instalar dependencias
npm install

# Copiar variables de entorno
cp .env.example .env

# Iniciar servidor de desarrollo
npx expo start

# Ejecutar en Android
npx expo start --android

# Ejecutar en iOS
npx expo start --ios

# Generar APK
eas build -p android --profile preview
```

## Variables de entorno

| Variable | Descripcion |
|----------|-------------|
| `EXPO_PUBLIC_BASE_URL` | URL base de la API de Kambista |

Copiar `.env.example` a `.env` y ya tendras configurado el entorno.

## Credenciales de prueba

### Login directo
| Campo | Valor |
|-------|-------|
| Email | `marcos@gmail.com` |
| Contrasena | `123456` |

### Registro de nuevo usuario
Al completar el onboarding, el sistema genera las credenciales automaticamente:

| Campo | Valor |
|-------|-------|
| Email | `{nombre}@kambista.com` (ej: si el nombre es "Juan Perez" -> `juan@kambista.com`) |
| Contrasena | `123456` |

> Una vez registrado, usar estas credenciales para iniciar sesion desde la pantalla de login.

### Cerrar sesion

Desde la tab **Perfil** (icono de usuario en la barra inferior) se puede cerrar sesion en cualquier momento.

## Arquitectura del proyecto

```
app/                          # Rutas (Expo Router - file-based routing)
  (auth)/                     # Login
  (onboarding)/               # Datos personales + Registro exitoso
  (tabs)/                     # Bottom tabs (Inicio, Historial, Cuentas, Koinks, Perfil)
  (transactions)/             # Flujo completo de operacion
components/
  form/                       # Componentes de formulario reutilizables (FormInput, FormSelect, etc.)
  icons/                      # SVGs como componentes React
  ui/                         # Componentes UI base (Button, Text, BottomSheet, etc.)
constants/                    # Tema, colores
enums/                        # Enumeraciones (ECurrency, EActiveField, etc.)
hooks/                        # Hooks compartidos (useCustomMutation, useDebounce)
lib/                          # Utilidades (axios, date/dayjs, currency, cn)
mocks/                        # Datos mock (bankAccounts.json, sourceFunds.json)
modules/
  auth/                       # Login: componentes, servicios, schemas
  home/                       # Calculadora: componentes, hooks, servicios, lib
  onboarding/                 # Datos personales: componentes, servicios, schemas
  transactions/               # Operaciones: componentes, hooks, servicios, constantes, tipos
stores/                       # Estado global Zustand
types/                        # Tipos compartidos (APIError)
```

### Flujo de navegacion

```
index.tsx
  |
  +-- /(auth)/index          Login
  |         |
  |         +-- /(tabs)      App principal (post-login)
  |
  +-- /(onboarding)/personal-data    Formulario de registro
            |
            +-- /(onboarding)/success    Registro exitoso
                      |
                      +-- /(tabs)    App principal
```

### Flujo de transaccion

```
(tabs)/index  ->  (transactions)/create
                        |
                        +-- transfer-data
                              |
                              +-- attach-voucher
                                    |
                                    +-- created  ->  (tabs)/index
```

El layout `(transactions)/_layout.tsx` envuelve todas las pantallas del flujo con un `FormProvider` compartido, permitiendo que el estado del formulario persista entre pasos sin pasarse por props ni por store.

### Capas de un modulo

Cada modulo dentro de `modules/` sigue la misma estructura interna:

```
modules/<nombre>/
  components/        # Componentes de presentacion del modulo
  hooks/             # Hooks que conectan servicios con el estado
  services/          # Llamadas HTTP o mocks (*.service.ts)
  constants/         # Constantes propias del modulo
  lib/               # Funciones puras de logica de negocio
  types/             # Interfaces y tipos del modulo
```

### Patron de formulario

Todos los formularios siguen el mismo patron:

1. `index.schema.ts` define el schema Zod y el tipo inferido
2. El componente instancia `useForm` con `zodResolver` y `mode: "onChange"`
3. Se envuelve con `<FormProvider>` para que los campos hijos usen `useFormContext`
4. Los componentes `Form*` (FormInput, FormSelect, etc.) leen el contexto internamente — no reciben `register` ni `control` como props, lo cual da como resultado componentes mas limpios.

## Decisiones tecnicas

### Estado global con Zustand

Se eligio Zustand sobre Context API por:
- API minima sin boilerplate de providers anidados
- Suscripciones granulares (los componentes solo re-renderizan cuando cambia lo que consumen)
- Compatibilidad nativa con AsyncStorage para persistencia del auth store

**Stores implementados:**
| Store | Responsabilidad |
|-------|----------------|
| `use-auth-store` | Sesion del usuario, persistencia con AsyncStorage |
| `use-transaction-store` | Resumen de operacion, cuentas bancarias, selecciones del flujo |
| `use-exchange-rate-store` | Tasas de cambio actuales |
| `use-error-store` | Estado de errores API para el ErrorBottomSheet global |

### Formularios con React Hook Form + Zod

Cada formulario tiene su archivo `index.schema.ts` con el schema de Zod, lo que permite:
- Validacion en tiempo real (`mode: "all"` / `mode: "onChange"`)
- Colocation de reglas con el componente
- Inferencia de tipos directa con `z.infer<typeof schema>`
- Validaciones complejas via `.superRefine()` (ej: tipo de documento condicional)

### React Query para datos del servidor

- `useExchangeRate`: query con `staleTime: 5min` y `retry: 2` para tasas de cambio
- `useCustomMutation`: wrapper que centraliza el manejo de errores API y los muestra via `useErrorStore`
- Separacion clara entre servicios (`*.service.ts`) y hooks de consumo (`use-*.ts`)

### Navegacion con Expo Router

- File-based routing con grupos de rutas `(auth)`, `(onboarding)`, `(tabs)`, `(transactions)`
- El flujo de transacciones comparte un `FormProvider` a nivel de layout para mantener estado del formulario entre pantallas (create -> transfer-data -> attach-voucher -> created)
- Bottom tabs con iconos SVG custom

### Estilos con NativeWind

- Tema centralizado en `constants/theme.ts` y `tailwind.config.js`
- Fuente Montserrat (Regular, Medium, SemiBold, Bold) via `@expo-google-fonts/montserrat`
- Componente `AppText` como wrapper que mapea sizes y weights a clases de Tailwind

### Manejo de errores

- **Formularios**: validacion en tiempo real con mensajes especificos por campo
- **API**: `ErrorBottomSheet` global que se activa desde cualquier mutation fallida via `useErrorStore`
- **Errores tipados**: interfaz `APIError` con `name`, `title`, `message` para errores como `DUPLICATE_DNI`, `DUPLICATE_PHONE`, `DUPLICATE_EMAIL`
- **Simulacion**: servicios de onboarding simulan verificacion de duplicados contra datos mock

### Servicios mock vs reales

| Servicio | Tipo | Detalle |
|----------|------|---------|
| Exchange rate | Real | `api.kambista.com/v1/exchange/kambista/current` |
| Calculadora | Real | `api.kambista.com/v1/exchange/calculates` |
| Login | Mock | Simula autenticacion con datos hardcodeados |
| Registro | Mock | Verifica duplicados contra arrays en memoria |
| Crear transaccion | Mock | Retorna `transactionId` fijo |
| Submit voucher | Mock | Retorna `{ success: true }` |

### Componentes reutilizables

- **Form layer**: `FormInput`, `FormSelect`, `FormCheckbox`, `FormDateInput`, `FormPickerInput`, `FileUpload` — todos conectados a `useFormContext`
- **UI layer**: `Button`, `Input`, `Select`, `Checkbox`, `Highlight`, `StepLayout`, `StepIndicator`, `Header`, `DetailRow`, `SelectBottomSheet`, `ErrorBottomSheet`
- **Layout**: `StepLayout` unifica el patron de pantallas con steps (indicador + footer con boton)

## Animaciones

- **Bottom sheets** (select, errores, agregar cuenta): `SlideInDown`/`SlideOutDown` + `FadeIn`/`FadeOut` con `react-native-reanimated`
- **Swap de divisas**: hook `useSwapAnimation` con `Animated.Value` nativo — rotacion de 360 grados al cambiar tipo de cambio, y spin continuo mientras se calcula
- **Error bottom sheet**: animacion spring con `Animated.timing` nativo

## Librerias principales

| Libreria | Uso |
|----------|-----|
| `expo-router` | Navegacion file-based |
| `nativewind` + `tailwindcss` | Estilos utility-first |
| `zustand` | Estado global |
| `@tanstack/react-query` | Cache y fetching de datos |
| `react-hook-form` + `zod` | Formularios y validacion |
| `axios` | Cliente HTTP |
| `dayjs` | Manipulacion de fechas |
| `expo-document-picker` | Seleccion de archivos (voucher) |
| `react-native-reanimated` | Animaciones |
| `expo-linear-gradient` | Gradientes (banner de descuentos) |
