---
title: "Deluca et al. 2018 — Low-Level BiYbO₃ Doping of BaTiO₃: Impact on Curie Temperature and Phase Transitions"
type: source
created: 2026-05-27
updated: 2026-05-27
sources:
  - deluca-2018-biybo3-batio3-doping.md
tags:
  - paper
status: complete
importance: high
---

# Deluca et al. 2018 — Remarkable Impact of Low BiYbO₃ Doping Levels on the Local Structure and Phase Transitions of BaTiO₃

**Source**: Deluca, M., et al. (2018). **Remarkable impact of low BiYbO₃ doping levels on the local structure and phase transitions of BaTiO₃**. *Journal of Materials Chemistry A*, **6** (13), 5443–5451.
DOI: [10.1039/c7ta11096k](https://doi.org/10.1039/c7ta11096k)
Open access via [PMC5885797](https://pmc.ncbi.nlm.nih.gov/articles/PMC5885797/).

## Summary

A demonstration that **extremely small amounts (≤ 0.02 mol%) of BiYbO₃** in [[batio3|BaTiO₃]] **raise the Curie temperature by ~10 K** and dramatically reshape the lower-temperature phase transitions. The mechanism is **NOT bulk substitution** at high doping levels — it's **local lattice strain from Bi³⁺'s stereochemically active lone-pair electrons** at trace concentrations, which produces **coexisting local crystal symmetries** over a wide temperature range. This is one of the foundational mechanisms used in [[x8r-x8l-x9r-high-temperature-dielectrics|X8R / X9R]] formulations where you need to push T_C upward without massively perturbing the bulk lattice.

## Key Points — quantitative T_C shifts

| BiYbO₃ content (mol%) | T_C (°C) | ΔT_C from undoped |
|---|---|---|
| 0 (undoped BaTiO₃) | **124** | — |
| 0.005 | **134** | **+10 K** |
| 0.01 | 133 | +9 K |
| 0.02 | 131 | +7 K |

The shift **saturates and slightly reverses** above 0.005 mol% — the maximum effect is at trace doping. This is opposite to most ferroelectric-dopant slopes which scale linearly with concentration.

## Key Points — lower-T phase transitions

The tetragonal → orthorhombic (T-O) transition temperature **shifts dramatically downward**:

- Undoped: ~12 °C
- BiYbO₃ at 0.01 mol%: **~−37 °C** (a 49 K downshift!)

So the **operating-range tetragonal phase is dramatically widened** by trace BiYbO₃ — the part stays in its useful ferroelectric phase across a much broader temperature range. This is a separate-and-complementary effect from the T_C upshift.

## Key Points — mechanism

**Bi³⁺ stereochemically active lone-pair**: Bi³⁺ has a 6s² lone pair that hybridizes with surrounding O 2p orbitals. The hybridization creates strong **local lattice distortion** without requiring large concentration. At 0.005 mol% Bi, each Bi pulls its local octahedral environment off-symmetry, producing local polar regions even far above the bulk T_C.

The result is **coexistence of multiple local crystal symmetries over a wide T range** — analogous to the [[polar-nanoregions-pnr|PNR]] microstructure but driven by a different mechanism (lone-pair-induced strain vs random-site disorder).

## Implications for MLCC class engineering

1. **Trace BiYbO₃ is a powerful T_C-shifter with high "leverage"** — 0.005 mol% gives a 10 K upshift, comparable to several mol% of Zr or Sr (which only shift downward). For X8R/X8L parts targeting T_C ~140-150 °C, trace Bi-based dopants are the modern approach.
2. **Combined T-O suppression** is a bonus: BiYbO₃-doped X7R-class compositions retain their useful tetragonal ε_r down to −37 °C without the typical T-O dielectric anomaly disrupting the TCC envelope.
3. **Pb-free**: Bi³⁺ accomplishes the same T_C-up function as Pb²⁺ (legacy PbTiO₃-doped compositions) without the environmental restrictions. This is why Bi-based shifters are central in post-2010 X8R/X9R formulations.

## Entities Mentioned

- [[marco-deluca]] — first author *(stub)*
- [[batio3]] — host material

## Concepts Discussed

- [[class-specific-tc-engineering]] — central topic
- [[field-induced-curie-shift]] — sibling effect (electrical analog of this chemical shift)
- [[curie-temperature]] — primary observable
- [[polar-nanoregions-pnr]] — related microstructure mechanism
- [[bi-lone-pair-doping]] — the active mechanism *(stub)*
- [[dopant-site-occupancy-batio3]] — how Bi³⁺ and Yb³⁺ partition between A and B sites
- [[x8r-x8l-x9r-high-temperature-dielectrics]] — applies this dopant strategy
- [[ferroelectric-domain-wall]] — under lone-pair-driven local distortion

## Notable Quotes

> "Stereochemically active lone-pair electrons of Bi³⁺ induce lattice strain that produces coexisting local crystal symmetries across wide temperature ranges, effectively controlling permittivity temperature dependence and the Curie temperature."

> "The tetragonal-to-orthorhombic transition shifts dramatically towards lower temperatures from ~12 °C (undoped) to ~−37 °C at x = 0.01."

## References

_Royal Society of Chemistry, J. Mater. Chem. A. Open access via PMC._
