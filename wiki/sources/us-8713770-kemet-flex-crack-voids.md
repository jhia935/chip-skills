---
title: "US 8,713,770 — Prymak (KEMET) — Flex-Crack Mitigation Voids in MLCC (2014)"
type: source
created: 2026-05-27
updated: 2026-05-27
sources: []
tags:
  - patent
status: complete
importance: medium
---

# US 8,713,770 — KEMET's flex-crack-mitigation void design (Prymak, 2014)

A different angle on the [[failure-modes-mlcc|flex-crack failure mode]]: instead of suppressing cracks, **route them**. Prymak's invention prints sacrificial-material patterns into the MLCC's green stack that vaporise during firing, leaving precisely shaped voids that **channel any flex crack toward a non-active region of the chip** — where the crack can't short two opposing electrodes and cause electrical failure.

This is the engineering reasoning behind KEMET's "Open Mode" / FO-CAP product line, which complements the FT-CAP soft-termination approach.

## Bibliographic data

| Field | Value |
|---|---|
| Patent number | US 8,713,770 B2 |
| Title | "Capacitor comprising flex crack mitigation voids" |
| Assignee | KEMET Electronics Corporation |
| Inventor | John D. Prymak |
| Filed | 2011-06-29 |
| Granted | 2014-05-06 |

## What it claims

Manufacturing-process method (Claim 1):

1. Form a **channel layer** with at least one **pre-channel** in a predetermined pattern (a sacrificial-material pattern, e.g. printed carbon ink or organic that will burn out during sintering).
2. Form a first conductor (Ni electrode) over the channel layer.
3. Form a dielectric on the first electrode.
4. Form a second conductor (next Ni electrode) on the dielectric.
5. **Remove the pre-channel by heating** during sintering, leaving a structural void in the predetermined pattern.

The void becomes a designed-in **stress-concentration path** — a "preferred crack trajectory" lower-resistance than the surrounding ceramic — so when the chip flexes under board strain, the crack initiates at the void and propagates along it, terminating at a face of the chip or other non-active region.

## Why it matters

The classical [[failure-modes-mlcc|flex crack]] mode in MLCC:
1. Board flexes (PCB bending during assembly, ICT testing, mechanical shock)
2. Surface-mount termination is the stress concentrator
3. Crack initiates near a termination corner and propagates inward
4. Crack crosses opposing electrodes → low-impedance short → leakage, fire, failure

Three mitigation strategies have evolved:
- **FT-CAP / soft termination** (silver epoxy under the Ni barrier) — keeps cracks IN the termination, away from active layers (KEMET US 7,670,981 and related patents)
- **FE-CAP / floating electrode** — two stacks in series, so a single crack can't bridge supply-to-return
- **FO-CAP / open mode** (this patent) — geometric routing of crack trajectory via designed voids

Each costs something (process complexity, lost active volume, capacitance density), and KEMET combines them in different product tiers.

## Connection to the modern wiki

- [[failure-modes-mlcc]] — flex-crack mode and the mitigation hierarchy
- [[kemet-arcshield]] — KEMET's HV-MLCC with internal shield electrodes (related concept of geometric protection)
- [[bme-reliability-model]] — Liu BME framework, complementary view focused on electrical/intrinsic failures rather than mechanical

## References

- Google Patents: [US 8,713,770 B2](https://patents.google.com/patent/US8713770B2/en)
- KEMET KEM_C1012_X7R_OPENMODE_SMD datasheet (commercial implementation)
- EE Times: ["Soft termination reduces MLCC failures"](https://www.eetimes.com/soft-termination-reduces-mlcc-failures/) — overview of the FT-CAP family this complements
