# Investigation of hygrothermally induced failures in multilayer ceramic capacitors during thermal reflow process

- **Venue:** *Microelectronics Reliability* 146 (2023) 115028 (Elsevier). ADS bibcode 2023MiRe..14615028A.
- **URL:** https://www.sciencedirect.com/science/article/abs/pii/S0026271423001282
- **ADS:** https://ui.adsabs.harvard.edu/abs/2023MiRe..14615028A/abstract
- **Type:** T3 peer-reviewed paper. Captured 2026-06-24 from web research (abstract + secondary summaries; authors not fully resolved — ADS first-initial "A"). Full text not held.

## Key claims (as captured)
Two primary reliability defects identified, with quantified geometry:
- **Voids** at the Cu / Cu-epoxy interface — width **0.15 µm to 0.55 µm**.
- **Interfacial delamination** — length **0.05 mm to 0.21 mm**.
- Largest cracks recorded **≈ 3.56 µm thick** at post-reflow stages.

Root causes:
- **Moisture contamination** (absorbed during preconditioning) + **thermal mismatch** (CTE).
- Absorbed moisture generated **6.23 MPa vapor pressure** during reflow, which **exceeds the 6 MPa adhesion strength** of the adhesive/substrate interface → drives delamination ("popcorn"-type mechanism).

Methods:
- **SEM** at ~2 µm resolution to image defects.
- **Extended finite element method (X-FEM)** numerical analysis in **ABAQUS** for crack/delamination propagation.

## Notes
- This is the quantitative anchor for the moisture/reflow delamination path on the wiki (distinct from intrinsic firing delamination).
- The 6.23 MPa > 6 MPa vapor-pressure-vs-adhesion inequality is the headline failure criterion.
