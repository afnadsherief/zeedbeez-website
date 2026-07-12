# store/

Reserved for Zustand global state stores per docs/03_TECH_STACK.md.

Phase 1 has no cross-component state that isn't already handled by React
Query (server state) or local component state — the hero has no shared
state to lift. Zustand is installed and ready for Phase 2+ when
cart/user-preference/multi-market state needs a global store.
