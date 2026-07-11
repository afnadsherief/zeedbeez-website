# THREE_ENGINE.md

## Purpose
Define the reusable 3D rendering and interaction engine for the platform.

## Engine Goals
- Support premium storytelling.
- Keep scenes modular.
- Reuse camera, lighting, and material systems.
- Allow graceful mobile degradation.

## Core Modules
- Scene manager
- Camera rig
- Lighting presets
- Material presets
- Particle system
- Asset loading pipeline
- Performance quality manager
- Interaction layer

## Engine Rules
- Do not hardcode page-specific behavior inside the engine core.
- Compose scenes from shared primitives.
- Prefer stable, efficient defaults.
- Every expensive effect must have a fallback.

## Output Expectations
The engine should support hero, research, product, and future scene variants without rewrite.
