# PROFILE.md
- **Slow render before**: ~11.8ms on unmemoized list re-eval.
- **Fix**: Wrapped list items in `React.memo` + stabilized callback.
- **Timing after**: ~1.3ms.