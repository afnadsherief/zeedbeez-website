# shaders/

Reserved for GLSL shader source files (.glsl/.vert/.frag), loaded via the
raw-loader Turbopack rule configured in next.config.ts.

Per docs/09_SHADER_GUIDELINES.md: shaders must be reusable, not duplicated
per-component. Phase 1 uses only built-in Three.js/drei materials
(MeshTransmissionMaterial, MeshStandardMaterial) — custom shaders are
deferred until a scene requires an effect the material library can't
express (Phase 2+, per docs/09_SHADER_GUIDELINES.md and THREE_ENGINE.md).
