---
title: Bordia-Scherer Composite-Sintering Retardation Model
type: concept
created: 2026-05-20
updated: 2026-05-27
sources: []
tags:
  - paper
status: complete
importance: medium
---

# Bordia-Scherer Composite-Sintering Retardation Model

The foundational continuum-mechanics framework for **sintering of a powder matrix containing rigid (or slow-sintering) inclusions** — the analytical theory that explains, among other things, why a few volume-percent of nano-BaTiO₃ in a Ni paste reduces the Ni shrinkage rate severalfold. The three Bordia-Scherer papers (*Acta Metall.* 36 (1988) 2393, 2399, 2411) and Scherer's earlier 1987 *J. Am. Ceram. Soc.* paper together established the constitutive model that predates and underpins the modern [[skorohod-olevsky-viscous-sintering|SOVS continuum framework]] for constrained sintering.

## The core physics

A sintering powder matrix is treated as a **viscous medium** with:
- Bulk viscosity `K_p(ρ)` (resistance to volume change)
- Shear viscosity `G_p(ρ)` (resistance to distortion)
- A free-densification rate `\dot{\varepsilon}_f(\rho, T)` driven by surface-energy reduction

A rigid inclusion embedded in the matrix imposes a **boundary condition**: the inclusion can't shrink, so the matrix must flow around it. The inclusion exerts a **back-stress** on the matrix that opposes densification, slowing the densification rate of the composite below the free matrix rate.

### The first-order linear bound (Scherer 1987)

For low inclusion volume fractions, isolated rigid inclusions in a sintering matrix:

$$
\frac{\dot{\varepsilon}_c}{\dot{\varepsilon}_{m,\text{free}}} \;=\; 1 - v_i
$$

where `v_i` is the inclusion volume fraction. So 10 % inclusions → composite densifies at 90 % of free-matrix rate. Linear, modest effect.

### The full theory: percolating inclusions and contact substitution

Real composites — especially MLCC Ni paste with 5–20 vol% nano-BT — show retardation far exceeding the linear bound. At 20 vol% / 60 nm BT in Ni matrix, the [[yan-thesis-2013-mlcc-sintering-nanotomography|Yan DEM thesis]] measures a **7× retardation factor** at relative density D = 0.7, vs the linear bound's predicted 1.25×.

Bordia-Scherer Paper III explains this via three coupled effects:

1. **Backstress compounding** — once inclusions are dense enough to overlap their stress fields, the back-stress builds super-linearly with `v_i`.
2. **Contact substitution** — every matrix-matrix sintering contact substituted by a matrix-inclusion contact removes a "live" sintering bond. At 20 vol% inclusions, ~ 30–40 % of original matrix contacts are killed.
3. **Anisotropic strain accumulation** — the matrix must flow non-uniformly around inclusions, creating shear strain fields that further slow bulk densification.

For finely-dispersed nano-inclusions (small `R_i` relative to matrix particle size), all three effects amplify.

## The three Bordia-Scherer papers

1. **Paper I — Constitutive model for a sintering body** (*Acta Metall.* 36 (1988) 2393)
   - Derives the viscous-flow constitutive equations for a porous matrix in the intermediate stage of sintering.
   - Establishes `\dot{\varepsilon}_f` and bulk/shear viscosities as functions of relative density.

2. **Paper II — Comparison of constitutive models** (*Acta Metall.* 36 (1988) 2399)
   - Compares Bordia-Scherer to Skorohod's earlier (1972) Russian-language formulation.
   - Shows they're equivalent under specific assumptions.
   - This is the formal bridge to the modern [[skorohod-olevsky-viscous-sintering|SOVS]] framework that runs in the [[shi-2023-jecs-sovs-bilayer-modeling|Shi 2023 FE implementation]].

3. **Paper III — Rigid inclusions** (*Acta Metall.* 36 (1988) 2411)
   - The applied paper. Derives the inclusion-induced backstress field.
   - Establishes the linear bound; discusses higher-order corrections.

## Application to MLCC

### Ni paste shrinkage retardation

The single biggest direct application. From [[ni-electrode-paste-formulation|the industry-standard Ni paste recipe]]:
- ~55 vol% Ni powder
- ~7 wt% nano-BaTiO₃ (50–100 nm) as inclusions
- balance: organic vehicle

The nano-BT inclusions retard the Ni sintering by Bordia-Scherer effects, lifting Ni's densification onset from ~ 700 °C to ~ 900–1000 °C — close to the BT dielectric's onset temperature. This synchronisation is what makes [[ni-batio3-cosintering-interface|Ni / BT cofiring]] possible without runaway differential shrinkage.

See [[sugimura-hirao-2009-batio3-additive-ni-electrode]] for the empirical Noritake paper that found the **10 mass% / 30 nm** sweet spot, and [[yan-thesis-2013-mlcc-sintering-nanotomography]] for the DEM simulation that quantifies the full retardation curve.

### Constrained sintering in the MLCC stack

When the dielectric BT layer is constrained by the Ni electrode layer above and below (and vice versa), each layer acts as a rigid inclusion for the other — the same back-stress physics. The lateral in-plane direction is the constrained dimension; the thickness direction is free. See [[constrained-sintering-mlcc]] for the in-plane / thickness redistribution math, and [[dielectric-shrinkage-in-mlcc-stack]] for the five qualitative consequences.

### LTCC and self-constrained tapes

Same physics applies in dielectric + ferrite cofiring ([[hagymasi-ltcc-ferrite-dielectric-cofiring|Hagymási et al.]] DT + FT system), in self-constrained zero-shrinkage tapes ([[zero-shrinkage-ltcc]]), and in any cofired multilayer where one layer's sintering kinetics differ from another's.

## Limits of the model

- Assumes **rigid inclusions** — if the inclusions themselves sinter (slowly), there's a second-order correction (Olevsky 1998 *MSE-R* extension).
- Assumes **uniform inclusion distribution** — real composites with clumped inclusions show different behavior; [[yan-thesis-2013-mlcc-sintering-nanotomography|Yan]] DEM showed agglomerated nano-BT loses most of its retardation effect compared to well-dispersed.
- Assumes **isothermal** — for ramp-rate-dependent sintering, the framework extends but needs time integration.
- Doesn't capture **liquid-phase sintering** — where a glass-phase forms, the back-stress mechanism breaks down (the glass relaxes stress). Relevant for [[sintering-aids-glass|glass-aided dielectrics]] and Cu-electrode parts.

## Cross-references

- [[skorohod-olevsky-viscous-sintering]] — modern continuum framework that Bordia-Scherer feeds into
- [[constrained-sintering-mlcc]] — application to MLCC stack as a whole
- [[ni-batio3-cosintering-interface]] — Ni/BT cofiring problem the retardation solves
- [[ni-electrode-paste-formulation]] — practical paste-design implications
- [[sugimura-hirao-2009-batio3-additive-ni-electrode]] — empirical anchor
- [[yan-thesis-2013-mlcc-sintering-nanotomography]] — quantitative DEM validation
- [[shi-2023-jecs-sovs-bilayer-modeling]] — modern FE implementation
- [[hagymasi-ltcc-ferrite-dielectric-cofiring]] — LTCC analog
- [[rahaman-ceramic-processing-sintering-textbook]] — Ch. 10 gives the textbook treatment

## References

- R. K. Bordia & G. W. Scherer, "On constrained sintering I, II, III", *Acta Metallurgica* 36 (1988) 2393–2416 (three consecutive papers).
- G. W. Scherer, "Sintering with Rigid Inclusions", *J. Am. Ceram. Soc.* 70 (1987) 719–725.
- D. J. Green, O. Guillon, J. Rödel, "Constrained sintering: A delicate balance of scales", *J. Eur. Ceram. Soc.* 28 (2008) 1451–1466 — modern review with MLCC examples.
- V. V. Skorohod, *Rheological Basis of Sintering Theory* (in Russian), 1972 — the original constitutive formulation.
- E. A. Olevsky, "Theory of sintering: from discrete to continuum", *Mater. Sci. Eng. R* 23 (1998) 41–100 — the SOVS unification.
