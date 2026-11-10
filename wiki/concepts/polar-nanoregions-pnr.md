---
title: Polar Nanoregions (PNRs)
type: concept
created: 2026-05-27
updated: 2026-11-10
sources:
  - he-2025-bsite-ca-batio3-pnr.md
tags:
  - paper
status: draft
importance: medium
---

# Polar Nanoregions (PNRs)

Nanometer-scale regions with **non-zero local polarization** embedded in a non-polar (paraelectric) matrix. The hallmark microstructure of **[[relaxor-ferroelectric|relaxor ferroelectrics]]** — distinct from both pure ferroelectrics (long-range ordered domains) and paraelectrics (no polarization). For MLCCs, PNR-based dielectrics are attractive because they **retain moderate ε_r without the steep DC-bias loss of full ferroelectrics**.

## Why PNRs help DC-bias stability

A conventional ferroelectric like undoped [[batio3]] has macroscopic domains; applying DC bias **aligns all domains and saturates polarization**, which collapses ε_r (the [[dc-bias-derating|VCC effect]]). A PNR system has only short-range correlations, so:

- There are no large coherent domains to align — the DC-bias saturation field is much higher.
- Most of the dielectric response comes from local distortion, which has weak field-dependence at modest bias.
- Net result: a **smaller `f_V` slope**, i.e., better DC-bias stability — at the cost of typically lower zero-bias ε_r.

[[he-2025-bsite-ca-batio3-pnr|He et al. 2025]] demonstrated PNR formation via 4 mol% Ca at the B-site of BaTiO₃ and reported the DC-bias attenuation dropping from 60 % (pure BT) to **15 % at 30 kV/cm** for the PNR composition — a 4× improvement.

## Distinction from core-shell

[[core-shell-batio3|Core-shell BaTiO₃]] is grain-scale: each grain has a ferroelectric core and a paraelectric shell, with the bias loss coming from the core. **PNRs are within-grain**: each grain is itself a matrix of polar regions in a non-polar background. The two design strategies can in principle be combined.

## Cross-references

- [[relaxor-ferroelectric]] — the broader material class
- [[batio3]] — the host for PNR engineering
- [[dc-bias-derating]] — the property PNRs improve
- [[core-shell-batio3]] — complementary grain-scale approach
- [[curie-temperature]] — PNR systems show a broadened, frequency-dependent dielectric maximum (T_m) rather than a sharp T_C
- [[ferroelectric-domain-wall]] — PNR boundaries are the analog at the nano scale

## References

- [[he-2025-bsite-ca-batio3-pnr]] — 4 mol% Ca-at-B-site in BaTiO₃; 60 % → 15 % bias attenuation
