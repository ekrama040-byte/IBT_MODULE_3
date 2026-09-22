# Addis Eats Checkout (Day 8 Mini-Project)

## Validation Rules & Rationale
* **Full Name (`name`)**: Must not be empty. *Why*: Required for delivery verification and recipient identification.
* **TeleBirr Phone (`phone`)**: Must match Ethiopian number regex (`/^(?:\+251|0)(9|7)\d{8}$/`). *Why*: Ensures format compatibility with TeleBirr mobile money transaction triggers.
* **Delivery Area (`area`)**: Must be one of the supported hub zones (`Bole`, `Kazanchis`, `Megenagna`, `Piassa`). *Why*: Restricts delivery scope to active operational areas.
* **Optional Notes (`notes`)**: Unrestricted string. *Why*: Provides optional delivery context without blocking checkout completion.

## Resilience & Accessibility Features
* **Single State Object**: Prevents sync drift across form inputs.
* **Touched/Blur Guard**: Errors remain quiet until user interaction on a field, avoiding premature noise while typing.
* **ARIA Attributes**: `aria-invalid`, `aria-describedby`, and `role="alert"` provide explicit screen-reader feedback independent of visual color cues.
* **Focus Management**: On validation failure or simulated network failure retention, focus moves to the first invalid field.
* **Submitting Guard**: Disables double-submission and displays the live ETB total in the button label.

## How to run it
```bash
npm install
npm run dev
```
