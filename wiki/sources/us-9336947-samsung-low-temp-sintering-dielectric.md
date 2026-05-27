---
title: "US 9,336,947 — Lim et al. (Samsung Electro-Mechanics) — Low-Temperature-Sintering Dielectric (2016)"
type: source
created: 2026-05-27
updated: 2026-05-27
sources: []
tags:
  - patent
status: complete
importance: high
---

# US 9,336,947 — Samsung's low-T-sintering BME dielectric (Lim et al., 2016)

Samsung Electro-Mechanics' patent on a **B₂O₃-BaO sintering aid** added to BaTiO₃ that drops the densification window into 1050–1150 °C — well below traditional > 1200 °C. The lower temperature is what makes **ultra-thin dielectric layers (1–2 µm)** practical without driving Ni electrode degradation, and it's part of the chemistry stack behind Samsung's modern high-CV thin-layer MLCC.

This is a direct response to the trend documented in [[layer-thickness-and-metal-ceramic-ratio]] — as `d_BT` shrinks toward 0.3–0.5 µm at the leading edge, the temperature budget for sintering must shrink with it, or grain growth wrecks the dielectric.

## Bibliographic data

| Field | Value |
|---|---|
| Patent number | US 9,336,947 B2 |
| Title | "Dielectric composition for low-temperature sintering, multilayer ceramic electronic component including the same, and method of manufacturing multilayer ceramic electronic component" |
| Assignee | Samsung Electro-Mechanics Co., Ltd. |
| Inventors | Jong Bong Lim, Seok Hyun Yoon, Doo Young Kim, Sang Huk Kim |
| Filed | 2013-10-29 |
| Granted | 2016-05-10 |

## What it claims

The dielectric composition (Claim 1):

- **Main ingredient**: BaTiO₃
- **Accessory ingredient**: `x · B₂O₃ – (1−x) · BaO` mixed oxide
  - `x` ∈ [0.25, 0.67] — the B₂O₃ : BaO ratio window
  - Loading: 0.1 to 2.00 mol% of the main BT

The accessory composition forms a low-melting glass-phase at the BT grain boundaries during firing. At `x` near 0.5 (the B₂O₃ : BaO ≈ 1:1 ratio), the eutectic in the B₂O₃-BaO binary is around 950 °C, well below pure BaTiO₃'s native densification temperature.

## Why it matters

Three coupled effects of dropping the sintering window from > 1200 °C to 1050–1150 °C:

1. **Smaller BT grain size at full density** — less time at high T means less coarsening per [[grain-growth-dopant-pinning|Hennings grain-growth kinetics]]. For sub-µm `d_BT`, the grain-size : layer-thickness ratio (per [[core-shell-batio3|the 3–5 grains rule]]) sets a hard floor on how thin the dielectric can go. Lower sintering T → smaller grain → thinner layer feasible.
2. **Less Ni electrode coarsening** — see [[ni-batio3-cosintering-interface]]. At 1200 °C the (Ni, Ba, Ti) liquid alloy and Rayleigh-Plateau electrode break-up start to dominate. Below 1150 °C, the discontinuity problem is dramatically reduced.
3. **Less Ba/Ti volatilization** — at higher temperatures both Ba and Ti can sublime out of the lattice, shifting the local stoichiometry and degrading reliability.

The patent achieves ≥ 97% densification (commercial-spec) within the dropped window.

## The chemistry

B₂O₃ alone has a melting point of 450 °C; BaO alone is around 1923 °C. The B₂O₃-BaO binary has multiple low-melting compositions including the **2 BaO · 3 B₂O₃** (orthorhombic) and **BaB₂O₄** (BBO) phases — the second of these is famous as a nonlinear optical crystal but here it's just a useful sintering aid.

The patent's `x ∈ [0.25, 0.67]` range covers the practical compositions that don't over-flux (high-B) or under-flux (high-Ba) the system. Above 2 mol% loading, the glass phase percolates and ε_r drops; below 0.1 mol%, the densification temperature isn't reduced enough.

## Connection to the modern wiki

- [[sintering-aids-glass]] — broader category of BBS / ZBS / PBS glass aids for MLCC dielectric
- [[layer-thickness-and-metal-ceramic-ratio]] — why thin-layer needs low-T sintering
- [[grain-growth-dopant-pinning]] — the grain-size floor problem this addresses
- [[us-4115493-murata-sakabe-1978-bme-foundational]] — predecessor non-reducing chemistry; this one stacks a sintering aid on top
- [[ni-batio3-cosintering-interface]] — the electrode-side problem this enables you to mitigate

## References

- Google Patents: [US 9,336,947 B2](https://patents.google.com/patent/US9336947B2/en)
- USPTO direct: [PDF](https://image-ppubs.uspto.gov/dirsearch-public/print/downloadPdf/9336947)
- [[samsung-electro-mechanics]] — assignee corporate page
