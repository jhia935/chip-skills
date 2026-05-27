---
title: "Yabuta et al. 2017 — Bi/Mn Double-Doping Stabilizing the Tetragonal Phase in BaTiO₃"
type: source
created: 2026-05-27
updated: 2026-05-27
sources:
  - yabuta-2017-bi-mn-batio3-tetragonality.md
tags:
  - paper
status: complete
importance: medium
---

# Yabuta et al. 2017 — Enhancement of Tetragonal Anisotropy and Stabilisation of the Tetragonal Phase by Bi/Mn Double-Doping in BaTiO₃

**Source**: Yabuta, H., et al. (2017). **Enhancement of tetragonal anisotropy and stabilisation of the tetragonal phase by Bi/Mn-double-doping in BaTiO₃ ferroelectric ceramics**. *Scientific Reports*, **7**, 45842.
DOI: [10.1038/srep45842](https://doi.org/10.1038/srep45842).
Open access via [PMC5377453](https://pmc.ncbi.nlm.nih.gov/articles/PMC5377453/).

## Summary

A second, complementary paper to [[deluca-2018-biybo3-batio3-doping|Deluca 2018]] on Bi-doped [[batio3|BaTiO₃]]. Yabuta et al. used **Bi + Mn co-doping at 0.1–0.5 mol%** and showed:

1. **Mn-only doping lowers T_C** (as is the standard understanding of acceptor dopants).
2. **Adding Bi to Mn-doped BT recovers T_C** approximately back to the undoped value at 0.5 mol% Bi.
3. **c/a tetragonality increases** with Bi content (lattice `a` shrinks, `c` elongates) — the OPPOSITE of what [[yoon-kim-2020-batio3-tetragonality-dc-bias|Yoon 2020]] showed is desirable for DC-bias robustness.
4. **Spontaneous polarization stays at ~18 µC/cm²** across the doping range.
5. **Mn valence shifts**: from +3.92 in Mn-only (Mn³⁺/Mn⁴⁺ mixture) to +2.94 with 0.5 mol% Bi (mostly Mn²⁺/Mn³⁺). The Bi³⁺ acts as a charge-balance donor that reduces the average Mn oxidation state.

## Why this matters for MLCC class engineering

The Yabuta result frames Bi/Mn co-doping as an **anti-aging strategy**: stabilizing the tetragonal phase via increased c/a should slow domain-wall-driven [[aging-class-2|aging]]. However, it has the **side effect** of producing a c/a-enhanced ceramic with worse [[dc-bias-derating|DC-bias robustness]] — exactly the trade-off captured in [[yoon-kim-2020-batio3-tetragonality-dc-bias|Yoon 2020]].

**Practical conclusion**: Bi + Mn co-doping is good for **C0G-aging-target Class I parts** where DC-bias derating doesn't matter (paraelectric anyway) but bad for high-CV Class II MLCCs where bias robustness is the primary spec. This is why X7R formulations use Bi or rare-earth shifters **paired with Mg + Mn for reliability**, not as the primary T_C control.

## Key Points — composition

- **Dopant range**: 0.1–0.5 mol% Bi co-doped with 0.3–0.5 mol% Mn.
- **T_C behavior**:
  - Undoped BaTiO₃: T_C ~125 °C (textbook value)
  - Mn-only doped: T_C **lowered** by Mn (acceptor-effect)
  - Bi + Mn at 0.5 mol% Bi: T_C "roughly recovered" — approximately back to undoped
- **c/a evolution**: increases monotonically with Bi content; `a` shrinks, `c` elongates.
- **Mechanism**: 6s² lone-pair of Bi³⁺ drives local distortion (same as [[deluca-2018-biybo3-batio3-doping|Deluca]]); Mn provides electron compensation for the Bi³⁺-on-Ba²⁺ donor-type substitution.

## Distinct from Deluca 2018

| | Deluca 2018 | Yabuta 2017 |
|---|---|---|
| Dopant | BiYbO₃ (Bi + Yb co-doping at A,B sites) | Bi + Mn |
| Range | 0–0.02 mol% | 0.1–0.5 mol% Bi |
| T_C effect | +10 K at 0.005 mol% | Recovers Mn-induced reduction |
| Effect on c/a | Not the primary focus | Increases |
| Effect on T-O transition | Drops 49 K | Drops |
| Conclusion for X8R/X9R | Use trace Bi for T_C up-shift | Use Bi to balance Mn |

## Entities Mentioned

- [[hiroshi-yabuta]] — first author *(stub; affiliation Canon Inc., per Sci. Rep. metadata)*
- [[batio3]] — host

## Concepts Discussed

- [[class-specific-tc-engineering]] — relevant
- [[curie-temperature]] — shift study
- [[tetragonality-c-a-ratio]] — increases with Bi
- [[bi-lone-pair-doping]] — mechanism
- [[dopant-site-occupancy-batio3]] — Bi³⁺ on A-site, Mn on B-site
- [[ferroelectric-domain-wall]] — stabilized by enhanced c/a
- [[aging-class-2]] — slowed by Bi/Mn co-doping (potential application)

## Notable Quotes

> "Increased Bi content in Mn-doped BaTiO₃ recovered the Mn-induced T_C reduction while simultaneously decreasing the tetragonal-orthorhombic transition temperature."

> "Mn valence changed from approximately +3.92 (Mn-only doped) to +2.94 at 0.5 mol% Bi co-doping."

## References

_Open access via Sci. Rep. / PMC._
