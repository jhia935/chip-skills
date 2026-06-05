---
title: "Okuma et al. 2021 — Microstructural Evolution of MLCC Electrodes by Synchrotron Nano-CT"
type: source
created: 2026-05-31
updated: 2026-05-31
sources:
  - okuma-2021-mlcc-electrode-nanoct.md
tags:
  - paper
status: complete
importance: medium
---

# Okuma et al. 2021 — Microstructural Evolution of Electrodes in Sintering of MLCCs Observed by Synchrotron X-ray Nano-CT

**Source**: Okuma, G., Saito, N., Mizuno, K., Iwazaki, Y., Kishi, H., Takeuchi, A., Uesugi, M., Uesugi, K., & Wakai, F. (2021). **Microstructural evolution of electrodes in sintering of multi-layer ceramic capacitors (MLCC) observed by synchrotron X-ray nano-CT**. *Acta Materialia*, **206**, 116605.
DOI: [10.1016/j.actamat.2020.116605](https://doi.org/10.1016/j.actamat.2020.116605)
TDK Corporation + Tokyo Institute of Technology (Wakai group); SPring-8 synchrotron.

## Summary

A 3-D synchrotron X-ray nano-CT study of how the **Ni inner electrodes** evolve during co-firing of a [[batio3|BaTiO₃]] MLCC. Complements the [[yan-thesis-2013-mlcc-sintering-nanotomography|Yan thesis (2013, SEMCO/Grenoble)]] from the TDK/Tokyo-Tech side. Most relevant here for two things the chip-sim now models:

1. **In-plane shrinkage anisotropy of the printed pattern** — the electrode and pore structure carry an **in-plane anisotropy tied to the tape-casting direction**, confirming that the green electrode pattern shrinks *in-plane* (x-y) during sintering, not just in thickness. This grounds the simulator's in-plane shrinkage of the active overlap.
2. **Electrode discontinuity at sub-µm thickness** — as the Ni electrode thins toward sub-µm, sintering produces **holes/breaks** in the inner electrode, causing capacitance loss. This is the physical basis for the simulator's `disc` (discontinuity) factor and reinforces [[dielectric-layer-thickness-floor]] and [[ni-batio3-cosintering-interface]].

## Key points

- **Method**: synchrotron X-ray nano-CT (SPring-8) + in-situ/ex-situ sintering; resolves the 3-D Ni electrode + pore network inside a real co-fired MLCC.
- **In-plane anisotropy**: both the electrode and the pore structure show in-plane anisotropy correlated with the **tape-casting direction** — the dielectric and electrode shrink anisotropically, and the casting direction leaves a directional signature. So in-plane shrinkage is real and (mildly) direction-dependent, on top of the larger thickness shrinkage.
- **Electrode break-up**: thinning the Ni electrode drives Rayleigh–Plateau-type de-wetting/agglomeration (the [[ni-batio3-cosintering-interface|(Ni,Ba,Ti) interfacial-liquid mechanism]]); discontinuities scale up as thickness drops — the volumetric-efficiency wall behind [[dielectric-layer-thickness-floor]].
- **Mechanism framing**: anisotropic sintering driving force tied to the **surface-energy tensor** of the porous body (Wakai's continuum sintering framework, cf. [[skorohod-olevsky-viscous-sintering]]).

## Implications for the simulator

- **In-plane shrinkage** of the active overlap (the green print pattern shrinks to fired = green·(1−s)) is physically justified; the anisotropy (in-plane < thickness in a constrained stack) is a Tier-2 refinement over the simulator's isotropic `s`.
- **Discontinuity (`disc`)** is a real, thickness-dependent electrode-microstructure effect — not just a fudge factor — and worsens as electrodes thin.

## Entities Mentioned

- [[gaku-okuma]] — first author *(stub)*
- [[fumihiro-wakai]] — senior author, Tokyo Tech; sintering-mechanics theorist *(stub)*
- [[tdk]] — co-authors' company
- [[batio3]] — dielectric

## Concepts Discussed

- [[green-tape-shrinkage-anisotropy]] — in-plane anisotropy tied to casting direction
- [[dielectric-shrinkage-in-mlcc-stack]] — companion shrinkage-redistribution page
- [[ni-batio3-cosintering-interface]] — electrode break-up mechanism
- [[dielectric-layer-thickness-floor]] — sub-µm electrode discontinuity wall
- [[electrode-overlap-and-registration]] — the active-area geometry that shrinks
- [[skorohod-olevsky-viscous-sintering]] — surface-energy-tensor sintering framework

## References

_Acta Materialia 206 (2021) 116605. Paywalled; citation + abstract + ADS/SSRN summaries consulted._
