---
title: Electrode Overlap & Print Registration — How the Active Area Is Defined
type: concept
created: 2026-05-31
updated: 2026-11-10
sources:
  - okuma-2021-mlcc-electrode-nanoct.md
  - yan-thesis-2013-mlcc-sintering-nanotomography.md
tags:
  - paper
status: complete
importance: high
---

# Electrode Overlap & Print Registration

The capacitance of an MLCC is set by the **overlap area of the inner electrodes**, not by the chip footprint. That overlap is defined by the **screen-printed electrode pattern** and the **margins** the print leaves to the chip edges — the manufacturing-native way to parameterize the active area, and the basis for the [[capacitance-simulation-from-recipe-and-geometry|chip-sim]]'s pattern geometry.

## The print unit cell

MLCC dielectric sheets are tape-cast, then the Ni/Cu inner electrode is **screen-printed in a repeating array**. Each printed cell becomes one chip after stacking (with alternating offset) and dicing. The geometry, per chip:

- **Overlap length** `oL` and **overlap width** `oW` — the region where opposite-polarity electrodes face each other (the *active* area). `A_active = oL · oW`.
- **End margin** `em` — the set-back from the electrode tip to the opposite termination (anti-arc keep-out). The overlap length = chip L − 2·em.
- **Side margin** `sm` — the inset from the electrode edge to the chip side wall (anti-delamination / edge-chip). The overlap width = chip W − 2·sm.

So the chip footprint is the unit cell: `L = oL + 2·em`, `W = oW + 2·sm`, and the dicing lanes run through the margins. The simulator can therefore be driven either way — by case-minus-margins (case mode) or by the print pattern directly (pattern mode).

## Why "coverage" is a 2-D ratio

The active-area fraction of the footprint factors into two independent directional ratios:

$$
\frac{A_\text{active}}{A_\text{chip}} = \underbrace{\frac{L - 2e_m}{L}}_{\text{length}} \times \underbrace{\frac{W - 2s_m}{W}}_{\text{width}}
$$

The margins (`em`, `sm`) already account for this bulk loss. What remains beyond the nominal margins is **print-registration jitter** — the printed electrode edge not landing exactly on the design line, and layer-to-layer misregistration in the stack. That is a small (~2–5 %) extra de-rating, distinct from the bulk margin.

## Registration tolerance — the precision driver

> [!note] Quantified (patent data)
> In [us5935365], camera/target-mark registration plus extrusion coating cut maximum misalignment from ~250 µm to **8–13 µm**. The shorting rate fell from 33.2% to 0.4–1.0% (thick-layer examples). Process detail is on [[internal-electrode-printing]] and [[stacking-and-lamination-mlcc]].

Screen-printing the inner electrode is described in the process literature as "one level higher than general thick-film printing" — the **position, shape, and flatness** of the print directly set the electrical performance. As parts miniaturize (sub-µm dielectric, 0201/01005 cases), the registration budget shrinks relative to the chip, so:

- margins can't be made arbitrarily small — they must cover the worst-case layer-to-layer misregistration plus the dicing-position tolerance;
- this is one reason small cases historically carried disproportionately large margins (a fixed registration budget is a bigger fraction of a tiny chip) — though modern alignment lets margins scale down (see [[case-size-geometry]]).

## In-plane shrinkage of the pattern

The printed pattern is **green** and shrinks in-plane during sintering, so `A_active,fired = A_active,green · (1 − s_xy)²`. [[okuma-2021-mlcc-electrode-nanoct|Okuma et al. 2021]] resolved this directly by nano-CT: the electrode and pore structure carry an **in-plane anisotropy tied to the tape-casting direction**, confirming the green→fired in-plane contraction (and that it is mildly anisotropic — less than the thickness shrinkage in a laminated stack; see [[constrained-sintering-mlcc]], [[green-tape-shrinkage-anisotropy]]). The simulator applies the same `s` in-plane and in thickness as a Tier-1 isotropic approximation.

## Electrode discontinuity

Even within the printed overlap, the *fired* electrode is not 100 % continuous: thinning the Ni drives Rayleigh–Plateau break-up via the [[ni-batio3-cosintering-interface|(Ni,Ba,Ti) interfacial liquid]], leaving holes that don't conduct ([[okuma-2021-mlcc-electrode-nanoct|Okuma 2021]]; [[polotai-2007-cr-doping-ni-electrode-mlcc|Polotai 2007]]). The simulator captures this as the `(1 − disc)` factor, distinct from the geometric coverage.

## Putting it together (simulator)

$$
A_\text{eff} = (oL \cdot oW)_\text{green} \cdot (1-s)^2 \cdot \text{registration} \cdot (1 - \text{disc})
$$

where the green overlap is the print pattern, registration is the small jitter factor, and `disc` is the firing-induced electrode break-up. See [[mlcc-capacitance-equation]].

## Cross-references

- [[case-size-geometry]] — margins, footprint, the size-scaled margin rule
- [[mlcc-capacitance-equation]] — `C = ε_r·ε₀·A·N/d`, where A is this overlap
- [[mlcc-dimensional-tolerance]] — how the footprint (and thus achievable overlap) varies within spec
- [[dielectric-layer-thickness-floor]] — the thickness/electrode limit on layer count
- [[ni-batio3-cosintering-interface]] — electrode break-up → discontinuity
- [[green-tape-shrinkage-anisotropy]], [[constrained-sintering-mlcc]] — in-plane vs thickness shrinkage
- [[capacitance-simulation-from-recipe-and-geometry]] — the simulator that uses this parameterization

## References

- [[okuma-2021-mlcc-electrode-nanoct]] — in-plane anisotropy + electrode discontinuity by nano-CT
- [[yan-thesis-2013-mlcc-sintering-nanotomography]] — green-state heterogeneity → electrode discontinuity
