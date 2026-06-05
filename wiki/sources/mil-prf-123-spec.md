---
title: "MIL-PRF-123 — High-Reliability PME MLCC Specification"
type: source
created: 2026-06-05
updated: 2026-06-05
sources:
  - mil-spec-mlcc-requirements.md
tags:
  - standard
status: complete
importance: medium
---

# MIL-PRF-123 — High-Reliability PME MLCC Specification

The legacy U.S. military spec for **precious-metal-electrode (Pd/Ag)** high-reliability ceramic chip capacitors. Defines the conservative *fixed-thickness* design regime that the BME [[mil-prf-32535-spec|MIL-PRF-32535]] later replaced for higher CV.

Source: MIL-PRF-123D w/Amendment 2 + [KEMET C1115 datasheet](https://content.kemet.com/datasheets/KEM_C1115_MIL-PRF-123.pdf). Raw: `resources/design-rules/mil-spec-mlcc-requirements.md`.

## Core internal-structure requirements (§3.4.1)
- **Minimum fired dielectric thickness: 0.8 mil (20.3 µm) @50 V; 1.0 mil (25.4 µm) @>50 V.** Only 50 V and 100 V ratings exist.
- **Maximum dielectric constant K = 3000** (caps CV by limiting ε_r — the opposite lever from BME thin layers).
- Voids may not reduce dielectric thickness by **>50 %**.
- **Nickel electrodes prohibited** (PME only).
- Margins/cover not tabulated — delegated to **ECIA/EIA-469** + Appendix B visual criteria.

These two limits (thick dielectric + K ≤ 3000) are why a 123 part is **~20–30×** lower CV than a same-case [[mil-prf-32535-spec|BME]] part — directly visible in the [[nasa-gsfc-liu-construction-database-2011|Liu DPA]] PME rows (D-series: d = 15–22.5 µm, 22–24 layers) vs BME (d = 2–6 µm, 100–750 layers).

## Reliability & screening
No grains-per-layer rule, no PRVT formula, no breakdown screen. Reliability by **life test: +125 °C, 2×VR, 4000 h (qual) / 1000 h (group B), assumed acceleration 8:1**. DWV 250–400 % of rated V. Termination types (Table IV): Pd/Ag (M), Ag-Ni-Au (G), Cu solder-coat (C), base-metal-barrier Sn/Pb ≥4 % Pb (Z); pure tin prohibited.

## Dielectric classes & dimensions
BP (NP0-type ±30 ppm/°C), BX/BR (±15 %), BG. Voltages 50/100 V. Chip styles CKS51–57 (0805–2225); e.g. CKS55 (1206) = 3.05×1.52 mm, T ≤1.65 mm (fired, finished-part outer dimensions). Companion PME spec **MIL-PRF-55681** maps by similarity (CKS↔CDR).

## Cross-references
- [[mil-prf-32535-spec]] — the BME successor (higher CV, thinner d)
- [[bme-vs-pme]] — why PME caps are thicker/lower-CV
- [[gsfc-mlcc-space-specs]] — NASA PME spec S-311-P-829 mirrors 123 limits
- [[nasa-gsfc-liu-construction-database-2011]] — measured PME parts (D-series)
- [[dielectric-layer-thickness-floor]], [[eia-rs-198-dielectric-classes]]

## References
- `resources/design-rules/mil-spec-mlcc-requirements.md`
